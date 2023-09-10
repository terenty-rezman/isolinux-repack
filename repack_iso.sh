#!/bin/bash

# taken from https://www.unixmen.com/edit-iso-files-using-mkisofs-in-linux/

set -e

source config_here.sh

cwd=$(pwd)

# unmount initrd first so modifications to files are flushed to disk
sudo umount "$INITRD_MOUNT_DIR" || true
sleep 1
 
# then pack new initrd
cd "$UNPACKED_INITRD_DIR"
gzip -c initrd > initrd.bin

# copy new initrd to iso dir
sudo cp "${UNPACKED_INITRD_DIR}/initrd.bin" "${UNPACKED_ISO_DIR}/isolinux/initrd.bin"

# create new iso
cd "${UNPACKED_ISO_DIR}"
sudo mkisofs -o ${cwd}/${OUTPUT_ISO} \
	-b isolinux/isolinux.bin -c isolinux/boot.cat \
	-no-emul-boot -boot-load-size 4 -boot-info-table -J -R -V "tsagi rtfe linux" \
	.

# mount initrd again
cd "$UNPACKED_INITRD_DIR"
sudo mount -o loop initrd "$INITRD_MOUNT_DIR"
