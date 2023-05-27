function oAlienTile_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0;
  }
}

class oAlienTile extends oDrawnSprite {
  sprite_index = sAlien;
  visible = true;
}
ObjType.oAlienTile = oAlienTile;
