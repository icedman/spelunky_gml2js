function oMoai3_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    invincible = true;
  }
}

class oMoai3 extends oSolid {
  sprite_index = sMoai3;
  visible = true;
}
ObjType.oMoai3 = oMoai3;
