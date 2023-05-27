function oEnd2_ALARM_1($) {
  with ($) {
    player = instance_create(240, 132, oTreasureSil);
    //player.xVel = -6;
    //player.yVel = -8;
  }
}

function oEnd2_ALARM_2($) {
  with ($) {
    instance_create(224 + rand(0, 48), 144 + rand(0, 8), oVolcanoFlame);
    alarm[2] = rand(10, 20);
  }
}

function oEnd2_STEP($) {
  with ($) {
    if (
      keyboard_check_pressed(vk_enter) ||
      keyboard_check_pressed(vk_escape) ||
      checkAttackPressed() ||
      checkStartPressed()
    ) {
      if (gamepad.attackPressed) gamepad.attackPressed = false;
      if (gamepad.startPressed) gamepad.startPressed = false;
      global.gameStart = false;
      room_goto(rEnd3);
    }
  }
}

function oEnd2_ALARM_0($) {
  with ($) {
    player = instance_create(240, 132, oPlayerSil);
    //player.xVel = -6;
    //player.yVel = -8;
    alarm[1] = 30;
  }
}

function oEnd2_CREATE($) {
  with ($) {
    alarm[0] = 50;
    alarm[2] = 10; //
  }
}

class oEnd2 extends oObject {
  oPlayerSil;
  oTreasureSil;
  oVolcanoFlame;
  visible = true;
}
ObjType.oEnd2 = oEnd2;
