#!/bin/bash

# clean all working files to start over clean

set -e

source config_here.sh

# clear from previous run
# unmount iso if already mounted from previous run
sudo umount "$ISO_MOUNT_DIR" || true
sudo umount "$INITRD_MOUNT_DIR" || true
echo 3 && sleep 1
echo 2 && sleep 1
echo 1 && sleep 1
sudo rm -rf "$WORK_DIR" || true
