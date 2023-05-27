function oTombLordTile_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    type = 'Tomb Lord';
    image_speed = 0;
  }
}

class oTombLordTile extends oDrawnSprite {
  sprite_index = sTombLordLeft;
  visible = true;
}
ObjType.oTombLordTile = oTombLordTile;
