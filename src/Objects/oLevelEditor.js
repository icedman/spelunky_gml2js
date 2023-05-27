function oLevelEditor_MOUSE($) {
  with ($) {
    if (status == 1) {
      dropVal -= 1;
      if (dropVal < 0) dropVal = dropMax;

      scrSetCursorTile();
    }

    if (status == 1) {
      dropVal += 1;
      if (dropVal > dropMax) dropVal = 0;

      scrSetCursorTile();
    }
  }
}

function oLevelEditor_KEYPRESS($) {
  with ($) {
    if (status == EXIT) {
      global.titleStart = 2;
      if (file_exists('levels/test.tmp')) file_delete('levels/test.tmp');
      room_goto(rTitle);
    } else if (status == NEW) {
      global.testLevel = '';
      room_restart();
    }

    if (status == GET_FILE_NAME) {
      if (keyboard_key == vk_enter) {
        if (levelName != '') {
          status = EDIT;
          file = file_text_open_read(
            'levels/' + string_lower(levelName) + '.lvl'
          );
          if (file) {
            for (j = 0; j < 32; j += 1) {
              str = file_text_read_string(file);
              for (i = 0; i < 40; i += 1) {
                levelArray[(i, j)] = string_char_at(str, i + 1);
                //scrCreateTile(levelArray[i, j], 16+i*16, 16+j*16);
              }
              file_text_readln(file);
            }
            author = file_text_read_string(file);
            file_text_readln(file);
            music = file_text_read_string(file);
            file_text_readln(file);
            lifeStart = file_text_read_string(file);
            file_text_readln(file);
            bombStart = file_text_read_string(file);
            file_text_readln(file);
            ropeStart = file_text_read_string(file);
            file_text_readln(file);
            nextLevel = file_text_read_string(file);
            exitNamesNum = 0;
            if (!file_text_eof(file)) {
              file_text_readln(file);
              exitNamesNum = real(file_text_read_string(file));
            }
            if (exitNamesNum > 0) {
              file_text_readln(file);
              for (i = 0; i < exitNamesNum; i += 1) {
                exitNames[i] = file_text_read_string(file);
                if (i < exitNamesNum - 1) file_text_readln(file);
              }
            }
            signNamesNum = 0;
            if (!file_text_eof(file)) {
              file_text_readln(file);
              signNamesNum = real(file_text_read_string(file));
            }
            if (signNamesNum > 0) {
              file_text_readln(file);
              for (i = 0; i < signNamesNum; i += 1) {
                signNames[i] = file_text_read_string(file);
                if (i < signNamesNum - 1) file_text_readln(file);
              }
            }
            file_text_close(file);

            // build level
            exitNamesID = 0;
            signNamesID = 0;
            for (j = 0; j < 32; j += 1) {
              for (i = 0; i < 40; i += 1) {
                scrCreateTile(levelArray[(i, j)], 16 + i * 16, 16 + j * 16);
                if (levelArray[(i, j)] == 'X') {
                  obj = instance_position(16 + i * 16, 16 + j * 16, oExit);
                  if (obj) {
                    if (exitNamesNum > 0) {
                      obj.leadsTo = exitNames[exitNamesID];
                      exitNamesID += 1;
                    }
                  }
                } else if (levelArray[(i, j)] == '@') {
                  obj = instance_position(16 + i * 16, 16 + j * 16, oEntrance);
                  if (obj) {
                    if (exitNamesNum > 0) {
                      obj.leadsTo = exitNames[exitNamesID];
                      exitNamesID += 1;
                    }
                  }
                } else if (levelArray[(i, j)] == 'I') {
                  obj = instance_position(16 + i * 16, 16 + j * 16, oMsgSign);
                  if (obj) {
                    if (signNamesNum > 0) {
                      obj.message = signNames[signNamesID];
                      signNamesID += 1;
                    }
                  }
                }
              }
            }
          }
          window_set_cursor(cr_default);
          oCursObj.visible = true;
          instance_create(x + 16, y, oEditButton);
          instance_create(x + 320 - 32, y, oNewButton);
          instance_create(x + 320 - 48, y, oTestButton);
        }
      } else if (keyboard_key == vk_backspace || keyboard_key == vk_delete) {
        //levelName += "DEL";
        levelName = string_delete(levelName, string_length(levelName), 1);
      } else levelName += scrGetChar(keyboard_key);
    } else if (status == EDIT) {
      if (keyboard_key == ord('E')) {
        if (
          mouse_x > 16 &&
          mouse_x < room_width - 16 &&
          mouse_y > 16 &&
          mouse_y < room_height - 16 &&
          oCursObj.x >= 16 &&
          oCursObj.x < room_width - 16 &&
          oCursObj.y >= 16 &&
          oCursObj.y < room_height - 16
        ) {
          obj = instance_position(
            oCursObj.x + 8,
            oCursObj.y + 12,
            oDrawnSprite
          );
          if (obj) {
            if (obj.type == 'Exit') {
              textEdit = obj.leadsTo;
              oLevelEditor.status = EDIT_DOOR;
              [instances_of(oNewButton)]
                .orEach(($) => {
                  with ($) {
                    instance_destroy();
                  }
                })
                [instances_of(oTestButton)].orEach(($) => {
                  with ($) {
                    instance_destroy();
                  }
                })
                [instances_of(oEditButton)].orEach(($) => {
                  with ($) {
                    instance_destroy();
                  }
                });
              //levelArray[floor(oCursObj.x/16)-1, floor(oCursObj.y/16)-1] = "0";
            } else if (obj.type == 'Message Sign') {
              textEdit = obj.message;
              oLevelEditor.status = EDIT_MSG;
              [instances_of(oNewButton)]
                .orEach(($) => {
                  with ($) {
                    instance_destroy();
                  }
                })
                [instances_of(oTestButton)].orEach(($) => {
                  with ($) {
                    instance_destroy();
                  }
                })
                [instances_of(oEditButton)].orEach(($) => {
                  with ($) {
                    instance_destroy();
                  }
                });
              //levelArray[floor(oCursObj.x/16)-1, floor(oCursObj.y/16)-1] = "0";
            }
          }
        }
      }
    } else if (status == EDIT_DOOR) {
      if (keyboard_key == vk_enter) {
        obj.leadsTo = textEdit;
        status = EDIT;
        window_set_cursor(cr_default);
        oCursObj.visible = true;
        instance_create(x + 16, y, oEditButton);
        instance_create(x + 320 - 48, y, oNewButton);
        instance_create(x + 320 - 48, y, oTestButton);
      } else if (keyboard_key == vk_backspace || keyboard_key == vk_delete) {
        textEdit = string_delete(textEdit, string_length(textEdit), 1);
      } else if (string_length(textEdit) < 38)
        textEdit += scrGetChar(keyboard_key);
    } else if (status == EDIT_MSG) {
      if (keyboard_key == vk_enter) {
        obj.message = textEdit;
        status = EDIT;
        window_set_cursor(cr_default);
        oCursObj.visible = true;
        instance_create(x + 16, y, oEditButton);
        instance_create(x + 320 - 48, y, oNewButton);
        instance_create(x + 320 - 48, y, oTestButton);
      } else if (keyboard_key == vk_backspace || keyboard_key == vk_delete) {
        textEdit = string_delete(textEdit, string_length(textEdit), 1);
      } else if (string_length(textEdit) < 38)
        textEdit += scrGetChar(keyboard_key);
    } else if (status == INFO_NAME) {
      if (keyboard_key == vk_enter) {
        if (levelName != '') {
          status = INFO_AUTHOR;
          window_set_cursor(cr_default);
          oCursObj.visible = true;
        }
      } else if (keyboard_key == vk_backspace || keyboard_key == vk_delete) {
        levelName = string_delete(levelName, string_length(levelName), 1);
      } else levelName += scrGetChar(keyboard_key);
    } else if (status == INFO_AUTHOR) {
      if (keyboard_key == vk_enter) {
        if (author != '') {
          status = INFO_MUSIC;
          window_set_cursor(cr_default);
          oCursObj.visible = true;
        }
      } else if (keyboard_key == vk_backspace || keyboard_key == vk_delete) {
        author = string_delete(author, string_length(author), 1);
      } else author += scrGetChar(keyboard_key);
    } else if (status == INFO_MUSIC) {
      if (keyboard_key == vk_enter) {
        if (music != '') {
          status = INFO_LIFE;
          window_set_cursor(cr_default);
          oCursObj.visible = true;
        }
      } else if (keyboard_key == vk_backspace || keyboard_key == vk_delete) {
        music = string_delete(music, string_length(music), 1);
      } else music += scrGetChar(keyboard_key);
    } else if (status == INFO_LIFE) {
      if (keyboard_key == vk_enter) {
        if (lifeStart != '') {
          status = INFO_BOMBS;
          window_set_cursor(cr_default);
          oCursObj.visible = true;
        }
      } else if (keyboard_key == vk_backspace || keyboard_key == vk_delete) {
        lifeStart = string_delete(lifeStart, string_length(lifeStart), 1);
      } else lifeStart += scrGetChar(keyboard_key);
    } else if (status == INFO_BOMBS) {
      if (keyboard_key == vk_enter) {
        if (bombStart != '') {
          status = INFO_ROPE;
          window_set_cursor(cr_default);
          oCursObj.visible = true;
        }
      } else if (keyboard_key == vk_backspace || keyboard_key == vk_delete) {
        bombStart = string_delete(bombStart, string_length(bombStart), 1);
      } else bombStart += scrGetChar(keyboard_key);
    } else if (status == INFO_ROPE) {
      if (keyboard_key == vk_enter) {
        if (ropeStart != '') {
          status = INFO_NEXT;
          window_set_cursor(cr_default);
          oCursObj.visible = true;
        }
      } else if (keyboard_key == vk_backspace || keyboard_key == vk_delete) {
        ropeStart = string_delete(ropeStart, string_length(ropeStart), 1);
      } else ropeStart += scrGetChar(keyboard_key);
    } else if (status == INFO_NEXT) {
      if (keyboard_key == vk_enter) {
        if (nextLevel != '') {
          status = EDIT;
          window_set_cursor(cr_default);
          oCursObj.visible = true;
          instance_create(x + 16, y, oEditButton);
          instance_create(x + 320 - 48, y, oNewButton);
          instance_create(x + 320 - 48, y, oTestButton);
        }
      } else if (keyboard_key == vk_backspace || keyboard_key == vk_delete) {
        nextLevel = string_delete(nextLevel, string_length(nextLevel), 1);
      } else nextLevel += scrGetChar(keyboard_key);
    }

    if (status == 1) {
      dropVal -= 1;
      if (dropVal < 0) dropVal = dropMax;

      scrSetCursorTile();
    }

    if (status == 1) {
      dropVal += 1;
      if (dropVal > dropMax) dropVal = 0;

      scrSetCursorTile();
    }

    // Items
    if (status == 1) {
      dropSelect = 3;
      dropMax = 30;
      dropVal = 0;
      oCursObj.sprite_index = sGoldBarTile;
    }

    // Monsters
    if (status == 1) {
      dropSelect = 1;
      if (global.tunnel1 == 0 && global.tunnel2 > 0) dropMax = 14;
      else if (global.tunnel1 > 0 && global.tunnel2 == 0) dropMax = 19;
      else if (global.tunnel1 == 0 && global.tunnel2 == 0) dropMax = 21;
      else dropMax = 6;
      dropVal = 0;
      oCursObj.sprite_index = sBatLeft;
    }

    // Traps
    if (status == 1) {
      dropSelect = 2;
      if (global.tunnel1 == 0 && global.tunnel2 > 0) dropMax = 4;
      else if (global.tunnel1 > 0 && global.tunnel2 == 0) dropMax = 5;
      else if (global.tunnel1 == 0 && global.tunnel2 == 0) dropMax = 6;
      else dropMax = 2;
      dropVal = 0;
      oCursObj.sprite_index = sSpikes;
    }

    if (status == EXIT || status == NEW) {
      file_delete(levelName);
      exitNames[0] = '';
      exitNamesID = 0;
      signNames[0] = '';
      signNamesID = 0;
      file = file_text_open_write('levels/' + string_lower(levelName) + '.lvl');
      for (j = 0; j < 32; j += 1) {
        for (i = 0; i < 40; i += 1) {
          file_text_write_string(file, levelArray[(i, j)]);
          if (levelArray[(i, j)] == 'X' || levelArray[(i, j)] == '@') {
            obj = instance_position(16 + i * 16, 16 + j * 16, oExit);
            if (!obj)
              obj = instance_position(16 + i * 16, 16 + j * 16, oEntrance);
            if (obj) {
              exitNames[exitNamesID] = obj.leadsTo;
              exitNamesID += 1;
            }
          } else if (levelArray[(i, j)] == 'I') {
            obj = instance_position(16 + i * 16, 16 + j * 16, oMsgSign);
            if (obj) {
              signNames[signNamesID] = obj.message;
              signNamesID += 1;
            }
          }
        }
        file_text_writeln(file);
      }
      file_text_write_string(file, author);
      file_text_writeln(file);
      file_text_write_string(file, music);
      file_text_writeln(file);
      file_text_write_string(file, lifeStart);
      file_text_writeln(file);
      file_text_write_string(file, bombStart);
      file_text_writeln(file);
      file_text_write_string(file, ropeStart);
      file_text_writeln(file);
      file_text_write_string(file, nextLevel);
      file_text_writeln(file);
      file_text_write_string(file, string(exitNamesID));
      if (exitNamesID > 0) file_text_writeln(file);
      for (i = 0; i < exitNamesID; i += 1) {
        file_text_write_string(file, exitNames[i]);
        if (i < exitNamesID) file_text_writeln(file);
      }
      file_text_write_string(file, string(signNamesID));
      if (signNamesID > 0) file_text_writeln(file);
      for (i = 0; i < signNamesID; i += 1) {
        file_text_write_string(file, signNames[i]);
        if (i < signNamesID - 1) file_text_writeln(file);
      }
      file_text_close(file);
    }

    if (status == EXIT) {
      global.titleStart = 2;
      if (file_exists('levels/test.tmp')) file_delete('levels/test.tmp');
      room_goto(rTitle);
    } else if (status == NEW) {
      global.testLevel = '';
      room_restart();
    }

    // Blocks
    if (status == 1) {
      dropSelect = 0;
      if (global.tunnel1 == 0 && global.tunnel2 > 0) dropMax = 18;
      else if (global.tunnel1 > 0 && global.tunnel2 == 0) dropMax = 21;
      else if (global.tunnel1 == 0 && global.tunnel2 == 0) dropMax = 23;
      else dropMax = 10;
      dropVal = 0;
      oCursObj.sprite_index = sEntrance;
    }

    if (status == EDIT) {
      status = EXIT;
    } else if (status == EXIT || status == EDIT_DOOR || status == EDIT_MSG) {
      status = EDIT;
      instance_create(x, y, oEditButton);
      instance_create(x + 320 - 32, y, oNewButton);
      instance_create(x + 320 - 32, y, oTestButton);
    } else {
      global.titleStart = 2;
      room_goto(rTitle);
    }
  }
}

