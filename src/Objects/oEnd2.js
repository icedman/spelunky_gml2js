function oEnd2_ALARM($) {
  with ($) {
    player = instance_create(240, 132, oTreasureSil);
    //player.xVel = -6;
    //player.yVel = -8;

    instance_create(224 + rand(0, 48), 144 + rand(0, 8), oVolcanoFlame);
    alarm[2] = rand(10, 20);

    player = instance_create(240, 132, oPlayerSil);
    //player.xVel = -6;
    //player.yVel = -8;
    alarm[1] = 30;
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

function oEnd2_CREATE($) {
  with ($) {
    alarm[0] = 50;
    alarm[2] = 10; //
  }
}

class oEnd2 extends oObject {
  // variables
}
