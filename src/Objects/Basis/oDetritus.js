function oDetritus_STEP($) {
  with ($) {
    if (
      x < view_xview[0] - 4 ||
      x > view_xview[0] + view_wview[0] + 4 ||
      y < view_yview[0] - 4 ||
      y > view_yview[0] + view_hview[0] + 4
    ) {
      instance_destroy();
    }

    if (life > 0) life -= 1;
    else instance_destroy();

    moveTo(xVel, yVel);

    if (collision_point(x, y - 4, oLava, 0, 0)) {
      instance_destroy();
    }

    if (bounce) {
      if (yVel < 6) {
        yVel += grav;
      }

      if (isCollisionTop(1) && yVel < 0) {
        yVel = -yVel * 0.8;
      }

      if (isCollisionLeft(1) || isCollisionRight(1)) {
        xVel = -xVel * 0.5;
      }

      if (isCollisionBottom(1)) {
        // bounce
        if (yVel > 1) yVel = -yVel * 0.5;
        else yVel = 0;
      }
    }
  }
}

function oDetritus_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    life = 60;
    grav = 0.6;
    bounce = true;
    dying = false;
    invincible = false;

    if (instance_number(oDetritus) > 32) instance_destroy();
  }
}

class oDetritus extends oDrawnSprite {}
