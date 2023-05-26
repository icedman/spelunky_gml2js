function oItemsGet_STEP($) {
  with ($) {
    y -= yVel;
    x = ceil(x);
    y = ceil(y);
  }
}

function oItemsGet_ALARM($) {
  with ($) {
    instance_destroy();
  }
}

function oItemsGet_CREATE($) {
  with ($) {
    action_inherited();

    yVel = 0.1;
    yAcc = 0.1;
    image_speed = 0.8;
    alarm[0] = 40;
  }
}

class oItemsGet extends oDrawnSprite {
  // variables
}
