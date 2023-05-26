function oRock_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Rock';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
  }
}

class oRock extends oItem {
  // variables
}
