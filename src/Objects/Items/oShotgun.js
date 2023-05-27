function oShotgun_STEP($) {
  with ($) {
    try {
      oItem_STEP($);
    } catch (err) {}

    if (held) {
      if (oPlayer1.acing == 18) sprite_index = sShotgunLeft;
      else sprite_index = sShotgunRight;
    }
  }
}

function oShotgun_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Shotgun';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    cost = 15000;
    buyMessage = 'A SHOTGUN FOR $' + string(cost) + '.';
  }
}

class oShotgun extends oItem {}
