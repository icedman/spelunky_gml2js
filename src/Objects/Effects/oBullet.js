function oBullet_COLLISION_oCharacter($) {
  with ($) {
    if (
      other.sprite_index != sPExit &&
      other.sprite_index != sDamselExit &&
      other.sprite_index != sTunnelExit
    ) {
      if (global.plife > 0) {
        global.plife -= 4;
        if (global.plife <= 0 && isRealLevel()) global.enemyDeaths[19] += 1;
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

function oBullet_COLLISION_oSolid($) {
  with ($) {
    instance_create(x, y, oSmokePuff);
    playSound(global.sndHit);
    instance_destroy();
  }
}

function oBullet_STEP($) {
  with ($) {
    x += xVel;
    y += yVel;
  }
}

function oBullet_ALARM_0($) {
  with ($) {
    safe = false;
  }
}

function oBullet_COLLISION_oEnemy($) {
  with ($) {
    if (!safe) {
      if (other.type == 'Yeti King' || other.type == 'Tomb Lord') {
        other.xVel = xVel * 0.5;
        other.yVel = -2;
      } else {
        other.xVel = xVel;
        other.yVel = -4;
      }

      [instances_of(other)].forEach(($) => {
        with ($) {
          hp -= 4;
          if (
            (type == 'Caveman' ||
              type == 'Yeti' ||
              type == 'Hawkman' ||
              type == 'Shopkeeper') &&
            status != 99
          ) {
            status = 98;
            counter = 20;
          }

          if (bloodLeft > 0) {
            scrCreateBlood(x + sprite_width / 2, y + sprite_height / 2, 1);
            if (hp < 0) bloodLeft -= 1;
          }
        }
      });

      playSound(global.sndHit);
      instance_destroy();
    }
  }
}

function oBullet_CREATE($) {
  with ($) {
    xVel = 0;
    yVel = 0;
    safe = false;
    // alarm[0] = 5;
  }
}

function oBullet_COLLISION_oDamsel($) {
  with ($) {
    if (!other.invincible) {
      [instances_of(other)].forEach(($) => {
        with ($) {
          if (bloodLeft > 0) {
            scrCreateBlood(x + sprite_width / 2, y + sprite_height / 2, 1);
            if (hp < 0) bloodLeft -= 1;
          }
          if (held) {
            held = false;
            [instances_of(oPlayer1)].orEach(($) => {
              with ($) {
                holdItem = 0;
              }
            });
          }
          hp -= 4;
          yVel = -6;
          status = 2;
          counter = 120;
        }
      });

      other.xVel = xVel * 0.3;
      if (other.hp > 0) playSound(global.sndDamsel);
      instance_destroy();
    }
  }
}

class oBullet extends oObject {}
