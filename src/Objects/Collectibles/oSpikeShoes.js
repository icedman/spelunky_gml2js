function oSpikeShoes_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Spike Shoes';
    makeActive();
    setCollisionBounds(-6, -6, 6, 6);

    cost = 4000;
    buyMessage = 'SPIKE SHOES FOR $' + string(cost) + '.';
  }
}

class oSpikeShoes extends oItem {}
ObjType.oSpikeShoes = oSpikeShoes;
