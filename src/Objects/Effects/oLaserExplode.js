function oLaserExplode_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oLaserExplode_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0.8;

    playSound(global.sndSmallExplode);
  }
}

class oLaserExplode extends oDrawnSprite {
  sprite_index = sLaserExplode;
  visible = true;
}
ObjType.oLaserExplode = oLaserExplode;
