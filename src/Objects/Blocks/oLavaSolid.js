function oLavaSolid_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    invincible = true;
  }
}

class oLavaSolid extends oSolid {}
ObjType.oLavaSolid = oLavaSolid;
