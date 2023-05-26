function oCapePickup_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Cape';
    makeActive();
    setCollisionBounds(-6, -6, 6, 6);

    cost = 12000;
    buyMessage = 'A CAPE FOR $' + string(cost) + '.';
  }
}

class oCapePickup extends oItem {
  // variables
}
