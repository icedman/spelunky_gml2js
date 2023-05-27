function oHighscores_DRAW($) {
  with ($) {
    if (oPlayer1.y < 156) {
      draw_set_font(global.myFontSmall);
      draw_set_color(c_yellow);
      draw_text(128 + 16, 32, 'SECRET CHALLENGES');
      draw_set_color(c_white);
      tMini1 = floor(scrGetScore(10) / 10000);
      tMini2 = floor((scrGetScore(10) - tMini1 * 10000) / 100);
      tMini3 = floor(scrGetScore(10) - tMini1 * 10000 - tMini2 * 100);
      draw_text(128, 48, 'SUN:   ' + string(tMini1));
      draw_text(128, 64, 'MOON:  ' + string(tMini2));
      draw_text(128, 80, 'STARS: ' + string(tMini3));

      if (oPlayer1.y < 48 + 16) {
        draw_set_color(c_yellow);
        draw_text(168, 96, 'SUN ROOM');
        draw_set_color(c_white);
        if (tMoney >= sunGold) {
          if (false) {
            // (global.isTunnelMan)
            draw_text(128, 112, 'NO MATTOCKS ALLOWED!');
            draw_text(128, 128, 'THIS MEANS YOU!');
            draw_text(128, 144, '');
            draw_text(128, 160, '');
          } else {
            draw_text(128, 112, 'KEEP YOURSELF AND');
            draw_text(128, 128, 'THE DAMSEL ALIVE');
            draw_text(128, 144, 'FOR AS LONG AS');
            draw_text(128, 160, 'POSSIBLE!');
          }
        } else {
          draw_text(128, 112, 'LOCKED.');
        }
      } else if (oPlayer1.y < 80 + 16) {
        draw_set_color(c_yellow);
        draw_text(168, 96, 'MOON ROOM');
        draw_set_color(c_white);
        if (tTime > 0 && tTime <= moonGold) {
          if (false) {
            // (global.isTunnelMan)
            draw_text(128, 112, 'NO MATTOCKS ALLOWED!');
            draw_text(128, 128, 'THIS MEANS YOU!');
            draw_text(128, 144, '');
            draw_text(128, 160, '');
          } else {
            draw_text(128, 112, 'SHOOT THE MOVING');
            draw_text(128, 128, 'TARGETS WITH YOUR');
            draw_text(128, 144, 'BOW AND ARROWS!');
          }
        } else {
          draw_text(128, 112, 'LOCKED.');
        }
      } else if (oPlayer1.y < 112 + 16) {
        draw_set_color(c_yellow);
        draw_text(168, 96, 'STARS ROOM');
        draw_set_color(c_white);
        if (tKills >= starsGold) {
          if (false) {
            // (global.isTunnelMan)
            draw_text(128, 112, 'NO MATTOCKS ALLOWED!');
            draw_text(128, 128, 'THIS MEANS YOU!');
            draw_text(128, 144, '');
            draw_text(128, 160, '');
          } else {
            draw_text(128, 112, 'KILL AS MANY ANGRY');
            draw_text(128, 128, 'SHOPKEEPS AS YOU CAN');
            draw_text(128, 144, 'BEFORE THEY GET YOU!');
          }
        } else {
          draw_text(128, 112, 'LOCKED.');
        }
      } else if (oPlayer1.y < 160) {
        draw_set_color(c_yellow);
        draw_text(160, 96, 'CHANGING ROOM');
        draw_set_color(c_white);
        if (tSaves >= 8) {
          draw_text(128, 112, 'LADY IN RED...');
        } else {
          draw_text(128, 112, 'LOCKED.');
        }
        instances_of(oNew).forEach(($) => {
          with ($) {
            visible = false;
          }
        });
      }
    } else {
      instances_of(oNew).forEach(($) => {
        with ($) {
          visible = true;
        }
      });

      draw_set_font(global.myFontSmall);
      draw_set_color(c_yellow);
      draw_text(160, 32, 'TOP DEFILERS');
      draw_set_color(c_white);
      draw_text(128, 48, 'MONEY:  ' + string(scrGetScore(1)));
      draw_text(128, 64, 'KILLS:  ' + string(scrGetScore(3)));
      draw_text(128, 80, 'SAVES:  ' + string(scrGetScore(4)));
      // only display time if won
      if (scrGetScore(6) > 0) {
        s = scrGetScore(2);
        // s = floor(s / 1000);
        m = 0;
        while (s > 59) {
          s -= 60;
          m += 1;
        }

        draw_set_color(c_white);
        draw_text(128, 96, 'TIME: ');
        if (s < 10) draw_text(128 + 64, 96, string(m) + ':0' + string(s));
        else draw_text(128 + 64, 96, string(m) + ':' + string(s));
      }
      draw_set_color(c_yellow);
      draw_text(168, 112, 'STATISTICS');
      draw_set_color(c_white);
      draw_text(128, 128, 'PLAYS:  ' + string(scrGetScore(5)));
      draw_text(128, 144, 'DEATHS: ' + string(scrGetScore(7)));
      draw_text(128, 160, 'WINS:   ' + string(scrGetScore(6)));

      block = instance_nearest(160, 240, oPushBlock);
      if (!oButtonHighscore.pushed && block.x > 160) {
        draw_set_font(global.myFontSmall);
        draw_set_color(c_yellow);
        strLen = string_length('THIS WILL CLEAR EVERYTHING!') * 8;
        n = 320 - strLen;
        n = ceil(n / 2);
        draw_text(n, 216, string('THIS WILL CLEAR EVERYTHING!'));
      }
    }
  }
}

