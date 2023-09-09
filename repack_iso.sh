#!/bin/bash

# taken from https://www.unixmen.com/edit-iso-files-using-mkisofs-in-linux/

OUTPUT_ISO="tsagi_rtfe_linux.iso"

WORK_DIR="/tmp/custom_isolinux"
UNPACKED_ISO_DIR="${WORK_DIR}/unpacked_iso" # <--- edit files in this dir! they will appear in the final iso!
UNPACKED_INITRD_DIR="${WORK_DIR}/unpacked_initrd"

set -e
set -x

cwd=$(pwd)

cd "$UNPACKED_INITRD_DIR"
gzip initrd
sudo cp "${UNPACKED_INITRD_DIR}/initrd.gz" "${UNPACKED_ISO_DIR}/isolinux/initrd.bin"
cd "${UNPACKED_ISO_DIR}"
sudo mkisofs -o ${cwd}/${OUTPUT_ISO} \
	-b isolinux/isolinux.bin -c isolinux/boot.cat \
	-no-emul-boot -boot-load-size 4 -boot-info-table -J -R -V "tsagi rtfe linux" \
	.
