function oMoai2_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    invincible = true;
  }
}

class oMoai2 extends oSolid {}
ObjType.oMoai2 = oMoai2;
