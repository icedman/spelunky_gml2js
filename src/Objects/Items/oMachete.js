function oMachete_STEP($) {
  with ($) {
    try {
      oItem_STEP($);
    } catch (err) {}

    if (held) {
      if (oPlayer1.acing == 18) sprite_index = sMacheteLeft;
      else sprite_index = sMacheteRight;
    }
  }
}

function oMachete_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Machete';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    cost = 7000;
    buyMessage = 'A MACHETE FOR $' + string(cost) + '.';
  }
}

class oMachete extends oItem {
  sMacheteLeft;
  sMacheteRight;
  sprite_index = sMacheteRight;
  visible = true;
}
ObjType.oMachete = oMachete;
