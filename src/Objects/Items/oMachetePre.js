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

function oMachetePre_ALARM_0($) {
  with ($) {
    instance_destroy();
  }
}

function oMachetePre_CREATE($) {
  with ($) {
    try {
      oWhipPre_CREATE($);
    } catch (err) {}

    type = 'Machete';
    damage = 2;
  }
}

class oMachetePre extends oWhipPre {
  sMachetePreL;
  sMachetePreR;
}
ObjType.oMachetePre = oMachetePre;
