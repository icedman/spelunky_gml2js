function oSpikeShoes_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Spike Shoes';
    makeActive();
    setCollisionBounds(-6, -6, 6, 6);

    cost = 4000;
    buyMessage = 'SPIKE SHOES FOR $' + string(cost) + '.';
  }
}

class oSpikeShoes extends oItem {
  // variables
}
