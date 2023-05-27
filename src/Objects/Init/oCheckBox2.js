function oCheckBox2_MOUSE($) {
  with ($) {
    if (!on) {
      on = true;
      sprite_index = sBoxChecked;
      global.graphicsHigh = true;
    } else {
      on = false;
      sprite_index = sBox;
      global.graphicsHigh = false;
    }
  }
}

function oCheckBox2_CREATE($) {
  with ($) {
    if (global.graphicsHigh) on = true;
    else {
      on = false;
      sprite_index = sBox;
    }
  }
}

class oCheckBox2 extends oObject {}
