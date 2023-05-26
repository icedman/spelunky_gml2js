function oEmeraldBig_COLLISION_oGhost($) {
  with ($) {
    instance_create(x, y, oDiamond);
    instance_destroy();
  }
}

function oEmeraldBig_ALARM($) {
  with ($) {
    canCollect = true;
  }
}

function oEmeraldBig_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Big Emerald';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    canCollect = false;
    alarm[0] = 20;
    value = 800;
  }
}

class oEmeraldBig extends oTreasure {
  // variables
}
