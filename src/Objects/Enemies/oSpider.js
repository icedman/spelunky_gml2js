function oSpider_ALARM_1($) {
  with ($) {
    instance_destroy();
  }
}

function oSpider_OTHER($) {
  with ($) {
    if (sprite_index == sSpiderFlip) sprite_index = sSpider;
  }
}

function oSpider_STEP($) {
  with ($) {
    try {
      oEnemy_STEP($);
    } catch (err) {}

    if (
      x > view_xview[0] - 20 &&
      x < view_xview[0] + view_wview[0] + 4 &&
      y > view_yview[0] - 20 &&
      y < view_yview[0] + view_hview[0] + 4
    ) {
      moveTo(xVel, yVel);

      yVel += myGrav;
      if (yVel > yVelLimit) yVel = yVelLimit;

      if (collision_point(x + 8, y + 8, oSolid, 0, 0)) {
        hp = 0;
      }

      if (hp < 1) {
        scrCreateBlood(x + 8, y + 8, 3);
        if (countsAsKill) {
          if (isRealLevel()) global.enemyKills[2] += 1;
          global.spiders += 1;
          global.kills += 1;
        }
        instance_destroy();
      }

      if (isCollisionRight(1)) {
        xVel = 1;
      }

      if (isCollisionLeft(1)) {
        xVel = -1;
      }

      dist = distance_to_object(oCharacter);

      if (status == IDLE) {
        alarm[0] = rand(5, 20);
        status = RECOVER;
      } else if (status == RECOVER) {
        if (isCollisionBottom(1)) xVel = 0;
      } else if (status == BOUNCE && dist < 90) {
        if (isCollisionBottom(1)) {
          yVel = -1 * rand(2, 5);
          if (oCharacter.x < x + 8) {
            xVel = -2.5;
          } else {
            xVel = 2.5;
          }

          if (rand(1, 4) == 1) {
            status = IDLE;
            xVel = 0;
            yVel = 0;
          }
        }
      } else if (status != DROWNED) {
        status = IDLE;
        //xVel = 0;
      }

      if (isCollisionTop(1)) yVel = 1;
      /*
if (isCollisionLeft(1) or isCollisionRight(1))
{
    xVel = -xVel;
}
*/

      //if (isCollisionSolid())
      //  y -= 2;
    }

    if (collision_point(x + 8, y + 8, oWater, 0, 0) && status != DROWNED) {
      status = DROWNED;
      sprite_index = sSpiderDrowning;
      alarm[1] = 30;
      xVel = 0;
      yVel = 0.2;
      instance_create(x + 8, y, oSplash);
      playSound(global.sndSplash);
    }
  }
}

function oSpider_ALARM_0($) {
  with ($) {
    status = BOUNCE;
    if (isCollisionBottom(1)) {
      yVel = -1 * rand(2, 5);
      if (oCharacter.x < x) {
        xVel = -2.5;
      } else {
        xVel = 2.5;
      }
    }
  }
}

function oSpider_CREATE($) {
  with ($) {
    try {
      oEnemy_CREATE($);
    } catch (err) {}

    type = 'Spider';
    makeActive();
    setCollisionBounds(1, 5, 15, 16);
    xVel = 0;
    yVel = 0;
    yDelta = -0.4;
    myGrav = 0.2;
    myGravNorm = 0.2;
    image_speed = 0.4;

    // stats
    hp = 1;
    invincible = 0;

    // status
    IDLE = 0;
    BOUNCE = 1;
    RECOVER = 2;
    WALK = 3;
    DROWNED = 4;

    status = 0;
    bounceCounter = 0;

    shakeCounter = 0;
    shakeToggle = 1;
  }
}

class oSpider extends oEnemy {
  sSpider;
  sSpiderDrowning;
  sSpiderFlip;
  sprite_index = sSpiderFlip;
  visible = true;
}
ObjType.oSpider = oSpider;
