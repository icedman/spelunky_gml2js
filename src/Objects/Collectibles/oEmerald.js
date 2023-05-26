function oEmerald_ALARM($) {
  with ($) {
    canCollect = true;
  }
}

function oEmerald_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Emerald';
    makeActive();
    setCollisionBounds(-2, -2, 2, 2);
    yOff = 2;
    alarm[0] = 20;
    value = 200;
  }
}

class oEmerald extends oTreasure {
  // variables
}
