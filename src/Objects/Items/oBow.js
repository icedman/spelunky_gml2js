function oBow_STEP($) {
  with ($) {
    action_inherited();

    if (held) {
      if (oPlayer1.acing == 18) sprite_index = sBowLeft;
      else sprite_index = sBowRight;
      /*
    if (checkLeft() and not checkRight()) sprite_index = sBowLeft;
    if (checkRight() and not checkLeft()) sprite_index = sBowRight;
*/
      if (oPlayer1.bowStrength >= 10) image_index = 3;
      else if (oPlayer1.bowStrength > 6) image_index = 2;
      else if (oPlayer1.bowStrength > 2) image_index = 1;
      else image_index = 0;
    } else {
      image_index = 0;
    }
  }
}

function oBow_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Bow';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    cost = 1000;
    shopDesc = 'BOW AND ARROWS';
    buyMessage = 'BOW AND ARROWS FOR $' + string(cost) + '.';
    image_speed = 0;
  }
}

class oBow extends oItem {
  // variables
}
