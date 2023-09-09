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

# install iso tools 
echo install iso tools: mkisofs
sudo apt install mkisofs

# clear from previous run
# unmount iso if already mounted from previous run
sudo umount "$ISO_MOUNT_DIR" || true

# create temp folder for iso files
mkdir -p $ISO_MOUNT_DIR
mkdir -p $UNPACKED_ISO_DIR
mkdir -p $UNPACKED_INITRD_DIR
mkdir -p $INITRD_MOUNT_DIR

# mount iso as readonly and copy all the files to edit them
sudo mount -t iso9660 -o loop "$TARGET_ISO" "$ISO_MOUNT_DIR"
cd $ISO_MOUNT_DIR

# copy iso files to edit them later
cd $ISO_MOUNT_DIR
tar cf - . | (cd $UNPACKED_ISO_DIR; tar xfp -)

echo iso files extracted to $UNPACKED_ISO_DIR

cd "$UNPACKED_INITRD_DIR"
cp "${UNPACKED_ISO_DIR}/isolinux/initrd.bin" "initrd.gz"
gunzip initrd.gz

# mount initrd to dir to edit files
sudo mount -o loop initrd "$INITRD_MOUNT_DIR"
