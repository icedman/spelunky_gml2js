function oManTrap_COLLISION_oWhip($) {
  with ($) {
    if (status != STUNNED) {
      if (other.type == 'Machete') {
        hp -= other.damage * 2;
      } else {
        hp -= other.damage;
      }
      countsAsKill = true;
      status = STUNNED;
      counter = stunTime;
      yVel = -3;
      if (other.x < x + 8) xVel = 2;
      else xVel = -2;
      image_speed = 0.5;
      instance_create(x + rand(0, 16), y - 8 + rand(0, 16), oLeaf);
      playSound(global.sndHit);
    }
  }
}

function oManTrap_COLLISION_oWhipPre($) {
  with ($) {
    if (status != STUNNED) {
      if (other.type == 'Machete') {
        hp -= other.damage * 2;
      } else {
        hp -= other.damage;
      }
      countsAsKill = true;
      status = STUNNED;
      counter = stunTime;
      yVel = -3;
      if (other.x < x + 8) xVel = 2;
      else xVel = -2;
      image_speed = 0.5;
      instance_create(x + rand(0, 16), y - 8 + rand(0, 16), oLeaf);
      playSound(global.sndHit);
    }
  }
}

function oManTrap_COLLISION_oShopkeeper($) {
  with ($) {
    if (status != STUNNED && status != EATING && status != SLEEPY) {
      xVel = 0;
      status = EATING;
      if (other.x > x) facing = RIGHT;
      else facing = LEFT;
      sprite_index = sManTrapEatShopkeeperL;
      if (other.hp > 0) ateShopkeeper = true;

      instances_of(other).forEach(($) => {
        with ($) {
          if (hasGun) {
            obj = instance_create(x + 8, y + 8, oShotgun);
            obj.yVel = rand(4, 6);
            if (xVel < 0) obj.xVel = -1 * rand(4, 6);
            else obj.xVel = rand(4, 6);
            obj.cost = 0;
            obj.orSale = false;
            hasGun = false;
          }
          instance_destroy();
        }
      });
    }
  }
}

function oManTrap_COLLISION_oCharacter($) {
  with ($) {
    if (abs(other.x - (x + 8)) > 8) {
      // do nothing
    } else if (
      (global.hasSpikeShoes || status == EATING) &&
      !other.dead &&
      !other.stunned &&
      (other.state == 15 || other.state == 16) &&
      other.y < y + 5 &&
      !other.swimming
    ) {
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
    } else if (other.visible && other.invincible == 0) {
      if (status != STUNNED && status != EATING && status != SLEEPY) {
        xVel = 0;
        status = EATING;
        if (other.x > x + 8) facing = RIGHT;
        else facing = LEFT;
        if (global.isDamsel) {
          sprite_index = sManTrapEatDamselL;
        } else if (global.isTunnelMan) {
          sprite_index = sManTrapEatTunnelL;
        } else {
          sprite_index = sManTrapEatL;
        }

        other.visible = false;
        other.invincible = 9999;
        other.bounced = true;
        global.plife = -99;
        playSound(global.sndDie);
        //global.drawHUD = false;
        if (isRealLevel()) global.enemyDeaths[10] += 1;

        if (other.holdItem) {
          if (held) held = false;
          else {
            other.holdItem.held = false;
            if (facing == LEFT) other.holdItem.xVel = -2;
            else other.holdItem.xVel = 2;
            other.holdItem.yVel = -4;
          }
          other.holdItem = 0;
          other.pickupItemType = '';
        }
      }
    }
  }
}

function oManTrap_OTHER($) {
  with ($) {
    if (status == EATING) {
      sprite_index = sManTrapSleepL;
      status = SLEEPY;
    } else if (sprite_index == sManTrapSleepL) {
      sprite_index = sManTrapStunL;
      status = STUNNED;
      counter = stunTime * 2;
    }
  }
}

