function oRope_STEP($) {
  with ($) {
    if (collision_point(x + 12, y, oLava, 0, 0) && burnTimer == 0) {
      instance_create(x + 8, y, oRopeBurn);
    }

    if (burnTimer > 1) burnTimer -= 1;
    else if (burnTimer == 1) {
      if (oPlayer1.state == 14) {
        if (collision_point(x + 12, y + 4, oPlayer1, false, false)) {
          oPlayer1.state = 16;
        }
      }
      instance_destroy();
    }
  }
}

function oRope_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Rope';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    burnTimer = 0;
  }
}

class oRope extends oLadder {
  // variables
}
