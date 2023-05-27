function oFakeBones_OTHER($) {
  with ($) {
    if (sprite_index == sSkeletonCreateL) {
      instance_create(x, y, oSkeleton);
      instance_destroy();
    }
  }
}

function oFakeBones_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 16 &&
      x < view_xview[0] + view_wview[0] &&
      y > view_yview[0] - 16 &&
      y < view_yview[0] + view_hview[0]
    ) {
      if (!collision_point(x + 8, y + 16, oSolid, 0, 0)) {
        y += yVel;
        yVel += yAcc;
      }

      if (collision_point(x + 8, y + 15, oSolid, 0, 0)) {
        y -= 1;
      }

      if (abs(oPlayer1.y - (y + 8)) < 8 && abs(oPlayer1.x - (x + 8)) < 64) {
        sprite_index = sSkeletonCreateL;
      }
    }
  }
}

function oFakeBones_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    yVel = 0;
    yAcc = 0.2;
  }
}

class oFakeBones extends oDrawnSprite {}
