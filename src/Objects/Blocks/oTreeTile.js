function oTreeTile_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    type = 'Tree';
    burning = false;
  }
}

class oTreeTile extends oSolid {
  sprite_index = sTreeTrunk;
  visible = true;
}
ObjType.oTreeTile = oTreeTile;
