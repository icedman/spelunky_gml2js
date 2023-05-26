function oGoldNugget_ALARM($) {
  with ($) {
    canCollect = true;
  }
}

function oGoldNugget_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Gold Nugget';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    value = 500;
    canCollect = true;
  }
}

class oGoldNugget extends oTreasure {
  // variables
}
