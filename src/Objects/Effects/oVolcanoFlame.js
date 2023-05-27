function oVolcanoFlame_OTHER($) {
  with ($) {
    instance_destroy();
  }
}

function oVolcanoFlame_STEP($) {
  with ($) {
    x += xVel;
    y += yVel;

    if (yVel < 6) yVel += grav;
  }
}

function oVolcanoFlame_ALARM_0($) {
  with ($) {
    //instance_create(x, y, oFlameTrail);
    //alarm[0] = 2;
  }
}

function oVolcanoFlame_CREATE($) {
  with ($) {
    image_speed = 0.3;

    xVel = random(4) - random(4);
    yVel = -1 - random(2);
    grav = rand(1, 6) * 0.1;

    alarm[0] = 2;
    alarm[1] = 50;
  }
}

class oVolcanoFlame extends oObject {}
ObjType.oVolcanoFlame = oVolcanoFlame;
