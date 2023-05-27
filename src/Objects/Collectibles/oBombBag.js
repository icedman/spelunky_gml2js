function oBombBag_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Bomb Bag';
    makeActive();
    setCollisionBounds(-6, -2, 6, 6);
    cost = 2500;
    shopDesc = 'A BAG OF 3 BOMBS';
    buyMessage = 'A BAG OF 3 BOMBS FOR $' + string(cost) + '.';
  }
}

class oBombBag extends oItem {
  shopDesc;
}
ObjType.oBombBag = oBombBag;
