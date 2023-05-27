function oLampRed_CREATE($) {
  with ($) {
    image_speed = 0.5;
  }
}

class oLampRed extends oLamp {
  sprite_index = sLampRed;
  visible = true;
}
ObjType.oLampRed = oLampRed;
