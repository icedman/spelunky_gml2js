function oJordans_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Jordans';
    buyMessage = 'JORDANS FOR $50000!';
    makeActive();
    setCollisionBounds(-6, -6, 6, 6);

    cost = 50000;
  }
}

class oJordans extends oItem {
  // variables
}
