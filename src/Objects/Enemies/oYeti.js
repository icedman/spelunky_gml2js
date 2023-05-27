function oYeti_COLLISION_oWhip($) {
  with ($) {
    if (!whipped) {
      if (other.puncture) {
        hp -= other.damage;
        countsAsKill = true;
        if (bloodLeft > 0) {
          scrCreateBlood(x + sprite_width / 2, y + sprite_height / 2, 1);
          if (hp < 0) bloodLeft -= 1;
        }
        status = STUNNED;
        counter = stunTime;
        yVel = -3;
        if (oPlayer1.x - 8 < x) xVel = 2;
        else xVel = -2;
        image_speed = 0.5;
        playSound(global.sndHit);
        whipped = true;
        alarm[0] = 10;
      } else {
        yVel = -2;
        if (oPlayer1.x - 8 < x) xVel = 1;
        else xVel = -1;
        playSound(global.sndHit);
        whipped = true;
        alarm[0] = 10;
      }
    }
  }
}

function oYeti_COLLISION_oWhipPre($) {
  with ($) {
    if (!whipped) {
      if (other.type == 'Machete') {
        hp -= other.damage;
        countsAsKill = true;
        if (bloodLeft > 0) {
          scrCreateBlood(x + sprite_width / 2, y + sprite_height / 2, 1);
          if (hp < 0) bloodLeft -= 1;
        }
        status = STUNNED;
        counter = stunTime;
        yVel = -3;
        if (other.x < x + 8) xVel = 2;
        else xVel = -2;
        image_speed = 0.5;
        playSound(global.sndHit);
        whipped = true;
        alarm[0] = 10;
      } else {
        yVel = -2;
        if (other.x < x) xVel = 1;
        else xVel = -1;
        playSound(global.sndHit);
        whipped = true;
        alarm[0] = 10;
      }
    }
  }
}

function oYeti_COLLISION_oCharacter($) {
  with ($) {
    // jumped on
    if (abs(other.x - (x + 8)) > 8) {
      // do nothing
    } else if (
      !other.dead &&
      !other.stunned &&
      (other.state == 15 || other.state == 16) &&
      other.y < y + 5 &&
      !other.swimming
    ) {
      if (status < STUNNED) {
        other.yVel = -6 - 0.2 * other.yVel;
        if (global.hasSpikeShoes) {
          hp -= 3 * ceil(other.allTimer / 16);
          instance_create(other.x, other.y + 8, oBlood);
        } else hp -= 1 * ceil(other.allTimer / 16);
        other.allTimer = 0;
        status = STUNNED;
        counter = stunTime;
        yVel = -6;
        if (other.x < x + 8) xVel += 1;
        else xVel -= 1;
        image_speed = 0.5;
        playSound(global.sndHit);
      }
    } else if (other.invincible == 0 && status < STUNNED) {
      if (collision_point(x + 8, y - 4, oSolid, 0, 0)) {
        other.blink = 30;
        other.invincible = 30;
        if (other.x < x) other.xVel = -6;
        else other.xVel = 6;
        instance_create(other.x, other.y, oBlood);

        if (global.plife > 0) {
          global.plife -= 1;
          if (global.plife <= 0 && isRealLevel()) global.enemyDeaths[13] += 1;
        }
        playSound(global.sndHurt);
      } else if (status != THROW) {
        status = THROW;
        xVel = 0;
        if (other.x > x + 8) {
          facing = RIGHT;
          sprite_index = sYetiThrowL;
          other.x = x;
          other.y = y;
          other.yVel = -6;
          other.xVel = 6;
        } else {
          facing = LEFT;
          sprite_index = sYetiThrowL;
          other.x = x + 16;
          other.y = y;
          other.yVel = -6;
          other.xVel = -6;
        }

        other.stunned = true;
        other.bounced = false;
        other.wallHurt = 1;
        if (global.plife > 0) {
          other.yetiThrow = true;
          other.hawkThrow = false;
          other.shopThrow = false;
        }

        [instances_of(other)].forEach(($) => {
          with ($) {
            if (holdItem) {
              if (holdItem.type == 'Gold Idol') holdItem.y -= 8;
              scrDropItem(xVel, yVel);
            }
          }
        });
      }
    }
  }
}

function oYeti_OTHER($) {
  with ($) {
    if (sprite_index == sYetiThrowL) {
      status = IDLE;
      sprite_index = sYetiLeft;
    }
  }
}

