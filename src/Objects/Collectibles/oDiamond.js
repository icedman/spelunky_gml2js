function oDiamond_ALARM($) {
  with ($) {
    canCollect = true;
  }
}

function oDiamond_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Diamond';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    canCollect = false;
    alarm[0] = 20;
    value = 5000;
  }
}

class oDiamond extends oTreasure {
  // variables
}
