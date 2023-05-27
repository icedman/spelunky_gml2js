function oGoldBars_CREATE($) {
  with ($) {
    try {
      oTreasure_CREATE($);
    } catch (err) {}

    type = 'Gold Bars';
    makeActive();
    setCollisionBounds(-7, -8, 7, 8);
    value = 1000;
    canCollect = true;
    yOff = 8;
  }
}

class oGoldBars extends oTreasure {}
