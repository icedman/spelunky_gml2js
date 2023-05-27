function oBone_OTHER($) {
  with ($) {
    if (dying) instance_destroy();
  }
}

function oBone_STEP($) {
  with ($) {
    try {
      oDetritus_STEP($);
    } catch (err) {}

    if (isCollisionBottom(1)) {
      sprite_index = sSmokePuff;
      dying = true;
    }
  }
}

function oBone_CREATE($) {
  with ($) {
    try {
      oDetritus_CREATE($);
    } catch (err) {}

    image_speed = 0.3;

    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    xVel = random(4) - random(4);
    yVel = -1 - random(2);
    grav = rand(1, 6) * 0.1;
  }
}

class oBone extends oDetritus {
  sSmokePuff;
}
ObjType.oBone = oBone;
