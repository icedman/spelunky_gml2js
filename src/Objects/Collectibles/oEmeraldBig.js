function oEmeraldBig_COLLISION_oGhost($) {
  with ($) {
    instance_create(x, y, oDiamond);
    instance_destroy();
  }
}

function oEmeraldBig_ALARM_0($) {
  with ($) {
    canCollect = true;
  }
}

function oEmeraldBig_CREATE($) {
  with ($) {
    try {
      oTreasure_CREATE($);
    } catch (err) {}

    type = 'Big Emerald';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    canCollect = false;
    alarm[0] = 20;
    value = 800;
  }
}

class oEmeraldBig extends oTreasure {}
ObjType.oEmeraldBig = oEmeraldBig;
