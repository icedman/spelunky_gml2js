function oIntroBG_STEP($) {
  with ($) {
    if (isRoom('rCredits1') && instance_exists(oCamel)) {
      x += 0.02;
    } else if (view_xview[0] != 0) {
      xOff -= 0.02;
    }
    x = view_xview[0] + xOff;
  }
}

function oIntroBG_CREATE($) {
  with ($) {
    xOff = 0;
  }
}

class oIntroBG extends oObject {
  // variables
}
