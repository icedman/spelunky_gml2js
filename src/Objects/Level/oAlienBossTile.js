function oAlienBossTile_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    type = 'Alien Boss';
  }
}

class oAlienBossTile extends oDrawnSprite {}
