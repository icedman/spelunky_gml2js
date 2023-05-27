function oGamepad_STEP($) {
  with ($) {
    action_if();

    startReleased = false;
    startPressed = false;
    if (start) {
      if (global.joyStartVal > 0)
        start = joystick_check_button(joyid, global.joyStartVal);
      else if (global.joyStartVal == -1) {
        if (joystick_zpos(joyid) > 0.1) start = true;
        else start = false;
      } else if (global.joyStartVal == -2) {
        if (joystick_zpos(joyid) < -0.1) start = true;
        else start = false;
      }

      if (!start) startReleased = true;
    } else {
      if (global.joyStartVal > 0)
        start = joystick_check_button(joyid, global.joyStartVal);
      else if (global.joyStartVal == -1) {
        if (joystick_zpos(joyid) > 0.1) start = true;
        else start = false;
      } else if (global.joyStartVal == -2) {
        if (joystick_zpos(joyid) < -0.1) start = true;
        else start = false;
      }

      if (start) startPressed = true;
    }

    /////////////
    // LEFT
    /////////////

    leftReleased = false;
    leftPressed = false;
    if (left) {
      if (
        (joystick_has_pov(joyid) == 1 && joystick_pov(joyid) == 270) ||
        joystick_direction(joyid) == 100
      )
        left = true;
      else left = false;
      if (!left) leftReleased = true;
    } else {
      if (
        (joystick_has_pov(joyid) == 1 && joystick_pov(joyid) == 270) ||
        joystick_direction(joyid) == 100
      )
        left = true;
      else left = false;
      if (left) leftPressed = true;
    }

    /////////////
    // RIGHT
    /////////////

    rightReleased = false;
    rightPressed = false;
    if (right) {
      if (
        (joystick_has_pov(joyid) == 1 && joystick_pov(joyid) == 90) ||
        joystick_direction(joyid) == 102
      )
        right = true;
      else right = false;
      if (!right) rightReleased = true;
    } else {
      if (
        (joystick_has_pov(joyid) == 1 && joystick_pov(joyid) == 90) ||
        joystick_direction(joyid) == 102
      )
        right = true;
      else right = false;
      if (right) rightPressed = true;
    }

    /////////////
    // UP
    /////////////

    upReleased = false;
    upPressed = false;
    if (up) {
      if (
        (joystick_has_pov(joyid) == 1 && joystick_pov(joyid) == 0) ||
        joystick_direction(joyid) == 104
      )
        up = true;
      else up = false;
      if (!up) upReleased = true;
    } else {
      if (
        (joystick_has_pov(joyid) == 1 && joystick_pov(joyid) == 0) ||
        joystick_direction(joyid) == 104
      )
        up = true;
      else up = false;
      if (up) upPressed = true;
    }

    /////////////
    // DOWN
    /////////////

    downReleased = false;
    downPressed = false;
    if (down) {
      if (
        (joystick_has_pov(joyid) == 1 && joystick_pov(joyid) == 180) ||
        joystick_direction(joyid) == 98
      )
        down = true;
      else down = false;
      if (!down) downReleased = true;
    } else {
      if (
        (joystick_has_pov(joyid) == 1 && joystick_pov(joyid) == 180) ||
        joystick_direction(joyid) == 98
      )
        down = true;
      else down = false;
      if (down) downPressed = true;
    }

    /////////////
    // DIAGONAL
    /////////////

    if (
      (joystick_has_pov(joyid) == 1 && joystick_pov(joyid) == 45) ||
      joystick_direction(joyid) == 105
    ) {
      right = true;
      up = true;
    }

    if (
      (joystick_has_pov(joyid) == 1 && joystick_pov(joyid) == 135) ||
      joystick_direction(joyid) == 99
    ) {
      right = true;
      down = true;
    }

    if (
      (joystick_has_pov(joyid) == 1 && joystick_pov(joyid) == 225) ||
      joystick_direction(joyid) == 97
    ) {
      left = true;
      down = true;
    }

    if (
      (joystick_has_pov(joyid) == 1 && joystick_pov(joyid) == 315) ||
      joystick_direction(joyid) == 103
    ) {
      left = true;
      up = true;
    }

    /////////////
    // JUMP
    /////////////

    jumpReleased = false;
    jumpPressed = false;
    if (jump) {
      if (global.joyJumpVal > 0)
        jump = joystick_check_button(joyid, global.joyJumpVal);
      else if (global.joyJumpVal == -1) {
        if (joystick_zpos(joyid) > 0.1) jump = true;
        else jump = false;
      } else if (global.joyJumpVal == -2) {
        if (joystick_zpos(joyid) < -0.1) jump = true;
        else jump = false;
      }

      if (!jump) jumpReleased = true;
    } else {
      if (global.joyJumpVal > 0)
        jump = joystick_check_button(joyid, global.joyJumpVal);
      else if (global.joyJumpVal == -1) {
        if (joystick_zpos(joyid) > 0.1) jump = true;
        else jump = false;
      } else if (global.joyJumpVal == -2) {
        if (joystick_zpos(joyid) < -0.1) jump = true;
        else jump = false;
      }

      if (jump) jumpPressed = true;
    }

    /////////////
    // ATTACK
    /////////////

    attackReleased = false;
    attackPressed = false;
    if (attack) {
      if (global.joyAttackVal > 0)
        attack = joystick_check_button(joyid, global.joyAttackVal);
      else if (global.joyAttackVal == -1) {
        if (joystick_zpos(joyid) > 0.1) attack = true;
        else attack = false;
      } else if (global.joyAttackVal == -2) {
        if (joystick_zpos(joyid) < -0.1) attack = true;
        else attack = false;
      }

      if (!attack) attackReleased = true;
    } else {
      if (global.joyAttackVal > 0)
        attack = joystick_check_button(joyid, global.joyAttackVal);
      else if (global.joyAttackVal == -1) {
        if (joystick_zpos(joyid) > 0.1) attack = true;
        else attack = false;
      } else if (global.joyAttackVal == -2) {
        if (joystick_zpos(joyid) < -0.1) attack = true;
        else attack = false;
      }

      if (attack) attackPressed = true;
    }

    ////////////
    // ITEM
    ////////////

    itemReleased = false;
    itemPressed = false;
    if (item) {
      if (global.joyItemVal > 0)
        item = joystick_check_button(joyid, global.joyItemVal);
      else if (global.joyItemVal == -1) {
        if (joystick_zpos(joyid) > 0.1) item = true;
        else item = false;
      } else if (global.joyItemVal == -2) {
        if (joystick_zpos(joyid) < -0.1) item = true;
        else item = false;
      }

      if (!item) itemReleased = true;
    } else {
      if (global.joyItemVal > 0)
        item = joystick_check_button(joyid, global.joyItemVal);
      else if (global.joyItemVal == -1) {
        if (joystick_zpos(joyid) > 0.1) item = true;
        else item = false;
      } else if (global.joyItemVal == -2) {
        if (joystick_zpos(joyid) < -0.1) item = true;
        else item = false;
      }

      if (item) itemPressed = true;
    }

    ////////////
    // RUN
    ////////////

    if (global.joyRunVal > 0)
      run = joystick_check_button(joyid, global.joyRunVal);
    else if (global.joyRunVal == -1) {
      if (joystick_zpos(joyid) > 0.1) run = true;
      else run = false;
    } else if (global.joyRunVal == -2) {
      if (joystick_zpos(joyid) < -0.1) run = true;
      else run = false;
    }

    ////////////
    // BOMB
    ////////////

    bombReleased = false;
    bombPressed = false;
    if (bomb) {
      if (global.joyBombVal > 0)
        bomb = joystick_check_button(joyid, global.joyBombVal);
      else if (global.joyBombVal == -1) {
        if (joystick_zpos(joyid) > 0.1) bomb = true;
        else bomb = false;
      } else if (global.joyBombVal == -2) {
        if (joystick_zpos(joyid) < -0.1) bomb = true;
        else bomb = false;
      }

      if (!bomb) bombReleased = true;
    } else {
      if (global.joyBombVal > 0)
        bomb = joystick_check_button(joyid, global.joyBombVal);
      else if (global.joyBombVal == -1) {
        if (joystick_zpos(joyid) > 0.1) bomb = true;
        else bomb = false;
      } else if (global.joyBombVal == -2) {
        if (joystick_zpos(joyid) < -0.1) bomb = true;
        else bomb = false;
      }

      if (bomb) bombPressed = true;
    }

    ////////////
    // ROPE
    ////////////

    ropeReleased = false;
    ropePressed = false;
    if (rope) {
      if (global.joyRopeVal > 0)
        rope = joystick_check_button(joyid, global.joyRopeVal);
      else if (global.joyRopeVal == -1) {
        if (joystick_zpos(joyid) > 0.1) rope = true;
        else rope = false;
      } else if (global.joyRopeVal == -2) {
        if (joystick_zpos(joyid) < -0.1) rope = true;
        else rope = false;
      }

      if (!rope) ropeReleased = true;
    } else {
      if (global.joyRopeVal > 0)
        rope = joystick_check_button(joyid, global.joyRopeVal);
      else if (global.joyRopeVal == -1) {
        if (joystick_zpos(joyid) > 0.1) rope = true;
        else rope = false;
      } else if (global.joyRopeVal == -2) {
        if (joystick_zpos(joyid) < -0.1) rope = true;
        else rope = false;
      }

      if (rope) ropePressed = true;
    }

    ////////////
    // FLARE
    ////////////

    flareReleased = false;
    flarePressed = false;
    if (flare) {
      if (global.joyFlareVal > 0)
        flare = joystick_check_button(joyid, global.joyFlareVal);
      else if (global.joyFlareVal == -1) {
        if (joystick_zpos(joyid) > 0.1) flare = true;
        else flare = false;
      } else if (global.joyFlareVal == -2) {
        if (joystick_zpos(joyid) < -0.1) flare = true;
        else flare = false;
      }

      if (!flare) flareReleased = true;
    } else {
      if (global.joyFlareVal > 0)
        flare = joystick_check_button(joyid, global.joyFlareVal);
      else if (global.joyFlareVal == -1) {
        if (joystick_zpos(joyid) > 0.1) flare = true;
        else flare = false;
      } else if (global.joyFlareVal == -2) {
        if (joystick_zpos(joyid) < -0.1) flare = true;
        else flare = false;
      }

      if (flare) flarePressed = true;
    }

    ////////////
    // PAY
    ////////////

    payReleased = false;
    payPressed = false;
    if (pay) {
      if (global.joyPayVal > 0)
        pay = joystick_check_button(joyid, global.joyPayVal);
      else if (global.joyPayVal == -1) {
        if (joystick_zpos(joyid) > 0.1) pay = true;
        else pay = false;
      } else if (global.joyPayVal == -2) {
        if (joystick_zpos(joyid) < -0.1) pay = true;
        else pay = false;
      }

      if (!pay) payReleased = true;
    } else {
      if (global.joyPayVal > 0)
        pay = joystick_check_button(joyid, global.joyPayVal);
      else if (global.joyPayVal == -1) {
        if (joystick_zpos(joyid) > 0.1) pay = true;
        else pay = false;
      } else if (global.joyPayVal == -2) {
        if (joystick_zpos(joyid) < -0.1) pay = true;
        else pay = false;
      }

      if (pay) payPressed = true;
    }
  }
}

