function oParaPickup_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Parachute';
    makeActive();
    setCollisionBounds(-6, -6, 6, 6);

    cost = 2000;
    buyMessage = 'A PARACHUTE FOR $' + string(cost) + '.';
  }
}

class oParaPickup extends oItem {}
ObjType.oParaPickup = oParaPickup;
