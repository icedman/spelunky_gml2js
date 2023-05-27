function oDesertTop_CREATE($) {
  with ($) {
    if (room_get_name(room) == 'rIntro') sprite_index = sDesertTopNight;
  }
}

class oDesertTop extends oObject {
  sDesertTopNight;
  sprite_index = sDesertTop;
  visible = true;
}
ObjType.oDesertTop = oDesertTop;
