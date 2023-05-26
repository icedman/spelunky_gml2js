function oEndCustom_ALARM($) {
  with ($) {
    drawStatus = 4;
    playSound(global.sndThump);
    global.money += 50000;
    moneyCount += 50000;
    alarm[3] = 50;

    drawStatus = 5;
    alarm[4] = 10;

    drawStatus = 2;
    alarm[2] = 50;

    drawStatus = 7;

    drawStatus = 6;
    alarm[5] = 10;

    drawStatus = 3;

    drawStatus = 1;
    alarm[1] = 50;
    playMusic(global.musVictory, false);
    [instances_of(oMenu)].forEach(($) => {
      with ($) {
        visible = true;
      }
    });
  }
}

function oEndCustom_DRAW($) {
  with ($) {
    if (drawStatus > 0) {
      draw_set_font(global.myFont);
      draw_set_color(c_yellow);
      draw_text(64, 32, 'YOU MADE IT!');
    }
    if (drawStatus > 1) {
      draw_set_font(global.myFontSmall);
      draw_set_color(c_yellow);
      draw_text(64, 64, 'FINAL SCORE:');
    }
    if (drawStatus > 2) {
      draw_set_font(global.myFont);
      draw_set_color(c_white);
      draw_text(64, 72, '$' + string(moneyCount));
    }
    if (drawStatus > 4) {
      s = global.time;
      s = floor(s / 1000);
      m = 0;
      while (s > 59) {
        s -= 60;
        m += 1;
      }

      draw_set_font(global.myFontSmall);
      draw_set_color(c_yellow);
      draw_text(64, 96, 'TIME: ');
      draw_set_color(c_white);
      if (s < 10) draw_text(96 + 24, 96, string(m) + ':0' + string(s));
      else draw_text(96 + 24, 96, string(m) + ':' + string(s));
    }
    if (drawStatus > 5) {
      draw_set_font(global.myFontSmall);
      draw_set_color(c_yellow);
      draw_text(64, 96 + 8, 'KILLS: ');
      draw_set_color(c_white);
      draw_text(96 + 24, 96 + 8, global.kills);
    }
    if (drawStatus > 6) {
      draw_set_font(global.myFontSmall);
      draw_set_color(c_yellow);
      draw_text(64, 96 + 16, 'SAVES: ');
      draw_set_color(c_white);
      draw_text(96 + 24, 96 + 16, global.damsels);
    }

    if (fadeOut) {
      draw_set_color(c_black);
      draw_set_alpha(fadeLevel);
      draw_rectangle(0, 0, 320, 240, false);
      draw_set_alpha(1);
    }

    if (drawStatus == 8) {
      draw_set_font(global.myFontSmall);
      draw_set_color(c_white);
      strLen = string_length('YOU SHALL BE REMEMBERED AS A HERO.') * 8;
      n = 320 - strLen;
      n = ceil(n / 2);
      draw_text(n, 116, string('YOU SHALL BE REMEMBERED AS A HERO.'));
    }
  }
}

function oEndCustom_STEP($) {
  with ($) {
    if (
      keyboard_check_pressed(vk_enter) ||
      keyboard_check_pressed(vk_escape) ||
      checkAttackPressed() ||
      checkStartPressed()
    ) {
      if (drawStatus == 7) {
        if (moneyCount < global.money) {
          moneyCount = global.money;
        } else {
          fadeOut = true;
        }
      } else if (drawStatus == 8) {
        if (gamepad.attackPressed) gamepad.attackPressed = false;
        if (gamepad.startPressed) gamepad.startPressed = false;
        scrClearGlobals();
        room_goto(rHighscores);
      }
    }

    if (drawStatus > 2) {
      moneyDiff = global.money - moneyCount;
      if (moneyDiff > 1000) moneyCount += 1000;
      else if (moneyDiff > 100) moneyCount += 100;
      else moneyCount += moneyDiff;

      if (drawStatus == 3 && moneyDiff == 0 && !poop) {
        alarm[11] = 50;
        poop = true;
      }
    }

    if (fadeOut) {
      if (fadeLevel < 1) fadeLevel += 0.1;
      else drawStatus = 8;
    }
  }
}

function oEndCustom_CREATE($) {
  with ($) {
    drawStatus = 0;
    moneyCount = 0;
    fadeOut = false;
    fadeLevel = 0;
    window_set_cursor(cr_none);
    poop = false;

    alarm[0] = 50;

    [instances_of(oMenu)].forEach(($) => {
      with ($) {
        visible = false;
      }
    });
  }
}

class oEndCustom extends oObject {
  // variables
}
