function oTreeTile_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    type = 'Tree';
    burning = false;
  }
}

class oTreeTile extends oSolid {}
ObjType.oTreeTile = oTreeTile;
