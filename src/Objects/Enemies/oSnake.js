function oSnake_STEP($) {
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
          if (isRealLevel()) global.enemyKills[1] += 1;
          global.snakes += 1;
          global.kills += 1;
        }
        instance_destroy();
      }

      if (isCollisionBottom(1) && status != STUNNED) yVel = 0;

      if (status == IDLE) {
        if (counter > 0) counter -= 1;
        else {
          facing = rand(0, 1);
          status = WALK;
        }
      } else if (status == WALK) {
        if (isCollisionLeft(1) || isCollisionRight(1)) {
          if (facing == LEFT) facing = RIGHT;
          else facing = LEFT;
        }

        if (facing == LEFT && !collision_point(x - 1, y + 16, oSolid, -1, -1)) {
          facing = RIGHT;
        } else if (
          facing == RIGHT &&
          !collision_point(x + 16, y + 16, oSolid, -1, -1)
        ) {
          facing = LEFT;
        }

        if (
          (!collision_point(x - 1, y + 16, oSolid, -1, -1) ||
            collision_point(x - 1, y, oSolid, -1, -1)) &&
          (!collision_point(x + 16, y + 16, oSolid, -1, -1) ||
            collision_point(x + 16, y, oSolid, -1, -1))
        ) {
          if (collision_point(x - 1, y, oSolid, -1, -1)) facing = RIGHT;
          else facing = LEFT;
          xVel = 0;
        } else if (facing == LEFT) xVel = -1;
        else xVel = 1;

        if (rand(1, 100) == 1) {
          status = IDLE;
          counter = rand(20, 50);
          xVel = 0;
        }
      } else if (status == ATTACK) {
        // ?
      }

      if (isCollisionSolid()) y -= 2;

      if (status != STUNNED) {
        if (xVel == 0) image_speed = 0.2;
        else image_speed = 0.4;

        sprite_index = sSnakeWalkL;
      }
      /*
if (status != STUNNED and facing == RIGHT)
{
    if (xVel == 0) image_speed = 0.2;
    else image_speed = 0.4;
    
    sprite_index = sSnakeWalkR;
}
*/
    }
  }
}

function oSnake_CREATE($) {
  with ($) {
    try {
      oEnemy_CREATE($);
    } catch (err) {}

    makeActive();
    setCollisionBounds(2, 0, 14, 16);
    xVel = 2.5;
    image_speed = 0.4;

    // stats
    type = 'Snake';
    hp = 1;
    invincible = 0;

    IDLE = 0;
    WALK = 1;
    ATTACK = 2;
    STUNNED = 98;
    DEAD = 99;
    status = IDLE;

    bounced = false;
    dead = false;
    counter = 0;

    LEFT = 0;
    RIGHT = 1;
    facing = RIGHT;

    shakeCounter = 0;
    shakeToggle = 1;
  }
}

class oSnake extends oEnemy {
  sSnakeWalkL;
  snakes;
  sprite_index = sSnakeLeft;
  visible = true;
}
ObjType.oSnake = oSnake;
