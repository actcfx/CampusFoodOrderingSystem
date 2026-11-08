#!/usr/bin/env bash
# Open and close a gate review record (reviews/bolt-NN-gN.md).
# The script fills the commit hash and the times. Humans fill everything else
# and do all Git write operations. This script only reads Git and writes the file.
#
# Usage:
#   scripts/gate.sh open  <NN> <gN> [path ...]   Create the record, fill hash and start time.
#   scripts/gate.sh close <NN> <gN> [--update-hash] Fill the end time.
#
# Examples:
#   scripts/gate.sh open 01 g2
#   scripts/gate.sh close 01 g2
#   scripts/gate.sh open 01 g4 specs/001-campus-ordering/uml specs/001-campus-ordering/traceability.md
#
# If you give no paths, the default review targets for the gate are used
# (feature folder is read from ai/plans/bolt-NN-plan.md).

set -euo pipefail

usage() {
    sed -n '2,16p' "$0" | sed 's/^# \{0,1\}//'
    exit 1
}

[ "$#" -ge 3 ] || usage

cmd="$1"
bolt="$2"
gate="$(printf '%s' "$3" | tr '[:upper:]' '[:lower:]')"
shift 3

case "$bolt" in [0-9][0-9]) ;; *) echo "Bolt must be two digits, for example 01." >&2; exit 1 ;; esac
case "$gate" in g[1-5]) ;; *) echo "Gate must be g1 to g5." >&2; exit 1 ;; esac

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

record="reviews/bolt-${bolt}-${gate}.md"
template="reviews/TEMPLATE.md"
plan="ai/plans/bolt-${bolt}-plan.md"
gate_up="$(printf '%s' "$gate" | tr '[:lower:]' '[:upper:]')"
now="$(date '+%Y/%m/%d %H:%M')"

case "$gate" in
    g1) gate_desc="核准範圍與輸入資料" ;;
    g2) gate_desc="核准澄清結果" ;;
    g3) gate_desc="核准指定版本的需求" ;;
    g4) gate_desc="核准 UML、追溯表與問題處置" ;;
    g5) gate_desc="人類檢查 diff、提交、結案" ;;
esac

default_targets() {
    local feature
    if [ ! -f "$plan" ]; then
        echo "Cannot find $plan. Give the review target paths as arguments." >&2
        exit 1
    fi
    feature="$(perl -ne 'if (/Feature：`([^`]+)`/) { $f = $1; $f =~ s{/$}{}; print $f; exit }' "$plan")"
    if [ -z "$feature" ]; then
        echo "Cannot read the Feature line in $plan. Give the paths as arguments." >&2
        exit 1
    fi
    case "$gate" in
        g1) printf '%s\n' "$feature/intent.md" "$plan" ;;
        g2) printf '%s\n' "$feature/questions.md" ;;
        g3) printf '%s\n' "$feature/spec.md" "$feature/checklist.md" ;;
        g4) printf '%s\n' "$feature/uml" "$feature/traceability.md" ;;
        g5) printf '%s\n' "$feature/traceability.md" "frontend" "backend" ;;
    esac
}

# Fill one "- <label>：..." line in the record.
set_field() {
    local label="$1" value="$2"
    LABEL="$label" VALUE="$value" perl -i -pe '
        BEGIN { $l = $ENV{LABEL}; $v = $ENV{VALUE} }
        s/^- \Q$l\E：.*$/- $l：$v/;
    ' "$record"
}

get_field() {
    LABEL="$1" perl -ne '
        BEGIN { $l = $ENV{LABEL} }
        if (/^- \Q$l\E：(.*)$/) { print $1; exit }
    ' "$record"
}

