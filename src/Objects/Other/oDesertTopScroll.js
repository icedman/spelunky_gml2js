function oDesertTopScroll_STEP($) {
  with ($) {
    if (scroll) x += 1;

    if (x > 320) instance_destroy();
  }
}

function oDesertTopScroll_CREATE($) {
  with ($) {
    scroll = false;
    if (room_get_name(room) == 'rCredits1') sprite_index = sDesertTopNight;
  }
}

class oDesertTopScroll extends oObject {}
ObjType.oDesertTopScroll = oDesertTopScroll;
