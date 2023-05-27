function oFireFrog_STEP($) {
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

      if (collision_point(x + 8, y + 8, oSolid, 0, 0)) hp = -999;

      if (hp < 1) {
        if (countsAsKill) {
          if (isRealLevel()) global.enemyKills[9] += 1;
          global.irefrogs += 1;
          global.kills += 1;
        }
        obj = instance_create(x + 8, y + 8, oFireFrogBomb);
        instance_destroy();
      }

      if (isCollisionRight(1)) {
        xVel = -1;
      }

      if (isCollisionLeft(1)) {
        xVel = 1;
      }

      colBot = false;
      if (isCollisionBottom(1)) colBot = true;

      dist = distance_to_object(oCharacter);

      if (status == IDLE) {
        xVel = 0;
        if (counter > 0) counter -= 1;
        else if (dist < 64) status = BOUNCE;
        //if (dist < 48) status = BOUNCE;
        if (status == BOUNCE) playSound(global.sndFrog);
      } else if (status == RECOVER) {
        if (colBot) {
          status = IDLE;
          xVel = 0;
          yVel = 0;
          counter = rand(10, 40);
        }
      } else if (status == BOUNCE) {
        if (colBot) {
          yVel = -1 * rand(2, 4);
          if (oCharacter.x < x) {
            facing = LEFT;
            xVel = -3;
          } else {
            facing = RIGHT;
            xVel = 3;
          }
        } else {
          status = RECOVER;
        }
      } else if (status != DROWNED) {
        status = IDLE;
        xVel = 0;
      }

      if (isCollisionTop(1)) yVel = 1;

      //if (isCollisionSolid())
      //  y -= 2;

      if (!colBot) sprite_index = sFireFrogJumpL;
      else sprite_index = sFireFrogLeft;
    }
  }
}

function oFireFrog_CREATE($) {
  with ($) {
    try {
      oEnemy_CREATE($);
    } catch (err) {}

    makeActive();
    setCollisionBounds(1, 2, 14, 16);
    xVel = 0;
    yVel = 0;
    yDelta = -0.4;
    myGrav = 0.2;
    myGravNorm = 0.2;
    image_speed = 0.4;

    type = 'Fire Frog';

    // stats
    hp = 1;
    invincible = 0;

    LEFT = 0;
    RIGHT = 1;
    facing = rand(0, 1);

    // status
    IDLE = 0;
    BOUNCE = 1;
    RECOVER = 2;
    WALK = 3;
    DROWNED = 4;
    status = 0;

    counter = 0;
    bounceCounter = 0;

    shakeCounter = 0;
    shakeToggle = 1;

    if (collision_point(x, y, oWater, 0, 0)) swimming = true;
  }
}

class oFireFrog extends oEnemy {}
