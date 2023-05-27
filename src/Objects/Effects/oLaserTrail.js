function oLaserTrail_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oLaserTrail_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0.8;
  }
}

class oLaserTrail extends oDrawnSprite {
  sprite_index = sLaserTrail;
  visible = true;
}
ObjType.oLaserTrail = oLaserTrail;
