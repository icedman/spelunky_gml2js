function oMoon_STEP($) {
  with ($) {
    if (isRoom('rCredits1') && instance_exists(oCamel)) {
      x += 0.01;
    } else if (view_xview[0] != 0) {
      xOff -= 0.01;
    }
    x = view_xview[0] + 208 + xOff;
  }
}

function oMoon_CREATE($) {
  with ($) {
    xOff = 0;
  }
}

class oMoon extends oObject {
  // variables
}
