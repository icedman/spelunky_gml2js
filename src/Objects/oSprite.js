function oSprite_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0;
  }
}

class oSprite extends oDrawnSprite {
  visible = true;
}
ObjType.oSprite = oSprite;
