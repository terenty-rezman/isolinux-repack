#!/bin/bash

# taken from https://www.unixmen.com/edit-iso-files-using-mkisofs-in-linux/

set -e

# load common cfg vars from file
source config_here.sh

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
sudo mount -t iso9660 -o loop "$INPUT_ISO" "$ISO_MOUNT_DIR"
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
