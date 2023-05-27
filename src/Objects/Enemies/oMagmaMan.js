function oMagmaMan_COLLISION_oWhip($) {
  with ($) {
    if (!whipped) {
      playSound(global.sndHit);
      whipped = true;
      alarm[0] = 10;
    }
  }
}

function oMagmaMan_COLLISION_oCharacter($) {
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

function oMagmaMan_COLLISION_oBomb($) {
  with ($) {
    if (other.sprite_index != sBombArmed) {
      instances_of(other).forEach(($) => {
        with ($) {
          sprite_index = sBombArmed;
          image_speed = 1;
          alarm[1] = rand(8, 12);
        }
      });
    }

    if (other.x < x) other.xVel = -rand(2, 4);
    else other.xVel = rand(2, 4);
    if (other.y < y) other.yVel = -rand(2, 4);

    if (other.held) {
      if (oCharacter) oCharacter.holdItem = 0;
    }
  }
}

function oMagmaMan_OTHER($) {
  with ($) {
    if (sprite_index == sMagmaManDie) {
      instance_destroy();
    }
  }
}

function oMagmaMan_STEP($) {
  with ($) {
    if (hp > 0) hp -= 1;
    if (collision_point(x + 8, y + 8, oSolid, 0, 0) || hp < 1) {
      xVel = 0;
      yVel = 0;
      status = DEAD;
      sprite_index = sMagmaManDie;
    }

    yVel += myGrav;
    if (yVel > yVelLimit) yVel = yVelLimit;

    if (isCollisionBottom(1)) yVel = 0;
    else {
      instance_create(x + 8, y + 8, oMagma);
      instance_destroy();
    }
    /*
if (status != DEAD and hp &lt; 1)
{
    status = DEAD;
)
*/

    if (rand(1, 20) == 1)
      instance_create(x + rand(4, 12), y + rand(4, 12), oBurn);
    burning -= 1;

    if (status == IDLE) {
      if (yVel < 0 && isCollisionTop(1)) {
        yVel = 0;
      }

      if (isCollisionBottom(1) && counter > 0) counter -= 1;
      if (counter < 1) {
        facing = rand(0, 1);
        status = WALK;
        if (rand(1, 6) == 1) {
          magma = instance_create(x + 8, y + 8, oMagma);
          magma.hp = hp;
          instance_destroy();
        }
      }
    } else if (status == WALK) {
      if (isCollisionLeft(1) || isCollisionRight(1)) {
        if (facing == LEFT) facing = RIGHT;
        else facing = LEFT;
      }

      if (facing == LEFT) {
        xVel = -1.5;
        if (!collision_point(x - 1, y + 16, oSolid, -1, -1)) {
          status = IDLE;
          counter = rand(20, 50);
          xVel = 0;
        }
      } else {
        xVel = 1.5;
        if (!collision_point(x + 16, y + 16, oSolid, -1, -1)) {
          status = IDLE;
          counter = rand(20, 50);
          xVel = 0;
        }
      }

      if (rand(1, 100) == 1) {
        status = IDLE;
        counter = rand(20, 50);
        xVel = 0;
      }
    }

    moveTo(xVel, yVel);
    if (isCollisionSolid()) y -= 2;

    if (status < STUNNED && status != THROW) {
      if (abs(xVel) > 0) sprite_index = sMagmaManWalkL;
      else sprite_index = sMagmaManLeft;
    }
  }
}

function oMagmaMan_ALARM_0($) {
  with ($) {
    whipped = false;
  }
}

function oMagmaMan_COLLISION_oEnemy($) {
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
          if (type != 'Tomb Lord' && type != 'Yeti King') {
            status = 98;
            counter = 50;
          }
        }
      });
    }
  }
}

function oMagmaMan_CREATE($) {
  with ($) {
    try {
      oEnemy_CREATE($);
    } catch (err) {}

    makeActive();
    setCollisionBounds(2, 0, sprite_width - 2, sprite_height);
    xVel = 2.5;
    image_speed = 0.5;

    // stats
    type = 'Magma Man';
    hp = 200;
    invincible = 0;

    IDLE = 0;
    WALK = 1;
    ATTACK = 2;
    THROW = 3;
    STUNNED = 98;
    DEAD = 99;
    status = IDLE;

    whipped = false;

    bounced = false;
    dead = false;
    counter = 0;
    sightCounter = 0;

    LEFT = 0;
    RIGHT = 1;
    facing = RIGHT;

    shakeCounter = 0;
    shakeToggle = 1;
  }
}

class oMagmaMan extends oEnemy {
  THROW;
  burning;
  magma;
  oBurn;
  oMagma;
  sBombArmed;
  sMagmaManDie;
  sMagmaManLeft;
  sMagmaManWalkL;
  sightCounter;
  stunTimer;
}
ObjType.oMagmaMan = oMagmaMan;