function oHighscores_STEP($) {
  with ($) {
    // shake the screen
    if (global.shake > 0) {
      //view_xview[0] = view_xview[0] + rand(0,3) - rand(0,3);
      //view_yview[0] = view_yview[0] + rand(0,3) - rand(0,3);
      //if (view_yview[0] > 16) view_yview[0] = 16 - rand(0,8);
      //if (view_yview[0] < 0) view_yview[0] = 0 + rand(0,8);
      if (shakeToggle) view_yview[0] = view_yview[0] + rand(1, 8);
      else view_yview[0] = 0;
      shakeToggle = !shakeToggle;
      global.shake -= 1;
    } else {
      view_xview[0] = 0;
      view_yview[0] = 0;
    }
  }
}

function oHighscores_CREATE($) {
  with ($) {
    instances_of(oScreen).forEach(($) => {
      with ($) {
        canPause = true;
      }
    });

    global.currLevel = 1;

    shakeToggle = false;
    global.darkLevel = false;
    global.snakePit = false;
    global.messageTimer = 0;
    global.mini1 = 0;
    global.mini2 = 0;
    global.mini3 = 0;
    global.hasJordans = false;
    global.arrows = 0;

    sunGold = 200000;
    moonGold = 600000;
    starsGold = 120;

    tMoney = scrGetScore(1);
    tTime = scrGetScore(2);
    tKills = scrGetScore(3);
    tSaves = scrGetScore(4);

    // debug
    /*
tMoney = 200000;
tTime = 1;
tKills = 200;
tSaves = 8;
*/

    if (tMoney >= 50000) {
      trophy = instance_create(32, 32, oTrophy);
      if (tMoney >= 200000) {
        trophy.sprite_index = sGoldTrophy;
        instance_create(32, 48, oXSun);
      } else if (tMoney >= 100000) {
        trophy.sprite_index = sSilverTrophy;
      } else {
        trophy.sprite_index = sBronzeTrophy;
      }
    }

    if (tTime > 0 && tTime < 960) {
      trophy = instance_create(64, 64, oTrophy);
      if (tTime <= 960) {
        trophy.sprite_index = sBronzeTrophy;
      }
      if (tTime <= 720) {
        trophy.sprite_index = sSilverTrophy;
      }
      if (tTime <= 600) {
        trophy.sprite_index = sGoldTrophy;
        instance_create(64, 80, oXMoon);
      }
    }

    if (tKills >= 80) {
      trophy = instance_create(32, 96, oTrophy);
      if (tKills >= 120) {
        trophy.sprite_index = sGoldTrophy;
        instance_create(32, 112, oXStars);
      } else if (tKills >= 100) {
        trophy.sprite_index = sSilverTrophy;
      } else {
        trophy.sprite_index = sBronzeTrophy;
      }
    }

    if (tSaves >= 4) {
      trophy = instance_create(64, 128, oTrophy);
      if (tSaves >= 8) {
        trophy.sprite_index = sGoldTrophy;
        instance_create(64, 144, oXChange);
      } else if (tSaves >= 6) {
        trophy.sprite_index = sSilverTrophy;
      } else {
        trophy.sprite_index = sBronzeTrophy;
      }
    }

    if (global.scoresStart == 1) {
      oPlayer1.x = 32 + 8;
      oPlayer1.y = 48 + 8;
    } else if (global.scoresStart == 2) {
      oPlayer1.x = 64 + 8;
      oPlayer1.y = 80 + 8;
    } else if (global.scoresStart == 3) {
      oPlayer1.x = 32 + 8;
      oPlayer1.y = 112 + 8;
    }

    if (global.newMoney) instance_create(272, 48, oNew);
    if (global.newKills) instance_create(272, 64, oNew);
    if (global.newSaves) instance_create(272, 80, oNew);
    if (global.newTime) instance_create(272, 96, oNew);
  }
}

class oHighscores extends oObject {
  block;
  moonGold;
  oButtonHighscore;
  oNew;
  oPushBlock;
  sBronzeTrophy;
  sGoldTrophy;
  sSilverTrophy;
  snakePit;
  starsGold;
  sunGold;
  tMini1;
  tMini2;
  tMini3;
  trophy;
}
ObjType.oHighscores = oHighscores;
