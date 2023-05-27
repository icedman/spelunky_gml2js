function oWater_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    type = 'Water';
    objChecked = false;
  }
}

class oWater extends oDrawnSprite {}
