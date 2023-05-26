function oSceptre_STEP($) {
  with ($) {
    action_inherited();

    if (held) {
      if (oPlayer1.acing == 18) sprite_index = sSceptreLeft;
      else sprite_index = sSceptreRight;
    }
  }
}

function oSceptre_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Sceptre';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    cost = 0;
    buyMessage = "I SHOULDN'T BE SELLING THIS!";
  }
}

class oSceptre extends oItem {
  // variables
}
