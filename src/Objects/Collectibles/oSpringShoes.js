function oSpringShoes_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Spring Shoes';
    makeActive();
    setCollisionBounds(-6, -6, 6, 6);
    cost = 5000;
    shopDesc = 'SPRINGY SHOES';
    buyMessage = 'SPRINGY SHOES FOR $' + string(cost) + '.';
  }
}

class oSpringShoes extends oItem {
  sprite_index = sSpringShoes;
  visible = true;
}
ObjType.oSpringShoes = oSpringShoes;
