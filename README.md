# isolinux-repack
 1) put all these __*.sh__ scripts and __target iso__ (e.g. Boot_CD_R3_1_2_NEW_by_Королёв_Дополнительно_обработанный_Грузится.iso) into the same dir
 2) run `./unpack_iso.sh` to unpack target iso & initrd files into your filesystem (into `/tmp/custom_isolinux` by defaullt) <br>
    (paths can be configured in `config_here.sh`)
 3) now make naccessary editions to extracted files: <br>
    run `./apply_initrd_patch.sh` to copy patched root fs files from `patched_initrd_fs` dir to __output.iso__ <br>
    or make manual editions to files: <br>
    `/tmp/custom_isolinux/mnt_initrd_edit_here/` contains initrd root fs that will be exported to __output.iso__
    `/tmp/custom_isolinux/unpacked_iso_edit_here/` contains files that will be placed to / of __output.iso__ <br>
 4) run `./repack_iso.sh` to create new __iso__ with modified files (content is taken from `/tmp/custom_isolinux/mnt_initrd_edit_here/` and `/tmp/custom_isolinux/unpacked_iso_edit_here/`)
 5) use `./clean_all.sh` at any stage to clear working files and start fresh 
