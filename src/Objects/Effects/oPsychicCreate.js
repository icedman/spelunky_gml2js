function oPsychicCreate_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oPsychicCreate_STEP($) {
  with ($) {
    x += 2 * cos(degtorad(dir));
    y += -2 * sin(degtorad(dir));
  }
}

function oPsychicCreate_CREATE($) {
  with ($) {
    action_inherited();

    yVel = 0;
    yAcc = 0.6;
    image_speed = 0.4;
    grav = 0;
    dir = point_direction(x, y, oAlienBoss.x + 16, oAlienBoss.y + 16);
  }
}

class oPsychicCreate extends oDrawnSprite {
  // variables
}
