function oRopeBurn_STEP($) {
  with ($) {
    y += yVel;

    if (
      collision_point(x, y, oSolid, 0, 0) ||
      !collision_rectangle(x - 1, y - 8, x + 1, y + 8, oRope, 0, 0)
    ) {
      instance_destroy();
    }

    if (collision_point(x, y, oRope, 0, 0)) {
      rope = instance_nearest(x, y, oRope);
      instances_of(rope).forEach(($) => {
        with ($) {
          burnTimer = 1;
        }
      });
    }
  }
}

function oRopeBurn_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    yVel = -1;
    image_speed = 0.8;
  }
}

class oRopeBurn extends oDrawnSprite {}
ObjType.oRopeBurn = oRopeBurn;
