function oCompass_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Compass';
    makeActive();
    setCollisionBounds(-6, -6, 6, 6);

    cost = 3000;
    buyMessage = 'A COMPASS FOR $' + string(cost) + '.';
  }
}

class oCompass extends oItem {}
ObjType.oCompass = oCompass;
