function oSplash_OTHER($) {
  with ($) {
    instance_destroy();
  }
}

function oSplash_CREATE($) {
  with ($) {
    action_inherited();

    image_speed = 0.6;
  }
}

class oSplash extends oDrawnSprite {
  // variables
}
