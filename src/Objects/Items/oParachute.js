function oParachute_COLLISION_oItem($) {
  with ($) {
    if (other.xVel > 0 || other.yVel > 0) {
      instance_create(x, y, oParaUsed);
      instance_destroy();
    }
  }
}

function oParachute_OTHER($) {
  with ($) {
    if (sprite_index == sParaOpen) sprite_index = sParachute;
  }
}

function oParachute_STEP($) {
  with ($) {
    if (instance_exists(oPlayer1)) {
      x = oPlayer1.x - 8;
      y = oPlayer1.y - 16;
    }
  }
}

class oParachute extends oObject {
  // variables
}
