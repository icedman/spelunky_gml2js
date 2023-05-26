function oWebCannon_STEP($) {
  with ($) {
    action_inherited();

    if (held) {
      if (oPlayer1.acing == 18) sprite_index = sWebCannonL;
      else sprite_index = sWebCannonR;
    }
  }
}

function oWebCannon_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Web Cannon';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    cost = 2000;
    buyMessage = 'A WEB CANNON FOR $' + string(cost) + '.';
  }
}

class oWebCannon extends oItem {
  // variables
}
