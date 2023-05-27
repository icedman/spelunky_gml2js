function oLavaSpray_STEP($) {
  with ($) {
    y += yVel;
    if (yVel > -6) yVel += yAcc;

    if (collision_point(x, y - 1, oEndPlat, 0, 0)) {
      oEndPlat.yVel = yVel;
      oPDummy.yVel = yVel;
      oBigTreasure.yVel = yVel;
      oBigTreasure.myGrav = 0;
    }

    if (y < -16 && status == 0) {
      yVel = 0;
      yAcc = 0;
      alarm[0] = 40;
      status += 1;
    }

    if (!SS_IsSoundPlaying(global.sndFlame)) playSound(global.sndFlame);
  }
}

function oLavaSpray_ALARM_0($) {
  with ($) {
    room_goto(rEnd2);
  }
}

function oLavaSpray_CREATE($) {
  with ($) {
    yVel = 0;
    yAcc = 0;
    status = 0;
  }
}

class oLavaSpray extends oObject {
  rEnd2;
  sprite_index = sLavaSpray;
  visible = true;
}
ObjType.oLavaSpray = oLavaSpray;
