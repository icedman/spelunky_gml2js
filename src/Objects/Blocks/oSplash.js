function oSplash_OTHER($) {
  with ($) {
    instance_destroy();
  }
}

function oSplash_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0.6;
  }
}

class oSplash extends oDrawnSprite {}
ObjType.oSplash = oSplash;
