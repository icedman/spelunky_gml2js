function oDesert2_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    if (room_get_name(room) == 'rIntro') sprite_index = sDesertNight2;
  }
}

class oDesert2 extends oSolid {
  sDesertNight2;
  sprite_index = sDesert2;
  visible = true;
}
ObjType.oDesert2 = oDesert2;
