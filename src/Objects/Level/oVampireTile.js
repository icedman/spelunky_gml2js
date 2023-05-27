function oVampireTile_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0;
  }
}

class oVampireTile extends oDrawnSprite {}
ObjType.oVampireTile = oVampireTile;
