function oRopePile_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Rope Pile';
    makeActive();
    setCollisionBounds(-6, -5, 6, 5);

    cost = 2500;
    buyMessage = 'EXTRA ROPE FOR $' + string(cost) + '.';
  }
}

class oRopePile extends oItem {
  sprite_index = sRopePile;
  visible = true;
}
ObjType.oRopePile = oRopePile;
