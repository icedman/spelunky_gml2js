function oDesertTop_CREATE($) {
  with ($) {
    if (room_get_name(room) == 'rIntro') sprite_index = sDesertTopNight;
  }
}

class oDesertTop extends oObject {
  sDesertTopNight;
}
ObjType.oDesertTop = oDesertTop;
