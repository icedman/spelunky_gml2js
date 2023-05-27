function oRadioBox_MOUSE($) {
  with ($) {
    if (!on) {
      instances_of(oRadioBox).forEach(($) => {
        with ($) {
          on = false;
          sprite_index = sBox;
        }
      });

      on = true;
      sprite_index = sBoxMarked;

      if (y == 24) global.screenScale = 1;
      else if (y == 32) global.screenScale = 2;
      else if (y == 40) global.screenScale = 3;
      else if (y == 48) global.screenScale = 4;
    }
  }
}

function oRadioBox_CREATE($) {
  with ($) {
    on = false;

    if (y == 24 && global.screenScale == 1) {
      on = true;
      sprite_index = sBoxMarked;
    } else if (y == 32 && global.screenScale == 2) {
      on = true;
      sprite_index = sBoxMarked;
    } else if (y == 40 && global.screenScale == 3) {
      on = true;
      sprite_index = sBoxMarked;
    } else if (y == 48 && global.screenScale == 4) {
      on = true;
      sprite_index = sBoxMarked;
    }
  }
}

class oRadioBox extends oObject {
  oRadioBox;
  sBoxMarked;
  screenScale;
  sprite_index = sBox;
  visible = true;
}
ObjType.oRadioBox = oRadioBox;
