function oPDummy3_ALARM_2($) {
  with ($) {
    if (climbSndToggle) playSound(global.sndClimb1);
    else playSound(global.sndClimb2);
    climbSndToggle = !climbSndToggle;
  }
}

function oPDummy3_DRAW($) {
  with ($) {
    if (facing == RIGHT) image_xscale = -1;
    else image_xscale = 1;

    draw_sprite_ext(
      sprite_index,
      -1,
      x,
      y,
      image_xscale,
      image_yscale,
      image_angle,
      image_blend,
      image_alpha
    );
  }
}

function oPDummy3_STEP($) {
  with ($) {
    y += yVel;

    if (status == TRANSITION) {
      if (x >= 904) {
        sprite_index = sDuckLeft;
        status = 1;
      } else x += 2;
    } else if (status == ROPEDROP) {
      alarm[0] = 20;
      status += 1;
    } else if (status == 3) {
      sprite_index = sRunLeft;
      if (x >= 920) {
        sprite_index = sClimbUp3;
        status = 4;
      } else x += 2;
    } else if (status == 4) {
      if (y >= 256) {
        oIntro.adeOut = true;
      } else {
        y += 2;
      }
      if (alarm[2] < 1) alarm[2] = 8;
    }
  }
}

function oPDummy3_ALARM_0($) {
  with ($) {
    rope = instance_create(x + 16, y, oRopeThrow);
    rope.alling = true;
    rope.armed = true;
    alarm[1] = 50;
    status = 3;
    playSound(global.sndThrow);
  }
}

function oPDummy3_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    // dummy actor for intro

    image_speed = 0.6;
    climbSndToggle = false;

    TRANSITION = 0;
    ROPEDROP = 1;
    status = 0;

    yVel = 0;

    LEFT = 0;
    RIGHT = 1;
    facing = RIGHT;
  }
}

class oPDummy3 extends oDrawnSprite {
  ROPEDROP;
  TRANSITION;
  adeOut;
  oIntro;
  sClimbUp3;
  sDuckLeft;
  sndClimb1;
  sndClimb2;
  sprite_index = sRunLeft;
  visible = true;
}
ObjType.oPDummy3 = oPDummy3;
