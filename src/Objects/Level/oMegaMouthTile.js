function oMegaMouthTile_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    type = 'Mega Mouth';
  }
}

class oMegaMouthTile extends oDrawnSprite {
  sprite_index = sMegaMouthTile;
  visible = true;
}
ObjType.oMegaMouthTile = oMegaMouthTile;
