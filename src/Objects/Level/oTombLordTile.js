function oTombLordTile_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    type = 'Tomb Lord';
    image_speed = 0;
  }
}

class oTombLordTile extends oDrawnSprite {}
ObjType.oTombLordTile = oTombLordTile;
