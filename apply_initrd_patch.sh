#!/bin/bash
set -e

source config_here.sh

cwd=$(pwd)

# copy custom modified initrd fs to iso dir
sudo cp -r "${INITRD_PATCHED_FS}"/* "$INITRD_MOUNT_DIR"

# copy these iso scrits to store them for future generations
sudo mkdir -p "$TSAGI_ISO_TOOLS_DIR"
sudo cp -r *.sh "$INITRD_PATCHED_FS" README.md "$TSAGI_ISO_TOOLS_DIR"
