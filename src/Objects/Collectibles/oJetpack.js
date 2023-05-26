function oJetpack_STEP($) {
  with ($) {
    action_inherited();

    if (instance_exists(oPlayer1)) if (!oPlayer1.visible) instance_destroy();
  }
}

function oJetpack_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Jetpack';
    makeActive();
    setCollisionBounds(-5, -5, 5, 8);

    cost = 20000;
    buyMessage = 'JETPACK FOR $' + string(cost) + '.';
    heavy = true;
  }
}

class oJetpack extends oItem {
  // variables
}
