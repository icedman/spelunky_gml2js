function oGoldChunk_CREATE($) {
  with ($) {
    try {
      oTreasure_CREATE($);
    } catch (err) {}

    type = 'Gold Chunk';
    makeActive();
    setCollisionBounds(-2, -2, 2, 2);
    yOff = 2;
    value = 100;
    canCollect = true;
  }
}

class oGoldChunk extends oTreasure {
  yOff;
  sprite_index = sGoldChunk;
  visible = true;
}
ObjType.oGoldChunk = oGoldChunk;
