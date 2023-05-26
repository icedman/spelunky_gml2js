function oSmallCollect_STEP($) {
  with ($) {
    y -= 1;
    x = ceil(x);
    y = ceil(y);
  }
}

function oSmallCollect_ALARM($) {
  with ($) {
    action_kill_object();
  }
}

function oSmallCollect_CREATE($) {
  with ($) {
    action_inherited();

    alarm[0] = 30;
    image_speed = 0.4;
  }
}

class oSmallCollect extends oDrawnSprite {
  // variables
}
