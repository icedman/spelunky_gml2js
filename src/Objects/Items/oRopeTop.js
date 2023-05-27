function oRopeTop_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    type = 'Rope';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
  }
}

class oRopeTop extends oDrawnSprite {}
