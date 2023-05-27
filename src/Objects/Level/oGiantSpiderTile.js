function oGiantSpiderTile_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    type = 'Giant Spider';
  }
}

class oGiantSpiderTile extends oDrawnSprite {
  sprite_index = sGiantSpiderHang;
  visible = true;
}
ObjType.oGiantSpiderTile = oGiantSpiderTile;
