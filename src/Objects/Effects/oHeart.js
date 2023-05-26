function oHeart_STEP($) {
  with ($) {
    y -= 1;
  }
}

function oHeart_ALARM($) {
  with ($) {
    action_kill_object();
  }
}

function oHeart_CREATE($) {
  with ($) {
    action_inherited();

    alarm[0] = 30;
  }
}

class oHeart extends oDrawnSprite {
  // variables
}
