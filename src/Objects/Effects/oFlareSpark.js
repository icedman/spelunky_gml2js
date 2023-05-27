function oFlareSpark_OTHER($) {
  with ($) {
    instance_destroy();
  }
}

function oFlareSpark_STEP($) {
  with ($) {
    y += yVel;

    if (collision_point(x, y, oSolid, 0, 0)) {
      instance_destroy();
    }
  }
}

function oFlareSpark_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    yVel = -0.1;
    yAcc = 0.1;
    image_speed = 0.4;
  }
}

class oFlareSpark extends oDrawnSprite {}
ObjType.oFlareSpark = oFlareSpark;
