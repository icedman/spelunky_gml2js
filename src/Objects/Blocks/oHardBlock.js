function oHardBlock_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    invincible = true;
  }
}

class oHardBlock extends oSolid {}
ObjType.oHardBlock = oHardBlock;
