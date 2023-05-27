function oGoldBar_CREATE($) {
  with ($) {
    try {
      oTreasure_CREATE($);
    } catch (err) {}

    type = 'Gold Bar';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    value = 500;
    canCollect = true;
  }
}

class oGoldBar extends oTreasure {}
ObjType.oGoldBar = oGoldBar;
