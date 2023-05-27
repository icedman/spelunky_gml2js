function oTeleporter_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Teleporter';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    cost = 10000;
    buyMessage = 'A TELEPORTER FOR $' + string(cost) + '.';
  }
}

class oTeleporter extends oItem {}
