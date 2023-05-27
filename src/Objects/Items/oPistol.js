function oPistol_STEP($) {
  with ($) {
    try {
      oItem_STEP($);
    } catch (err) {}

    if (held) {
      if (oPlayer1.acing == 18) sprite_index = sPistolLeft;
      else sprite_index = sPistolRight;
    }
  }
}

function oPistol_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Pistol';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    cost = 5000;
    buyMessage = 'A PISTOL FOR $' + string(cost) + '.';
  }
}

class oPistol extends oItem {
  sPistolLeft;
  sPistolRight;
}
ObjType.oPistol = oPistol;
