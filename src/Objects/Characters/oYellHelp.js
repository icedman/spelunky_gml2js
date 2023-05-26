function oYellHelp_STEP($) {
  with ($) {
    y -= 0.1;
  }
}

function oYellHelp_ALARM($) {
  with ($) {
    action_kill_object();
  }
}

function oYellHelp_CREATE($) {
  with ($) {
    action_inherited();

    yVel = 0.1;
    yAcc = 0.1;
    alarm[0] = 40;
  }
}

class oYellHelp extends oDrawnSprite {
  // variables
}
