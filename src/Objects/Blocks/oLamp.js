function oLamp_CREATE($) {
  with ($) {
    image_speed = 0.5;
  }
}

class oLamp extends oObject {
  sprite_index = sLamp;
  visible = true;
}
ObjType.oLamp = oLamp;
