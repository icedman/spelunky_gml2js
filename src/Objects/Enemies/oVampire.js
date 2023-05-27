function oVampire_COLLISION_oWhip($) {
  with ($) {
    if (status < STUNNED || other.type == 'Machete') {
      hp -= other.damage;
      scrCreateBlood(x + sprite_width / 2, y + sprite_height / 2, 1);
      countsAsKill = true;
      status = STUNNED;
      counter = stunTime;
      yVel = -3;
      if (other.x < x + 8) xVel = 2;
      else xVel = -2;
      image_speed = 0.5;
      playSound(global.sndHit);
    }
  }
}

function oVampire_COLLISION_oWhipPre($) {
  with ($) {
    if (status < STUNNED || other.type == 'Machete') {
      hp -= other.damage;
      scrCreateBlood(x + sprite_width / 2, y + sprite_height / 2, 1);
      countsAsKill = true;
      status = STUNNED;
      counter = stunTime;
      yVel = -3;
      if (other.x < x + 8) xVel = 2;
      else xVel = -2;
      image_speed = 0.5;
      playSound(global.sndHit);
    }
  }
}

function oVampire_COLLISION_oCharacter($) {
  with ($) {
    if (abs(other.x - (x + 8)) > 8) {
      // do nothing
    } else if (
      !other.dead &&
      (other.state == 15 || other.state == 16) &&
      other.y < y + 5 &&
      !other.swimming
    ) {
      // Jumped on
      if (status < STUNNED) {
        other.yVel = -6 - 0.2 * other.yVel;
        if (global.hasSpikeShoes) {
          hp -= 3 * (floor(other.allTimer / 16) + 1);
          if (!bloodless) instance_create(other.x, other.y + 8, oBlood);
        } else hp -= 1 * (floor(other.allTimer / 16) + 1);
        other.allTimer = 0;
        countsAsKill = true;
        status = STUNNED;
        counter = stunTime;
        yVel = -6;
        if (other.x < x + 8) xVel += 1;
        else xVel -= 1;
        image_speed = 0.5;
        playSound(global.sndHit);
      }
    } else if (other.invincible == 0) {
      if (status < STUNNED) {
        other.blink = 30;
        other.invincible = 30;
        if (other.y < y) other.yVel = -6;
        if (other.x < x) other.xVel = -6;
        else other.xVel = 6;
        instance_create(other.x, other.y, oBlood);

        if (global.plife > 0) {
          global.plife -= 1;
          if (global.plife <= 0 && isRealLevel()) global.enemyDeaths[7] += 1;
        }
        playSound(global.sndHurt);
      }
    }
  }
}

