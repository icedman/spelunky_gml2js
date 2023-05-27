function oMitt_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Mitt';
    makeActive();
    setCollisionBounds(-6, -6, 6, 8);

    cost = 4000;
    shopDesc = "PITCHER'S MITT";
    buyMessage = "PITCHER'S MITT FOR $" + string(cost) + '.';
  }
}

class oMitt extends oItem {}
