function oBatIntro_STEP($) {
  with ($) {
    //yVel += yAcc;
    //if (yVel < 4) yVel = 4;
    x += xVel;
    y += yVel;

    if (status == 0) {
      if (x < view_xview[0] + 320 + 16) {
        status = 1;
        xVel = -random(3) - 2;
        yVel = -random(1);
        yAcc = -random(1) * 0.2;
        playSound(global.sndBat);
      }
    }
  }
}

function oBatIntro_CREATE($) {
  with ($) {
    status = 0;
    xVel = 0;
    yVel = 0;
    yAcc = 0;
  }
}

class oBatIntro extends oObject {
  sprite_index = sBatLeft;
  visible = true;
}
ObjType.oBatIntro = oBatIntro;
