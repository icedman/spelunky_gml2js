function oDesert_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    if (room_get_name(room) == 'rIntro') sprite_index = sDesertNight;
  }
}

class oDesert extends oSolid {
  sDesertNight;
  sprite_index = sDesert;
  visible = true;
}
ObjType.oDesert = oDesert;
