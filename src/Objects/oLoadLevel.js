function oLoadLevel_KEYPRESS($) {
  with ($) {
    if (status == GET_FILE_NAME) {
      if (keyboard_key == vk_escape) {
        global.gameStart = false;
        global.titleStart = 2;
        window_set_cursor(cr_none);
        room_goto(rTitle);
      } else if (keyboard_key == vk_enter) {
        global.irstCustomLevel = levelName;
        scrLoadLevel();
      } else if (keyboard_key == vk_backspace || keyboard_key == vk_delete) {
        //levelName += "DEL";
        levelName = string_delete(levelName, string_length(levelName), 1);
        [instances_of(oMenuSel)].orEach(($) => {
          with ($) {
            sprite_index = sMenuSelOff;
          }
        });
      } else {
        levelName += scrGetChar(keyboard_key);
        [instances_of(oMenuSel)].orEach(($) => {
          with ($) {
            sprite_index = sMenuSelOff;
          }
        });
      }
    }
  }
}

function oLoadLevel_DRAW($) {
  with ($) {
    draw_set_font(global.myFontSmall);
    draw_set_color(c_white);

    if (status == GET_FILE_NAME) {
      draw_text(
        view_xview[0] + 32,
        view_yview[0] + 64,
        'LOAD LEVEL: ' + levelName
      );
      draw_set_color(c_yellow);
      draw_text(view_xview[0] + 40, view_yview[0] + 96, 'LEVELS');
      draw_text(
        view_xview[0] + 224,
        view_yview[0] + 96,
        string(page) + '/' + string(numPages)
      );
      if (msgTimer > 0) {
        draw_set_color(c_red);
        draw_text(
          view_xview[0] + 32,
          view_yview[0] + 224,
          'NO SUCH LEVEL EXISTS!'
        );
      } else
        draw_text(
          view_xview[0] + 32,
          view_yview[0] + 224,
          'PRESS ESCAPE TO RETURN TO TITLE.'
        );
      draw_set_color(c_white);
      n = 112;
      m = 0;
      i = (page - 1) * 10;
      while (m < 10 && i + m < numLevels) {
        draw_text(
          view_xview[0] + 40,
          view_yview[0] + n,
          string_upper(levelList[i + m])
        );
        n += 8;
        m += 1;
      }
    }

    if (blackOut) {
      draw_set_color(c_black);
      draw_rectangle(0, 0, 320, 240, false);
    }
  }
}

function oLoadLevel_STEP($) {
  with ($) {
    if (msgTimer > 0) msgTimer -= 1;
    else msg = 'PRESS ESCAPE TO RETURN TO TITLE.';

    /*
if (status == GET_FILE_NAME)
{
    if (checkStartPressed() or gamepad.attackPressed)
    {
        if (levelName != "")
        {
            global.firstCustomLevel = levelName;
            scrLoadLevel();
        }
    }
}
*/
  }
}

function oLoadLevel_CREATE($) {
  with ($) {
    global.cleanSolids = false;
    global.message = '';
    global.message2 = '';
    window_set_cursor(cr_default);
    global.keepScore = false;
    global.currLevel = 1;
    levelLoaded = false;

    msg = 'PRESS ESCAPE TO RETURN TO TITLE.';
    msgTimer = 0;

    GET_FILE_NAME = 0;
    status = 0;
    blackOut = false;
    if (global.customLevel) {
      status = 1;
      blackOut = true;
    } else {
      lifeStart = '4';
      bombStart = '4';
      ropeStart = '4';
      instance_create(256, 64, oLoadButton);
      global.prevCustomLevel = '';
    }

    levelName = global.irstCustomLevel;
    author = 'ANONYMOUS';
    music = 'CAVE';
    nextLevel = '';

    for (j = 0; j < 32; j += 1) {
      for (i = 0; i < 40; i += 1) {
        levelArray[(i, j)] = '0';
      }
    }

    // load level list
    if (!global.customLevel) {
      tempFile = file_find_first('levels*.lvl', 0);
      while (tempFile != '') {
        if (string_char_at(tempFile, 0) != '!') {
          break;
        }
        tempFile = file_find_next();
      }
      levelList[0] = '';
      levelList[0] = tempFile;
      levelList[0] = string_delete(
        levelList[0],
        string_length(levelList[0]) - 3,
        4
      );
      numLevels = 1;
      while (levelList[numLevels - 1] != '') {
        tempFile = file_find_next();
        if (tempFile != '') {
          if (string_char_at(tempFile, 0) != '!') {
            levelList[numLevels] = tempFile;
            levelList[numLevels] = string_delete(
              levelList[numLevels],
              string_length(levelList[numLevels]) - 3,
              4
            );
            numLevels += 1;
          }
        } else {
          break;
        }
      }
      if (levelList[0] == '') numLevels = 0;

      page = 1;
      numPages = ceil(numLevels / 10);

      instance_deactivate_object(oPageUp);
      if (numPages <= 1) instance_deactivate_object(oPageDown);
    }

    if (global.customLevel && !levelLoaded) {
      scrLoadLevel(-1);
    } else oScreen.enabled = false;
  }
}

class oLoadLevel extends oObject {
  blackOut;
  levelList = [];
  levelLoaded;
  msg;
  msgTimer;
  numLevels;
  numPages;
  page;
  tempFile;
}
