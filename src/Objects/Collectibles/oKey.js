function oKey_STEP($) {
  with ($) {
    try {
      oItem_STEP($);
    } catch (err) {}

    if (held) {
      if (oPlayer1.acing == 18) sprite_index = sKeyLeft;
      else sprite_index = sKeyRight;
    }
  }
}

function oKey_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Key';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    cost = 0;
  }
}

class oKey extends oItem {}
