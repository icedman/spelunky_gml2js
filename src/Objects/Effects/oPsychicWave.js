function oPsychicWave_OTHER($) {
  with ($) {
    action_kill_object();

    action_kill_object();
  }
}

function oPsychicWave_STEP($) {
  with ($) {
    dir = point_direction(x, y, oCharacter.x, oCharacter.y);
    x += 2 * cos(degtorad(dir));
    y += -2 * sin(degtorad(dir));
  }
}

function oPsychicWave_COLLISION_oEnemy($) {
  with ($) {
    if (other.type != 'Alien Boss' && other.invincible == 0) {
      other.hp -= 3;
      other.xVel = rand(0, 2) - rand(1, 2);
      other.xVel = -1;
      other.yVel = -6;
    }
  }
}

function oPsychicWave_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    yVel = 0;
    yAcc = 0.6;
    image_speed = 0.25;
  }
}

function oPsychicWave_COLLISION_oDamsel($) {
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

class oPsychicWave extends oDrawnSprite {
  sprite_index = sPsychicWave;
  visible = true;
}
ObjType.oPsychicWave = oPsychicWave;
