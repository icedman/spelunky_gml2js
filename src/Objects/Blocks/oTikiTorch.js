function oTikiTorch_CREATE($) {
  with ($) {
    image_speed = 0.5;
  }
}

class oTikiTorch extends oObject {
  sprite_index = sTikiTorch;
  visible = true;
}
ObjType.oTikiTorch = oTikiTorch;
