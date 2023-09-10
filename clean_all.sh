#!/bin/bash

# clean all working files to start over clean

set -e

source config_here.sh

# clear from previous run
# unmount iso if already mounted from previous run
sudo umount "$ISO_MOUNT_DIR" || true
sudo umount "$INITRD_MOUNT_DIR" || true
sleep 1
sudo rm -rf "$WORK_DIR" || true
