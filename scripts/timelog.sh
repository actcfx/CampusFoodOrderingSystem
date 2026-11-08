#!/usr/bin/env bash
# Record working time in minutes (METHOD.md section 8 and 9).
# Each finished entry is appended to ai/timelog.tsv. Running timers are kept
# in the local .git folder, so they are never committed.
#
# Categories: 撰寫 (human writing), 審查 (human review), AI (AI execution), 重做 (rework)
#
# Usage:
#   scripts/timelog.sh start <NN> <step> <category> [note]
#   scripts/timelog.sh stop  [<NN> <step> <category>]   (no arguments: stop your only running timer)
#   scripts/timelog.sh add   <NN> <step> <category> <minutes> [note]
#   scripts/timelog.sh status
#   scripts/timelog.sh summary [NN]                      (prints rows for the 工時 table in ai/usage-log.md)
#
# Examples:
#   scripts/timelog.sh start 01 G2 審查
#   scripts/timelog.sh stop
#   scripts/timelog.sh add 01 G2 撰寫 15 "回答 Q-01 到 Q-08"
#
# The person is your git user.name. Set TIMELOG_WHO to use another name.

set -euo pipefail

usage() {
    sed -n '2,20p' "$0" | sed 's/^# \{0,1\}//'
    exit 1
}

[ "$#" -ge 1 ] || usage

repo_root="$(git rev-parse --show-toplevel)"
log="$repo_root/ai/timelog.tsv"
state_dir="$(cd "$repo_root" && cd "$(git rev-parse --git-common-dir)" && pwd)/timelog"
who="${TIMELOG_WHO:-$(git config user.name || true)}"
[ -n "$who" ] || { echo "Set git user.name or TIMELOG_WHO." >&2; exit 1; }

mkdir -p "$state_dir"
if [ ! -f "$log" ]; then
    printf '日期\tBolt\t步驟\t類別\t人員\t開始\t結束\t分鐘\t備註\n' > "$log"
fi

check_args() {
    local bolt="$1" step="$2" cat="$3"
    case "$bolt" in [0-9][0-9]) ;; *) echo "Bolt must be two digits, for example 01." >&2; exit 1 ;; esac
    case "$cat" in 撰寫|審查|AI|重做) ;; *) echo "Category must be 撰寫, 審查, AI or 重做." >&2; exit 1 ;; esac
    case "$step$who" in *$'\t'*) echo "Tabs are not allowed." >&2; exit 1 ;; esac
    [ -n "$step" ] || { echo "Step is empty." >&2; exit 1; }
}

state_file() {
    # One file per running timer. The name is safe for the file system.
    local key
    key="$(printf '%s|%s|%s|%s' "$1" "$2" "$3" "$who" | shasum | cut -c1-16)"
    printf '%s/%s' "$state_dir" "$key"
}

clean() { printf '%s' "$1" | tr '\t\n' '  '; }

append() {
    # date bolt step category who start end minutes note
    printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n' "$@" >> "$log"
}

cmd="$1"; shift

case "$cmd" in
start)
    [ "$#" -ge 3 ] || usage
    check_args "$1" "$2" "$3"
    f="$(state_file "$1" "$2" "$3")"
    if [ -f "$f" ]; then
        echo "A timer for Bolt $1 / $2 / $3 is already running. Stop it first." >&2
        exit 1
    fi
    printf '%s\t%s\t%s\t%s\t%s\t%s\n' "$(date +%s)" "$1" "$2" "$3" "$who" "$(clean "${4:-}")" > "$f"
    echo "Started: Bolt $1 / $2 / $3 ($who) at $(date '+%H:%M')"
    ;;

stop)
    if [ "$#" -ge 3 ]; then
        check_args "$1" "$2" "$3"
        f="$(state_file "$1" "$2" "$3")"
        [ -f "$f" ] || { echo "No running timer for Bolt $1 / $2 / $3." >&2; exit 1; }
    else
        mine=()
        for s in "$state_dir"/*; do
            [ -f "$s" ] || continue
            [ "$(cut -f5 "$s")" = "$who" ] && mine+=("$s")
        done
        if [ "${#mine[@]}" -ne 1 ]; then
            echo "You have ${#mine[@]} running timers. Give <NN> <step> <category>." >&2
            "$0" status >&2
            exit 1
        fi
        f="${mine[0]}"
    fi
    IFS=$'\t' read -r start_epoch bolt step cat person note < "$f" || true
    end_epoch="$(date +%s)"
    minutes=$(( (end_epoch - start_epoch + 30) / 60 ))
    append "$(date -r "$start_epoch" '+%Y-%m-%d')" "$bolt" "$step" "$cat" "$person" \
        "$(date -r "$start_epoch" '+%H:%M')" "$(date -r "$end_epoch" '+%H:%M')" "$minutes" "${note:-}"
    rm -f "$f"
    echo "Stopped: Bolt $bolt / $step / $cat ($person): $minutes min"
    ;;

add)
    [ "$#" -ge 4 ] || usage
    check_args "$1" "$2" "$3"
    case "$4" in ''|*[!0-9]*) echo "Minutes must be a whole number." >&2; exit 1 ;; esac
    append "$(date '+%Y-%m-%d')" "$1" "$2" "$3" "$who" "" "" "$4" "$(clean "${5:-}")"
    echo "Added: Bolt $1 / $2 / $3 ($who): $4 min"
    ;;

status)
    found=false
    for s in "$state_dir"/*; do
        [ -f "$s" ] || continue
        found=true
        IFS=$'\t' read -r start_epoch bolt step cat person note < "$s" || true
        echo "Running: Bolt $bolt / $step / $cat ($person) since $(date -r "$start_epoch" '+%m-%d %H:%M'), $(( ($(date +%s) - start_epoch) / 60 )) min"
    done
    $found || echo "No running timers."
    ;;

summary)
    filter="${1:-}"
    echo "| Bolt | 步驟 | 人類撰寫 | 人類審查 | AI 執行 | 重做 |"
    echo "|---|---|---|---|---|---|"
    awk -F'\t' -v filter="$filter" '
        NR == 1 { next }
        filter != "" && $2 != filter { next }
        {
            row = $2 SUBSEP $3
            if (!(row in seen)) { seen[row] = 1; order[++n] = row }
            k = row SUBSEP $4
            if (!((k SUBSEP $5) in mins)) { people[k] = people[k] (people[k] == "" ? "" : SUBSEP) $5 }
            mins[k SUBSEP $5] += $8
            total[k] += $8
        }
        function cell(k,   list, m, i, out) {
            if (!(k in total)) return "0"
            m = split(people[k], list, SUBSEP)
            if (k ~ (SUBSEP "AI$")) return total[k]
            if (m == 1) return total[k] "（" list[1] "）"
            out = ""
            for (i = 1; i <= m; i++) out = out (i > 1 ? " ＋ " : "") mins[k SUBSEP list[i]] "（" list[i] "）"
            return out
        }
        END {
            for (i = 1; i <= n; i++) {
                split(order[i], p, SUBSEP)
                r = order[i]
                printf "| %s | %s | %s | %s | %s | %s |\n", p[1], p[2], \
                    cell(r SUBSEP "撰寫"), cell(r SUBSEP "審查"), cell(r SUBSEP "AI"), cell(r SUBSEP "重做")
            }
        }
    ' "$log"
    ;;

*)
    usage
    ;;
esac
