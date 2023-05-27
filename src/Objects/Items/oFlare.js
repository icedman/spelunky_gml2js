function oFlare_STEP($) {
  with ($) {
    try {
      oItem_STEP($);
    } catch (err) {}

    if (instance_exists(oPlayer1)) distToPlayer = distance_to_object(oPlayer1);

    if (collision_point(x, y, oWater, -1, -1)) {
      instance_create(x, y, oSplash);
      playSound(global.sndSplash);
      if (held) {
        [instances_of(oPlayer1)].forEach(($) => {
          with ($) {
            holdItem = 0;
            pickupItemType = '';
          }
        });

        held = false;
      }
      instance_destroy();
    }
  }
}

function oFlare_ALARM_0($) {
  with ($) {
    instance_create(
      x + rand(0, 3) - rand(0, 3),
      y + rand(0, 3) - rand(0, 3),
      oFlareSpark
    );
    alarm[0] = 2;
  }
}

function oFlare_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    image_speed = 0.3;

    type = 'Flare';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    xVel = 0;
    yVel = 0;
    grav = 0.6;
    invincible = true;
    bounce = true;
    distToPlayer = 0;

    alarm[0] = 1;
  }
}

class oFlare extends oItem {
  distToPlayer;
}
