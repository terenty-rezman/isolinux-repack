#!/bin/bash
INPUT_ISO="Boot_CD_R3_1_2_NEW_by_Королёв_Дополнительно_обработанный_Грузится.iso"
OUTPUT_ISO="tsagi_rtfe_linux.iso"

INITRD_PATCHED_FS="initrd_patched_fs"

cwd=$(pwd)

WORK_DIR="${cwd}/extracted_files"
ISO_MOUNT_DIR="${WORK_DIR}/mnt_iso"
UNPACKED_ISO_DIR="${WORK_DIR}/iso_edit_here" # <--- edit files in this dir! they will appear in the final iso!
UNPACKED_INITRD_DIR="${WORK_DIR}/unpacked_initrd"
INITRD_MOUNT_DIR="${WORK_DIR}/initrd_edit_here" # <--- edit linux files in this dir! they will appear in the final iso!
TSAGI_ISO_TOOLS_DIR="${UNPACKED_ISO_DIR}/TSAGI_ISO_TOOLS"

# enable debug
set -x
