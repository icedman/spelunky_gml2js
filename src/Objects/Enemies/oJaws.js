function oJaws_DRAW($) {
  with ($) {
    draw_sprite(sprite_index, -1, x, y);
    if (sprite_index == sJawsLeft) {
      if (hp < 10) draw_sprite(sJawsBody3L, 0, x + 16, y);
      else if (hp < 20) draw_sprite(sJawsBody2L, 0, x + 16, y);
      else draw_sprite(sJawsBody1L, 0, x + 16, y);
    } else if (sprite_index == sJawsRight) {
      if (hp < 10) draw_sprite(sJawsBody3R, 0, x - 48, y);
      else if (hp < 20) draw_sprite(sJawsBody2R, 0, x - 48, y);
      else draw_sprite(sJawsBody1R, 0, x - 48, y);
    }
    /* debug
draw_set_font(global.myFontSmall);
draw_set_color(c_white);
draw_text(x, y-16, string(status) + ":" + string(counter));
*/
  }
}

function oJaws_OTHER($) {
  with ($) {
    if (sprite_index == sJawsTurnL) {
      //dir = 180;
      sprite_index = sJawsLeft;
      status = PAUSE;
      counter = 40;
    } else if (sprite_index == sJawsTurnR) {
      //dir = 0;
      sprite_index = sJawsRight;
      status = PAUSE;
      counter = 40;
      x = x + 48;
    }
  }
}

function oJaws_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 48 &&
      x < view_xview[0] + view_wview[0] + 48 &&
      y > view_yview[0] - 48 &&
      y < view_yview[0] + view_hview[0] + 48
    ) {
      if (!collision_point(x + 8, y + 16, oWater, 0, 0)) {
        hp -= 1;
      }

      if (hp < 1) {
        if (countsAsKill) {
          if (isRealLevel()) global.enemyKills[12] += 1;
          global.megamouths += 1;
          global.kills += 1;
        }
        scrCreateBlood(x + 22 + rand(0, 4), y + 14 + rand(0, 4), 4);
        for (r = 0; r < c; r++) {
          instance_create(x + 22 + rand(0, 4), y + 14 + rand(0, 6), oBone);
        }
        for (r = 0; r < c; r++) {
          obj = instance_create(x + 16, y + 16, oCrate);
          obj.xVel = rand(0, 3) - rand(0, 3);
          obj.yVel = -rand(1, 2);
        }
        instance_destroy();
      }

      dist = point_distance(x, y, oPlayer1.x, oPlayer1.y);

      if (status == IDLE) {
        if (dir == 0) {
          // right
          if (
            collision_point(x + 18, y + 16, oWater, 0, 0) &&
            !collision_point(x + 18, y + 16, oSolid, 0, 0)
          ) {
            moveTo(2, 0);
          } else if (!collision_rectangle(x - 32, y, x, y + 32, oSolid, 0, 0)) {
            status = TURN;
            dir = 180;
            x = x - 48;
            sprite_index = sJawsTurnL;
            image_index = 0;
          }
        } else {
          if (
            collision_point(x - 2, y + 16, oWater, 0, 0) &&
            !collision_point(x - 2, y + 16, oSolid, 0, 0)
          ) {
            moveTo(-2, 0);
          } else if (
            !collision_rectangle(x + 16, y, x + 48, y + 32, oSolid, 0, 0)
          ) {
            status = TURN;
            dir = 0;
            sprite_index = sJawsTurnR;
            image_index = 0;
          }
        }

        if (!isCollisionBottom(2)) {
          y += 1;
        }

        if (oPlayer1.swimming && !oPlayer1.dead) {
          status = ATTACK;
        }
      } else if (status == PAUSE) {
        if (counter > 0) counter -= 1;
        else {
          status = IDLE;
          if (dir > 90 && dir < 270) dir = 180;
          else dir = 0;
        }
      } else if (status == ATTACK && instance_exists(ObjType.oPlayer1)) {
        if (oPlayer1.swimming && !oPlayer1.dead) {
          if (sprite_index == sJawsLeft || sprite_index == sJawsRight)
            dir = point_direction(x + 8, y + 16, oPlayer1.x, oPlayer1.y - 8);

          turn = false;
          if (oPlayer1.x < x + 8) {
            if (
              sprite_index == sJawsRight &&
              !collision_rectangle(x - 32, y, x, y + 32, oSolid, 0, 0)
            ) {
              status = TURN;
              dir = 180;
              x = x - 48;
              sprite_index = sJawsTurnL;
              image_index = 0;
              turn = true;
            }
          } else {
            if (
              sprite_index == sJawsLeft &&
              !collision_point(x - 2, y + 16, oSolid, 0, 0)
            ) {
              status = TURN;
              dir = 0;
              sprite_index = sJawsTurnR;
              image_index = 0;
              turn = true;
            }
          }

          if (!turn) {
            if (
              collision_point(
                x + cos(degtorad(dir)),
                y - sin(degtorad(dir)),
                oWater,
                0,
                0
              ) &&
              !collision_point(
                x + cos(degtorad(dir)),
                y - sin(degtorad(dir)),
                oSolid,
                0,
                0
              )
            ) {
              moveTo(3 * cos(degtorad(dir)), -3 * sin(degtorad(dir)));
            }
          }
        } else {
          status = IDLE;
          if (dir > 90 && dir < 270) dir = 180;
          else dir = 0;
        }
      }

      if (bubbleTimer > 0) bubbleTimer -= 1;
      else {
        instance_create(x, y + 16, oBubble);
        bubbleTimer = bubbleTimerMax;
      }

      if (sprite_index == sJawsLeft) {
        setCollisionBounds(0, 0, 64, 32);
      } else if (sprite_index == sJawsRight) {
        setCollisionBounds(-48, 0, 16, 32);
      }
    }
  }
}

function oJaws_CREATE($) {
  with ($) {
    action_inherited();

    type = 'MegaMouth';
    image_speed = 0.5;
    setCollisionBounds(0, 0, 48, 32);
    origX = 0;
    origY = 0;
    xVel = 0;
    yVel = 0;
    xAcc = 0.2;
    yAcc = 0.2;
    dir = 180;
    facing = 0;

    // stats
    hp = 40;
    invincible = 0;

    bubbleTimer = 0;
    bubbleTimerMax = 40;

    // status
    IDLE = 0;
    ATTACK = 1;
    PAUSE = 2;
    TURN = 3;

    canPickUp = false;
    status = 0;
    counter = 0;

    shakeCounter = 0;
    shakeToggle = 1;
  }
}

class oJaws extends oEnemy {
  // variables
}
