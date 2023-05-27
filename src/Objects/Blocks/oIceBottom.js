function oIceBottom_STEP($) {
  with ($) {
    try {
      oDrawnSprite_STEP($);
    } catch (err) {}

    if (!collision_point(x + 8, y - 1, oSolid, 0, 0)) instance_destroy();
  }
}

function oIceBottom_ALARM_0($) {
  with ($) {
    instance_create(x + 8, y + 4, oDrip);
    alarm[0] = rand(20, 400);
  }
}

function oIceBottom_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    alarm[0] = rand(20, 400);
  }
}

class oIceBottom extends oDrawnSprite {}
