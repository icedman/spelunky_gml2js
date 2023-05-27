function oBatTarget_COLLISION_oArrow($) {
  with ($) {
    playSound(global.sndHit);
    playSound(global.sndCoin);
    oMoonRoom.baskets += difficulty;

    instances_of(other).forEach(($) => {
      with ($) {
        instance_destroy();
      }
    });

    instance_create(xMid, -64, oBatTarget);

    if ((sprite_index = sUFO)) instance_create(x, y, oUFOCrash);
    else scrCreateBlood(x + 8, y + 8, 3);
    instance_destroy();
  }
}

function oBatTarget_COLLISION_oCharacter($) {
  with ($) {
    // jumped on - oCaveman, oManTrap replaces this script with its own
    if (abs(other.x - (x + 8)) > 12) {
      // do nothing
    } else if (
      !other.dead &&
      (other.state == 15 || other.state == 16) &&
      other.y < y + 8 &&
      !other.swimming
    ) {
      other.yVel = -6 - 0.2 * other.yVel;
      playSound(global.sndHit);
      playSound(global.sndCoin);
      oMoonRoom.baskets += difficulty;

      instance_create(x, -64, oBatTarget);

      scrCreateBlood(x + 8, y + 8, 3);
      instance_destroy();
    } else if (other.invincible == 0) {
      other.blink = 30;
      other.invincible = 30;
      if (other.x < x) other.xVel = -6;
      else other.xVel = 6;

      if (global.plife > 0) global.plife -= 1;
      scrCreateBlood(x + 4, y + 4, 1);
      playSound(global.sndHurt);
    }
  }
}

function oBatTarget_STEP($) {
  with ($) {
    if (dir == UP) {
      y -= difficulty;
      if (y <= 64) {
        dir = DOWN;
      }
    } else if (dir == DOWN) {
      y += difficulty;
      if (y >= 160) {
        dir = UP;
      }
    }

    if (oMoonRoom.timer <= 20 && y > 64) {
      x = xMid - abs(sin(xDiff) * 32);
      xDiff += 0.01;
    }
  }
}

function oBatTarget_CREATE($) {
  with ($) {
    bloodless = false;
    UP = 0;
    DOWN = 1;
    dir = 1;
    if (x == 208) difficulty = 2;
    else if (x == 256) difficulty = 4;
    else difficulty = 1;
    xMid = x;
    xDiff = 0;
    if (oMoonRoom.timer <= 20) {
      difficulty += 2;
      sprite_index = sUFO;
    }
  }
}

class oBatTarget extends oObject {
  difficulty;
  oBatTarget;
  xDiff;
  xMid;
}
ObjType.oBatTarget = oBatTarget;
