function oLavaSolid_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    invincible = true;
  }
}

class oLavaSolid extends oSolid {
  sprite_index = sLava;
  visible = true;
}
ObjType.oLavaSolid = oLavaSolid;
