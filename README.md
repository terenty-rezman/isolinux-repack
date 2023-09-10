# isolinux-repack tools
  login: root <br>
  password: 1
## what scripts do
 - unpack given iso (originally based on Boot_CD_R3_1_2_NEW_by_Королёв_Дополнительно_обработанный_Грузится.iso)
 - make modifications to initrd files (modified files are copied from `initrd_patched_fs`)
 - repack new iso
## how to use scripts
 1) put all these __*.sh__ scripts and __target iso__ (e.g. Boot_CD_R3_1_2_NEW_by_Королёв_Дополнительно_обработанный_Грузится.iso) into the same dir
 2) run `./unpack_iso.sh` to unpack target iso & initrd files into your filesystem (into `./extracted_files` by defaullt) <br>
    (paths can be configured in `config_here.sh`)
 3) now make naccessary editions to extracted files: <br>
    run `./apply_initrd_patch.sh` to copy patched root fs files from `initrd_patched_fs` dir to __output.iso__ <br>
    or make manual editions to files located here: <br>
    `./extracted_files/initrd_edit_here/` contains initrd root fs that will be exported to __output.iso__
    `./extracted_files/iso_edit_here/` contains files that will be placed to / of __output.iso__ <br>
 4) run `./repack_iso.sh` to create new __iso__ with modified files (content is taken from `./extracted_files/initrd_edit_here/` and `./extracted_files/iso_edit_here/`)
 5) use `./clean_all.sh` at any stage to clear working files and start fresh 
