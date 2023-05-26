function oBat_STEP($) {
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
        scrCreateBlood(x + 8, y + 8, 3);
        if (countsAsKill) {
          if (isRealLevel()) global.enemyKills[0] += 1;
          global.bats += 1;
          global.kills += 1;
        }
        instance_destroy();
      }

      dir = 0;
      dist = point_distance(x + 8, y + 8, oPlayer1.x, oPlayer1.y);

      if (status == HANG) {
        if (
          !oPlayer1.swimming &&
          !oPlayer1.dead &&
          ((dist < 90 && oPlayer1.y > y + 16) ||
            !collision_point(x + 8, y - 1, oSolid, 0, 0))
        ) {
          status = ATTACK;
          playSound(global.sndBat);
        }

        sprite_index = sBatHang;
      } else if (
        instance_exists(ObjType.oPlayer1) &&
        !oPlayer1.swimming &&
        !oPlayer1.dead
      ) {
        if (dist < 160) {
          dir = point_direction(x + 8, y + 8, oPlayer1.x, oPlayer1.y);
          if (isCollisionRight(1) && oPlayer1.x > x + 8) {
            if (oPlayer1.y < y + 8) dir = 90;
            else dir = 270;
          }
          if (isCollisionLeft(1) && oPlayer1.x < x + 8) {
            if (oPlayer1.y < y + 8) dir = 90;
            else dir = 270;
          }
          if (
            isCollisionTop(1) &&
            oPlayer1.y < y + 8 &&
            abs(oPlayer1.x - x) > 8
          ) {
            if (oPlayer1.x < x + 8) dir = 180;
            else dir = 0;
          }
          if (
            isCollisionBottom(1) &&
            oPlayer1.y > y + 8 &&
            abs(oPlayer1.x - x) > 8
          ) {
            if (oPlayer1.x < x + 8) dir = 180;
            else dir = 0;
          }

          if (
            collision_point(x + 8, y + 16, oWater, 0, 0) &&
            dir > 180 &&
            dir < 360
          ) {
            dir = 90;
          }

          if (!collision_point(x, y + 12, oWater, 0, 0) || oPlayer1.y < y) {
            xVel = 1 * cos(degtorad(dir));
            yVel = -1 * sin(degtorad(dir));
          }
        } else {
          if (collision_point(x + 8, y - 1, oSolid, 0, 0)) status = HANG;
          else {
            dir = 90;
            xVel = 1 * cos(degtorad(dir));
            yVel = -1 * sin(degtorad(dir));
          }
        }

        if (oPlayer1.x < x + 8) sprite_index = sBatLeft;
        else sprite_index = sBatRight;
      } else {
        if (collision_point(x + 8, y - 1, oSolid, 0, 0)) status = HANG;
        else {
          dir = 90;
          xVel = 1 * cos(degtorad(dir));
          yVel = -1 * sin(degtorad(dir));
        }
      }
    }
  }
}

function oBat_CREATE($) {
  with ($) {
    action_inherited();

    image_speed = 0.5;
    setCollisionBounds(0, 2, 16, 14);
    origX = 0;
    origY = 0;
    xVel = 0;
    yVel = 0;
    xAcc = 0.2;
    yAcc = 0.2;

    // stats
    type = 'Bat';
    hp = 1;
    invincible = 0;
    flying = true;

    // status
    HANG = 0;
    ATTACK = 1;

    status = HANG;

    shakeCounter = 0;
    shakeToggle = 1;
  }
}

class oBat extends oEnemy {
  // variables
}
