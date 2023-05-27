function oBlood_ALARM_1($) {
  with ($) {
    invincible = false;
    bounce = true;
  }
}

function oBlood_ALARM_2($) {
  with ($) {
    collectible = true;
  }
}

function oBlood_STEP($) {
  with ($) {
    try {
      oDetritus_STEP($);
    } catch (err) {}

    if (yVel > 6) instance_destroy();

    if (isCollisionBottom(1)) {
      if (life > 20) life = 20;
    }
  }
}

function oBlood_ALARM_0($) {
  with ($) {
    if (global.graphicsHigh) {
      if (instance_number(oBloodTrail) < 12) instance_create(x, y, oBloodTrail);
      alarm[0] = 4;
    }
  }
}

function oBlood_CREATE($) {
  with ($) {
    try {
      oDetritus_CREATE($);
    } catch (err) {}

    image_speed = 0.3;

    xVel = random(4) - random(4);
    yVel = -1 - random(2);
    grav = rand(1, 6) * 0.1;
    invincible = true;
    bounce = false;
    collectible = false;

    alarm[0] = 1;
    alarm[1] = 1;
    alarm[2] = 5;
  }
}

class oBlood extends oDetritus {
  collectible;
}
