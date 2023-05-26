function oFlame_DESTROY($) {
  with ($) {
    instance_create(x, y, oSmokePuff);
  }
}

function oFlame_STEP($) {
  with ($) {
    action_inherited();

    if (yVel > 6) instance_destroy();

    if (isCollisionBottom(1)) {
      if (life > 20) life = 20;
    }
  }
}

function oFlame_ALARM($) {
  with ($) {
    if (instance_number(oFlameTrail) < 12) instance_create(x, y, oFlameTrail);
    alarm[0] = 2;
  }
}

function oFlame_CREATE($) {
  with ($) {
    action_inherited();

    image_speed = 0.3;

    xVel = random(4) - random(4);
    yVel = -1 - random(2);
    grav = rand(1, 6) * 0.1;

    alarm[0] = 2;
    alarm[1] = 50;
  }
}

function oFlame_COLLISION_oWater($) {
  with ($) {
    instance_create(x, y, oSmokePuff);
    instance_destroy();
  }
}

class oFlame extends oDetritus {
  // variables
}
