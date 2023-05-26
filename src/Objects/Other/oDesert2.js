function oDesert2_CREATE($) {
  with ($) {
    action_inherited();

    if (room_get_name(room) == 'rIntro') sprite_index = sDesertNight2;
  }
}

class oDesert2 extends oSolid {
  // variables
}
