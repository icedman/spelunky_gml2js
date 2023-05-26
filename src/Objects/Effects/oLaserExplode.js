function oLaserExplode_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oLaserExplode_CREATE($) {
  with ($) {
    action_inherited();

    image_speed = 0.8;

    playSound(global.sndSmallExplode);
  }
}

class oLaserExplode extends oDrawnSprite {
  // variables
}
