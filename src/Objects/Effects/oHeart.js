function oHeart_STEP($) {
  with ($) {
    y -= 1;
  }
}

function oHeart_ALARM_0($) {
  with ($) {
    action_kill_object();
  }
}

function oHeart_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    alarm[0] = 30;
  }
}

class oHeart extends oDrawnSprite {}
ObjType.oHeart = oHeart;
