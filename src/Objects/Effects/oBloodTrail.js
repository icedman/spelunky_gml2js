function oBloodTrail_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oBloodTrail_CREATE($) {
  with ($) {
    action_inherited();

    image_speed = 0.8;
  }
}

class oBloodTrail extends oDrawnSprite {
  // variables
}
