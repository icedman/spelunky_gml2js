function oManTrapTile_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0;
  }
}

class oManTrapTile extends oDrawnSprite {
  sprite_index = sManTrapLeft;
  visible = true;
}
ObjType.oManTrapTile = oManTrapTile;
