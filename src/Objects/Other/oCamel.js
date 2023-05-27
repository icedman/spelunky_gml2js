function oCamel_STEP($) {
  with ($) {
    if (status == 0) {
      x -= 1;
      if (x <= 160) {
        playMusic(global.musCredits, false);
        status = 1;
      }
    } else if (status == 1) {
      x -= 0.01;
    } else if (status == 2) {
      x -= 2;
    }

    if (isRoom('rCredits1') && x < -64) oCredits1.adeOut = true;
  }
}

function oCamel_CREATE($) {
  with ($) {
    image_speed = 0.5;
    status = 0;
    if (global.isDamsel) sprite_index = sCamelDamsel;
    else if (global.isTunnelMan) sprite_index = sCamelTunnel;
  }
}

class oCamel extends oObject {
  musCredits;
  oCredits1;
  sCamelDamsel;
  sCamelTunnel;
  sprite_index = sCamel;
  visible = true;
}
ObjType.oCamel = oCamel;
