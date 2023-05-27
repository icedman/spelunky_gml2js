function oSpectacles_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Spectacles';
    makeActive();
    setCollisionBounds(-6, -6, 6, 6);

    cost = 8000;
    buyMessage = 'SPECTACLES FOR $' + string(cost) + '.';
  }
}

class oSpectacles extends oItem {}
ObjType.oSpectacles = oSpectacles;
