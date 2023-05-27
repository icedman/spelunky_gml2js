function oPDummy4_ALARM_2($) {
  with ($) {
    if (climbSndToggle) playSound(global.sndClimb1);
    else playSound(global.sndClimb2);
    climbSndToggle = !climbSndToggle;
  }
}

function oPDummy4_STEP($) {
  with ($) {
    x += xVel;
    y += yVel;

    if (status == 0) {
      if (y >= 160) {
        sprite_index = sFallLeft;
        yVel = 4;
        if (yVel < 6) yVel += 0.2;
      } else {
        sprite_index = sClimbUp3;
        yVel = 2;
        if (alarm[2] < 1) alarm[2] = 8;
      }

      if (y >= 176 + 8) {
        y = 176 + 8;
        player = instance_create(x, y, oPlayer1);
        player.acing = 18;
        instance_destroy();
      }
    } else {
      player = instance_create(x, y, oPlayer1);
      player.acing = 18;
      instance_destroy();
    }
  }
}

function oPDummy4_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    // dummy actor for title screen

    image_speed = 0.6;
    status = 0;
    climbSndToggle = false;

    xVel = 0;
    yVel = 0;
  }
}

class oPDummy4 extends oDrawnSprite {}
