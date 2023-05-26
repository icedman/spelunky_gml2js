function oBurn_OTHER($) {
  with ($) {
    instance_destroy();
  }
}

function oBurn_STEP($) {
  with ($) {
    y += yVel;

    if (collision_point(x, y, oSolid, 0, 0)) {
      instance_destroy();
    }
  }
}

function oBurn_CREATE($) {
  with ($) {
    action_inherited();

    yVel = -0.1;
    yAcc = 0.1;
    image_speed = 0.4;
  }
}

class oBurn extends oDrawnSprite {
  // variables
}
