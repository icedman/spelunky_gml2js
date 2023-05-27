function oSpikes_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    invincible = false;
  }
}

class oSpikes extends oDrawnSprite {}
