function oUFOTile_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0;
  }
}

class oUFOTile extends oDrawnSprite {
  sprite_index = sUFO;
  visible = true;
}
ObjType.oUFOTile = oUFOTile;
