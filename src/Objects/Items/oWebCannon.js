function oWebCannon_STEP($) {
  with ($) {
    try {
      oItem_STEP($);
    } catch (err) {}

    if (held) {
      if (oPlayer1.acing == 18) sprite_index = sWebCannonL;
      else sprite_index = sWebCannonR;
    }
  }
}

function oWebCannon_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Web Cannon';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    cost = 2000;
    buyMessage = 'A WEB CANNON FOR $' + string(cost) + '.';
  }
}

class oWebCannon extends oItem {}
