function oEndPlat_STEP($) {
  with ($) {
    y += yVel;
  }
}

function oEndPlat_CREATE($) {
  with ($) {
    yVel = 0;
  }
}

class oEndPlat extends oSolid {}