function oGamepad_CREATE($) {
  with ($) {
    start = false;
    startPressed = false;
    startReleased = false;

    left = false;
    leftPressed = false;
    leftReleased = false;

    right = false;
    rightPressed = false;
    rightReleased = false;

    up = false;
    upPressed = false;
    upReleased = false;

    down = false;
    downPressed = false;
    downReleased = false;

    jump = false;
    jumpPressed = false;
    jumpReleased = false;

    attack = false;
    attackPressed = false;
    attackReleased = false;

    item = false;
    itemPressed = false;
    itemReleased = false;

    run = false;

    bomb = false;
    bombPressed = false;
    bombReleased = false;

    rope = false;
    ropePressed = false;
    ropeReleased = false;

    flare = false;
    flarePressed = false;
    flareReleased = false;

    pay = false;
    payPressed = false;
    payReleased = false;
  }
}

class oGamepad extends oObject {
  attack;
  attackPressed;
  attackReleased;
  bomb;
  bombPressed;
  bombReleased;
  down;
  downPressed;
  downReleased;
  flarePressed;
  flareReleased;
  itemPressed;
  itemReleased;
  jump;
  jumpPressed;
  jumpReleased;
  left;
  leftPressed;
  leftReleased;
  pay;
  payPressed;
  payReleased;
  right;
  rightPressed;
  rightReleased;
  ropePressed;
  ropeReleased;
  run;
  start;
  startPressed;
  startReleased;
  up;
  upPressed;
  upReleased;
}
