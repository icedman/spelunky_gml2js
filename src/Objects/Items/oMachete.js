function oMachete_STEP($) {
  with ($) {
    action_inherited();

    if (held) {
      if (oPlayer1.acing == 18) sprite_index = sMacheteLeft;
      else sprite_index = sMacheteRight;
    }
  }
}

function oMachete_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Machete';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    cost = 7000;
    buyMessage = 'A MACHETE FOR $' + string(cost) + '.';
  }
}

class oMachete extends oItem {
  // variables
}
