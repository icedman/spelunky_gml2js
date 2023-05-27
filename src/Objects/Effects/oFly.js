function oFly_COLLISION_oCharacter($) {
  with ($) {
    if (
      other.sprite_index != sPExit &&
      other.sprite_index != sDamselExit &&
      other.sprite_index != sTunnelExit
    ) {
      if (global.plife > 0) {
        global.plife -= 2;
        if (global.plife <= 0 && isRealLevel()) global.enemyDeaths[20] += 1;
      }
      other.xVel = xVel;
      other.yVel = -4;

      [instances_of(other)].forEach(($) => {
        with ($) {
          instance_create(x, y, oBlood);
          stunned = true;
          stunTimer = 20;
        }
      });

      playSound(global.sndHurt);
      instance_destroy();
    }
  }
}

function oFly_COLLISION_oSolid($) {
  with ($) {
    instance_create(x, y, oSmokePuff);
    playSound(global.sndHit);
    instance_destroy();
  }
}

function oFly_STEP($) {
  with ($) {
    x += xVel;
    y += yVel;

    if (xVel < 0) sprite_index = sFlyLeft;
    else sprite_index = sFlyRight;
  }
}

function oFly_COLLISION_oEnemy($) {
  with ($) {
    if (other.type != 'Tomb Lord') {
      if (other.heavy) {
        other.xVel = xVel * 0.5;
        other.yVel = -2;
      } else {
        other.xVel = xVel;
        other.yVel = -4;
      }
      other.xVel = xVel;
      other.yVel = -4;

      [instances_of(other)].forEach(($) => {
        with ($) {
          hp -= 2;
          if (bloodLeft > 0) {
            scrCreateBlood(x + sprite_width / 2, y + sprite_height / 2, 1);
            if (hp < 0) bloodLeft -= 1;
          }
          status = 98;
          counter = 20;
        }
      });

      playSound(global.sndHit);
      instance_destroy();
    }
  }
}

function oFly_CREATE($) {
  with ($) {
    xVel = 0;
    yVel = -random(3) + 0.5;
  }
}

function oFly_COLLISION_oDamsel($) {
  with ($) {
    if (!other.invincible) {
      if (other.bloodLeft > 0) {
        [instances_of(other)].forEach(($) => {
          with ($) {
            scrCreateBlood(x + sprite_width / 2, y + sprite_height / 2, 1);
            if (hp < 0) bloodLeft -= 1;
          }
        });
      }
      [instances_of(other)].forEach(($) => {
        with ($) {
          if (held) {
            held = false;
            [instances_of(oPlayer1)].orEach(($) => {
              with ($) {
                holdItem = 0;
              }
            });
          }
          hp -= 2;
          yVel = -6;
          status = 2;
          counter = 120;
        }
      });

      other.xVel = xVel * 0.3;
      playSound(global.sndDamsel);
      instance_destroy();
    }
  }
}

class oFly extends oObject {}
