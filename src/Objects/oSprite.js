function oSprite_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0;
  }
}

class oSprite extends oDrawnSprite {}
ObjType.oSprite = oSprite;
