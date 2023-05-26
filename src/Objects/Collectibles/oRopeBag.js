function oRopeBag_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Bomb Bag';
    makeActive();
    setCollisionBounds(-4, -6, 4, 6);
  }
}

class oRopeBag extends oItem {
  // variables
}
