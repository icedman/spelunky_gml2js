function oGloves_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Gloves';
    makeActive();
    setCollisionBounds(-6, -6, 6, 8);

    cost = 8000;
    shopDesc = 'CLIMBING GLOVES';
    buyMessage = 'CLIMBING GLOVES FOR $' + string(cost) + '.';
  }
}

class oGloves extends oItem {}
