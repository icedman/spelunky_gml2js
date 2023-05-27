function oYellHelp_STEP($) {
  with ($) {
    y -= 0.1;
  }
}

function oYellHelp_ALARM_0($) {
  with ($) {
    action_kill_object();
  }
}

function oYellHelp_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    yVel = 0.1;
    yAcc = 0.1;
    alarm[0] = 40;
  }
}

class oYellHelp extends oDrawnSprite {
  sprite_index = sYellHelp;
  visible = true;
}
ObjType.oYellHelp = oYellHelp;
