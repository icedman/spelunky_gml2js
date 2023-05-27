function oJordans_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Jordans';
    buyMessage = 'JORDANS FOR $50000!';
    makeActive();
    setCollisionBounds(-6, -6, 6, 6);

    cost = 50000;
  }
}

class oJordans extends oItem {}
ObjType.oJordans = oJordans;