function oManTrap_STEP($) {
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

      if (status >= STUNNED) {
        if (collision_point(x + 8, y + 12, oSolid, 0, 0)) {
          status = DEAD;
          scrCreateBlood(x + 8, y + 8, 3);
          instance_destroy();
        }
      } else if (!held) {
        if (collision_point(x + 8, y + 8, oSolid, 0, 0)) {
          status = DEAD;
          scrCreateBlood(x + 8, y + 8, 3);
          instance_destroy();
        }
      }

      if (hp < 1) {
        if (countsAsKill) {
          if (isRealLevel()) global.enemyKills[10] += 1;
          global.mantraps += 1;
          global.kills += 1;
        }
        for (r = 0; r < c; r++) {
          instance_create(x + rand(0, 16), y - 8 + rand(0, 16), oLeaf);
        }
        scrCreateBlood(x + 8, y + 8, 1);
        if (ateShopkeeper) {
          obj = instance_create(x, y, oShopkeeper);
          obj.status = 2;
          obj.hasGun = false;
          for (r = 0; r < c; r++) {
            instance_create(x + rand(0, 16), y - 8 + rand(0, 16), oLeaf);
          }
          scrCreateBlood(x + 8, y + 8, 1);
          playSound(global.sndSmallExplode);
        }
        instance_destroy();
      }

      if (isCollisionBottom(1) && status != STUNNED) yVel = 0;

      if (status == IDLE) {
        if (counter > 0) counter -= 1;
        if (counter == 0) {
          facing = rand(0, 1);
          status = WALK;
        }
      } else if (status == WALK) {
        if (isCollisionLeft(1) || isCollisionRight(1)) {
          if (facing == LEFT) facing = RIGHT;
          else facing = LEFT;
        }
        if (
          facing == LEFT &&
          !collision_point(x - 1, y, oSolid, -1, -1) &&
          !collision_point(x - 1, y + 16, oSolid, -1, -1)
        ) {
          facing = RIGHT;
        } else if (
          facing == RIGHT &&
          !collision_point(x + 16, y, oSolid, -1, -1) &&
          !collision_point(x + 16, y + 16, oSolid, -1, -1)
        ) {
          facing = LEFT;
        }
        if (
          (!collision_point(x - 1, y + 16, oSolid, -1, -1) ||
            collision_point(x - 1, y, oSolid, -1, -1)) &&
          (!collision_point(x + 16, y + 16, oSolid, -1, -1) ||
            collision_point(x + 16, y, oSolid, -1, -1))
        ) {
          if (collision_point(x - 1, y, oSolid, -1, -1)) facing = RIGHT;
          else facing = LEFT;
          xVel = 0;
        } else if (facing == LEFT) xVel = -1;
        else xVel = 1;

        if (rand(1, 100) == 1) {
          status = IDLE;
          counter = rand(20, 50);
          xVel = 0;
        }
      } else if (status == STUNNED) {
        // xVel = 0;
        /*
    if (counter &gt; 0) counter -= 1;
    else
    {
        status = IDLE;
        counter = rand(20,50);
    }
    */
        sprite_index = sManTrapStunL;

        if (colBot && !bounced) {
          bounced = true;
          scrCreateBlood(x + 8, y + 8, 1);
        }

        if (held || colBot || inWeb) {
          inWeb = false;
          if (counter > 0) counter -= 1;
          else {
            if (ateShopkeeper) {
              obj = instance_create(x, y, oShopkeeper);
              obj.status = 2;
              obj.hasGun = false;
              for (r = 0; r < c; r++) {
                instance_create(x + rand(0, 16), y - 8 + rand(0, 16), oLeaf);
              }
              scrCreateBlood(x + 8, y + 8, 1);
              playSound(global.sndSmallExplode);
              instance_destroy();
            } else if (hp > 0) {
              status = IDLE;
              counter = rand(20, 50);
              if (held) {
                held = false;
                // trap can get stuck in wall at this point:
                if (collision_point(x + 16, y + 8, oSolid, 0, 0))
                  x = oPlayer1.x - 12;
                else if (collision_point(x, y + 8, oSolid, 0, 0))
                  x = oPlayer1.x - 4;
                y = oPlayer1.y - 8;
                instances_of(oPlayer1).forEach(($) => {
                  with ($) {
                    holdItem = 0;
                    pickupItemType = '';
                  }
                });
              }
            }
          }
        }
      }

      if (status >= STUNNED) {
        scrCheckCollisions();
      }

      // friction
      if (colBot) {
        if (abs(xVel) < 0.1) xVel = 0;
        else if (abs(xVel) != 0) xVel *= 0.3;
      }

      if (isCollisionSolid()) y -= 2;

      if (status == EATING && image_index == 8) {
        scrCreateBlood(x + 8, y, 1);
      }

      if (status == SLEEPY && image_index == 6 && rand(1, 8) == 1) {
        if (facing == LEFT) {
          bone = instance_create(x + 2, y + 4, oBone);
          instances_of(bone).forEach(($) => {
            with ($) {
              xVel = -2;
            }
          });
        } else {
          bone = instance_create(x + 14, y + 4, oBone);
          instances_of(bone).forEach(($) => {
            with ($) {
              xVel = 2;
            }
          });
        }
      }

      if (status < SLEEPY) {
        sprite_index = sManTrapLeft;
      }
    }
  }
}

