function oWaterSwim_DESTROY($) {
  with ($) {
    for (i = 0; i < 3; i += 1) {
      instance_create(x + rand(0, 16), y + rand(0, 16), oDrip);
    }
  }
}

class oWaterSwim extends oWater {}
