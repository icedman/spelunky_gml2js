function oTeleporter_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Teleporter';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    cost = 10000;
    buyMessage = 'A TELEPORTER FOR $' + string(cost) + '.';
  }
}

class oTeleporter extends oItem {
  // variables
}
