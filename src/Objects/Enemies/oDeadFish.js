function oDeadFish_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 16 &&
      x < view_xview[0] + view_wview[0] &&
      y > view_yview[0] - 16 &&
      y < view_yview[0] + view_hview[0]
    ) {
      if (hp < 1) {
        for (r = 0; r < c; r++) {
          instance_create(x + 4, y + 4, oBone);
        }
        if (countsAsKill) {
          if (isRealLevel()) global.enemyKills[11] += 1;
          global.deadfish += 1;
          global.kills += 1;
        }
        instance_destroy();
      }

      dist = point_distance(x, y, oCharacter.x, oCharacter.y);

      if (status == IDLE) {
        if (dir == 0) {
          if (
            collision_point(x + 8 + 2, y, oWater, 0, 0) &&
            !collision_point(x + 10, y, oSolid, 0, 0)
          )
            moveTo(1, 0);
          else dir = 180;
        } else {
          if (
            collision_point(x - 2, y, oWater, 0, 0) &&
            !collision_point(x - 2, y, oSolid, 0, 0)
          )
            moveTo(-1, 0);
          else dir = 0;
        }

        if (dist < 90 && oCharacter.swimming) {
          status = ATTACK;
        }
      } else if (status == PAUSE) {
        if (counter > 0) counter -= 1;
        else {
          status = IDLE;
          dir = rand(0, 1) * 180;
        }
      } else if (instance_exists(ObjType.oCharacter)) {
        if (dist < 90 && oCharacter.swimming && !oCharacter.dead) {
          dir =
            point_direction(x, y, oCharacter.x, oCharacter.y) +
            rand(0, 1) -
            rand(0, 1);
          if (
            collision_point(
              x + cos(degtorad(dir)),
              y - sin(degtorad(dir)),
              oWater,
              0,
              0
            )
          )
            moveTo(1 * cos(degtorad(dir)), -1 * sin(degtorad(dir)));
        } else {
          status = PAUSE;
          counter = rand(20, 40);
        }
      }

      if (dir > 90 && dir < 270) sprite_index = sDeadFishLeft;
      else sprite_index = sDeadFishRight;

      if (!collision_point(x + 4, y + 4, oWater, 0, 0)) {
        instance_create(x, y, oFishBone);
        instance_destroy();
      }
    }
  }
}

function oDeadFish_CREATE($) {
  with ($) {
    try {
      oEnemy_CREATE($);
    } catch (err) {}

    image_speed = 0.5;
    setCollisionBounds(0, 0, 8, 8);
    origX = 0;
    origY = 0;
    xVel = 0;
    yVel = 0;
    xAcc = 0.2;
    yAcc = 0.2;
    dir = 0;

    // stats
    type = 'Piranha';
    hp = 1;
    invincible = 0;

    bubbleTimer = 0;
    bubbleTimerMax = 40;

    // status
    IDLE = 0;
    ATTACK = 1;
    PAUSE = 2;

    status = 0;
    counter = 0;
    bloodless = true;

    shakeCounter = 0;
    shakeToggle = 1;
  }
}

class oDeadFish extends oEnemy {
  ObjType;
  PAUSE;
  bubbleTimer;
  bubbleTimerMax;
  deadfish;
  oFishBone;
  sDeadFishLeft;
  sDeadFishRight;
}
ObjType.oDeadFish = oDeadFish;
