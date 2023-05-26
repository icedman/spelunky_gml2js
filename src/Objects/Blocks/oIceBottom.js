function oIceBottom_STEP($) {
  with ($) {
    action_inherited();

    if (!collision_point(x + 8, y - 1, oSolid, 0, 0)) instance_destroy();
  }
}

function oIceBottom_ALARM($) {
  with ($) {
    instance_create(x + 8, y + 4, oDrip);
    alarm[0] = rand(20, 400);
  }
}

function oIceBottom_CREATE($) {
  with ($) {
    action_inherited();

    alarm[0] = rand(20, 400);
  }
}

class oIceBottom extends oDrawnSprite {
  // variables
}
