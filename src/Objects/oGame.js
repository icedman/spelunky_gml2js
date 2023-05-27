function oGame_ALARM_1($) {
  with ($) {
    if (drawStatus < 3) drawStatus = 3;
  }
}

function oGame_ALARM_2($) {
  with ($) {
    global.udjatBlink = !global.udjatBlink;

    if (global.hasUdjatEye) {
      if (global.udjatBlink) playSound(global.sndBlink1);
      else playSound(global.sndBlink2);
    }
  }
}

function oGame_DRAW($) {
  with ($) {
    if (instance_exists(oPlayer1)) {
      if (oPlayer1.dead || isRoom('rMoon')) {
        if (isLevel()) {
          if (drawStatus > 0) {
            draw_set_font(global.myFont);
            draw_set_color(c_yellow);
            draw_text(view_xview[0] + 88, view_yview[0] + 32 + 16, 'GAME OVER');
          }
          if (drawStatus > 1) {
            draw_set_font(global.myFontSmall);
            draw_set_color(c_yellow);
            draw_text(
              view_xview[0] + 88,
              view_yview[0] + 64 + 16,
              'FINAL SCORE:'
            );
          }
          if (drawStatus > 2) {
            draw_set_font(global.myFont);
            draw_set_color(c_white);
            draw_text(
              view_xview[0] + 88,
              view_yview[0] + 72 + 16,
              '$' + string(moneyCount)
            );

            draw_set_font(global.myFontSmall);
            draw_set_color(c_yellow);
            if (global.customLevel) {
              if (global.testLevel != '') {
                if (global.gamepadOn)
                  str =
                    'PRESS ' +
                    scrGetJoy(global.joyAttackVal) +
                    ' TO EDIT LEVEL.';
                else
                  str =
                    'PRESS ' +
                    scrGetKey(global.keyAttackVal) +
                    ' TO EDIT LEVEL.';
              } else {
                if (global.gamepadOn)
                  str =
                    'PRESS ' +
                    scrGetJoy(global.joyAttackVal) +
                    ' TO LOAD ANOTHER LEVEL.';
                else
                  str =
                    'PRESS ' +
                    scrGetKey(global.keyAttackVal) +
                    ' TO LOAD ANOTHER LEVEL.';
              }
              strLen = string_length(str) * 8;
              n = 320 - strLen;
              n = ceil(n / 2);
              draw_text(view_xview[0] + n, view_yview[0] + 120, str);
            } else {
              if (global.gamepadOn)
                str =
                  'PRESS ' +
                  scrGetJoy(global.joyAttackVal) +
                  ' FOR HIGH SCORES.';
              else
                str =
                  'PRESS ' +
                  scrGetKey(global.keyAttackVal) +
                  ' FOR HIGH SCORES.';
              strLen = string_length(str) * 8;
              n = 320 - strLen;
              n = ceil(n / 2);
              draw_text(view_xview[0] + n, view_yview[0] + 120, str);
            }
          }
        } else if (isRoom('rSun')) {
          if (drawStatus > 0) {
            draw_set_font(global.myFont);
            draw_set_color(c_yellow);
            draw_text(view_xview[0] + 88, view_yview[0] + 32 + 16, 'FINISHED!');
          }
          if (drawStatus > 1) {
            draw_set_font(global.myFontSmall);
            draw_set_color(c_yellow);
            if (oSunRoom.highscore) str = 'YOU SET A NEW RECORD!';
            else str = 'BETTER LUCK NEXT TIME...';
            strLen = string_length(str) * 8;
            n = 320 - strLen;
            n = ceil(n / 2);
            draw_text(n, view_yview[0] + 64 + 16, str);
          }
        } else if (isRoom('rMoon')) {
          if (oMoonRoom.timer < 0) {
            if (drawStatus > 0) {
              draw_set_font(global.myFont);
              draw_set_color(c_yellow);
              draw_text(
                view_xview[0] + 88,
                view_yview[0] + 32 + 16,
                'FINISHED!'
              );
            }
            if (drawStatus > 1) {
              draw_set_font(global.myFontSmall);
              draw_set_color(c_yellow);
              if (oMoonRoom.highscore) str = 'YOU SET A NEW RECORD!';
              else str = 'BETTER LUCK NEXT TIME...';
              strLen = string_length(str) * 8;
              n = 320 - strLen;
              n = ceil(n / 2);
              draw_text(n, view_yview[0] + 64 + 16, str);
            }
          }
        } else if (isRoom('rStars')) {
          if (drawStatus > 0) {
            draw_set_font(global.myFont);
            draw_set_color(c_yellow);
            draw_text(view_xview[0] + 88, view_yview[0] + 32 + 16, 'FINISHED!');
          }
          if (drawStatus > 1) {
            draw_set_font(global.myFontSmall);
            draw_set_color(c_yellow);
            if (oStarsRoom.highscore) str = 'YOU SET A NEW RECORD!';
            else str = 'BETTER LUCK NEXT TIME...';
            strLen = string_length(str) * 8;
            n = 320 - strLen;
            n = ceil(n / 2);
            draw_text(n, view_yview[0] + 64 + 16, str);
          }
        }
      }
    }

    action_color();

    // DEBUGGING TEXT

    // Display level path
    if (false && room == rLevel) {
      for (j = 0; j < 4; j += 1) {
        for (i = 0; i < 4; i += 1) {
          draw_text(
            oPlayer1.x + 48 + i * 16,
            oPlayer1.y - 64 + 16 + j * 16,
            string(global.roomPath[(i, j)])
          );
        }
      }
    }

    if (false && instance_exists(oPlayer1)) {
      file = file_text_open_read('stats.txt');

      if (file) {
        file_text_readln(file);
        file_text_readln(file);
        file_text_readln(file);
        file_text_readln(file);
        str = file_text_read_string(file);
        str = string_delete(str, 1, 20);
        global.totalCrates = real(str);
        file_text_readln(file);
        str = file_text_read_string(file);
        // str = string_delete(str, 1, 20);
        // global.totalChests = real(str);

        draw_text(oPlayer1.x + 16, oPlayer1.y - 16, str);

        file_text_close(file);
      }
    }

    if (false && instance_exists(oPlayer1)) {
      draw_set_font(global.myFontSmall);
      draw_set_color(c_white);
      draw_text(oPlayer1.x + 16, oPlayer1.y - 16, string(oPlayer1.stunTimer));
      // if (instance_exists(oLockedChest)) { with oPlayer1 { draw_text(x+16, y-32, distance_to_object(oLockedChest)); } }
      // else { draw_text(oPlayer1.x+16, oPlayer1.y-16, "0"); }
      //if (global.madeMoai == true) draw_text(oPlayer1.x+16, oPlayer1.y-16, "TRUE");
      //else draw_text(oPlayer1.x+16, oPlayer1.y-16, "FALSE");
      //draw_text(oPlayer1.x+16, oPlayer1.y-16, string_upper(global.pickupItem));
    }

    action_color();

    // draw_text(oPlayer1.x-24, oPlayer1.y-48, string(radtodeg(arctan(1))));

    // DEBUG

    if (false && room == rLevel && instance_exists(oXMarket)) {
      draw_text(
        oPlayer1.x - 24,
        oPlayer1.y - 48,
        string(oPlayer1.x - oXMarket.x)
      );
      draw_text(oPlayer1.x, oPlayer1.y - 48, string(oPlayer1.y - oXMarket.y));
    }
  }
}

