function oPlayerSil_STEP($) {
  with ($) {
    if (true) {
      x += xVel;
      y += yVel;

      if (xVel < 0) xVel += 0.1;

      if (yVel < 6) {
        yVel += myGrav;
      }
    }
  }
}

function oPlayerSil_CREATE($) {
  with ($) {
    xVel = -6;
    yVel = -8;
    myGrav = 0.6;
  }
}

class oPlayerSil extends oDrawnSprite {}
