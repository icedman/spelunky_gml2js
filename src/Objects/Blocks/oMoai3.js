function oMoai3_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    invincible = true;
  }
}

class oMoai3 extends oSolid {}
ObjType.oMoai3 = oMoai3;
