function oMegaMouthTile_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    type = 'Mega Mouth';
  }
}

class oMegaMouthTile extends oDrawnSprite {}
ObjType.oMegaMouthTile = oMegaMouthTile;
