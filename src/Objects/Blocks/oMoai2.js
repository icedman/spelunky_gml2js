function oMoai2_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    invincible = true;
  }
}

class oMoai2 extends oSolid {
  sprite_index = sMoai2;
  visible = true;
}
ObjType.oMoai2 = oMoai2;
