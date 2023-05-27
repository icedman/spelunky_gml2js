function oShrubScroll_STEP($) {
  with ($) {
    if (scroll) x += 1;

    if (x > 320) instance_destroy();
  }
}

function oShrubScroll_CREATE($) {
  with ($) {
    scroll = false;
    if (isRoom('rCredits1')) sprite_index = sShrubDark;
  }
}

class oShrubScroll extends oDrawnSprite {}
