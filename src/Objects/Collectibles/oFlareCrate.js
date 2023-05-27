function oFlareCrate_STEP($) {
  with ($) {
    try {
      oItem_STEP($);
    } catch (err) {}

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
      instance_create(x, y, oPoof);
      instance_destroy();
    }
  }
}

function oFlareCrate_ALARM_0($) {
  with ($) {
    instance_create(
      x + rand(0, 3) - rand(0, 3),
      y - 4 + rand(0, 3) - rand(0, 3),
      oFlareSpark
    );
    alarm[0] = 2;
  }
}

function oFlareCrate_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Flare Crate';
    makeActive();
    setCollisionBounds(-6, 0, 6, 8);

    image_speed = 0.2;
    alarm[0] = 1;
    heavy = true;

    yVel = 0;
    yAcc = 0.2;
  }
}

class oFlareCrate extends oItem {}
