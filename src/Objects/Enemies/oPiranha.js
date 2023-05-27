function oPiranha_STEP($) {
  with ($) {
    if (active) {
      if (hp < 1) {
        scrCreateBlood(x + 4, y + 4, 3);
        if (countsAsKill) {
          if (isRealLevel()) global.enemyKills[11] += 1;
          global.piranhas += 1;
          global.kills += 1;
        }
        instance_destroy();
      }

      dist = point_distance(x + 4, y + 4, oCharacter.x, oCharacter.y);

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

        if (dist < 90 && oCharacter.swimming && !oCharacter.dead) {
          status = ATTACK;
        }

        obj = instance_nearest(x, y, oCaveman);
        if (obj) if (obj.hp <= 0) obj = 0;
        if (!obj) obj = instance_nearest(x, y, oShopkeeper);
        if (obj) if (obj.hp <= 0) obj = 0;
        if (!obj) obj = instance_nearest(x, y, oHawkman);
        if (obj) if (obj.hp <= 0) obj = 0;
        if (!obj) obj = instance_nearest(x, y, oYeti);
        if (obj) if (obj.hp <= 0) obj = 0;
        if (obj) {
          if (obj.swimming && obj.hp > 0) {
            status = ATTACK_ENEMY;
          }
        }
      } else if (status == PAUSE) {
        canBite = true;
        if (counter > 0) counter -= 1;
        else {
          status = IDLE;
          dir = rand(0, 1) * 180;
        }
      } else if (status == ATTACK && instance_exists(oCharacter)) {
        if (dist < 90 && oCharacter.swimming && !oCharacter.dead) {
          dir =
            point_direction(x + 4, y + 4, oCharacter.x, oCharacter.y) +
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
      } else if (status == ATTACK_ENEMY) {
        obj = instance_nearest(x, y, oCaveman);
        if (obj) if (obj.hp <= 0) obj = 0;
        if (!obj) obj = instance_nearest(x, y, oShopkeeper);
        if (obj) if (obj.hp <= 0) obj = 0;
        if (!obj) obj = instance_nearest(x, y, oHawkman);
        if (obj) if (obj.hp <= 0) obj = 0;
        if (!obj) obj = instance_nearest(x, y, oYeti);
        if (obj) if (obj.hp <= 0) obj = 0;
        if (obj) {
          if (!obj.swimming || obj.hp <= 0) {
            status = PAUSE;
          }
        } else status = PAUSE;

        if (status != PAUSE) {
          dir =
            point_direction(x + 4, y + 4, obj.x + 8, obj.y + 8) +
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
          else {
            status = PAUSE;
            counter = rand(20, 40);
          }

          dist = point_distance(x + 4, y + 4, obj.x + 8, obj.y + 8);
          if (dist < 4) {
            obj.status = 2;
            if (canBite) {
              obj.hp -= 1;
              canBite = false;
              alarm[0] = 10;
              scrCreateBlood(x + 4, y + 4, 1);
            }
          }
        } else counter = rand(20, 40);
      }

      if (bubbleTimer > 0) bubbleTimer -= 1;
      else {
        instance_create(x, y, oBubble);
        bubbleTimer = rand(bubbleTimerMax - 10, bubbleTimerMax + 10);
      }

      if (dir > 90 && dir < 270) sprite_index = sPiranhaLeft;
      else sprite_index = sPiranhaRight;

      if (!collision_point(x + 4, y + 4, oWater, 0, 0)) {
        instance_create(x, y, oFishBone);
        instance_destroy();
      }

      if (!collision_point(x + 4, y, oWater, 0, 0)) {
        //Go back into the water when on the very top of it. Stops buggy movement after a water level change from block destruction.
        moveTo(0, 1);
      }
    }
  }
}

function oPiranha_ALARM_0($) {
  with ($) {
    canBite = true;
  }
}

function oPiranha_CREATE($) {
  with ($) {
    try {
      oEnemy_CREATE($);
    } catch (err) {}

    type = 'Piranha';
    image_speed = 0.5;
    setCollisionBounds(0, 0, 8, 8);
    origX = 0;
    origY = 0;
    xVel = 0;
    yVel = 0;
    xAcc = 0.2;
    yAcc = 0.2;
    dir = 0;
    if (rand(1, 2) == 1) dir = 180;

    // stats
    hp = 1;
    invincible = 0;

    bubbleTimer = 0;
    bubbleTimerMax = 40;

    // status
    IDLE = 0;
    ATTACK = 1;
    PAUSE = 2;
    ATTACK_ENEMY = 3;

    canBite = true;

    status = 0;
    counter = 0;

    shakeCounter = 0;
    shakeToggle = 1;
  }
}

class oPiranha extends oEnemy {
  ATTACK_ENEMY;
  canBite;
}
