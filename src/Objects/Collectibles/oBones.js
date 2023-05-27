function oBones_STEP($) {
  with ($) {
    if (!collision_point(x + 8, y + 16, oSolid, 0, 0)) {
      y += yVel;
      yVel += yAcc;
    }

    if (collision_point(x + 8, y + 15, oSolid, 0, 0)) {
      y -= 1;
    }
  }
}

function oBones_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    yVel = 0;
    yAcc = 0.2;
  }
}

class oBones extends oDrawnSprite {}
ObjType.oBones = oBones;
