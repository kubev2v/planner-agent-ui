#!/bin/bash

# Marks the project's directory as safe in Git.
# Inside a devcontainer, the container's user (vscode) and the host user both
# have different UID/GIDs, leading Git to consider the ownership as dubious.
if [[ -z "$(git config --global safe.directory)" ]]; then
    git config --global --add safe.directory $PWD
fi

# Replace the default ZSH theme with a custom version the adds a newline before
# the user's prompt sign 
cp -f \
  $PWD/.devcontainer/scripts/devcontainers.zsh-theme \
  /home/vscode/.oh-my-zsh/custom/themes/devcontainers.zsh-theme

corepack enable && corepack install

echo 'export PATH="$PATH:$PWD/node_modules/.bin"' >> $HOME/.zshrc
