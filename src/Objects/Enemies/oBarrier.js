function oBarrier_COLLISION_oWebBall($) {
  with ($) {
    [instances_of(other)].forEach(($) => {
      with ($) {
        instance_destroy();
      }
    });
  }
}

function oBarrier_COLLISION_oBullet($) {
  with ($) {
    [instances_of(other)].forEach(($) => {
      with ($) {
        instance_create(x, y, oSmokePuff);
        playSound(global.sndHit);
        instance_destroy();
      }
    });
  }
}

function oBarrier_COLLISION_oCharacter($) {
  with ($) {
    if (other.invincible == 0) {
      other.blink = 30;
      other.invincible = 30;
      other.yVel = -2;
      if (other.x < x) other.xVel = -6;
      else other.xVel = 6;

      if (global.plife > 0) global.plife -= 1;
      playSound(global.sndHurt);
    }
  }
}

function oBarrier_COLLISION_oItem($) {
  with ($) {
    if (other.type == 'Bomb') {
      [instances_of(other)].forEach(($) => {
        with ($) {
          sprite_index = sBombArmed;
          image_speed = 1;
          alarm[1] = rand(4, 8);
        }
      });
    }

    other.xVel = -rand(4, 6);
    other.yVel = -2;

    if (other.held) {
      if (oCharacter) oCharacter.holdItem = 0;
    }
  }
}

class oBarrier extends oObject {}
