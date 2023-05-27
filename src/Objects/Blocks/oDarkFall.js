function oDarkFall_COLLISION_oSolid($) {
  with ($) {
    playSound(global.sndBreak);
    instance_create(x + 8, y + 8, oSmokePuff);
    for (i = 0; i < 3; i += 1) {
      obj = instance_create(x + rand(2, 14), y + rand(2, 14), oRubbleDark);
      obj.xVel = rand(1, 3) - rand(1, 3);
      obj.yVel = -rand(0, 3);
    }

    instance_destroy();
  }
}

function oDarkFall_STEP($) {
  with ($) {
    try {
      oMovingSolid_STEP($);
    } catch (err) {}

    if (isCollisionCharacterTop(1)) {
      timeFall -= 1;
      if (timeFall <= 0) yAcc = grav;
    } else if (timeFall < timeFallMax) timeFall += 1;

    if (yVel > 10) yVel = 10;
  }
}

function oDarkFall_CREATE($) {
  with ($) {
    try {
      oMovingSolid_CREATE($);
    } catch (err) {}

    viscidTop = 1;
    makeActive();
    setCollisionBounds(0, 0, 16, 8);

    invincible = false;
    grav = 1;
    timeFall = 20;
    timeFallMax = 20;
  }
}

class oDarkFall extends oMovingSolid {
  grav;
  oRubbleDark;
  oSmokePuff;
  sndBreak;
  timeFall;
  timeFallMax;
  sprite_index = sDarkFall;
  visible = true;
}
ObjType.oDarkFall = oDarkFall;
