function oButtonHighscore_STEP($) {
  with ($) {
    if (collision_rectangle(x + 2, y + 11, x + 13, y + 15, oSolid, 0, 0)) {
      if (!pushed) {
        counter = 20;
        playSound(global.sndClick);
      }
      pushed = true;
    } else pushed = false;

    if (pushed) {
      if (counter > 0) counter -= 1;
      if (counter == 1) {
        scrResetHighscores();
        global.shake = 60;
        playSound(global.sndThump);
      }
      instances_of(oTrophy).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
      instances_of(oXSun).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
      instances_of(oXMoon).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
      instances_of(oXStars).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
      instances_of(oXChange).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
      sprite_index = sButtonPushed;

      oHighscores.tMoney = 0;
      oHighscores.tTime = 0;
      oHighscores.tKills = 0;
      oHighscores.tSaves = 0;
    } else sprite_index = sButton;
  }
}

function oButtonHighscore_CREATE($) {
  with ($) {
    pushed = false;
  }
}

class oButtonHighscore extends oObject {
  oHighscores;
  oTrophy;
  pushed;
  sButton;
  sButtonPushed;
  tKills;
  tMoney;
  tSaves;
  tTime;
  sprite_index = sButton;
  visible = true;
}
ObjType.oButtonHighscore = oButtonHighscore;