function oLevelEditor_DRAW($) {
  with ($) {
    draw_set_font(global.myFontSmall);
    draw_set_color(c_white);

    if (status == GET_FILE_NAME) {
      draw_text(
        view_xview[0] + 9,
        view_yview[0] + 116,
        'EDIT LEVEL: ' + levelName
      );
    } else if (status == EDIT_DOOR) {
      draw_text(view_xview[0] + 9, view_yview[0] + 100, 'LABEL:');
      draw_text(view_xview[0] + 9, view_yview[0] + 116, textEdit);
    } else if (status == EDIT_MSG) {
      draw_text(view_xview[0] + 9, view_yview[0] + 100, 'MESSAGE:');
      draw_text(view_xview[0] + 9, view_yview[0] + 116, textEdit);
    } else if (status == INFO_NAME) {
      draw_text(
        view_xview[0] + 9,
        view_yview[0] + 116,
        'LEVEL NAME: ' + levelName
      );
    } else if (status == INFO_AUTHOR) {
      draw_text(view_xview[0] + 9, view_yview[0] + 116, 'AUTHOR: ' + author);
    } else if (status == INFO_MUSIC) {
      draw_text(view_xview[0] + 9, view_yview[0] + 116, 'MUSIC: ' + music);
    } else if (status == INFO_LIFE) {
      draw_text(
        view_xview[0] + 9,
        view_yview[0] + 116,
        'START LIFE: ' + lifeStart
      );
    } else if (status == INFO_BOMBS) {
      draw_text(
        view_xview[0] + 9,
        view_yview[0] + 116,
        'START BOMBS: ' + bombStart
      );
    } else if (status == INFO_ROPE) {
      draw_text(
        view_xview[0] + 9,
        view_yview[0] + 116,
        'START ROPE: ' + ropeStart
      );
    } else if (status == INFO_NEXT) {
      draw_text(
        view_xview[0] + 9,
        view_yview[0] + 116,
        'NEXT LEVEL: ' + nextLevel
      );
    } else if (status == EXIT || status == NEW) {
      strLen = string_length('SAVE LEVEL? (Y/N)') * 8;
      n = 320 - strLen;
      n = ceil(n / 2);
      draw_text(view_xview[0] + n, view_yview[0] + 116, 'SAVE LEVEL? (Y/N)');

      m = 16;
      draw_set_color(c_yellow);
      if (!instance_exists(oEntrance)) {
        strLen = string_length('WARNING: NO ENTRANCE!') * 8;
        n = 320 - strLen;
        n = ceil(n / 2);
        draw_text(
          view_xview[0] + n,
          view_yview[0] + 116 + m,
          'WARNING: NO ENTRANCE!'
        );
        m += 8;
      }

      if (!instance_exists(oExit)) {
        strLen = string_length('WARNING: NO EXIT!') * 8;
        n = 320 - strLen;
        n = ceil(n / 2);
        draw_text(
          view_xview[0] + n,
          view_yview[0] + 116 + m,
          'WARNING: NO EXIT!'
        );
      }
    } else {
      //draw_text(view_xview[0], view_yview[0], string(mouse_x) + ", " + string(mouse_y));
      if (view_yview[0] == 0) {
        draw_text(
          view_xview[0] + 40,
          view_yview[0] + view_hview[0] - 32,
          levelName + ' BY ' + author
        );
        draw_text(
          view_xview[0] + 40,
          view_yview[0] + view_hview[0] - 24,
          string(oCursObj.x) + ', ' + string(oCursObj.y)
        );
      } else {
        draw_text(
          view_xview[0] + 40,
          view_yview[0] + 16,
          levelName + ' BY ' + author
        );
        draw_text(
          view_xview[0] + 40,
          view_yview[0] + 24,
          string(oCursObj.x) + ', ' + string(oCursObj.y)
        );
      }
    }
  }
}

