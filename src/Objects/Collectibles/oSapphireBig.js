function oSapphireBig_COLLISION_oGhost($) {
  with ($) {
    instance_create(x, y, oDiamond);
    instance_destroy();
  }
}

function oSapphireBig_ALARM_0($) {
  with ($) {
    canCollect = true;
  }
}

function oSapphireBig_CREATE($) {
  with ($) {
    try {
      oTreasure_CREATE($);
    } catch (err) {}

    type = 'Big Sapphire';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    canCollect = false;
    alarm[0] = 20;
    value = 1200;
  }
}

class oSapphireBig extends oTreasure {
  oDiamond;
  sprite_index = sSapphireBig;
  visible = true;
}
ObjType.oSapphireBig = oSapphireBig;
