#!/bin/bash

# clean all working files to start over clean

WORK_DIR="/tmp/custom_isolinux"
ISO_MOUNT_DIR="${WORK_DIR}/mnt_iso"
INITRD_MOUNT_DIR="${WORK_DIR}/mnt_initrd_edit_here" 

set -e
set -x

# clear from previous run
# unmount iso if already mounted from previous run
sudo umount "$ISO_MOUNT_DIR" || true
sudo umount "$INITRD_MOUNT_DIR" || true
sudo rm -rf "$WORK_DIR" || true
