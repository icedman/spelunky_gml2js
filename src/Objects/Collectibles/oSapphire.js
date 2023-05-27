function oSapphire_ALARM_0($) {
  with ($) {
    canCollect = true;
  }
}

function oSapphire_CREATE($) {
  with ($) {
    try {
      oTreasure_CREATE($);
    } catch (err) {}

    type = 'Sapphire';
    makeActive();
    setCollisionBounds(-2, -2, 2, 2);
    yOff = 2;
    alarm[0] = 20;
    value = 300;
  }
}

class oSapphire extends oTreasure {}
