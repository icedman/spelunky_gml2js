function oTitle_ALARM_3($) {
  with ($) {
    instance_create(320 + 280, -32, oPDummy4);
    instances_of(oScreen).forEach(($) => {
      with ($) {
        canPause = true;
      }
    });
    playMusic(global.musTitle, true);
  }
}

function oTitle_ALARM_1($) {
  with ($) {
    state = 2;
    alarm[2] = 70;
  }
}

function oTitle_KEYPRESS($) {
  with ($) {
    stopAllMusic();
    global.tofu = true;
    global.currLevel = 1;
    global.gameStart = true;
    global.customLevel = false;
    global.irstCustomLevel = '';
    global.testLevel = '';
    room_goto(rLoadLevel);

    stopAllMusic();
    global.testLevel = '';
    room_goto(rLevelEditor);
  }
}

function oTitle_ALARM_2($) {
  with ($) {
    state = 3;
    instance_create(320 + 280, -8, oFlare);
    playSound(global.sndIgnite);
    alarm[3] = 50;
  }
}

function oTitle_DRAW($) {
  with ($) {
    if (instance_exists(oFlare) && needDark) {
      dist = 160 - oFlare.y;
      if (dist < 0) dist = 0;
      darkness = dist / 160;
      if (darkness == 0) needDark = false;
    }

    draw_set_alpha(1);

    /*
draw_set_font(global.myFontSmall);
draw_set_color(c_yellow);
draw_text(320+96, 96, "V1.1 (C)2009");
*/

    if (instance_exists(oPlayer1)) {
      player = instance_nearest(0, 0, oPlayer1);
      if (player.x < 256 && view_xview[0] <= 1) {
        draw_set_font(global.myFontSmall);
        draw_set_color(c_white);
        strLen = string_length('WELCOME TO THE SHORTCUT HOUSE!') * 8;
        n = 320 - strLen;
        n = ceil(n / 2);
        draw_text(n, 224, string('WELCOME TO THE SHORTCUT HOUSE!'));
      }
    }
  }
}

function oTitle_STEP($) {
  with ($) {
    if (
      keyboard_check_pressed(vk_enter) ||
      keyboard_check_pressed(vk_escape) ||
      checkAttackPressed() ||
      checkStartPressed()
    ) {
      if (instance_exists(oScreen)) {
        if (!oScreen.canPause) {
          if (gamepad.attackPressed) gamepad.attackPressed = false;
          if (gamepad.startPressed) gamepad.startPressed = false;
          global.titleStart = 2;
          room_restart();
        }
      } else {
        if (gamepad.attackPressed) gamepad.attackPressed = false;
        if (gamepad.startPressed) gamepad.startPressed = false;
        global.titleStart = 2;
        room_restart();
      }
    }

    if (instance_exists(oPlayer1)) {
      if (oPlayer1.x <= 320 && view_xview[0] > 0) {
        view_xview[0] -= 8;
      }

      if (oPlayer1.x > 320 && view_xview[0] < 320) {
        view_xview[0] += 8;
      }
    }

    if (fadeOut) {
      if (darkness < 1) darkness += 0.1;
      else {
        room_goto(rCredits1);
      }
    }
  }
}

function oTitle_ALARM_0($) {
  with ($) {
    state = 1;
    alarm[1] = 100;
  }
}

function oTitle_CREATE($) {
  with ($) {
    global.lake = false;
    global.cemetary = false;

    global.keepScore = true;
    darkness = 0;
    needDark = true;
    state = 0;
    global.scoresStart = 0;
    fadeOut = false;

    global.customLevel = false;
    global.testLevel = '';
    global.prevCustomLevel = '';

    view_xview[0] = 320;

    global.newMoney = false;
    global.newKills = false;
    global.newSaves = false;
    global.newTime = false;

    tMoney = scrGetScore(1);
    tTime = scrGetScore(2);
    tKills = scrGetScore(3);
    tSaves = scrGetScore(4);

    // Tunnel Man
    if (global.tunnel1 == 0 || (global.tunnel1 > 0 && global.tunnel2 == 0)) {
      instance_create(352, 96, oLadderOrange);
      instance_create(352, 96 + 16, oLadderTop);
      instance_create(352, 96 + 32, oLadderOrange);
      instance_create(352, 96 + 48, oLadderOrange);
      instance_create(352, 96 + 64, oLadderOrange);
      instance_create(352, 96 + 80, oLadderOrange);

      if (global.tunnel2 == 0) {
        instance_create(128, 112, oLevel9Sign);
        instance_create(144, 128, oXShortcut9);
        if (global.tunnel1 == 0) {
          instance_create(192, 112, oLevel13Sign);
          instance_create(208, 128, oXShortcut13);
        }
      }
    } else {
      instance_create(320, 96, oBrick);
      instance_create(336, 96, oBrick);
    }

    if (
      tMoney >= 200000 &&
      tTime > 0 &&
      tTime <= 600 &&
      tKills >= 120 &&
      tSaves >= 8
    ) {
      instance_create(32, 112, oMultiTrophy);
      instance_create(32, 128, oXChange2);
    } else {
      instance_create(32 + 8, 128 + 8, oTunnelMan);
    }

    if (global.titleStart == 0) {
      darkness = 1;
      alarm[0] = 50;
      instances_of(oScreen).forEach(($) => {
        with ($) {
          canPause = false;
        }
      });
      //instance_create(280, -32, oPDummy4);
      //instance_create(280, 32, oFlare);
    } else if (global.titleStart == 1) {
      // start at highscore door
      player = instance_create(432 + 8, 184, oPlayer1);
      player.acing = 19;
      instance_create(320 + 280, 188, oFlare);
      instances_of(oScreen).forEach(($) => {
        with ($) {
          canPause = true;
        }
      });
      playMusic(global.musTitle, true);
      if (global.irstTime) instance_create(384, 144, oHintHand);
    } else if (global.titleStart == 2) {
      // start at rope
      player = instance_create(320 + 280, 184, oPlayer1);
      player.acing = 18;
      instance_create(320 + 280, 188, oFlare);
      instances_of(oScreen).forEach(($) => {
        with ($) {
          canPause = true;
        }
      });
      playMusic(global.musTitle, true);
      if (global.irstTime) instance_create(384, 144, oHintHand);
    } else if (global.titleStart == 3) {
      // start at tutorial door
      player = instance_create(336 + 8, 184, oPlayer1);
      player.acing = 19;
      instance_create(320 + 280, 188, oFlare);
      instances_of(oScreen).forEach(($) => {
        with ($) {
          canPause = true;
        }
      });
      playMusic(global.musTitle, true);
      if (global.irstTime) instance_create(384, 144, oHintHand);
    }

    if (global.irstTime) {
      instance_create(320, 160, oBrick);
      instance_create(336, 160, oBrick);
      instance_create(336, 176, oBrick);
    }
  }
}

class oTitle extends oObject {
  darkness;
  needDark;
  oHintHand;
  oLadderOrange;
  oLevel13Sign;
  oLevel9Sign;
  oMultiTrophy;
  oPDummy4;
  rCredits1;
  tofu;
}
ObjType.oTitle = oTitle;
