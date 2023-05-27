function oAlienBoss_COLLISION_oCharacter($) {
  with ($) {
    if (
      !other.dead &&
      (other.state == 15 || other.state == 16) &&
      other.y < y + 8 &&
      !other.swimming
    ) {
      other.yVel = -6 - 0.2 * other.yVel;
      if (global.hasSpikeShoes) {
        hp -= 3 * (floor(other.allTimer / 16) + 1);
        if (!bloodless) instance_create(other.x, other.y + 8, oBlood);
      } else hp -= 1 * (floor(other.allTimer / 16) + 1);
      other.allTimer = 0;
      countsAsKill = true;
      instance_create(x + 16, y + 8, oBlood);
      playSound(global.sndHit);
    } else if (other.invincible == 0 && status != DEAD) {
      other.blink = 30;
      other.invincible = 30;
      if (other.y < y) other.yVel = -6;
      if (other.x < x) other.xVel = -6;
      else other.xVel = 6;

      if (global.plife > 0) {
        global.plife -= 1;
        if (global.plife <= 0 && isRealLevel()) global.enemyDeaths[17] += 1;
      }
      playSound(global.sndHurt);
    }
  }
}

function oAlienBoss_OTHER($) {
  with ($) {
    if (sprite_index == sAlienBossDie) {
      sprite_index = sAlienBossDead;
      [instances_of(oBarrierEmitter)].orEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
    }
    if (sprite_index == sAlienBossHurt) {
      sprite_index = sAlienBoss;
    }
  }
}

function oAlienBoss_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 36 &&
      x < view_xview[0] + view_wview[0] &&
      y > view_yview[0] - 36 &&
      y < view_yview[0] + view_hview[0]
    ) {
      if (collision_point(x + 8, y + 8, oSolid, 0, 0)) {
        hp = 0;
      }

      if (hp < 1 && status != DEAD) {
        status = DEAD;
        sprite_index = sAlienBossDie;
        depth = 101;
        for (r = 0; r < c; r++) {
          n = rand(1, 3);
          switch (n) {
            case 1: {
              gem = instance_create(x + 16, y + 16, oEmeraldBig);
              break;
            }
            case 2: {
              gem = instance_create(x + 16, y + 16, oSapphireBig);
              break;
            }
            case 3: {
              gem = instance_create(x + 16, y + 16, oRubyBig);
              break;
            }
          }
          gem.xVel = rand(0, 3) - rand(0, 3);
          gem.yVel = -2;
        }
        if (countsAsKill) {
          if (isRealLevel()) global.enemyKills[17] += 1;
          global.alienbosses += 1;
          global.kills += 1;
        }
      }

      if (sprite_index == sAlienBossDie) {
        if (rand(1, 2) == 1) {
          scrCreateBlood(x + 8, y + rand(14, 18), 1);
          blood = instance_create(x + 8, y + rand(14, 18), oBlood);
        }
      }

      yVel += myGrav;
      if (yVel > yVelLimit) yVel = yVelLimit;

      if (xVel > 0) xVel -= 0.1;
      if (xVel < 0) xVel += 0.1;
      if (abs(xVel) < 0.5) xVel = 0;

      if (isCollisionBottom(1) && status != STUNNED) yVel = 0;

      if (status == IDLE) {
        xVel = 0;
      }

      moveTo(xVel, yVel);

      if (isCollisionSolid()) y -= 2;

      dist = distance_to_object(oPlayer1);

      if (psychicRecover > 0) psychicRecover -= 1;
      else if (
        dist < 96 &&
        status != DEAD &&
        !oPlayer1.dead &&
        !oPlayer1.stunned &&
        oPlayer1.invincible == 0
      ) {
        for (i = 0; i < 6; i += 1) {
          instance_create(
            x + 16 + rand(0, 32) - rand(0, 32),
            y + 16 + rand(0, 32) - rand(0, 32),
            oPsychicCreate
          );
        }
        instance_create(x + 16, y + 16, oPsychicWave);
        psychicRecover = 100;
        playSound(global.sndPsychic);
      }

      if (sprite_index != sAlienBossHurt) image_speed = 0.25;

      if (status != DEAD && sprite_index != sAlienBossHurt && facing == LEFT) {
        sprite_index = sAlienBoss;
      }
      if (status != DEAD && sprite_index != sAlienBossHurt && facing == RIGHT) {
        sprite_index = sAlienBoss;
      }
    }
  }
}

function oAlienBoss_CREATE($) {
  with ($) {
    try {
      oEnemy_CREATE($);
    } catch (err) {}

    makeActive();
    setCollisionBounds(0, 0, 32, 32);
    xVel = 2.5;
    image_speed = 0.25;

    // stats
    type = 'Alien Boss';
    hp = 10;
    invincible = 0;

    IDLE = 0;
    DEAD = 99;
    status = IDLE;

    canPickUp = false;
    bounced = false;
    dead = false;
    counter = 0;

    LEFT = 0;
    RIGHT = 1;
    facing = LEFT;

    shakeCounter = 0;
    shakeToggle = 1;

    psychicRecover = 100;
  }
}

class oAlienBoss extends oEnemy {
  blood;
  psychicRecover;
}
