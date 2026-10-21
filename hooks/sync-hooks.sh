#!/bin/sh
set -eu
root=$(git rev-parse --show-toplevel)
hooks="$(git rev-parse --absolute-git-dir)/hooks"
mkdir -p "$hooks"
for hook in pre-commit pre-push; do
  cp "$root/hooks/$hook" "$hooks/$hook"
  chmod +x "$hooks/$hook"
done
git config extensions.worktreeConfig true
git config --worktree core.hooksPath "$hooks"