function oGame_STEP($) {
  with ($) {
    action_execute_script();

    if (!instance_exists(oXMarket)) global.udjatBlink = false;
    else {
      instances_of(oPlayer1).forEach(($) => {
        with ($) {
          dm = distance_to_object(oXMarket);
          if (dm < 4) dm = 4;
          if (oGame.alarm[2] < 1 || dm < oGame.alarm[2]) oGame.alarm[2] = dm;
        }
      });
    }

    if (global.gameStart && instance_exists(oCharacter) && isLevel()) {
      if (!oCharacter.dead) {
        global.time += room_speed;
        global.xtime += room_speed;
      }
    }

    // GHOST
    if (instance_exists(oPlayer1)) {
      if (
        isLevel() &&
        !isRoom('rOlmec') &&
        !isRoom('rLoadLevel') &&
        global.currLevel > 1 &&
        !global.hasCrown &&
        global.xtime > 120000 &&
        oPlayer1.sprite_index != sPExit &&
        oPlayer1.sprite_index != sDamselExit
      ) {
        if (!oLevel.musicFade) {
          oLevel.musicFade = true;
          global.message = 'A CHILL RUNS UP YOUR SPINE...';
          global.message2 = "LET'S GET OUT OF HERE!";
          global.messageTimer = 200;
        }
      }

      if (
        isLevel() &&
        !isRoom('rOlmec') &&
        !isRoom('rLoadLevel') &&
        global.currLevel > 1 &&
        !global.hasCrown &&
        global.xtime > 150000 &&
        !global.ghostExists &&
        oPlayer1.sprite_index != sPExit &&
        oPlayer1.sprite_index != sDamselExit
      ) {
        if (oPlayer1.x > room_width / 2)
          instance_create(
            view_xview[0] + view_wview[0] + 8,
            view_yview[0] + floor(view_hview[0] / 2),
            oGhost
          );
        else
          instance_create(
            view_xview[0] - 32,
            view_yview[0] + floor(view_hview[0] / 2),
            oGhost
          );
        global.ghostExists = true;
      }
    }

    if (global.checkWater) {
      global.waterCounter = 0;
      instances_of(oWater).forEach(($) => {
        with ($) {
          // if (y > view_yview[0]-32 && y < view_yview[0] + view_hview[0]+32 && ! isRoom("rOlmec"))
          if (!isRoom('rOlmec')) {
            if ((!isRoom('rLoadLevel') && y < 512) || isRoom('rLoadLevel')) {
              instance_activate_region(x - 16, y - 16, 48, 48, true);

              if (
                !collision_point(x, y - 16, oSolid, 0, 0) &&
                !collision_point(x, y - 16, oWater, 0, 0)
              ) {
                if (type == 'Lava') sprite_index = sLavaTop;
                else sprite_index = sWaterTop;
              }

              obj = instance_place(x - 16, y, oWater);
              if (instance_exists(obj)) {
                if (
                  obj.sprite_index == sWaterTop ||
                  obj.sprite_index == sLavaTop
                ) {
                  if (type == 'Lava') sprite_index = sLavaTop;
                  else sprite_index = sWaterTop;
                }
              }

              obj = instance_place(x + 16, y, oWater);
              if (instance_exists(obj)) {
                if (
                  obj.sprite_index == sWaterTop ||
                  obj.sprite_index == sLavaTop
                ) {
                  if (type == 'Lava') sprite_index = sLavaTop;
                  else sprite_index = sWaterTop;
                }
              }

              if (
                (!collision_point(x - 16, y, oSolid, 0, 0) &&
                  !collision_point(x - 16, y, oWater, 0, 0)) ||
                (!collision_point(x + 16, y, oSolid, 0, 0) &&
                  !collision_point(x + 16, y, oWater, 0, 0)) ||
                (!collision_point(x, y + 16, oSolid, 0, 0) &&
                  !collision_point(x, y + 16, oWater, 0, 0))
              ) {
                instance_destroy();
                global.waterCounter += 1;
              }

              global.waterLoopSafety += 1;
              if (global.waterLoopSafety > 100000) global.checkWater = false;
            }
          }
        }
      });

      if (global.waterCounter == 0) global.checkWater = false;
    } else {
      global.waterLoopSafety = 0;
    }

    // game over
    if (instance_exists(oPlayer1)) {
      if (oPlayer1.dead) {
        if (drawStatus == 0) {
          alarm[0] = 50;
          drawStatus += 1;
        }
        if (drawStatus > 2) {
          moneyDiff = global.money - moneyCount;
          if (moneyDiff > 1000) moneyCount += 1000;
          else if (moneyDiff > 100) moneyCount += 100;
          else moneyCount += moneyDiff;
        }
      }
    }
  }
}

