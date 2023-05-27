function oJetpack_STEP($) {
  with ($) {
    try {
      oItem_STEP($);
    } catch (err) {}

    if (instance_exists(oPlayer1)) if (!oPlayer1.visible) instance_destroy();
  }
}

function oJetpack_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Jetpack';
    makeActive();
    setCollisionBounds(-5, -5, 5, 8);

    cost = 20000;
    buyMessage = 'JETPACK FOR $' + string(cost) + '.';
    heavy = true;
  }
}

class oJetpack extends oItem {}
ObjType.oJetpack = oJetpack;
