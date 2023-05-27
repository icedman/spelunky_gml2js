function oJoyConfig_DRAW($) {
  with ($) {
    draw_set_font(global.myFontSmall);
    draw_set_color(c_yellow);
    strLen = string_length('PRESS BUTTON FOR') * 8;
    n = 160 - strLen;
    n = ceil(n / 2);
    draw_text(n, 32, 'PRESS BUTTON FOR');
    draw_text(8, 96, 'ESC TO KEEP SAME.');
    draw_text(8, 104, 'CURRENT: ');

    if (!joystick_exists(1)) {
      draw_set_color(c_red);
      draw_text(8, 88, 'NO GAMEPAD FOUND!');
    }

    if (status == 0) {
      draw_set_font(global.myFont);
      draw_set_color(c_white);
      strLen = string_length('JUMP') * 16;
      n = 160 - strLen;
      n = ceil(n / 2);
      draw_text(n, 40, 'JUMP');
      currVal = global.joyJumpVal;
    } else if (status == 1) {
      draw_set_font(global.myFont);
      draw_set_color(c_white);
      strLen = string_length('ACTION') * 16;
      n = 160 - strLen;
      n = ceil(n / 2);
      draw_text(n, 40, 'ACTION');
      currVal = global.joyAttackVal;
    } else if (status == 2) {
      draw_set_font(global.myFont);
      draw_set_color(c_white);
      strLen = string_length('SWITCH') * 16;
      n = 160 - strLen;
      n = ceil(n / 2);
      draw_text(n, 40, 'SWITCH');
      currVal = global.joyItemVal;
    } else if (status == 3) {
      draw_set_font(global.myFont);
      draw_set_color(c_white);
      strLen = string_length('RUN') * 16;
      n = 160 - strLen;
      n = ceil(n / 2);
      draw_text(n, 40, 'RUN');
      currVal = global.joyRunVal;
    } else if (status == 4) {
      draw_set_font(global.myFont);
      draw_set_color(c_white);
      strLen = string_length('BOMB') * 16;
      n = 160 - strLen;
      n = ceil(n / 2);
      draw_text(n, 40, 'BOMB');
      currVal = global.joyBombVal;
    } else if (status == 5) {
      draw_set_font(global.myFont);
      draw_set_color(c_white);
      strLen = string_length('ROPE') * 16;
      n = 160 - strLen;
      n = ceil(n / 2);
      draw_text(n, 40, 'ROPE');
      currVal = global.joyRopeVal;
    } else if (status == 6) {
      draw_set_font(global.myFont);
      draw_set_color(c_white);
      strLen = string_length('FLARE') * 16;
      n = 160 - strLen;
      n = ceil(n / 2);
      draw_text(n, 40, 'FLARE');
      currVal = global.joyFlareVal;
    } else if (status == 7) {
      draw_set_font(global.myFont);
      draw_set_color(c_white);
      strLen = string_length('PURCHASE') * 16;
      n = 160 - strLen;
      n = ceil(n / 2);
      draw_text(n, 40, 'PURCHASE');
      currVal = global.joyPayVal;
    } else if (status == 8) {
      draw_set_font(global.myFont);
      draw_set_color(c_white);
      strLen = string_length('START') * 16;
      n = 160 - strLen;
      n = ceil(n / 2);
      draw_text(n, 40, 'START');
      currVal = global.joyStartVal;
    }

    draw_set_font(global.myFontSmall);
    switch (currVal) {
      case 1: {
        draw_text(80, 104, 'B1');
        break;
      }
      case 2: {
        draw_text(80, 104, 'B2');
        break;
      }
      case 3: {
        draw_text(80, 104, 'B3');
        break;
      }
      case 4: {
        draw_text(80, 104, 'B4');
        break;
      }
      case 5: {
        draw_text(80, 104, 'B5');
        break;
      }
      case 6: {
        draw_text(80, 104, 'B6');
        break;
      }
      case 7: {
        draw_text(80, 104, 'B7');
        break;
      }
      case 8: {
        draw_text(80, 104, 'B8');
        break;
      }
      case 9: {
        draw_text(80, 104, 'B9');
        break;
      }
      case 10: {
        draw_text(80, 104, 'B10');
        break;
      }
      case -1: {
        draw_text(80, 104, 'LT (XB)');
        break;
      }
      case -2: {
        draw_text(80, 104, 'RT (XB)');
        break;
      }
      default: {
        draw_text(80, 104, 'B' + string(currVal));
        break;
      }
    }
  }
}

function oJoyConfig_OTHER($) {
  with ($) {
    file = file_text_open_write('gamepad.cfg');
    file_text_write_string(file, string(global.joyJumpVal));
    file_text_writeln(file);
    file_text_write_string(file, string(global.joyAttackVal));
    file_text_writeln(file);
    file_text_write_string(file, string(global.joyItemVal));
    file_text_writeln(file);
    file_text_write_string(file, string(global.joyRunVal));
    file_text_writeln(file);
    file_text_write_string(file, string(global.joyBombVal));
    file_text_writeln(file);
    file_text_write_string(file, string(global.joyRopeVal));
    file_text_writeln(file);
    file_text_write_string(file, string(global.joyFlareVal));
    file_text_writeln(file);
    file_text_write_string(file, string(global.joyPayVal));
    file_text_writeln(file);
    file_text_write_string(file, string(global.joyStartVal));
    file_text_close(file);
  }
}

function oJoyConfig_STEP($) {
  with ($) {
    joyReleased = false;
    joyPressed = false;
    joyKey = checkJoyButton();
    if (joy) {
      if (joyKey != 0) joy = true;
      else {
        joyReleased = true;
        joy = false;
      }
    } else {
      if (joyKey != 0) {
        joyPressed = true;
        joy = true;
      } else joy = false;
    }

    if (joyPressed) {
      if (status == 0) {
        global.joyJumpVal = joyKey;
      } else if (status == 1) {
        global.joyAttackVal = joyKey;
      } else if (status == 2) {
        global.joyItemVal = joyKey;
      } else if (status == 3) {
        global.joyRunVal = joyKey;
      } else if (status == 4) {
        global.joyBombVal = joyKey;
      } else if (status == 5) {
        global.joyRopeVal = joyKey;
      } else if (status == 6) {
        global.joyFlareVal = joyKey;
      } else if (status == 7) {
        global.joyPayVal = joyKey;
      } else if (status == 8) {
        global.joyStartVal = joyKey;
      }
    }

    if (joyPressed || keyboard_check_pressed(vk_escape)) {
      status += 1;
      if (gamepad.attackPressed) gamepad.attackPressed = false;
      if (gamepad.startPressed) gamepad.startPressed = false;
      if (status > 8) room_goto(rInit);
    }
  }
}

function oJoyConfig_CREATE($) {
  with ($) {
    status = 0;
    joy = false;
  }
}

class oJoyConfig extends oObject {
  currVal;
  joy;
  joyKey;
  joyPressed;
  joyReleased;
  rInit;
}
ObjType.oJoyConfig = oJoyConfig;
