function oAnkh_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Ankh';
    makeActive();
    setCollisionBounds(-4, -6, 4, 8);

    cost = 50000;
    buyMessage = 'AN ANKH FOR $' + string(cost) + '.';
  }
}

class oAnkh extends oItem {
  buyMessage;
}
ObjType.oAnkh = oAnkh;
