function oZombieTile_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0;
  }
}

class oZombieTile extends oDrawnSprite {}
ObjType.oZombieTile = oZombieTile;
