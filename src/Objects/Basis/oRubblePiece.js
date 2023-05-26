function oRubblePiece_STEP($) {
  with ($) {
    x += xVel;
    y += yVel;
    yVel += yAcc;

    if (collision_point(x, y, oWaterSwim, 0, 0)) {
      if (type == 'Drip') instance_destroy();
      else if (type == 'Leaf') {
        yVel = 0;
        sprite_index = sLeafStill;
      } else yVel = 0.2;
    } else if (collision_point(x, y, oLava, 0, 0)) {
      instance_destroy();
    }

    if (collision_point(x, y, oSolid, 0, 0)) {
      instance_destroy();
    }

    if (view_enabled) {
      if (
        x < view_xview[0] - 32 ||
        x > view_xview[0] + view_wview[0] + 32 ||
        y < view_yview[0] - 32 ||
        y > view_yview[0] + view_hview[0] + 32
      ) {
        instance_destroy();
      }
    }
  }
}

function oRubblePiece_CREATE($) {
  with ($) {
    action_inherited();

    type = 'None';
    xVel = 0;
    yVel = 0;
    yAcc = 0.6;
  }
}

class oRubblePiece extends oDrawnSprite {
  // variables
}
