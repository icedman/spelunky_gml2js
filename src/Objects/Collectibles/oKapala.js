function oKapala_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Kapala';
    makeActive();
    setCollisionBounds(-6, -6, 6, 8);

    cost = 999999;
    buyMessage = "I SHOULDN'T BE SELLING THIS!";
  }
}

class oKapala extends oItem {
  // variables
}