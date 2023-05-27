function oFireFrogTile_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0;
  }
}

class oFireFrogTile extends oDrawnSprite {
  sprite_index = sFireFrogLeft;
  visible = true;
}
ObjType.oFireFrogTile = oFireFrogTile;
