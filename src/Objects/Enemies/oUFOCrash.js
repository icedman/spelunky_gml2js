function oUFOCrash_COLLISION_oSolid($) {
  with ($) {
    instance_create(x + 8, y + 8, oExplosion);
    playSound(global.sndExplosion);
    instance_destroy();
  }
}

function oUFOCrash_STEP($) {
  with ($) {
    x += xVel;
    y += yVel;
    if (yVel < 6) yVel += 0.6;
  }
}

function oUFOCrash_ALARM_0($) {
  with ($) {
    if (rand(1, 2) == 1)
      instance_create(x + rand(0, 16), y + rand(0, 16), oFlameTrail);
    else instance_create(x + rand(0, 16), y + rand(0, 16), oBurn);
    alarm[0] = 3;
  }
}

function oUFOCrash_COLLISION_oEnemy($) {
  with ($) {
    instance_create(x + 8, y + 8, oExplosion);
    playSound(global.sndExplosion);
    instance_destroy();
  }
}

function oUFOCrash_CREATE($) {
  with ($) {
    xVel = 0;
    yVel = 0;
    alarm[0] = 3;
  }
}

class oUFOCrash extends oObject {}
ObjType.oUFOCrash = oUFOCrash;