function oLevelEditor_STEP($) {
  with ($) {
    if (status == EDIT) {
      oCursObj.visible = true;
      window_set_cursor(cr_default);
    } else {
      oCursObj.visible = false;
      window_set_cursor(cr_none);
    }

    if (
      status == EDIT &&
      mouse_x > view_xview[0] &&
      mouse_x < view_xview[0] + 320 &&
      mouse_y > view_yview[0] &&
      mouse_y < view_yview[0] + 240
    ) {
      if (
        mouse_x > view_xview[0] + 320 - 16 &&
        view_xview[0] < room_width - 320
      )
        view_xview[0] += 4;
      else if (mouse_x < view_xview[0] + 16 && view_xview[0] > 0)
        view_xview[0] -= 4;

      if (
        mouse_y > view_yview[0] + 240 - 16 &&
        view_yview[0] < room_height - 240
      )
        view_yview[0] += 4;
      else if (mouse_y < view_yview[0] + 16 && view_yview[0] > 0)
        view_yview[0] -= 4;

      if (checkAttackPressed()) {
        scrTestLevel();
        room_goto(rLoadLevel);
      } else if (
        mouse_x > 16 &&
        mouse_x < room_width - 16 &&
        mouse_y > 16 &&
        mouse_y < room_height - 16 &&
        oCursObj.x >= 16 &&
        oCursObj.x < room_width - 16 &&
        oCursObj.y >= 16 &&
        oCursObj.y < room_height - 16
      ) {
        if (
          mouse_check_button(mb_left) &&
          !collision_point(mouse_x, mouse_y, oEditButton, 0, 0) &&
          !collision_point(mouse_x, mouse_y, oNewButton, 0, 0) &&
          !collision_point(mouse_x, mouse_y, oTestButton, 0, 0)
        ) {
          if (dropSelect == BLOCKS) {
            scrCreateTile(blockArray[dropVal], oCursObj.x, oCursObj.y);
            levelArray[
              (floor(oCursObj.x / 16) - 1, floor(oCursObj.y / 16) - 1)
            ] = blockArray[dropVal];
          } else if (dropSelect == ENEMIES) {
            scrCreateTile(enemyArray[dropVal], oCursObj.x, oCursObj.y);
            levelArray[
              (floor(oCursObj.x / 16) - 1, floor(oCursObj.y / 16) - 1)
            ] = enemyArray[dropVal];
          } else if (dropSelect == TRAPS) {
            scrCreateTile(trapArray[dropVal], oCursObj.x, oCursObj.y);
            levelArray[
              (floor(oCursObj.x / 16) - 1, floor(oCursObj.y / 16) - 1)
            ] = trapArray[dropVal];
          } else if (dropSelect == ITEMS) {
            scrCreateTile(lootArray[dropVal], oCursObj.x, oCursObj.y);
            levelArray[
              (floor(oCursObj.x / 16) - 1, floor(oCursObj.y / 16) - 1)
            ] = lootArray[dropVal];
          }
        } else if (mouse_check_button(mb_right)) {
          obj = collision_rectangle(
            oCursObj.x,
            oCursObj.y,
            oCursObj.x + 15,
            oCursObj.y + 15,
            oDrawnSprite,
            0,
            0
          ); // instance_position(oCursObj.x+8, oCursObj.y+12, oDrawnSprite);
          // if (!obj) obj = instance_position(oCursObj.x+8, oCursObj.y+4, oDrawnSprite);
          if (obj) {
            [instances_of(obj)].forEach(($) => {
              with ($) {
                if (type == 'Giant Spider' || type == 'Tomb Lord') {
                  if (x == oCursObj.x && y == oCursObj.y) {
                    instance_destroy();
                  }
                } else instance_destroy();
              }
            });
          }
          levelArray[(floor(oCursObj.x / 16) - 1, floor(oCursObj.y / 16) - 1)] =
            '0';
        }
      }
    }
  }
}

