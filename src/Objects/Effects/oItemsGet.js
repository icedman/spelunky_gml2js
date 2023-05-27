function oItemsGet_STEP($) {
  with ($) {
    y -= yVel;
    x = ceil(x);
    y = ceil(y);
  }
}

function oItemsGet_ALARM_0($) {
  with ($) {
    instance_destroy();
  }
}

function oItemsGet_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    yVel = 0.1;
    yAcc = 0.1;
    image_speed = 0.8;
    alarm[0] = 40;
  }
}

class oItemsGet extends oDrawnSprite {
  sprite_index = sItemGet;
  visible = true;
}
ObjType.oItemsGet = oItemsGet;
