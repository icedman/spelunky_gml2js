function oFlameTrail_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oFlameTrail_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0.4;
  }
}

class oFlameTrail extends oDrawnSprite {
  sprite_index = sFlameTrail;
  visible = true;
}
ObjType.oFlameTrail = oFlameTrail;