function oVampire_STEP($) {
  with ($) {
    try {
      oEnemy_STEP($);
    } catch (err) {}

    if (
      x > view_xview[0] - 20 &&
      x < view_xview[0] + view_wview[0] + 4 &&
      y > view_yview[0] - 20 &&
      y < view_yview[0] + view_hview[0] + 4
    ) {
      if (status == STUNNED) myGrav = 0.6;

      moveTo(xVel, yVel);

      colLeft = false;
      colRight = false;
      colBot = false;
      colTop = false;
      if (isCollisionLeft(1)) colLeft = true;
      if (isCollisionRight(1)) colRight = true;
      if (isCollisionBottom(1)) colBot = true;
      if (isCollisionTop(1)) colTop = true;

      if (!held && status != HANG && status != FLY) yVel += myGrav;
      if (yVel > yVelLimit) yVel = yVelLimit;

      if (status >= STUNNED) {
        if (collision_point(x + 8, y + 12, oSolid, 0, 0)) {
          instance_create(x + 8, y + 8, oSmokePuff);
          playSound(global.sndCavemanDie);
          instance_destroy();
        }
      } else if (!held) {
        if (collision_point(x + 8, y + 8, oSolid, 0, 0)) {
          instance_create(x + 8, y + 8, oSmokePuff);
          playSound(global.sndCavemanDie);
          instance_destroy();
        }
      }

      if (isCollisionBottom(1) && status != STUNNED) yVel = 0;

      if (status != DEAD && status != STUNNED && hp < 1) {
        status = DEAD;
      }

      if (burning > 0) {
        if (rand(1, 5) == 1)
          instance_create(x + rand(4, 12), y + rand(4, 12), oBurn);
        burning -= 1;
      }

      dist = distance_to_point(oPlayer1.x - 8, oPlayer1.y - 8);

      if (status == IDLE) {
        bounced = false;
        if (
          colBot &&
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

        if (dist < 96) {
          if (oPlayer1.x < x + 8) facing = LEFT;
          else if (oPlayer1.x > x + 8) facing = RIGHT;
          status = ATTACK;
        }
      } else if (status == WALK) {
        if (isCollisionLeft(1) || isCollisionRight(1)) {
          if (facing == LEFT) facing = RIGHT;
          else facing = LEFT;
        }

        if (!colBot) {
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
            yVel = 0;
          }
        } else if (facing == RIGHT) {
          xVel = 1.5;
          if (!collision_point(x + 16, y + 16, oSolid, -1, -1)) {
            status = IDLE;
            counter = rand(20, 50);
            xVel = 0;
            yVel = 0;
          }
        }

        if (dist < 96) status = ATTACK;
      } else if (status == ATTACK) {
        image_speed = 1;
        if (facing == LEFT && isCollisionLeft(4)) {
          if (isCollisionTop(1)) facing = RIGHT;
          else status = BOUNCE;
        } else if (facing == RIGHT && isCollisionRight(4)) {
          if (isCollisionTop(1)) facing = LEFT;
          else status = BOUNCE;
        } else if (facing == LEFT) {
          if (!collision_point(x - 8, y + 16, oSolid, 0, 0)) {
            status = BOUNCE;
          }
        } else if (facing == RIGHT) {
          if (!collision_point(x + 8, y + 16, oSolid, 0, 0)) {
            status = BOUNCE;
          }
        }

        if (
          abs(oPlayer1.x - x) < 32 &&
          oPlayer1.y < y + 8 &&
          !collision_point(x + 8, y + 8, oWater, 0, 0)
        )
          status = FLY;

        if (facing == LEFT) xVel = -4;
        else xVel = 4;
      } else if (status == RECOVER) {
        if (facing == LEFT && isCollisionLeft(1)) {
          facing = RIGHT;
          xVel = -xVel;
        } else if (facing == RIGHT && isCollisionRight(1)) {
          facing = LEFT;
          xVel = -xVel;
        } else if (colBot) {
          status = IDLE;
          xVel = 0;
          yVel = 0;
          counter = rand(40, 100);
        } else if (!collision_point(x + 8, y + 8, oWater, 0, 0)) {
          if (rand(1, 100) == 1) status = FLY;
          else if (collision_point(x + 8, y + 24, oWater, 0, 0)) status = FLY;
        }
      } else if (status == BOUNCE) {
        if (colBot) {
          yVel = -1 * rand(3, 6);
        } else {
          status = RECOVER;
        }
      } else if (status == STUNNED) {
        if (colBot) {
          // do nothing
        } else {
          if (xVel == 0 && hp > 0) sprite_index = sVampireStunL;
          else if (bounced) {
            if (yVel < 0) sprite_index = sVampireBounceL;
            else sprite_index = sVampireFallL;
          } else {
            if (abs(xVel) > 0) sprite_index = sVampireDieLL;
            else sprite_index = sVampireDieLR;
          }
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
              instances_of(oPlayer1).forEach(($) => {
                with ($) {
                  holdItem = 0;
                  pickupItemType = '';
                }
              });
            }
          }
        }
      } else if (status == DEAD) {
        for (r = 0; r < c; r++) {
          instance_create(other.x + 8, other.y + 8, oBone);
        }
        obj = instance_create(other.x + 8, other.y + 8, oSkull);
        obj.yVel = -rand(1, 3);
        obj.xVel = rand(0, 3) - rand(0, 3);
        if (countsAsKill) {
          if (isRealLevel()) global.enemyKills[7] += 1;
          global.vampires += 1;
          global.kills += 1;
        }
        playSound(global.sndCavemanDie);
        obj = instance_create(x + 8, y + 8, oCapePickup);
        obj.cost = 0;
        obj.orSale = false;
        instance_destroy();
      } else if (status == HANG) {
        xVel = 0;
        yVel = 0;

        if (
          !oPlayer1.dead &&
          !oPlayer1.swimming &&
          ((dist < 90 && oPlayer1.y > y + 16) ||
            !collision_point(x + 8, y - 1, oSolid, 0, 0))
        ) {
          status = FLY;
          playSound(global.sndBat);
        }
      } else if (
        status == FLY &&
        instance_exists(oPlayer1) &&
        !oPlayer1.swimming &&
        !oPlayer1.dead
      ) {
        xVel = 0;
        yVel = 0;

        if (dist < 160) {
          dir = point_direction(x + 8, y + 8, oPlayer1.x, oPlayer1.y);
          if (isCollisionRight(1) && oPlayer1.x > x + 8) {
            if (oPlayer1.y < y + 8) dir = 90;
            else dir = 270;
          }
          if (isCollisionLeft(1) && oPlayer1.x < x + 8) {
            if (oPlayer1.y < y + 8) dir = 90;
            else dir = 270;
          }
          if (
            isCollisionTop(1) &&
            oPlayer1.y < y + 8 &&
            abs(oPlayer1.x - x) > 8
          ) {
            if (oPlayer1.x < x + 8) dir = 180;
            else dir = 0;
          }
          if (
            isCollisionBottom(1) &&
            oPlayer1.y > y + 8 &&
            abs(oPlayer1.x - x) > 8
          ) {
            if (oPlayer1.x < x + 8) dir = 180;
            else dir = 0;
          }

          if (
            collision_point(x + 8, y + 16, oWater, 0, 0) &&
            dir > 180 &&
            dir < 360
          ) {
            dir = 90;
          }

          if (!collision_point(x, y + 12, oWater, 0, 0) || oPlayer1.y < y) {
            xVel = 2 * cos(degtorad(dir));
            yVel = -2 * sin(degtorad(dir));
          }
        } else {
          if (collision_point(x + 8, y - 1, oSolid, 0, 0)) status = HANG;
          else {
            dir = 90;
            xVel = 2 * cos(degtorad(dir));
            yVel = -2 * sin(degtorad(dir));
          }
        }

        if (oPlayer1.x < x + 8) facing = LEFT;
        else facing = RIGHT;

        if (colBot || collision_point(x, y, oWater, 0, 0)) {
          status = IDLE;
        }
      } else if (status == FLY) {
        xVel = 0;
        yVel = 0;

        if (collision_point(x + 8, y - 1, oSolid, 0, 0)) status = HANG;
        else {
          dir = 90;
          xVel = 1 * cos(degtorad(dir));
          yVel = -1 * sin(degtorad(dir));
        }
      }

      if (status >= STUNNED) {
        scrCheckCollisions();

        if (xVel == 0 && yVel == 0 && hp < 1) status = DEAD;
      }

      //if (isCollisionSolid()) y -= 2;

      if (xVel > 0) xVel -= 0.1;
      if (xVel < 0) xVel += 0.1;
      if (abs(xVel) < 0.5) xVel = 0;

      if (status == HANG) sprite_index = sVampireBatHang;
      else if (status < STUNNED && status != THROW) {
        if (status == FLY) sprite_index = sVampireBatLeft;
        else if (status == RECOVER) sprite_index = sVampireJumpL;
        else if (abs(xVel) > 0) sprite_index = sVampireRunL;
        else sprite_index = sVampireLeft;
      }
      if (held) {
        if (hp > 0) sprite_index = sVampireHeldL;
        else sprite_index = sVampireDHeldL;
      }
    }
  }
}

