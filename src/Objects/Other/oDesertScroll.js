function oDesertScroll_STEP($) {
  with ($) {
    if (scroll) x += 1;

    if (x > 320) instance_destroy();
  }
}

function oDesertScroll_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    scroll = false;

    if (isRoom('rCredits1')) sprite_index = sDesertNight;
  }
}

class oDesertScroll extends oDrawnSprite {
  sprite_index = sDesert;
  visible = true;
}
ObjType.oDesertScroll = oDesertScroll;
