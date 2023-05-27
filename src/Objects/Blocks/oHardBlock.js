function oHardBlock_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    invincible = true;
  }
}

class oHardBlock extends oSolid {
  sprite_index = sBrick;
  visible = true;
}
ObjType.oHardBlock = oHardBlock;
