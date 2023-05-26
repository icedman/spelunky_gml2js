function oPsychicWaveP_OTHER($) {
  with ($) {
    action_kill_object();

    action_kill_object();
  }
}

function oPsychicWaveP_STEP($) {
  with ($) {
    if (counter > 0) {
      counter -= 1;
      x += xVel;
      if (xVel > 0) dir = 0;
      else dir = 180;
    } else {
      if (instance_exists(oEnemy)) {
        obj = instance_nearest(x, y, oEnemy);
        dir = point_direction(x, y, obj.x + 8, obj.y + 8);
      }
      x += 2 * cos(degtorad(dir));
      y += -2 * sin(degtorad(dir));
    }
  }
}

function oPsychicWaveP_COLLISION_oEnemy($) {
  with ($) {
    if (other.type != 'Alien Boss' && other.invincible == 0) {
      other.hp -= 3;
      other.xVel = rand(0, 2) - rand(1, 2);
      other.xVel = -1;
      other.yVel = -6;
    }
  }
}

function oPsychicWaveP_CREATE($) {
  with ($) {
    action_inherited();

    yVel = 0;
    yAcc = 0.6;
    image_speed = 0.25;
    counter = 5;
    dir = 0;
  }
}

function oPsychicWaveP_COLLISION_oDamsel($) {
  with ($) {
    if (!other.invincible) {
      other.hp -= 3;
      other.xVel = rand(0, 2) - rand(1, 2);
      other.xVel = -1;
      other.yVel = -6;
      status = 2;
    }

    // instance_create(x, y, oLaserExplode);

    // global.checkWater = true;

    instance_destroy();
  }
}

class oPsychicWaveP extends oDrawnSprite {
  // variables
}
