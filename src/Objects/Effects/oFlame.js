function oFlame_DESTROY($) {
  with ($) {
    instance_create(x, y, oSmokePuff);
  }
}

function oFlame_STEP($) {
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

function oFlame_ALARM_0($) {
  with ($) {
    if (instance_number(oFlameTrail) < 12) instance_create(x, y, oFlameTrail);
    alarm[0] = 2;
  }
}

function oFlame_CREATE($) {
  with ($) {
    try {
      oDetritus_CREATE($);
    } catch (err) {}

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
  oFlameTrail;
  sprite_index = sFlame;
  visible = true;
}
ObjType.oFlame = oFlame;
