function oBGEnd3_STEP($) {
  with ($) {
    if (isRoom('rEnd3')) {
      // do nothing
    } else if (instance_exists(oCamel)) {
      x = view_xview[0] + xOff;
      xOff += 0.02;
    }
  }
}

function oBGEnd3_CREATE($) {
  with ($) {
    xOff = -64;
    x -= 64;
  }
}

class oBGEnd3 extends oObject {}
ObjType.oBGEnd3 = oBGEnd3;
