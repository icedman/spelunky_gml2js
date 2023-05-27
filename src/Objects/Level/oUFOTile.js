function oUFOTile_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0;
  }
}

class oUFOTile extends oDrawnSprite {}
ObjType.oUFOTile = oUFOTile;
