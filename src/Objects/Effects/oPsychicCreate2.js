function oPsychicCreate2_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oPsychicCreate2_STEP($) {
  with ($) {
    x += 2 * cos(degtorad(dir));
    y += -2 * sin(degtorad(dir));
  }
}

function oPsychicCreate2_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    yVel = 0;
    yAcc = 0.6;
    image_speed = 0.4;
    dir = point_direction(x, y, oOlmec.x + 32, oOlmec.y + 16);
  }
}

class oPsychicCreate2 extends oDrawnSprite {}
