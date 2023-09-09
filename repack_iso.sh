#!/bin/bash

# taken from https://www.unixmen.com/edit-iso-files-using-mkisofs-in-linux/

set -e

source config_here.sh

cwd=$(pwd)

cd "$UNPACKED_INITRD_DIR"
gzip -c initrd > initrd.bin
sudo cp "${UNPACKED_INITRD_DIR}/initrd.bin" "${UNPACKED_ISO_DIR}/isolinux/initrd.bin"
cd "${UNPACKED_ISO_DIR}"
sudo mkisofs -o ${cwd}/${OUTPUT_ISO} \
	-b isolinux/isolinux.bin -c isolinux/boot.cat \
	-no-emul-boot -boot-load-size 4 -boot-info-table -J -R -V "tsagi rtfe linux" \
	.
