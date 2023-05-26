function oZombie_STEP($) {
  with ($) {
    action_inherited();

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
        scrCreateBlood(x + 8, y + 8, 1);
        for (r = 0; r < c; r++) {
          instance_create(other.x + 8, other.y + 8, oBone);
        }
        skull = instance_create(other.x + 8, other.y + 8, oSkull);
        skull.yVel = -rand(1, 3);
        skull.xVel = rand(0, 3) - rand(0, 3);
        if (countsAsKill) {
          if (isRealLevel()) global.enemyKills[6] += 1;
          global.zombies += 1;
          global.kills += 1;
        }
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

      dist = distance_to_object(oPlayer1);

      if (status == IDLE) {
        xVel = 0;
        if (counter > 0) counter -= 1;
        else if (dist < 64) status = BOUNCE;
        if (dist < 48) status = BOUNCE;
        if (oPlayer1.swimming) status = IDLE;
        if (status == BOUNCE) playSound(global.sndZombie);
      } else if (status == RECOVER) {
        if (colBot) {
          status = IDLE;
          xVel = 0;
          yVel = 0;
          counter = rand(40, 100);
        }
      } else if (status == BOUNCE) {
        if (colBot) {
          if (rand(1, 4) == 1) {
            yVel = -1 * rand(2, 4);
            if (oCharacter.x < x) {
              facing = LEFT;
              xVel = -3;
            } else {
              facing = RIGHT;
              xVel = 3;
            }
          } else {
            yVel = -1 * rand(1, 2);
            if (oCharacter.x < x) {
              facing = LEFT;
              xVel = -1;
            } else {
              facing = RIGHT;
              xVel = 1;
            }
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

      if (!colBot) sprite_index = sZombieJumpL;
      else sprite_index = sZombieLeft;
    }
  }
}

function oZombie_CREATE($) {
  with ($) {
    action_inherited();

    makeActive();
    setCollisionBounds(0, 2, 16, 16);
    xVel = 0;
    yVel = 0;
    yDelta = -0.4;
    myGrav = 0.2;
    myGravNorm = 0.2;
    image_speed = 0.4;

    // stats
    type = 'Zombie';
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

class oZombie extends oEnemy {
  // variables
}