function oVampire_ALARM_0($) {
  with ($) {
    whipped = false;
  }
}

function oVampire_CREATE($) {
  with ($) {
    try {
      oEnemy_CREATE($);
    } catch (err) {}

    makeActive();
    setCollisionBounds(2, 0, sprite_width - 2, sprite_height);
    xVel = 2.5;
    image_speed = 0.5;

    // stats
    type = 'Vampire';
    hp = 6;
    invincible = 0;
    myGrav = 0.2;
    myGravNorm = 0.2;

    IDLE = 0;
    WALK = 1;
    ATTACK = 2;
    THROW = 3;
    RECOVER = 4;
    BOUNCE = 5;
    HANG = 6;
    FLY = 7;
    STUNNED = 98;
    DEAD = 99;
    status = IDLE;

    whipped = false;
    bloodless = true;
    bounced = false;
    dead = false;
    counter = 0;
    stunTime = 60;
    sightCounter = 0;

    LEFT = 0;
    RIGHT = 1;
    facing = RIGHT;

    shakeCounter = 0;
    shakeToggle = 1;
  }
}

function oVampire_COLLISION_oBlood($) {
  with ($) {
    hp += 1;
    instances_of(other).forEach(($) => {
      with ($) {
        instance_destroy();
      }
    });
  }
}

class oVampire extends oEnemy {
  FLY;
  HANG;
  oCapePickup;
  sVampireBatHang;
  sVampireBatLeft;
  sVampireBounceL;
  sVampireDHeldL;
  sVampireDieLL;
  sVampireDieLR;
  sVampireFallL;
  sVampireHeldL;
  sVampireJumpL;
  sVampireLeft;
  sVampireRunL;
  sVampireStunL;
  sndBat;
  vampires;
  sprite_index = sVampireLeft;
  visible = true;
}
ObjType.oVampire = oVampire;
