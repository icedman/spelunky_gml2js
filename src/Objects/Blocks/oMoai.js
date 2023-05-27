function oMoai_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    invincible = true;
  }
}

class oMoai extends oSolid {
  sprite_index = sMoai;
  visible = true;
}
ObjType.oMoai = oMoai;
