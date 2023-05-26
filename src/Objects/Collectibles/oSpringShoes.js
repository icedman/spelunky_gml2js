function oSpringShoes_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Spring Shoes';
    makeActive();
    setCollisionBounds(-6, -6, 6, 6);
    cost = 5000;
    shopDesc = 'SPRINGY SHOES';
    buyMessage = 'SPRINGY SHOES FOR $' + string(cost) + '.';
  }
}

class oSpringShoes extends oItem {
  // variables
}
