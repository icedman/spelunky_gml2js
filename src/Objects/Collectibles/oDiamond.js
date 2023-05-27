function oDiamond_ALARM_0($) {
  with ($) {
    canCollect = true;
  }
}

function oDiamond_CREATE($) {
  with ($) {
    try {
      oTreasure_CREATE($);
    } catch (err) {}

    type = 'Diamond';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    canCollect = false;
    alarm[0] = 20;
    value = 5000;
  }
}

class oDiamond extends oTreasure {}
