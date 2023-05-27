function oMsgSign_COLLISION_oCharacter($) {
  with ($) {
    global.message = message;
    global.message2 = message2;
    global.messageTimer = 200;
  }
}

function oMsgSign_DRAW($) {
  with ($) {
    draw_sprite(sprite_index, -1, x, y);
    if (isRoom('rLevelEditor')) {
      draw_set_font(global.myFontSmall);
      draw_set_color(c_white);
      draw_text(x, y, message);
    }
  }
}

function oMsgSign_CREATE($) {
  with ($) {
    type = 'Message Sign';

    // tutorial cave init
    if (isRoom('rLevelEditor') || isRoom('rLoadLevel')) {
      message = '';
      message2 = '';
    } else if (x == 32 && y == 64) {
      message = 'WELCOME TO THE TUTORIAL CAVE!';
      message2 = 'THIS MIGHT BE YOUR FIRST TIME PLAYING.';
    } else if (x == 80 && y == 96) {
      if (global.gamepadOn)
        message = 'PRESS ' + scrGetJoy(global.joyJumpVal) + ' TO JUMP.';
      else message = 'PRESS ' + scrGetKey(global.keyJumpVal) + ' TO JUMP.';
      message2 = '';
    } else if (x == 176 && y == 96) {
      message = 'YOU CAN HANG ON LEDGES, TOO!';
      message2 = '';
    } else if (x == 240 && y == 64) {
      if (global.gamepadOn)
        message =
          'PRESS ' + scrGetJoy(global.joyAttackVal) + ' TO USE YOUR WHIP.';
      else
        message =
          'PRESS ' + scrGetKey(global.keyAttackVal) + ' TO USE YOUR WHIP.';
      message2 = '';
    } else if (x == 384 && y == 96) {
      message = 'COLLECT THE TREASURE!';
      message2 = '';
    } else if (x == 512 && y == 32) {
      if (global.gamepadOn)
        message =
          'HOLD UP AND PRESS ' +
          scrGetJoy(global.joyAttackVal) +
          ' TO OPEN CHESTS.';
      else
        message =
          'HOLD UP AND PRESS ' +
          scrGetKey(global.keyAttackVal) +
          ' TO OPEN CHESTS.';
      message2 = '';
    } else if (x == 544 && y == 112) {
      message = 'HOLD DOWN TO DUCK AND CRAWL.';
      message2 = '';
    } else if (x == 576 && y == 128) {
      message = 'CRAWL OVER THE EDGE TO DO A FLIP HANG.';
      message2 = 'FALLING TOO FAR CAN REALLY HURT!';
    } else if (x == 640 && y == 96) {
      message = 'HOLD UP TO CLIMB THE LADDER.';
      message2 = '';
    } else if (x == 608 && y == 256) {
      if (global.gamepadOn)
        message =
          'DUCK AND PRESS ' +
          scrGetJoy(global.joyAttackVal) +
          ' TO PICK UP ITEMS.';
      else
        message =
          'DUCK AND PRESS ' +
          scrGetKey(global.keyAttackVal) +
          ' TO PICK UP ITEMS.';
      message2 = '';
    } else if (x == 576 && y == 256) {
      if (global.gamepadOn)
        message =
          'PRESS ' + scrGetJoy(global.joyAttackVal) + ' TO THROW OR USE ITEMS.';
      else
        message =
          'PRESS ' + scrGetKey(global.keyAttackVal) + ' TO THROW OR USE ITEMS.';
      message2 = 'HOLD UP TO THROW HIGH AND DOWN TO DROP.';
    } else if (x == 496 && y == 256) {
      if (global.gamepadOn)
        message =
          'PRESS ' + scrGetJoy(global.joyItemVal) + ' TO SELECT YOUR ROPE AND';
      else
        message =
          'PRESS ' + scrGetKey(global.keyItemVal) + ' TO SELECT YOUR ROPE AND';
      if (global.gamepadOn)
        message2 = scrGetJoy(global.joyAttackVal) + ' TO USE IT.';
      else message2 = scrGetKey(global.keyAttackVal) + ' TO USE IT.';
    } else if (x == 432 && y == 176) {
      if (global.gamepadOn)
        message = 'CROUCH AND PRESS ' + scrGetJoy(global.joyAttackVal);
      else message = 'CROUCH AND PRESS ' + scrGetKey(global.keyAttackVal);
      message2 = 'TO THROW A ROPE DOWN A LEDGE.';
    } else if (x == 384 && y == 208) {
      if (global.gamepadOn)
        message =
          'TO RUN, HOLD DOWN ' +
          scrGetJoy(global.joyAttackVal) +
          ' OR ' +
          scrGetJoy(global.joyRunVal) +
          '.';
      else
        message =
          'TO RUN, HOLD DOWN ' +
          scrGetKey(global.keyAttackVal) +
          ' OR ' +
          scrGetKey(global.keyRunVal) +
          '.';
      message2 = '';
    } else if (x == 256 && y == 208) {
      message = 'OPEN THIS CRATE FOR A BAG OF BOMBS.';
      message2 = '';
    } else if (x == 224 && y == 208) {
      if (global.gamepadOn)
        message =
          'PRESS ' + scrGetJoy(global.joyItemVal) + ' TO SELECT BOMBS AND ';
      else
        message =
          'PRESS ' + scrGetKey(global.keyItemVal) + ' TO SELECT BOMBS AND ';
      if (global.gamepadOn)
        message2 = 'PRESS ' + scrGetJoy(global.joyAttackVal) + ' TO USE IT.';
      else message2 = 'PRESS ' + scrGetKey(global.keyAttackVal) + ' TO USE IT.';
    } else if (x == 96 && y == 256) {
      message = "THERE'S LOTS MORE AHEAD!";
      message2 = 'USE YOUR WITS AND BEWARE OF TRAPS!';
    }
  }
}

class oMsgSign extends oDrawnSprite {
  joyAttackVal;
  joyItemVal;
  joyJumpVal;
  joyRunVal;
  keyAttackVal;
  keyItemVal;
  keyJumpVal;
  keyRunVal;
}
ObjType.oMsgSign = oMsgSign;
