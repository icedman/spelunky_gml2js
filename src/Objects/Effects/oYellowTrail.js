function oYellowTrail_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oYellowTrail_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 1;
  }
}

class oYellowTrail extends oDrawnSprite {}
ObjType.oYellowTrail = oYellowTrail;
