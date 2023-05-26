function oMachetePre_STEP($) {
  with ($) {
    if (!instance_exists(oPlayer1)) {
      instance_destroy();
    } else if ((sprite_index = sMachetePreR)) {
      x = oPlayer1.x - 16;
      y = oPlayer1.y;
    } else if ((sprite_index = sMachetePreL)) {
      x = oPlayer1.x + 16;
      y = oPlayer1.y;
    }
  }
}

function oMachetePre_ALARM($) {
  with ($) {
    instance_destroy();
  }
}

function oMachetePre_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Machete';
    damage = 2;
  }
}

class oMachetePre extends oWhipPre {
  // variables
}
