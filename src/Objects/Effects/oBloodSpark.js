function oBloodSpark_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oBloodSpark_STEP($) {
  with ($) {
    y += yVel;
  }
}

function oBloodSpark_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    yVel = -rand(1, 3) * 0.2;
    yAcc = 0.1;
    image_speed = 0.5;
  }
}

class oBloodSpark extends oDrawnSprite {}
ObjType.oBloodSpark = oBloodSpark;
