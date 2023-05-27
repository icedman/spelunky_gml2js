function oCheckBox4_MOUSE($) {
  with ($) {
    if (!on) {
      on = true;
      sprite_index = sBoxChecked;
      global.gamepadOn = true;
    } else {
      on = false;
      sprite_index = sBox;
      global.gamepadOn = false;
    }
  }
}

function oCheckBox4_CREATE($) {
  with ($) {
    if (global.gamepadOn) on = true;
    else {
      on = false;
      sprite_index = sBox;
    }
  }
}

class oCheckBox4 extends oObject {
  on;
  sBox;
  sBoxChecked;
  sprite_index = sBoxChecked;
  visible = true;
}
ObjType.oCheckBox4 = oCheckBox4;
