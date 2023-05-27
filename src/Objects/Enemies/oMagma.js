function oMagma_COLLISION_oCharacter($) {
  with ($) {
    if (other.invincible == 0) {
      other.blink = 30;
      other.invincible = 30;
      other.stunned = true;
      other.stunTimer = 20;
      other.burning = 100;
      other.yVel = -4;
      if (other.x < x) other.xVel = -6;
      else other.xVel = 6;
      instance_create(other.x, other.y, oBlood);

      if (global.plife > 0) {
        global.plife -= 2;
        if (global.plife <= 0 && isRealLevel()) global.enemyDeaths[21] += 1;
      }
      playSound(global.sndHurt);
      playSound(global.sndFlame);
    }
  }
}

function oMagma_OTHER($) {
  with ($) {
    if (dying) {
      magma = instance_create(x - 8, y - 8, oMagmaMan);
      magma.hp = hp;
      instance_destroy();
    }
  }
}

function oMagma_STEP($) {
  with ($) {
    try {
      oDetritus_STEP($);
    } catch (err) {}

    if (isCollisionBottom(1)) {
      sprite_index = sMagmaManCreate;
      xVel = 0;
      yVel = 0;
      dying = true;
    }
  }
}

function oMagma_ALARM_0($) {
  with ($) {
    instance_create(x, y, oMagmaTrail);
    alarm[0] = 2;
  }
}

function oMagma_COLLISION_oEnemy($) {
  with ($) {
    if (other.type != 'Magma Man') {
      other.yVel = -4;
      if (x < other.x) other.xVel = -3;
      else other.xVel = 3;
      if (other.status != 98) playSound(global.sndFlame);
      instances_of(other).forEach(($) => {
        with ($) {
          burning = 100;
          hp -= 2;
          status = 98;
          counter = 50;
        }
      });
    }
  }
}

function oMagma_CREATE($) {
  with ($) {
    try {
      oDetritus_CREATE($);
    } catch (err) {}

    image_speed = 0.3;

    makeActive();
    setCollisionBounds(-8, -8, 8, 8);
    xVel = random(4) - random(4);
    yVel = -1 - random(2);
    grav = rand(1, 6) * 0.1;
    hp = 200;

    alarm[0] = 2;
    alarm[1] = 50;
  }
}

function oMagma_COLLISION_oWater($) {
  with ($) {
    instance_create(x, y, oSmokePuff);
    instance_destroy();
  }
}

class oMagma extends oDetritus {
  dying;
  oMagmaMan;
  oMagmaTrail;
  sMagmaManCreate;
}
ObjType.oMagma = oMagma;
