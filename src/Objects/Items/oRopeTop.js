function oRopeTop_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Rope';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
  }
}

class oRopeTop extends oDrawnSprite {
  // variables
}
