function oShotgunBlastLeft_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oShotgunBlastLeft_CREATE($) {
  with ($) {
    image_speed = 0.8;
  }
}

class oShotgunBlastLeft extends oObject {
  sprite_index = sShotgunBlastLeft;
  visible = true;
}
ObjType.oShotgunBlastLeft = oShotgunBlastLeft;
