function oDesertScroll_STEP($) {
  with ($) {
    if (scroll) x += 1;

    if (x > 320) instance_destroy();
  }
}

function oDesertScroll_CREATE($) {
  with ($) {
    action_inherited();

    scroll = false;

    if (isRoom('rCredits1')) sprite_index = sDesertNight;
  }
}

class oDesertScroll extends oDrawnSprite {
  // variables
}