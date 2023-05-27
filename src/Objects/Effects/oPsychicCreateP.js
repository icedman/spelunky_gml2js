function oPsychicCreateP_COLLISION_oSolid($) {
  with ($) {
    instance_destroy();
  }
}

function oPsychicCreateP_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oPsychicCreateP_STEP($) {
  with ($) {
    x += xVel;
    y += yVel;
    if (yVel < 6) yVel += 0.6;
  }
}

function oPsychicCreateP_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    xVel = 0;
    yVel = 0;
    image_speed = 0.2;
  }
}

class oPsychicCreateP extends oDrawnSprite {
  sprite_index = sPsychicCreate;
  visible = true;
}
ObjType.oPsychicCreateP = oPsychicCreateP;