case "$cmd" in
open)
    if [ -e "$record" ]; then
        echo "$record already exists. Not overwritten." >&2
        exit 1
    fi
    if [ "$#" -gt 0 ]; then
        targets=("$@")
    else
        targets=()
        while IFS= read -r line; do targets+=("$line"); done < <(default_targets)
    fi

    # Keep only targets that exist in HEAD; warn about the others.
    existing=()
    for t in "${targets[@]}"; do
        t="${t%/}"
        if git cat-file -e "HEAD:$t" 2>/dev/null; then
            existing+=("$t")
        else
            echo "Warning: $t is not in HEAD. Skipped." >&2
        fi
    done
    if [ "${#existing[@]}" -eq 0 ]; then
        echo "No review target is committed. Commit the files first." >&2
        exit 1
    fi

    # The hash must match the files that the humans review.
    if [ -n "$(git status --porcelain -- "${existing[@]}")" ]; then
        echo "These review targets have uncommitted changes:" >&2
        git status --short -- "${existing[@]}" >&2
        echo "Commit them first, so the recorded hash matches what you review." >&2
        exit 1
    fi

    hash="$(git rev-parse HEAD)"
    target_list=""
    for t in "${existing[@]}"; do
        [ -d "$t" ] && t="$t/"
        target_list="${target_list:+$target_list、}\`$t\`"
    done

    cp "$template" "$record"
    BOLT="$bolt" GATE="$gate_up" perl -i -pe 's/^# Bolt NN — Gate GN /# Bolt $ENV{BOLT} — Gate $ENV{GATE} /' "$record"
    set_field "關卡" "${gate_up}（${gate_desc}）"
    set_field "審查對象與版本（commit hash）" "${target_list}（\`${hash}\`）"
    set_field "開始時間" "$now"

    echo "Created $record"
    echo "  Targets: ${existing[*]}"
    echo "  Commit:  $hash"
    echo "  Start:   $now"
    echo "Fill in the reviewers, findings and decision. Close with: scripts/gate.sh close $bolt $gate"
    ;;

close)
    update_hash=false
    [ "${1:-}" = "--update-hash" ] && update_hash=true
    if [ ! -f "$record" ]; then
        echo "$record does not exist. Run: scripts/gate.sh open $bolt $gate" >&2
        exit 1
    fi
    end_value="$(get_field "結束時間")"
    if [ -n "${end_value// /}" ]; then
        echo "結束時間 is already filled ($end_value). Not changed." >&2
        exit 1
    fi

    # Check whether the reviewed files changed after the recorded commit.
    target_line="$(get_field "審查對象與版本（commit hash）")"
    old_hash="$(printf '%s' "$target_line" | perl -ne 'print $1 if /`([0-9a-f]{40})`/')"
    paths=()
    while IFS= read -r p; do [ -n "$p" ] && paths+=("${p%/}"); done < <(
        printf '%s' "$target_line" | perl -ne 'while (/`([^`]+)`/g) { print "$1\n" unless $1 =~ /^[0-9a-f]{40}$/ }')

    if [ -n "$old_hash" ] && [ "${#paths[@]}" -gt 0 ]; then
        if [ -n "$(git status --porcelain -- "${paths[@]}")" ]; then
            echo "Review targets have uncommitted changes. Commit the fixes first." >&2
            git status --short -- "${paths[@]}" >&2
            exit 1
        fi
        if ! git diff --quiet "$old_hash" HEAD -- "${paths[@]}"; then
            new_hash="$(git rev-parse HEAD)"
            if $update_hash; then
                set_field "審查對象與版本（commit hash）" "${target_line/$old_hash/$new_hash}"
                echo "Review targets changed during the review. Hash updated to $new_hash."
            else
                echo "Review targets changed after ${old_hash:0:7}:" >&2
                git diff --stat "$old_hash" HEAD -- "${paths[@]}" >&2
                echo "If the approved version is the current one, run again with --update-hash." >&2
                echo "If not, check what changed before you close the gate." >&2
                exit 1
            fi
        fi
    fi

    set_field "結束時間" "$now"
    echo "Closed $record (end: $now)."
    echo "Check the decision and signature lines, then commit the record."
    ;;

*)
    usage
    ;;
esac
