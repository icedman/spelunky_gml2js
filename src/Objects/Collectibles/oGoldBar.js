function oGoldBar_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Gold Bar';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    value = 500;
    canCollect = true;
  }
}

class oGoldBar extends oTreasure {
  // variables
}
