function oSmokePuff_OTHER($) {
  with ($) {
    instance_destroy();
  }
}

function oSmokePuff_STEP($) {
  with ($) {
    y -= yVel;

    /*
if (collision_point(x, y, oSolid, 0, 0))
{
    instance_destroy();
}
*/
  }
}

function oSmokePuff_CREATE($) {
  with ($) {
    action_inherited();

    yVel = 0.1;
    yAcc = 0.1;
    image_speed = 0.4;
  }
}

class oSmokePuff extends oDrawnSprite {
  // variables
}
