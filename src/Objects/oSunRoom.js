function oSunRoom_ALARM_11($) {
  with ($) {
    if (!oPlayer1.dead) {
      if (points < 99) points += 1;
      alarm[11] = 30;
    }
  }
}

function oSunRoom_ALARM_3($) {
  with ($) {
    drawStatus = 3;
  }
}

function oSunRoom_ALARM_1($) {
  with ($) {
    drawStatus = 1;
    alarm[2] = 30;
  }
}

function oSunRoom_ALARM_2($) {
  with ($) {
    drawStatus = 2;
    alarm[3] = 10;
  }
}

function oSunRoom_DRAW($) {
  with ($) {
    life = global.plife;
    if (life < 0) life = 0;
    draw_set_font(global.myFont);
    draw_set_color(c_white);
    draw_sprite(sHeart, -1, view_xview[0] + 8, view_yview[0] + 8);
    draw_text(view_xview[0] + 24, view_yview[0] + 8, life);
    draw_sprite(sDamselIcon, -1, view_xview[0] + 64, view_yview[0] + 8);
    draw_text(view_xview[0] + 64 + 16, view_yview[0] + 8, points);
    if (drawStatus < 3) {
      draw_set_font(global.myFontSmall);
      draw_set_color(c_yellow);
      strLen = string_length('DAMSEL CHALLENGE BEGINS IN 3...') * 8;
      n = 320 - strLen;
      n = ceil(n / 2);
      draw_text(
        n,
        216,
        'DAMSEL CHALLENGE BEGINS IN ' + string(3 - drawStatus) + '...'
      );
    }
  }
}

function oSunRoom_STEP($) {
  with ($) {
    if (oGame.drawStatus == 0) {
      if (instance_exists(oDamsel)) {
        if (oDamsel.hp < 1) {
          global.plife = 0;
        }
      } else {
        global.plife = 0;
      }
    }
  }
}

function oSunRoom_ALARM_0($) {
  with ($) {
    if (!oPlayer1.dead) {
      i = oPlayer1.x;
      j = 32;
      if (i < 40) i = 40;
      if (i > 280) i = 280;
      if (!collision_point(i, j, oSolid, 0, 0)) {
        if (points >= 80) {
          if (instance_exists(oGhost)) {
            /* do nothing */
          } else if (oPlayer1.x > room_width / 2)
            instance_create(-32, 120 - 16, oGhost);
          else instance_create(320, 120 - 16, oGhost);
        } else if (points >= 50) {
          obj = instance_create(152, 32, oVampire);
          obj.status = 7;
          instances_of(obj).forEach(($) => {
            with ($) {
              obj = instance_create(x + 8, y + 8, oPoof);
              obj.xVel = -1;
              obj.yVel = 0;
              obj = instance_create(x + 8, y + 8, oPoof);
              obj.xVel = 1;
              obj.yVel = 0;
            }
          });
        } else {
          obj = instance_create(i, j, oBomb);
          obj.sprite_index = sBombArmed;
          obj.armed = true;
          instances_of(obj).forEach(($) => {
            with ($) {
              alarm[0] = 80;
              image_speed = 0.2;
              obj = instance_create(x, y, oPoof);
              obj.xVel = -1;
              obj.yVel = 0;
              obj = instance_create(x, y, oPoof);
              obj.xVel = 1;
              obj.yVel = 0;
            }
          });

          //obj.safe = true;
          obj.alarm[2] = 10;
        }
        alarm[0] = rand(100, 200);
      } else alarm[0] = 1;
    }
  }
}

function oSunRoom_CREATE($) {
  with ($) {
    global.plife = 8;
    highscore = false;
    points = 0;
    drawStatus = 0;
    alarm[0] = 100 + rand(100, 200);
    alarm[1] = 30;
    alarm[10] = 100;
    alarm[11] = 100;

    // To prevent the Tunnel Man from tearing up the whole level.
    instances_of(oBrick).forEach(($) => {
      with ($) {
        if (x <= 16 || x >= 288 || y <= 16 || y >= 208) {
          invincible = true;
        }
      }
    });
  }
}

function oSunRoom_ALARM_10($) {
  with ($) {
    if (global.music) startMusic();
  }
}

class oSunRoom extends oObject {
  oVampire;
  sDamselIcon;
  visible = true;
}
ObjType.oSunRoom = oSunRoom;
