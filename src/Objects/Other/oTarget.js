function oTarget_COLLISION_oArrow($) {
  with ($) {
    other.xVel = 0;
    other.yVel = 0;
    if (!dying) {
      dying = true;
      n = 0;
      if (other.y >= y - 2 && other.y <= y + 2) {
        n = 5;
        playSound(global.sndCoin);
      } else if (other.y >= y - 6 && other.y <= y - 3) n = 3;
      else if (other.y >= y + 3 && other.y <= y + 6) n = 3;
      else if (other.y >= y - 10 && other.y <= y - 7) n = 2;
      else if (other.y >= y + 7 && other.y <= y + 10) n = 2;
      else n = 1;
      //if (hard) n *= 2;
      oMoonRoom.baskets += n;
      playSound(global.sndHit);
    }

    if (life <= 2) {
      instances_of(other).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
    }
  }
}

function oTarget_STEP($) {
  with ($) {
    if (dying) {
      if (life > 0) life -= 1;
      else {
        life = 20;
        dying = false;
      }
    } else {
      if (dir == UP) {
        if (hard) y -= 2;
        else y -= 1;
        moveOff += 1;
        if (y <= 64 || moveOff > 64) {
          dir = DOWN;
          moveOff = 0;
        }
      } else if (dir == DOWN) {
        if (hard) y += 2;
        else y += 1;
        moveOff += 1;
        if (y >= 160 || moveOff > 64) {
          dir = UP;
          moveOff = 0;
        }
      }

      if (oMoonRoom.timer <= 30) {
        x = 240 - abs(sin(xDiff) * 64);
        xDiff += 0.01;
      }
    }
  }
}

function oTarget_CREATE($) {
  with ($) {
    life = 20;
    dying = false;
    UP = 0;
    DOWN = 1;
    dir = rand(0, 1);
    moveOff = 32;
    hard = false;
    if (x > 208) hard = true;
    xDiff = 0;
  }
}

class oTarget extends oObject {
  hard;
  moveOff;
  sprite_index = sTarget;
  visible = true;
}
ObjType.oTarget = oTarget;
