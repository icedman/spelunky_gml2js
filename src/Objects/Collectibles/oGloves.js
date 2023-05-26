function oGloves_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Gloves';
    makeActive();
    setCollisionBounds(-6, -6, 6, 8);

    cost = 8000;
    shopDesc = 'CLIMBING GLOVES';
    buyMessage = 'CLIMBING GLOVES FOR $' + string(cost) + '.';
  }
}

class oGloves extends oItem {
  // variables
}
