function oUFO_OTHER($) {
  with ($) {
    if (sprite_index == sUFOBlast) {
      status = DESTROY;
      sprite_index = sUFO;
    }
  }
}

function oUFO_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 20 &&
      x < view_xview[0] + view_wview[0] + 4 &&
      y > view_yview[0] - 20 &&
      y < view_yview[0] + view_hview[0] + 4
    ) {
      moveTo(xVel, yVel);

      if (hp < 1) {
        instance_create(x, y, oUFOCrash);
        if (countsAsKill) {
          if (isRealLevel()) global.enemyKills[16] += 1;
          global.ufos += 1;
          global.kills += 1;
        }
        instance_destroy();
      }

      dir = 0;
      dist = point_distance(x, y, oCharacter.x, oCharacter.y);
      if (dist < 160 && !alerted) {
        alerted = true;
        playSound(global.sndAlien);
      }

      if (status == DESTROY) {
        yVel = 0;
        if (shiftToggle == 0) {
          // right
          xVel = 1;
          shift += 1;
          if (shift >= 64) {
            shiftToggle = 1;
          }
        } else {
          xVel = -1;
          shift -= 1;
          if (shift <= -64) {
            shiftToggle = 0;
          }
        }

        if (isCollisionLeft(1)) {
          x += 1;
          shiftToggle = 0;
          shift = -64;
        }

        if (isCollisionRight(1)) {
          x -= 1;
          shiftToggle = 1;
          shift = 64;
        }

        if (abs(oCharacter.x - (x + 8)) < 8) {
          status = BLAST;
          playSound(global.sndLaserCharge);
        }

        if (oPlayer1.y < y || y < oPlayer1.y - 96) status = SEARCH;
      } else if (status == BLAST) {
        xVel = 0;
        yVel = 0;
        sprite_index = sUFOBlast;
        if (image_index == 16) {
          instance_create(x + 8, y + 16, oLaser);
          playSound(global.sndLaser);
        }
      } else if (
        instance_exists(oCharacter) &&
        !oCharacter.swimming &&
        !oCharacter.dead
      ) {
        if (y > oCharacter.y - 48) {
          if (yVel == 2) status = DESTROY;
          yVel = -2;
          //if (isCollisionTop(1)) y += 2;
        } else {
          if (yVel == -2) status = DESTROY;
          yVel = 2;
          //if (isCollisionBottom(1)) y -= 2;
        }

        if (shiftToggle == 0) {
          // right
          xVel = 1;
          shift += 1;
          if (shift >= 32) {
            shiftToggle = 1;
            if (oCharacter.x > x) shift = 0;
          }
        } else {
          xVel = -1;
          shift -= 1;
          if (shift <= -32) {
            shiftToggle = 0;
            if (oCharacter.x < x) shift = 0;
          }
        }

        if (isCollisionLeft(1)) {
          x += 1;
          shiftToggle = 0;
          shift = -32;
        }

        if (isCollisionRight(1)) {
          x -= 1;
          shiftToggle = 1;
          shift = 32;
        }
      }
    }
  }
}

function oUFO_CREATE($) {
  with ($) {
    try {
      oEnemy_CREATE($);
    } catch (err) {}

    type = 'UFO';
    image_speed = 0.5;
    setCollisionBounds(1, 0, 15, 14);
    origX = 0;
    origY = 0;
    xVel = 0;
    yVel = 0;
    xAcc = 0.2;
    yAcc = 0.2;

    // stats
    hp = 1;
    invincible = 0;
    flying = true;

    // status
    SEARCH = 0;
    DESTROY = 1;
    BLAST = 2;

    status = SEARCH;
    alerted = false;

    shift = 0;
    shiftToggle = rand(0, 1);

    shakeCounter = 0;
    shakeToggle = 1;
  }
}

class oUFO extends oEnemy {
  BLAST;
  DESTROY;
  SEARCH;
  alerted;
  flying;
  oLaser;
  oUFOCrash;
  origX;
  origY;
  sUFO;
  sUFOBlast;
  shift;
  shiftToggle;
  sndAlien;
  sndLaser;
  sndLaserCharge;
  ufos;
  sprite_index = sUFO;
  visible = true;
}
ObjType.oUFO = oUFO;
