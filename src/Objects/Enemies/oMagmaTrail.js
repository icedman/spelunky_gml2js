function oMagmaTrail_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oMagmaTrail_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0.4;
  }
}

class oMagmaTrail extends oDrawnSprite {
  sprite_index = sFlameTrail;
  visible = true;
}
ObjType.oMagmaTrail = oMagmaTrail;
