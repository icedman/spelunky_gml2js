function oBasketball_STEP($) {
  with ($) {
    action_inherited();

    if (colLeft || colRight) wallBounce = true;
    else if (colBot) wallBounce = false;

    if (
      collision_rectangle(x - 1, y + 4, x + 1, y + 5, oRimDeflect, 0, 0) &&
      !goingIn &&
      bounces < 40
    ) {
      yVel = -yVel * 0.8;
      obj = instance_nearest(x, y, oRimDeflect);
      if (x < obj.x + 8 && abs(obj.x + 8 - x) > 7) {
        xVel = -2;
        yVel = -0.5;
      } else if (x > obj.x + 8 && abs(obj.x + 8 - x) > 7) {
        xVel = 2;
        yVel = -0.5;
      } else if (abs(obj.x + 8 - x) < 4) {
        if (x < obj.x + 8) xVel = 1;
        else xVel = -0.2;
        yVel = -0.5;
      }
      bounces += 10;
    }

    if (bounces > 0) bounces -= 1;

    if (collision_point(x, y, oRim, 0, 0)) {
      if (!goingIn && (yVel > 0 || (held && oPlayer1.state == 16))) {
        [instances_of(oMoonRoom)].orEach(($) => {
          with ($) {
            alarm[0] = 20;
          }
        });
        xVel = 0;
        yVel = 0;
        goingIn = true;
        obj = instance_nearest(x, y, oBasket);
        obj.sprite_index = sBasketSwoosh;
        obj.image_index = 0;
        if (held) {
          oMoonRoom.baskets += 1;
          oPlayer1.holdItem = false;
        } else if (wallBounce) {
          oMoonRoom.baskets += 3;
        } else oMoonRoom.baskets += 2;
        held = false;
      }
    } else goingIn = false;

    if (held && collision_point(x, y + 6, oSolid, 0, 0))
      sprite_index = sDribble;
    else sprite_index = sBasketball;
  }
}

function oBasketball_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Basketball';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    bounceFactor = 0.7;
    bounces = 0;
    wallBounce = false;
    frictionFactor = 0.6;
    goingIn = false;
  }
}

class oBasketball extends oItem {
  // variables
}
