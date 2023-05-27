function oFrogTile_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0;
  }
}

class oFrogTile extends oDrawnSprite {
  sprite_index = sFrogLeft;
  visible = true;
}
ObjType.oFrogTile = oFrogTile;
