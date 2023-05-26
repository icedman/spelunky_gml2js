function oGoldChunk_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Gold Chunk';
    makeActive();
    setCollisionBounds(-2, -2, 2, 2);
    yOff = 2;
    value = 100;
    canCollect = true;
  }
}

class oGoldChunk extends oTreasure {
  // variables
}
