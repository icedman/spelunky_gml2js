function oLavaDrip_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oLavaDrip_CREATE($) {
  with ($) {
    try {
      oRubblePiece_CREATE($);
    } catch (err) {}

    image_speed = 0.4;
  }
}

class oLavaDrip extends oRubblePiece {
  sprite_index = sLavaDrip;
  visible = true;
}
ObjType.oLavaDrip = oLavaDrip;
