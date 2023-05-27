function oTreasure_STEP($) {
  with ($) {
    // treasure only active within view
    if (
      x > view_xview[0] - 16 &&
      x < view_xview[0] + view_wview[0] + 16 &&
      y > view_yview[0] - 16 &&
      y < view_yview[0] + view_hview[0] + 16 &&
      state == ACTIVE
    ) {
      colLeft = false;
      colRight = false;
      colBot = false;
      if (isCollisionLeft(1)) colLeft = true;
      if (isCollisionRight(1)) colRight = true;
      if (isCollisionBottom(1)) colBot = true;

      moveTo(xVel, yVel);

      if (!colBot) yVel += myGrav;
      if (yVel > 8) yVel = 8;

      if (isCollisionTop(1)) {
        if (yVel < 0) yVel = -yVel * 0.8;
        else y += 1;
      }

      if (colLeft || colRight) {
        xVel = -xVel * 0.5;
      }

      if (colBot) {
        /*
        // bounce
        if (yVel &gt; 1) yVel = -yVel * 0.5;
        else yVel = 0;
        */

        // friction
        if (abs(xVel) < 0.1) xVel = 0;
        else if (abs(xVel) != 0) xVel *= 0.3;

        y -= 1;

        if (!isCollisionBottom(1)) {
          y += 1;
          status = STATIC;
        }
        yVel = 0;
      }
      // else status = STATIC;

      if (colLeft) {
        if (!colRight) x += 1;
        //yVel = 0;
      } else if (colRight) {
        x -= 1;
        //yVel = 0;
      }

      if (global.hasSpectacles || global.hasUdjatEye) {
        depth = 0;
      } else depth = 101;

      if (collision_rectangle(x - 3, y - 3, x + 3, y + 3, oLava, 0, 0)) {
        myGrav = 0;
        xVel = 0;
        yVel = 0;
        y += 0.05;
      } else myGrav = 0.6;
      if (collision_point(x, y - 5, oLava, 0, 0)) {
        instance_destroy();
      }
    }
  }
}

function oTreasure_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    type = 'None';
    held = false;
    LEFT = 18;
    RIGHT = 19;
    myGrav = 0.6;
    trigger = false;
    value = 0;
    canCollect = false;
    yOff = 4;
    xVel = 0;
    yVel = 0;

    STATIC = 0;
    ACTIVE = 1;
    state = ACTIVE;
  }
}

class oTreasure extends oDrawnSprite {
  ACTIVE;
  STATIC;
}
