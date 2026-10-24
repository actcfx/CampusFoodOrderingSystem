#!/usr/bin/env bash
# Create a separate worktree for Codex agents and disable push from it.
# Usage: scripts/setup-agent-worktree.sh <bolt-branch> [worktree-path]
# Run this script from the main working directory of the repository.

set -euo pipefail

if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <bolt-branch> [worktree-path]" >&2
    exit 1
fi

branch="$1"
repo_root="$(git rev-parse --show-toplevel)"
worktree_path="${2:-${repo_root}-agent}"

# Create the branch from main if it does not exist.
if ! git show-ref --verify --quiet "refs/heads/${branch}"; then
    git branch "${branch}" main
fi

git worktree add "${worktree_path}" "${branch}"

# Let each worktree keep its own config, so the main worktree can still push.
git config extensions.worktreeConfig true

# Set an invalid push URL for every remote, only in the agent worktree.
for remote in $(git remote); do
    git -C "${worktree_path}" config --worktree "remote.${remote}.pushurl" "DISABLED-agent-worktree"
done

echo "Agent worktree: ${worktree_path}"
echo "Branch: ${branch}"
echo "Push from this worktree is disabled."
echo "To push, run in ${repo_root}: git push origin ${branch}"
echo "Check: git -C \"${worktree_path}\" remote -v"