function oLevelEditor_CREATE($) {
  with ($) {
    global.cleanSolids = true;
    window_set_cursor(cr_none);
    dropVal = 0;

    GET_FILE_NAME = 0;
    EDIT = 1;
    INFO_NAME = 2;
    INFO_AUTHOR = 3;
    INFO_MUSIC = 4;
    INFO_LIFE = 5;
    INFO_BOMBS = 6;
    INFO_ROPE = 7;
    INFO_NEXT = 8;
    EXIT = 9;
    NEW = 10;
    EDIT_DOOR = 11;
    EDIT_MSG = 12;
    status = 0;

    levelName = '';
    author = 'ANONYMOUS';
    music = 'CAVE';
    lifeStart = '4';
    bombStart = '4';
    ropeStart = '4';
    nextLevel = 'NONE';
    textEdit = '';

    for (j = 0; j < 32; j += 1) {
      for (i = 0; i < 40; i += 1) {
        levelArray[(i, j)] = '0';
      }
    }

    BLOCKS = 0;
    ENEMIES = 1;
    TRAPS = 2;
    ITEMS = 3;
    dropSelect = 0;
    if (global.tunnel1 == 0 && global.tunnel2 > 0) dropMax = 18;
    else if (global.tunnel1 > 0 && global.tunnel2 == 0) dropMax = 21;
    else if (global.tunnel1 == 0 && global.tunnel2 == 0) dropMax = 23;
    else dropMax = 10;

    // DEBUG
    // dropMax = 23;

    blockArray[0] = '@'; // Entrance
    blockArray[1] = 'X'; // Exit
    blockArray[2] = 'I'; // Sign
    blockArray[3] = '1'; // Mines
    blockArray[4] = 'L'; // Ladder
    blockArray[5] = 'P'; // Ladder Platform
    blockArray[6] = 'B'; // Push Block
    blockArray[7] = '&amp;'; // Web
    blockArray[8] = 'r'; // Rock
    blockArray[9] = 'j'; // Jar
    blockArray[10] = 'k'; // Bones
    blockArray[11] = '2'; // Jungle
    blockArray[12] = 'w'; // Water
    blockArray[13] = 'v'; // Vine
    blockArray[14] = 't'; // Vine Top
    blockArray[15] = '|'; // Tree Trunk
    blockArray[16] = 'x'; // Tree Top
    blockArray[17] = ')'; // Tree Leaves
    blockArray[18] = 'q'; // Tree Branch
    blockArray[19] = '3'; // Dark
    blockArray[20] = 'd'; // Dark Drop
    blockArray[21] = 'i'; // Ice
    blockArray[22] = '4'; // Temple
    blockArray[23] = 'l'; // Lava

    enemyArray[0] = 'b'; // Bat
    enemyArray[1] = 'n'; // Snake
    enemyArray[2] = 's'; // Spider
    enemyArray[3] = 'S'; // Giant Spider
    enemyArray[4] = 'K'; // Skeleton
    enemyArray[5] = 'h'; // Caveman
    enemyArray[6] = '!'; // Shopkeeper
    enemyArray[7] = 'f'; // Frog
    enemyArray[8] = 'F'; // Fire Frog
    enemyArray[9] = 'z'; // Zombie
    enemyArray[10] = 'A'; // Vampire
    enemyArray[11] = 'M'; // Man Trap
    enemyArray[12] = 'm'; // Monkey
    enemyArray[13] = 'p'; // Piranha
    enemyArray[14] = '{'; // Mega Mouth
    enemyArray[15] = 'a'; // Alien
    enemyArray[16] = 'U'; // UFO
    enemyArray[17] = 'E'; // Alien Boss
    enemyArray[18] = 'y'; // Yeti
    enemyArray[19] = 'Y'; // Yeti King
    enemyArray[20] = 'H'; // Hawkman
    enemyArray[21] = 'T'; // Tomb Lord

    trapArray[0] = '^'; // Spikes
    trapArray[1] = '<'; // Arrow Trap Left
    trapArray[2] = '>'; // Arrow Trap Right
    trapArray[3] = ']'; // Spear Trap Top
    trapArray[4] = '['; // Spear Trap Bottom
    trapArray[5] = '_'; // Spring Trap
    trapArray[6] = '+'; // Smash Trap

    lootArray[0] = '$'; // Gold Bar
    lootArray[1] = '*'; // Gold Bars
    lootArray[2] = '#'; // Gold Idol
    lootArray[3] = 'O'; // Crystal Skull
    lootArray[4] = '5'; // Emerald
    lootArray[5] = '6'; // Sapphire
    lootArray[6] = '7'; // Ruby
    lootArray[7] = '8'; // Diamond
    lootArray[8] = 'c'; // Chest
    lootArray[9] = 'C'; // Crate
    lootArray[10] = 'D'; // Damsel
    lootArray[11] = '.'; // Bomb Bag
    lootArray[12] = ':'; // Bomb Box
    lootArray[13] = 'u'; // Paste
    lootArray[14] = 'R'; // Rope Pile
    lootArray[15] = '`'; // Parachute
    lootArray[16] = 'o'; // Compass
    lootArray[17] = '/'; // Machete
    lootArray[18] = '~'; // Spring Shoes
    lootArray[19] = 'V'; // Spike Shoes
    lootArray[20] = '}'; // Bow
    lootArray[21] = '-'; // Pistol
    lootArray[22] = '='; // Shotgun
    lootArray[23] = 'W'; // Web Cannon
    lootArray[24] = '%'; // Spectacles
    lootArray[25] = 'G'; // Gloves
    lootArray[26] = 'g'; // Mitt
    lootArray[27] = '?'; // Teleporter
    lootArray[28] = '('; // Mattock
    lootArray[29] = '\\'; // Cape
    lootArray[30] = 'J'; // Jetpack

    if (global.testLevel != '') {
      /*
    status = EDIT;
    levelName = global.testLevel;
    file = file_text_open_read("levels/" + string_lower(levelName)+".lvl");
    if (file)
    {
        for (j = 0; j &lt; 32; j += 1)
        {
            str = file_text_read_string(file);
            for (i = 0; i &lt; 40; i += 1)
            {
                levelArray[i, j] = string_char_at(str, i+1);
                scrCreateTile(levelArray[i, j], 16+i*16, 16+j*16);
            }
            file_text_readln(file);
        }
        author = file_text_read_string(file);
        file_text_readln(file);
        music = file_text_read_string(file);
        file_text_readln(file);
        lifeStart = file_text_read_string(file);
        file_text_readln(file);
        bombStart = file_text_read_string(file);
        file_text_readln(file);
        ropeStart = file_text_read_string(file);
        file_text_readln(file);
        nextLevel = file_text_read_string(file);
        file_text_close(file);
    }
    */

      status = EDIT;
      levelName = global.testLevel;
      file = file_text_open_read('levels/test.tmp');
      // file = file_text_open_read("levels/" + string_lower(levelName)+".lvl");
      if (file) {
        for (j = 0; j < 32; j += 1) {
          str = file_text_read_string(file);
          for (i = 0; i < 40; i += 1) {
            levelArray[(i, j)] = string_char_at(str, i + 1);
            //scrCreateTile(levelArray[i, j], 16+i*16, 16+j*16);
          }
          file_text_readln(file);
        }
        author = file_text_read_string(file);
        file_text_readln(file);
        music = file_text_read_string(file);
        file_text_readln(file);
        lifeStart = file_text_read_string(file);
        file_text_readln(file);
        bombStart = file_text_read_string(file);
        file_text_readln(file);
        ropeStart = file_text_read_string(file);
        file_text_readln(file);
        nextLevel = file_text_read_string(file);
        exitNamesNum = 0;
        if (!file_text_eof(file)) {
          file_text_readln(file);
          exitNamesNum = real(file_text_read_string(file));
        }
        if (exitNamesNum > 0) {
          file_text_readln(file);
          for (i = 0; i < exitNamesNum; i += 1) {
            exitNames[i] = file_text_read_string(file);
            if (i < exitNamesNum - 1) file_text_readln(file);
          }
        }
        signNamesNum = 0;
        if (!file_text_eof(file)) {
          file_text_readln(file);
          signNamesNum = real(file_text_read_string(file));
        }
        if (signNamesNum > 0) {
          file_text_readln(file);
          for (i = 0; i < signNamesNum; i += 1) {
            signNames[i] = file_text_read_string(file);
            if (i < signNamesNum - 1) file_text_readln(file);
          }
        }
        file_text_close(file);

        // build level
        exitNamesID = 0;
        signNamesID = 0;
        for (j = 0; j < 32; j += 1) {
          for (i = 0; i < 40; i += 1) {
            scrCreateTile(levelArray[(i, j)], 16 + i * 16, 16 + j * 16);
            if (levelArray[(i, j)] == 'X') {
              obj = instance_position(16 + i * 16, 16 + j * 16, oExit);
              if (obj) {
                if (exitNamesNum > 0) {
                  obj.leadsTo = exitNames[exitNamesID];
                  exitNamesID += 1;
                }
              }
            } else if (levelArray[(i, j)] == '@') {
              obj = instance_position(16 + i * 16, 16 + j * 16, oEntrance);
              if (obj) {
                if (exitNamesNum > 0) {
                  obj.leadsTo = exitNames[exitNamesID];
                  exitNamesID += 1;
                }
              }
            } else if (levelArray[(i, j)] == 'I') {
              obj = instance_position(16 + i * 16, 16 + j * 16, oMsgSign);
              if (obj) {
                if (signNamesNum > 0) {
                  obj.message = signNames[signNamesID];
                  signNamesID += 1;
                }
              }
            }
          }
        }
      }

      window_set_cursor(cr_default);
      oCursObj.visible = true;
      instance_create(x, y, oEditButton);
      instance_create(x + 320 - 32, y, oNewButton);
      instance_create(x + 320 - 32, y, oTestButton);
    }
  }
}

class oLevelEditor extends oObject {
  BLOCKS;
  EDIT;
  EDIT_DOOR;
  EDIT_MSG;
  ENEMIES;
  INFO_AUTHOR;
  INFO_BOMBS;
  INFO_LIFE;
  INFO_MUSIC;
  INFO_NAME;
  INFO_NEXT;
  INFO_ROPE;
  ITEMS;
  NEW;
  TRAPS;
  blockArray = [];
  dropMax;
  dropSelect;
  dropVal;
  enemyArray = [];
  exitNames = [];
  exitNamesID;
  exitNamesNum;
  lootArray = [];
  mb_right;
  signNames = [];
  signNamesID;
  signNamesNum;
  textEdit;
  trapArray = [];
}
