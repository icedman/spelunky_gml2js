function oPistol_STEP($) {
  with ($) {
    action_inherited();

    if (held) {
      if (oPlayer1.acing == 18) sprite_index = sPistolLeft;
      else sprite_index = sPistolRight;
    }
  }
}

function oPistol_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Pistol';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    cost = 5000;
    buyMessage = 'A PISTOL FOR $' + string(cost) + '.';
  }
}

class oPistol extends oItem {
  // variables
}
