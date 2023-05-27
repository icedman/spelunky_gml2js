function oShotgunBlastRight_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oShotgunBlastRight_CREATE($) {
  with ($) {
    image_speed = 0.8;
  }
}

class oShotgunBlastRight extends oObject {}