function oManTrap_COLLISION_oVampire($) {
  with ($) {
    if (status != STUNNED && status != EATING && status != SLEEPY) {
      xVel = 0;
      status = EATING;
      if (other.x > x) facing = RIGHT;
      else facing = LEFT;
      sprite_index = sManTrapEatVampire;

      instances_of(other).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
    }
  }
}

function oManTrap_COLLISION_oHawkman($) {
  with ($) {
    if (status != STUNNED && status != EATING && status != SLEEPY) {
      xVel = 0;
      status = EATING;
      if (other.x > x) facing = RIGHT;
      else facing = LEFT;
      sprite_index = sManTrapEatHawkman;

      instances_of(other).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
    }
  }
}

function oManTrap_CREATE($) {
  with ($) {
    try {
      oEnemy_CREATE($);
    } catch (err) {}

    makeActive();
    setCollisionBounds(2, 0, sprite_width - 2, sprite_height);
    xVel = 2.5;
    image_speed = 0.5;

    // stats
    type = 'ManTrap';
    hp = 3;
    invincible = 0;
    favor = 2;

    IDLE = 0;
    WALK = 1;
    ATTACK = 2;
    SLEEPY = 96;
    EATING = 97;
    STUNNED = 98;
    DEAD = 99;
    status = IDLE;

    ateShopkeeper = false;

    bounced = false;
    dead = false;
    counter = 0;

    LEFT = 0;
    RIGHT = 1;
    facing = RIGHT;

    shakeCounter = 0;
    shakeToggle = 1;
  }
}

function oManTrap_COLLISION_oCaveman($) {
  with ($) {
    if (status != STUNNED && status != EATING && status != SLEEPY) {
      xVel = 0;
      status = EATING;
      if (other.x > x) facing = RIGHT;
      else facing = LEFT;
      sprite_index = sManTrapEatCavemanL;

      instances_of(other).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
    }
  }
}

function oManTrap_COLLISION_oDamsel($) {
  with ($) {
    if (status != STUNNED && status != EATING && status != SLEEPY) {
      xVel = 0;
      status = EATING;
      if (other.x > x) facing = RIGHT;
      else facing = LEFT;
      sprite_index = sManTrapEatDamselL;

      instances_of(other).forEach(($) => {
        with ($) {
          if (held) {
            oPlayer1.holdItem = 0;
            oPlayer1.pickupItemType = '';
          }
          instance_destroy();
        }
      });
    }
  }
}

function oManTrap_COLLISION_oYeti($) {
  with ($) {
    if (status != STUNNED && status != EATING && status != SLEEPY) {
      xVel = 0;
      status = EATING;
      if (other.x > x) facing = RIGHT;
      else facing = LEFT;
      sprite_index = sManTrapEatYeti;

      instances_of(other).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
    }
  }
}

class oManTrap extends oEnemy {
  EATING;
  SLEEPY;
  STUNNED;
  allTimer;
  ateShopkeeper;
  bloodless;
  bone;
  cost;
  damage;
  dead;
  enemyDeaths;
  favor;
  hasSpikeShoes;
  held;
  holdItem;
  inWeb;
  isDamsel;
  isTunnelMan;
  mantraps;
  oBlood;
  oBone;
  oLeaf;
  oShopkeeper;
  oShotgun;
  orSale;
  pickupItemType;
  plife;
  sManTrapEatCavemanL;
  sManTrapEatDamselL;
  sManTrapEatHawkman;
  sManTrapEatL;
  sManTrapEatShopkeeperL;
  sManTrapEatTunnelL;
  sManTrapEatVampire;
  sManTrapEatYeti;
  sManTrapLeft;
  sManTrapSleepL;
  sManTrapStunL;
  sndDie;
  sndHit;
  sndSmallExplode;
  sprite_height;
  sprite_width;
  state;
  stunTime;
  stunned;
  visible;
  sprite_index = sManTrapLeft;
  visible = true;
}
ObjType.oManTrap = oManTrap;
