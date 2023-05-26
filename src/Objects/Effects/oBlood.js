function oBlood_ALARM($) {
  with ($) {
    invincible = false;
    bounce = true;

    collectible = true;

    if (global.graphicsHigh) {
      if (instance_number(oBloodTrail) < 12) instance_create(x, y, oBloodTrail);
      alarm[0] = 4;
    }
  }
}

function oBlood_STEP($) {
  with ($) {
    action_inherited();

    if (yVel > 6) instance_destroy();

    if (isCollisionBottom(1)) {
      if (life > 20) life = 20;
    }
  }
}

function oBlood_CREATE($) {
  with ($) {
    action_inherited();

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
  // variables
}
