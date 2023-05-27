function oWhipPre_STEP($) {
  with ($) {
    if (!instance_exists(oPlayer1)) {
      instance_destroy();
    } else if ((sprite_index = sWhipPreR)) {
      x = oPlayer1.x - 16;
      y = oPlayer1.y;
    } else if ((sprite_index = sWhipPreL)) {
      x = oPlayer1.x + 16;
      y = oPlayer1.y;
    }
  }
}

function oWhipPre_ALARM_0($) {
  with ($) {
    instance_destroy();
  }
}

function oWhipPre_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    type = 'Whip';
    damage = 1;
    alarm[0] = 3;
  }
}

class oWhipPre extends oDrawnSprite {}
ObjType.oWhipPre = oWhipPre;
