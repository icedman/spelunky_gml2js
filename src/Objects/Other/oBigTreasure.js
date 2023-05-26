function oBigTreasure_STEP($) {
  with ($) {
    if (true) {
      x += xVel;
      y += yVel;

      if (yVel < 6) {
        yVel += myGrav;
      }

      if (isCollisionTop(1) && yVel < 0) {
        yVel = -yVel * 0.8;
      }

      if (isCollisionLeft(1) || isCollisionRight(1)) {
        xVel = -xVel * 0.5;
      }

      if (isCollisionBottom(1)) {
        if (yVel > 5) {
          poof = instance_create(x + 16 - 4, y + 30, oPoof);
          [instances_of(poof)].orEach(($) => {
            with ($) {
              xVel = -0.4;
            }
          });
          poof = instance_create(x + 16 + 4, y + 30, oPoof);
          [instances_of(poof)].orEach(($) => {
            with ($) {
              xVel = 0.4;
            }
          });
          playSound(global.sndThump);
        }

        // bounce
        if (yVel > 1) yVel = -yVel * 0.5;
        else {
          yVel = 0;
        }

        // friction
        if (abs(xVel) < 0.1) xVel = 0;
        else if (abs(xVel) != 0) xVel *= 0.3;
      }

      if (isCollisionBottom(0) && abs(yVel) < 1) {
        y -= 1;
        yVel = 0;
      }
    }
  }
}

function oBigTreasure_CREATE($) {
  with ($) {
    type = 'Big Treasure';
    makeActive();
    setCollisionBounds(0, 0, 32, 32);
    xVel = 0;
    yVel = 0;
    myGrav = 0.6;
    trigger = true;
  }
}

class oBigTreasure extends oObject {
  // variables
}
