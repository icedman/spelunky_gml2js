function oSceptre_STEP($) {
  with ($) {
    try {
      oItem_STEP($);
    } catch (err) {}

    if (held) {
      if (oPlayer1.acing == 18) sprite_index = sSceptreLeft;
      else sprite_index = sSceptreRight;
    }
  }
}

function oSceptre_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Sceptre';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    cost = 0;
    buyMessage = "I SHOULDN'T BE SELLING THIS!";
  }
}

class oSceptre extends oItem {
  sSceptreLeft;
  sSceptreRight;
}
ObjType.oSceptre = oSceptre;
