function oYetiKingTile_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    type = 'Yeti King';
  }
}

class oYetiKingTile extends oDrawnSprite {}
ObjType.oYetiKingTile = oYetiKingTile;
