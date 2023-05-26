function oMattock_STEP($) {
  with ($) {
    action_inherited();

    if (held) {
      if (oPlayer1.acing == 18) sprite_index = sMattockLeft;
      else sprite_index = sMattockRight;
    }
  }
}

function oMattock_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Mattock';
    makeActive();
    setCollisionBounds(-4, -6, 4, 6);
    cost = 8000;
    buyMessage = 'A MATTOCK FOR $' + string(cost) + '.';
  }
}

class oMattock extends oItem {
  // variables
}
