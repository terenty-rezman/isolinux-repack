#!/bin/bash

# taken from https://www.unixmen.com/edit-iso-files-using-mkisofs-in-linux/

TARGET_ISO="Boot_CD_R3_1_2_NEW_by_Королёв_Дополнительно_обработанный_Грузится.iso"

WORK_DIR="/tmp/custom_isolinux"
ISO_MOUNT_DIR="${WORK_DIR}/mnt_iso"
UNPACKED_ISO_DIR="${WORK_DIR}/unpacked_iso" # <--- edit files in this dir! they will appear in the final iso!
UNPACKED_INITRD_DIR="${WORK_DIR}/unpacked_initrd"

INITRD_MOUNT_DIR="${WORK_DIR}/mnt_initrd" # <--- edit linux files in this dir! they will appear in the final iso!

set -e
set -x

# clear from previous run
# unmount iso if already mounted from previous run
sudo umount "$ISO_MOUNT_DIR" || true
sudo umount "$INITRD_MOUNT_DIR" || true
sudo rm -rf "$WORK_DIR" || true
