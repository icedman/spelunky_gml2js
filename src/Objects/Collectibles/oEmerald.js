function oEmerald_ALARM_0($) {
  with ($) {
    canCollect = true;
  }
}

function oEmerald_CREATE($) {
  with ($) {
    try {
      oTreasure_CREATE($);
    } catch (err) {}

    type = 'Emerald';
    makeActive();
    setCollisionBounds(-2, -2, 2, 2);
    yOff = 2;
    alarm[0] = 20;
    value = 200;
  }
}

class oEmerald extends oTreasure {}
ObjType.oEmerald = oEmerald;
