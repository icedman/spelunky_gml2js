function oMattockHead_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Mattock Head';
    makeActive();
    setCollisionBounds(-6, -4, 6, 4);
  }
}

class oMattockHead extends oItem {
  // variables
}
