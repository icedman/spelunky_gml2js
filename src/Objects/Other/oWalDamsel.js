function oWalDamsel_STEP($) {
  with ($) {
    if (image_index == 11) {
      instance_create(x, y + 16, oHeart);
      if (!oEndCustom.adeOut) playSound(global.sndKiss);
    }
  }
}

function oWalDamsel_CREATE($) {
  with ($) {
    image_speed = 0.5;
  }
}

class oWalDamsel extends oObject {
  // variables
}
