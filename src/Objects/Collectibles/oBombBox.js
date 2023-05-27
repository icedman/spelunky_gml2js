function oBombBox_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Bomb Box';
    makeActive();
    setCollisionBounds(-6, -2, 6, 8);
    cost = 10000;
    shopDesc = 'A BOX OF 12 BOMBS';
    buyMessage = 'A BOX OF 12 BOMBS FOR $' + string(cost) + '.';
    heavy = true;
  }
}

class oBombBox extends oItem {}