function oYeti_STEP($) {
  with ($) {
    try {
      oEnemy_STEP($);
    } catch (err) {}

    if (active) {
      moveTo(xVel, yVel);

      if (!held) yVel += myGrav;
      if (yVel > yVelLimit) yVel = yVelLimit;

      colLeft = false;
      colRight = false;
      colBot = false;
      colTop = false;
      if (isCollisionLeft(1)) colLeft = true;
      if (isCollisionRight(1)) colRight = true;
      if (isCollisionBottom(1)) colBot = true;
      if (isCollisionTop(1)) colTop = true;

      if (colBot && status != STUNNED) yVel = 0;

      if (status != DEAD && status != STUNNED && hp < 1) {
        status = DEAD;
      }

      if (status >= STUNNED) {
        if (collision_point(x + 8, y + 12, oSolid, 0, 0)) {
          scrCreateBlood(x + 8, y + 8, 3);
          playSound(global.sndCavemanDie);
          instance_destroy();
        }
      } else if (!held && collision_point(x + 8, y + 8, oSolid, 0, 0)) {
        scrCreateBlood(x + 8, y + 8, 3);
        playSound(global.sndCavemanDie);
        instance_destroy();
      }

      if (status == IDLE) {
        bounced = false;
        if (
          isCollisionBottom(1) &&
          (collision_point(x - 1, y, oSolid, -1, -1) ||
            collision_point(x + 16, y, oSolid, -1, -1))
        ) {
          yVel = -6;
          if (facing == LEFT) xVel = -1;
          else xVel = 1;
          counter -= 10;
        }

        if (yVel < 0 && isCollisionTop(1)) {
          yVel = 0;
        }

        if (isCollisionBottom(1) && counter > 0) counter -= 1;
        if (counter < 1) {
          facing = rand(0, 1);
          status = WALK;
        }
        if (sightCounter > 0) sightCounter -= 1;
        else {
          sight = instance_create(x, y, oEnemySight);
          if (facing == LEFT) sight.direction = 180;
          else sight.direction = 0;
          sight.speed = 10;
          sight.owner = instance_place(x, y, oYeti);
          sightCounter = 5;
        }
      } else if (status == WALK) {
        if (isCollisionLeft(1) || isCollisionRight(1)) {
          if (facing == LEFT) facing = RIGHT;
          else facing = LEFT;
        }

        if (!isCollisionBottom(1)) {
          // do nothing
        } else if (rand(1, 100) == 1) {
          status = IDLE;
          counter = rand(20, 50);
          xVel = 0;
        } else if (facing == LEFT) {
          xVel = -1.5;
          if (!collision_point(x - 1, y + 16, oSolid, -1, -1)) {
            status = IDLE;
            counter = rand(20, 50);
            xVel = 0;
          }
        } else if (facing == RIGHT) {
          xVel = 1.5;
          if (!collision_point(x + 16, y + 16, oSolid, -1, -1)) {
            status = IDLE;
            counter = rand(20, 50);
            xVel = 0;
          }
        }

        if (sightCounter > 0) sightCounter -= 1;
        else {
          sight = instance_create(x, y, oEnemySight);
          if (facing == LEFT) sight.direction = 180;
          else sight.direction = 0;
          sight.speed = 10;
          sight.owner = instance_place(x, y, oYeti);
          sightCounter = 5;
        }
      } else if (status == ATTACK) {
        image_speed = 1;
        if (isCollisionLeft(1) || isCollisionRight(1)) {
          if (facing == LEFT) facing = RIGHT;
          else facing = LEFT;
        }
        if (facing == LEFT) xVel = -3;
        else xVel = 3;
      } else if (status == STUNNED) {
        if (xVel == 0 && hp > 0) sprite_index = sYetiStunL;
        else if (bounced) {
          if (yVel < 0) sprite_index = sYetiBounceL;
          else sprite_index = sYetiFallL;
        } else {
          if (abs(xVel) > 0) sprite_index = sYetiDieLL;
          else sprite_index = sYetiDieLR;
        }

        if (collision_point(x, y, oSpikes, 0, 0) && dead && yVel != 0) {
          if (rand(1, 8) == 1) instance_create(other.x, other.y, oBlood);
        }

        if (colBot && !bounced) {
          bounced = true;
          scrCreateBlood(x + 8, y + 8, 1);
        }

        if (held || colBot || inWeb) {
          inWeb = false;
          if (counter > 0) counter -= 1;
          else if (hp > 0) {
            status = IDLE;
            if (held) {
              held = false;
              [instances_of(oPlayer1)].orEach(($) => {
                with ($) {
                  holdItem = 0;
                  pickupItemType = '';
                }
              });
            }
          }
        }
      } else if (status == DEAD) {
        if (!dead) {
          if (countsAsKill) {
            if (isRealLevel()) global.enemyKills[13] += 1;
            global.yetis += 1;
            global.kills += 1;
          }
          playSound(global.sndCavemanDie);
          dead = true;
        }

        sprite_index = sYetiDeadL;

        if (xVel > 0 || yVel > 0) status = STUNNED;
      }

      if (status >= STUNNED) {
        scrCheckCollisions();

        if (xVel == 0 && yVel == 0 && hp < 1) status = DEAD;
      }

      //if (isCollisionSolid()) y -= 2;

      if (xVel > 0) xVel -= 0.1;
      if (xVel < 0) xVel += 0.1;
      if (abs(xVel) < 0.5) xVel = 0;

      if (status < STUNNED && status != THROW) {
        if (abs(xVel) > 0) sprite_index = sYetiRunLeft;
        else sprite_index = sYetiLeft;
      }
      if (held) {
        if (hp > 0) sprite_index = sYetiHeldL;
        else sprite_index = sYetiDHeldL;
      }
    }
  }
}

function oYeti_ALARM_0($) {
  with ($) {
    whipped = false;
  }
}

function oYeti_CREATE($) {
  with ($) {
    try {
      oEnemy_CREATE($);
    } catch (err) {}

    makeActive();
    setCollisionBounds(2, 0, sprite_width - 2, sprite_height);
    xVel = 2.5;
    image_speed = 0.5;

    // stats
    type = 'Yeti';
    hp = 5;
    invincible = 0;
    favor = 4;

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

class oYeti extends oEnemy {}
