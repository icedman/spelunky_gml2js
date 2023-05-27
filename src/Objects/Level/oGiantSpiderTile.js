function oGiantSpiderTile_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    type = 'Giant Spider';
  }
}

class oGiantSpiderTile extends oDrawnSprite {}
ObjType.oGiantSpiderTile = oGiantSpiderTile;
