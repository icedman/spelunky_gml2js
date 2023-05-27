function oBubble_OTHER($) {
  with ($) {
    instance_destroy();
  }
}

function oBubble_STEP($) {
  with ($) {
    y += yVel;

    if (!collision_point(x, y, oWater, 0, 0)) {
      instance_destroy();
    }
  }
}

function oBubble_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    yVel = -rand(1, 3) * 0.1;
    yAcc = 0.1;
    image_speed = 0.2;
  }
}

class oBubble extends oDrawnSprite {}
ObjType.oBubble = oBubble;
