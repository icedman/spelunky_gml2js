function oScarab_DESTROY($) {
  with ($) {
    for (r = 0; r < c; r++) {
      instance_create(
        other.x + 6 + rand(0, 4),
        other.y + 6 + rand(0, 4),
        oFlareSpark
      );
    }
  }
}

function oScarab_COLLISION_oCharacter($) {
  with ($) {
    global.collect += value;
    global.collectCounter += 20;
    if (global.collectCounter > 100) global.collectCounter = 100;
    global.scarabs += 1;
    playSound(global.sndCoin);
    instance_destroy();
  }
}

function oScarab_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 20 &&
      x < view_xview[0] + view_wview[0] + 4 &&
      y > view_yview[0] - 20 &&
      y < view_yview[0] + view_hview[0] + 4
    ) {
      moveTo(xVel, yVel);

      if (collision_point(x + 8, y + 8, oSolid, 0, 0)) hp = -999;

      if (hp < 1) {
        for (r = 0; r < c; r++) {
          obj = instance_create(
            x + 2 + rand(0, 14),
            y + 2 + rand(0, 14),
            oFlareSpark
          );
          obj.yVel = rand(1, 3);
        }
        instance_destroy();
      }

      dir = 0;
      dist = point_distance(x + 8, y + 8, oCharacter.x, oCharacter.y);

      if (status == IDLE) {
        if (xVel > 0) xVel -= 0.5;
        if (yVel > 0) yVel -= 0.5;
        if (xVel < 0) xVel += 0.5;
        if (yVel < 0) yVel += 0.5;
        if (abs(xVel) < 1) {
          xVel = 0;
        }
        if (abs(yVel) < 1) {
          yVel = 0;
        }

        if (xVel == 0 && yVel == 0 && counter > 0) counter -= 1;

        if (counter == 0 && xVel < 1 && yVel < 1) {
          if (dist < 64) {
            dir =
              point_direction(x + 8, y + 8, oCharacter.x, oCharacter.y) + 180;
          } else {
            dir = rand(0, 360);
          }
          xVel = 4 * cos(degtorad(dir));
          yVel = -4 * sin(degtorad(dir));
          counter = rand(10, 30);
        }

        if (isCollisionRight(1) && xVel > 0) {
          xVel = -xVel;
        }
        if (isCollisionLeft(1) && xVel < 0) {
          xVel = -xVel;
        }
        if (isCollisionTop(1) && yVel < 0) {
          yVel = -yVel;
        }
        if (isCollisionBottom(1) && yVel > 0) {
          yVel = -yVel;
        }
      }
    }
  }
}

function oScarab_CREATE($) {
  with ($) {
    try {
      oEnemy_CREATE($);
    } catch (err) {}

    image_speed = 0.5;
    setCollisionBounds(4, 4, 12, 12);
    origX = 0;
    origY = 0;
    xVel = 0;
    yVel = 0;
    xAcc = 0.2;
    yAcc = 0.2;
    counter = rand(10, 30);
    if (global.levelType == 0) value = 4000;
    else if (global.levelType == 1) value = 8000;
    else if (global.levelType == 3) value = 12000;

    // stats
    hp = 1;
    invincible = 0;
    bloodless = true;

    // status
    IDLE = 0;
    ATTACK = 1;

    status = IDLE;

    shakeCounter = 0;
    shakeToggle = 1;
  }
}

class oScarab extends oEnemy {
  collect;
  collectCounter;
  oFlareSpark;
  scarabs;
  sndCoin;
}
ObjType.oScarab = oScarab;