function oGame_KEYPRESS($) {
  with ($) {
    if (global.music) {
      global.music = false;
      stopAllMusic();
    } else {
      global.music = true;
      startMusic();
      if (isRoom('rTitle')) playMusic(global.musTitle, true);
    }
  }
}

function oGame_ALARM_0($) {
  with ($) {
    if (drawStatus < 3) drawStatus = 2;
    alarm[1] = 50;
  }
}

function oGame_CREATE($) {
  with ($) {
    drawStatus = 0;
    moneyCount = 0;
    // globalvar debug;
    debug = false;
    global.ghostExists = false;

    damsel = false;
    idol = false;
    altar = false;

    // Black Market
    genClothingShop = false;
    genBombShop = false;
    genSupplyShop = false;
    genRareShop = false;
    genWeaponShop = false;

    if (instance_number(oGame) > 1) instance_destroy();

    moveableSolidGrav = 1; // how fast moveable solids should accelerate downwards
    time = 1;

    // sound_loop(sndMusicTest);

    if (global.gameStart) scrInitLevel();
  }
}

class oGame extends oObject {
  altar;
  damsel;
  debug;
  dm;
  genBombShop;
  genClothingShop;
  genRareShop;
  genSupplyShop;
  genWeaponShop;
  idol;
  moveableSolidGrav;
  musicFade;
  oLevel;
  room_speed;
  sLavaTop;
  sWaterTop;
  waterCounter;
  waterLoopSafety;
}
ObjType.oGame = oGame;
