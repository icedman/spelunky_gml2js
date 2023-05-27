function oBloodTrail_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oBloodTrail_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0.8;
  }
}

class oBloodTrail extends oDrawnSprite {}
