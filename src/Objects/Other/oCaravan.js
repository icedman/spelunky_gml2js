function oCaravan_STEP($) {
  with ($) {
    if (status == 0) {
      x -= 1;
      if (x <= 160 + 64) {
        status = 1;
      }
    } else if (status == 1) {
      x -= 0.01;
    } else if (status == 2) {
      x -= 2;
    }

    if (x < -64) {
      oCredits2.adeOut = true;
    }
  }
}

function oCaravan_CREATE($) {
  with ($) {
    if (global.damsels > 0) {
      if (global.isDamsel) sprite_index = sCaravan3;
      else sprite_index = sCaravan2;
    }
    image_speed = 0.5;
    status = 0;
  }
}

class oCaravan extends oObject {}
