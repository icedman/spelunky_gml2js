function oRopeThrow_STEP($) {
  with ($) {
    try {
      oItem_STEP($);
    } catch (err) {}

    if (armed && yVel >= 0) {
      move_snap(16, 1);
      if (px < x) {
        if (!collision_point(x - 8, y, oSolid, 0, 0)) x -= 8;
        else x += 8;
      } else {
        if (!collision_point(x + 8, y, oSolid, 0, 0)) x += 8;
        else x -= 8;
      }
      instance_create(x, y, oRopeTop);
      armed = false;
      falling = true;
      xVel = 0;
      yVel = 8;
      y += 8;
    }

    if (falling) {
      xVel = 0;
      yVel = 8;
      fallCount += 1;
      if (isCollisionBottom(1) || fallCount > 16) {
        falling = false;
        y -= 8;
        instance_destroy();
      } else instance_create(x - 8, y, oRope);
    }
  }
}

function oRopeThrow_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Rope';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    armed = false;
    falling = false;
    fallCount = 0;
    px = 0;
    py = 0;
    safe = true;
    // alarm[2] = 30;
  }
}

class oRopeThrow extends oItem {
  fallCount;
  px;
}
