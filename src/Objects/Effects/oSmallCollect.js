function oSmallCollect_STEP($) {
  with ($) {
    y -= 1;
    x = ceil(x);
    y = ceil(y);
  }
}

function oSmallCollect_ALARM_0($) {
  with ($) {
    action_kill_object();
  }
}

function oSmallCollect_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    alarm[0] = 30;
    image_speed = 0.4;
  }
}

class oSmallCollect extends oDrawnSprite {
  sprite_index = sSmallCollect;
  visible = true;
}
ObjType.oSmallCollect = oSmallCollect;
