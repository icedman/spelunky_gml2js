function oBigCollect_STEP($) {
  with ($) {
    y -= 1;
  }
}

function oBigCollect_ALARM_0($) {
  with ($) {
    action_kill_object();
  }
}

function oBigCollect_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    alarm[0] = 30;
  }
}

class oBigCollect extends oDrawnSprite {}
ObjType.oBigCollect = oBigCollect;
