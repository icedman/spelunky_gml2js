function oDesertScroll2_STEP($) {
  with ($) {
    if (scroll) x += 1;

    if (x > 320) instance_destroy();
  }
}

function oDesertScroll2_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    scroll = false;

    if (isRoom('rCredits1')) sprite_index = sDesertNight2;
  }
}

class oDesertScroll2 extends oDrawnSprite {
  sprite_index = sDesert2;
  visible = true;
}
ObjType.oDesertScroll2 = oDesertScroll2;
