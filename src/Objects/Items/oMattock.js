function oMattock_STEP($) {
  with ($) {
    try {
      oItem_STEP($);
    } catch (err) {}

    if (held) {
      if (oPlayer1.acing == 18) sprite_index = sMattockLeft;
      else sprite_index = sMattockRight;
    }
  }
}

function oMattock_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Mattock';
    makeActive();
    setCollisionBounds(-4, -6, 4, 6);
    cost = 8000;
    buyMessage = 'A MATTOCK FOR $' + string(cost) + '.';
  }
}

class oMattock extends oItem {
  sMattockLeft;
  sMattockRight;
}
ObjType.oMattock = oMattock;
