function oCrown_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Crown';
    makeActive();
    setCollisionBounds(-6, -6, 6, 8);

    cost = 999999;
    buyMessage = "I SHOULDN'T BE SELLING THIS!";
  }
}

class oCrown extends oItem {
  // variables
}
