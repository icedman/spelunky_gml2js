function oSpearsLeft_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oSpearsLeft_STEP($) {
  with ($) {
    if (
      sprite_index == sSpearsLeft &&
      !collision_point(x + 16, y, oSpearTrapTop, 0, 0) &&
      !collision_point(x + 16, y, oSpearTrapBottom, 0, 0)
    ) {
      instance_destroy();
    }
    if (
      sprite_index == sSpearsRight &&
      !collision_point(x - 16, y, oSpearTrapTop, 0, 0) &&
      !collision_point(x - 16, y, oSpearTrapBottom, 0, 0)
    ) {
      instance_destroy();
    }
    depth = 995;
  }
}

class oSpearsLeft extends oDrawnSprite {
  // variables
}
