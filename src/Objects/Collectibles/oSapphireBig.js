function oSapphireBig_COLLISION_oGhost($) {
  with ($) {
    instance_create(x, y, oDiamond);
    instance_destroy();
  }
}

function oSapphireBig_ALARM($) {
  with ($) {
    canCollect = true;
  }
}

function oSapphireBig_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Big Sapphire';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    canCollect = false;
    alarm[0] = 20;
    value = 1200;
  }
}

class oSapphireBig extends oTreasure {
  // variables
}
