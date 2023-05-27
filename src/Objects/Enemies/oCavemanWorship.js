function oCavemanWorship_CREATE($) {
  with ($) {
    image_speed = 0.25;
  }
}

class oCavemanWorship extends oObject {
  sprite_index = sCavemanWorshipR;
  visible = true;
}
ObjType.oCavemanWorship = oCavemanWorship;
