function oVampireTile_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0;
  }
}

class oVampireTile extends oDrawnSprite {
  sprite_index = sVampireLeft;
  visible = true;
}
ObjType.oVampireTile = oVampireTile;
