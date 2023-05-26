function oBigCollect_STEP($) {
  with ($) {
    y -= 1;
  }
}

function oBigCollect_ALARM($) {
  with ($) {
    action_kill_object();
  }
}

function oBigCollect_CREATE($) {
  with ($) {
    action_inherited();

    alarm[0] = 30;
  }
}

class oBigCollect extends oDrawnSprite {
  // variables
}
