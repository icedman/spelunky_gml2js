function oLaser_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oLaser_COLLISION_oSolid($) {
  with ($) {
    [instances_of(other)].forEach(($) => {
      with ($) {
        if (!invincible) {
          if (collision_point(x, y, oGold, 0, 0)) {
            gold = instance_place(x, y, oGold);
            [instances_of(gold)].orEach(($) => {
              with ($) {
                instance_destroy();
              }
            });
          }
          if (collision_point(x, y, oGoldBig, 0, 0)) {
            gold = instance_place(x, y, oGoldBig);
            [instances_of(gold)].orEach(($) => {
              with ($) {
                instance_destroy();
              }
            });
          }
          instance_destroy();
        }

        tile = tile_layer_find(3, x, y - 16);
        if (tile) tile_delete(tile);
      }
    });

    instance_create(x, y, oLaserExplode);
    // global.checkWater = true;
    instance_destroy();
  }
}

function oLaser_STEP($) {
  with ($) {
    y += yVel;
    yVel += yAcc;
    if (yVel > 4) yVel = 0;

    /*if (collision_point(x, y, oDark, 0, 0) or
    collision_point(x, y, oDarkFall, 0, 0) or
    collision_point(x, y, oIce, 0, 0))
{
    instance_destroy();
}*/
  }
}

function oLaser_ALARM_0($) {
  with ($) {
    instance_create(x, y, oLaserTrail);
    alarm[0] = 1;
  }
}

function oLaser_COLLISION_oEnemy($) {
  with ($) {
    if (other.type != 'UFO' && other.invincible == 0) {
      other.hp -= 3;
      other.xVel = rand(0, 2) - rand(1, 2);
      other.xVel = -1;
      other.yVel = -6;
      instance_create(x, y, oLaserExplode);
      // global.checkWater = true;
      instance_destroy();
    }
  }
}

function oLaser_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    yVel = 0;
    yAcc = 0.6;
    alarm[0] = 1;
  }
}

function oLaser_COLLISION_oDamsel($) {
  with ($) {
    if (!other.invincible) {
      other.hp -= 3;
      other.xVel = rand(0, 2) - rand(1, 2);
      other.xVel = -1;
      other.yVel = -6;
      status = 2;

      instance_create(x, y, oLaserExplode);
      instance_destroy();
    }
  }
}

class oLaser extends oDrawnSprite {}
