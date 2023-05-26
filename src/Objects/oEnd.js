function oEnd_OTHER($) {
  with ($) {
    global.shake = 0;
  }
}

function oEnd_STEP($) {
  with ($) {
    timer += 1;
    if (
      keyboard_check_pressed(vk_enter) ||
      keyboard_check_pressed(vk_escape) ||
      checkAttackPressed() ||
      checkStartPressed()
    ) {
      if (timer > 50) {
        if (gamepad.attackPressed) gamepad.attackPressed = false;
        if (gamepad.startPressed) gamepad.startPressed = false;
        global.gameStart = false;
        room_goto(rEnd3);
      }
    }

    // shake the screen
    if (global.shake > 0) {
      //view_xview[0] = view_xview[0] + rand(0,3) - rand(0,3);
      //view_yview[0] = view_yview[0] + rand(0,3) - rand(0,3);
      //if (view_yview[0] > 16) view_yview[0] = 16 - rand(0,8);
      //if (view_yview[0] < 0) view_yview[0] = 0 + rand(0,8);
      if (shakeToggle) view_yview[0] = view_yview[0] + rand(1, 8);
      else view_yview[0] = 0;
      shakeToggle = !shakeToggle;
      global.shake -= 1;
    } else {
      view_yview[0] = 0;
    }

    if (view_xview[0] < room_width - 320) view_xview[0] += 1;
  }
}

function oEnd_CREATE($) {
  with ($) {
    shakeToggle = false;
    oPDummy.status = 2;

    timer = 0;

    if (global.kaliPunish >= 2) {
      instance_create(oPDummy.x, oPDummy.y + 2, oBall2);
      obj = instance_create(oPDummy.x, oPDummy.y, oChain2);
      obj.linkVal = 1;
      obj = instance_create(oPDummy.x, oPDummy.y, oChain2);
      obj.linkVal = 2;
      obj = instance_create(oPDummy.x, oPDummy.y, oChain2);
      obj.linkVal = 3;
      obj = instance_create(oPDummy.x, oPDummy.y, oChain2);
      obj.linkVal = 4;
    }

    stopAllMusic();
  }
}

class oEnd extends oObject {
  // variables
}
