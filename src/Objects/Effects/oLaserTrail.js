function oLaserTrail_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oLaserTrail_CREATE($) {
  with ($) {
    action_inherited();

    image_speed = 0.8;
  }
}

class oLaserTrail extends oDrawnSprite {
  // variables
}
