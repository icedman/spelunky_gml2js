function oRubyBig_COLLISION_oGhost($) {
  with ($) {
    instance_create(x, y, oDiamond);
    instance_destroy();
  }
}

function oRubyBig_ALARM_0($) {
  with ($) {
    canCollect = true;
  }
}

function oRubyBig_CREATE($) {
  with ($) {
    try {
      oTreasure_CREATE($);
    } catch (err) {}

    type = 'Big Ruby';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    canCollect = false;
    alarm[0] = 20;
    value = 1600;
  }
}

class oRubyBig extends oTreasure {}
