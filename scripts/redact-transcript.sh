#!/usr/bin/env bash
# First-pass redaction of a transcript before human review.
# This script does NOT replace the checklist in ai/transcripts/README.md.
# The Reviewer still checks the output, and a second human confirms it.
#
# Usage:
#   scripts/redact-transcript.sh <input-file-or-folder> <output-file-or-folder> [--force]
#
# Example:
#   scripts/redact-transcript.sh ai/transcripts/raw/bolt-01 ai/transcripts/bolt-01
#
# What it replaces: e-mail addresses, user names in home folder paths,
# common API key and token formats, "password/token/secret = value" pairs,
# Taiwan phone numbers and Taiwan national ID numbers.
# What it cannot find: student IDs, names, and confidential project content.
# After replacing, it lists the file and line number of lines that still look
# suspicious. It does not print their content, so it is safe for an agent to run.

set -euo pipefail

usage() {
    sed -n '2,17p' "$0" | sed 's/^# \{0,1\}//'
    exit 1
}

[ "$#" -ge 2 ] || usage
in="$1"; out="$2"; force="${3:-}"

case "$out" in
    *ai/transcripts/raw*) echo "Output must not be inside ai/transcripts/raw/." >&2; exit 1 ;;
esac

redact_file() {
    local src="$1" dst="$2"
    if [ -e "$dst" ] && [ "$force" != "--force" ]; then
        echo "$dst exists. Use --force to overwrite." >&2
        exit 1
    fi
    mkdir -p "$(dirname "$dst")"
    perl -CSD -pe '
        $c{"email"}    += s/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/<EMAIL>/g;
        $c{"home path"} += s{(/Users/|/home/|C:\\\\Users\\\\|C:\\Users\\)[^/\\\s"'\'']+}{$1<USER>}g;
        $c{"api key"}  += s/\bsk-(?:ant-|proj-)?[A-Za-z0-9_-]{20,}/<API_KEY>/g;
        $c{"api key"}  += s/\b(?:ghp|gho|ghs|ghu|ghr)_[A-Za-z0-9]{20,}/<GITHUB_TOKEN>/g;
        $c{"api key"}  += s/\bgithub_pat_[A-Za-z0-9_]{20,}/<GITHUB_TOKEN>/g;
        $c{"api key"}  += s/\bAKIA[0-9A-Z]{16}\b/<AWS_KEY>/g;
        $c{"api key"}  += s/\bxox[abprs]-[A-Za-z0-9-]{10,}/<SLACK_TOKEN>/g;
        $c{"token"}    += s/\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/<JWT>/g;
        $c{"token"}    += s/\b(Bearer|Basic)\s+[A-Za-z0-9._~+\/=-]{16,}/$1 <TOKEN>/gi;
        $c{"secret value"} += s/\b((?:api[_-]?key|access[_-]?token|auth[_-]?token|token|secret|password|passwd|pwd)\\?"?\s*[:=]\s*\\?"?)[^"\s,\\]{6,}/$1<SECRET>/gi;
        # Hex neighbours are excluded so digits inside git hashes and UUIDs are not taken as phone numbers.
        $c{"phone"}    += s/(?<![0-9A-Fa-f])(?:\+886[- ]?9|09)\d{2}[- ]?\d{3}[- ]?\d{3}(?![0-9A-Fa-f])/<PHONE>/g;
        $c{"national id"} += s/\b[A-Z][12]\d{8}\b/<NATIONAL_ID>/g;
        END {
            for my $k (sort keys %c) { printf STDERR "  %-13s %d\n", $k, $c{$k} if $c{$k} }
        }
    ' "$src" > "$dst"
    echo "$dst"
}

if [ -d "$in" ]; then
    mkdir -p "$out"
    find "$in" -type f ! -name '.DS_Store' | sort | while IFS= read -r f; do
        redact_file "$f" "$out/${f#"$in"/}"
    done
    scan_target="$out"
else
    case "$out" in */) out="$out$(basename "$in")" ;; esac
    redact_file "$in" "$out"
    scan_target="$out"
fi

echo
echo "Lines to check by hand (student IDs, names, other secrets):"
hits="$(find "$scan_target" -type f ! -name '.DS_Store' -exec perl -ne '
    my $l = $_;
    $l =~ s/<(?:EMAIL|USER|API_KEY|GITHUB_TOKEN|AWS_KEY|SLACK_TOKEN|JWT|TOKEN|SECRET|PHONE|NATIONAL_ID)>//g;
    # Print only the location and the kind of match, never the line itself,
    # so the possible personal data does not reach the terminal or an AI prompt.
    my @kind;
    push @kind, "keyword"  if $l =~ /學號|密碼|身分證|電話|機密|password|secret|token|private/i;
    push @kind, "long number" if $l =~ /(?<![0-9a-f])[0-9]{8,}(?![0-9a-f])/i;
    push @kind, "ID-like"  if $l =~ /\b[A-Za-z]\d{7,9}\b/;
    print "  $ARGV:$. (", join(", ", @kind), ")\n" if @kind;
    close ARGV if eof;
' {} + || true)"
# Do not cut the list with head inside the pipeline: with pipefail, the
# SIGPIPE ended the whole script before anything was printed.
if [ -n "$hits" ]; then
    total="$(printf '%s\n' "$hits" | wc -l | tr -d ' ')"
    printf '%s\n' "$hits" | head -50 || true
    if [ "$total" -gt 50 ]; then echo "  ... $total lines in total; only the first 50 are shown."; fi
else
    echo "  (none found)"
fi
echo
echo "Next: the Reviewer checks the output with ai/transcripts/README.md, and a second human confirms it."
