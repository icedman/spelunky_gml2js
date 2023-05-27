function oMoonRoom_ALARM_11($) {
  with ($) {
    timer -= 1;
    if (timer == 0) {
      global.mini2 = oMoonRoom.baskets;
      if (global.mini2 > 99) global.mini2 = 99;
      scrUpdateHighscores(2);
      timer -= 1;
      oGame.drawStatus = 1;
      instances_of(oBatTarget).forEach(($) => {
        with ($) {
          obj = instance_create(x + 8, y, oPoof);
          obj.xVel = 0;
          obj.yVel = -1;
          obj = instance_create(x + 8, y, oPoof);
          obj.xVel = 0;
          obj.yVel = 1;

          instance_destroy();
        }
      });

      instances_of(oEntrance).forEach(($) => {
        with ($) {
          instance_create(x, y, oXScores);
          instance_destroy();
        }
      });

      alarm[10] = 30;
    } else alarm[11] = 30;
  }
}

function oMoonRoom_ALARM_3($) {
  with ($) {
    drawStatus = 3;
    /*
obj = instance_create(160, 0, oPoof);
obj.xVel = 0;
obj.yVel = -1;
obj = instance_create(160, 0, oPoof);
obj.xVel = 0;
obj.yVel = 1;
*/
    instance_create(160, -16, oBatTarget);
    instance_create(208, -64, oBatTarget);
    instance_create(256, -128, oBatTarget);
  }
}

function oMoonRoom_ALARM_1($) {
  with ($) {
    drawStatus = 1;
    alarm[2] = 30;
  }
}

function oMoonRoom_ALARM_2($) {
  with ($) {
    drawStatus = 2;
    alarm[3] = 10;
  }
}

function oMoonRoom_DRAW($) {
  with ($) {
    life = global.plife;
    if (life < 0) life = 0;
    draw_set_font(global.myFont);
    draw_set_color(c_white);
    draw_sprite(sHoopsIcon, -1, view_xview[0] + 8, view_yview[0] + 8);
    draw_text(view_xview[0] + 24, view_yview[0] + 8, baskets);
    draw_sprite(sTimerIcon, -1, view_xview[0] + 64, view_yview[0] + 8);
    if (timer >= 0)
      draw_text(view_xview[0] + 64 + 16, view_yview[0] + 8, timer);
    else draw_text(view_xview[0] + 64 + 16, view_yview[0] + 8, '0');
    if (drawStatus < 3) {
      draw_set_font(global.myFontSmall);
      draw_set_color(c_yellow);
      strLen = string_length('ARCHERY CHALLENGE BEGINS IN 3...') * 8;
      n = 320 - strLen;
      n = ceil(n / 2);
      draw_text(
        n,
        216,
        'ARCHERY CHALLENGE BEGINS IN ' + string(3 - drawStatus) + '...'
      );
    }
  }
}

function oMoonRoom_ALARM_9($) {
  with ($) {
    if (global.music) startMusic();
  }
}

function oMoonRoom_ALARM_0($) {
  with ($) {
    /*
instance_create(n, 128, oBasket);
instance_create(n, 128, oRim);
instance_create(n, 128, oRimDeflect);
obj = instance_create(n+8, 128+8, oPoof);
obj.xVel = -0.5;
obj.yVel = -0.5;
obj = instance_create(n+8, 128+8, oPoof);
obj.xVel = 0.5;
obj.yVel = -0.5;
obj = instance_create(n+8, 128+8, oPoof);
obj.xVel = 0.5;
obj.yVel = 0.5;
obj = instance_create(n+8, 128+8, oPoof);
obj.xVel = -0.5;
obj.yVel = 0.5;
*/

    if (timer == 60) alarm[11] = 1;
  }
}

function oMoonRoom_CREATE($) {
  with ($) {
    global.plife = 8;
    highscore = false;
    baskets = 0;
    timer = 60;
    drawStatus = 0;
    alarm[0] = 100;
    alarm[1] = 30;
    alarm[9] = 100;
    global.arrows = 100;

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

function oMoonRoom_ALARM_10($) {
  with ($) {
    if (timer < 0) {
      if (oGame.drawStatus < 3) {
        oGame.drawStatus = 3;
      }

      stopAllMusic();
    }
  }
}

class oMoonRoom extends oObject {
  c_yellow;
  highscore;
  music;
  myFont;
  sHoopsIcon;
  sTimerIcon;
  visible = true;
}
ObjType.oMoonRoom = oMoonRoom;
