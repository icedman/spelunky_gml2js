function oThwompTrap_STEP($) {
  with ($) {
    dist = distance_to_object(oCharacter);
    if (status == IDLE) {
      if (oPlayer1.y > y && dist < 96 && abs(oPlayer1.x - x) < 8) {
        status = DROP;
      }
    } else if (status == DROP) {
      yVel += myGrav;
      if (yVel > 6) yVel = 6;
      if (isCollisionBottom(1)) {
        status = WAIT;
        yVel = 0;
        counter = 100;
      }
    } else if (status == WAIT) {
      if (isCollisionBottom(1)) y -= 1;
      if (counter > 0) counter -= 1;
      else {
        status = RETURN;
        yVel = -1;
      }
    } else if (status == RETURN) {
      if (isCollisionTop(1)) {
        yVel = 0;
        status = IDLE;
      }
    }
  }
}

function oThwompTrap_CREATE($) {
  with ($) {
    action_inherited();

    makeActive();
    setCollisionBounds(0, 0, 16, 16);
    invincible = false;
    viscidTop = 1;

    xVel = 0;
    yVel = 0;
    myGrav = 1;

    counter = 0;

    status = 0;
    IDLE = 0;
    DROP = 1;
    WAIT = 2;
    RETURN = 3;
  }
}

class oThwompTrap extends oMovingSolid {
  // variables
}
