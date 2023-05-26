function oKey_STEP($) {
  with ($) {
    action_inherited();

    if (held) {
      if (oPlayer1.acing == 18) sprite_index = sKeyLeft;
      else sprite_index = sKeyRight;
    }
  }
}

function oKey_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Key';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    cost = 0;
  }
}

class oKey extends oItem {
  // variables
}
