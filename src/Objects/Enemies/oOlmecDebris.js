function oOlmecDebris_STEP($) {
  with ($) {
    try {
      oDrawnSprite_STEP($);
    } catch (err) {}

    x += xVel;
    y += yVel;

    if (bounce) {
      if (yVel < 6) {
        yVel += grav;
      }

      if (collision_point(x, y + 4, oTemple, 0, 0)) {
        // bounce
        if (yVel > 1) yVel = -yVel * 0.4;
        else {
          instance_create(x, y, oSmokePuff);
          instance_destroy();
        }

        // friction
        if (abs(xVel) < 0.1) xVel = 0;
        else if (abs(xVel) != 0) xVel *= 0.3;
      }
    }
  }
}

function oOlmecDebris_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0.3;

    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    xVel = random(4) - random(4);
    yVel = -1 - random(2);
    grav = 0.6;
    invincible = true;
    bounce = true;

    n = rand(1, 3);

    if (n == 1) sprite_index = sOlmecDebris2;
    else if (n == 2) sprite_index = sOlmecDebris3;
  }
}

class oOlmecDebris extends oDrawnSprite {}
