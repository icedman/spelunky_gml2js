function oCheckBox_MOUSE($) {
  with ($) {
    if (!on) {
      on = true;
      sprite_index = sBoxChecked;
      global.ullscreen = true;
    } else {
      on = false;
      sprite_index = sBox;
      global.ullscreen = false;
    }
  }
}

function oCheckBox_CREATE($) {
  with ($) {
    if (global.ullscreen) on = true;
    else {
      on = false;
      sprite_index = sBox;
    }
  }
}

class oCheckBox extends oObject {
  ullscreen;
  sprite_index = sBoxChecked;
  visible = true;
}
ObjType.oCheckBox = oCheckBox;
