function oMattockPre_STEP($) {
  with ($) {
    if (!instance_exists(oPlayer1)) {
      instance_destroy();
    } else if ((sprite_index = sMattockPreR)) {
      x = oPlayer1.x - 16;
      y = oPlayer1.y;
    } else if ((sprite_index = sMattockPreL)) {
      x = oPlayer1.x + 16;
      y = oPlayer1.y;
    }
  }
}

function oMattockPre_ALARM($) {
  with ($) {
    instance_destroy();
  }
}

function oMattockPre_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Mattock';
    damage = 2;
  }
}

class oMattockPre extends oWhipPre {
  // variables
}
