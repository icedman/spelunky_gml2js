function oSapphire_ALARM($) {
  with ($) {
    canCollect = true;
  }
}

function oSapphire_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Sapphire';
    makeActive();
    setCollisionBounds(-2, -2, 2, 2);
    yOff = 2;
    alarm[0] = 20;
    value = 300;
  }
}

class oSapphire extends oTreasure {
  // variables
}
