function oStarsRoom_ALARM_11($) {
  with ($) {
    if (!oPlayer1.dead && rand(1, 100) < kills) {
      n = rand(0, 3);
      instance_create(32 + n * 80, 0, oSpider);
    }

    if (!oPlayer1.dead) alarm[11] = 20;
  }
}

function oStarsRoom_ALARM_3($) {
  with ($) {
    drawStatus = 3;
  }
}

function oStarsRoom_ALARM_1($) {
  with ($) {
    drawStatus = 1;
    alarm[2] = 30;
  }
}

function oStarsRoom_ALARM_2($) {
  with ($) {
    drawStatus = 2;
    alarm[3] = 10;
  }
}

function oStarsRoom_DRAW($) {
  with ($) {
    life = global.plife;
    if (life < 0) life = 0;
    draw_set_font(global.myFont);
    draw_set_color(c_white);
    draw_sprite(sHeart, -1, view_xview[0] + 8, view_yview[0] + 8);
    draw_text(view_xview[0] + 24, view_yview[0] + 8, life);
    draw_sprite(sShopkeeperIcon, -1, view_xview[0] + 64, view_yview[0] + 8);
    draw_text(view_xview[0] + 64 + 16, view_yview[0] + 8, kills);
    if (drawStatus < 3) {
      draw_set_font(global.myFontSmall);
      draw_set_color(c_yellow);
      strLen = string_length('SHOTGUN CHALLENGE BEGINS IN 3...') * 8;
      n = 320 - strLen;
      n = ceil(n / 2);
      draw_text(
        n,
        216,
        'SHOTGUN CHALLENGE BEGINS IN ' + string(3 - drawStatus) + '...'
      );
    }
  }
}

function oStarsRoom_ALARM_0($) {
  with ($) {
    if (!oPlayer1.dead) {
      n = rand(0, 3);
      instance_create(32 + n * 80, 0, oShopkeeper2);
      if (kills >= 40) {
        alarm[0] = 100;
      } else if (kills >= 30) {
        alarm[0] = 125;
      } else if (kills >= 20) {
        alarm[0] = 150;
      } else if (kills >= 10) {
        alarm[0] = 175;
      } else alarm[0] = 200;
    }
  }
}

function oStarsRoom_CREATE($) {
  with ($) {
    global.plife = 8;
    highscore = false;
    kills = 0;
    drawStatus = 0;
    alarm[0] = 100;
    alarm[1] = 30;
    alarm[10] = 100;
    alarm[11] = 110;

    // To prevent the Tunnel Man from tearing up the whole level.
    [instances_of(oBrick)].forEach(($) => {
      with ($) {
        if (x <= 16 || x >= 288 || y <= 16 || y >= 208) {
          invincible = true;
        }
      }
    });
  }
}

function oStarsRoom_ALARM_10($) {
  with ($) {
    if (global.music) startMusic();
  }
}

class oStarsRoom extends oObject {
  kills;
}
