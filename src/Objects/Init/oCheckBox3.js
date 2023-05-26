function oCheckBox3_MOUSE($) {
  with ($) {
    if (!on) {
      on = true;
      sprite_index = sBoxChecked;
      global.downToRun = true;
    } else {
      on = false;
      sprite_index = sBox;
      global.downToRun = false;
    }
  }
}

function oCheckBox3_CREATE($) {
  with ($) {
    if (global.downToRun) on = true;
    else {
      on = false;
      sprite_index = sBox;
    }
  }
}

class oCheckBox3 extends oObject {
  // variables
}
