function oPoof_OTHER($) {
  with ($) {
    instance_destroy();
  }
}

function oPoof_STEP($) {
  with ($) {
    x += xVel;
    y += yVel;
  }
}

function oPoof_CREATE($) {
  with ($) {
    action_inherited();

    xVel = 0;
    yVel = 0;
    image_speed = 0.4;
  }
}

class oPoof extends oDrawnSprite {
  // variables
}
