function oTombLord_COLLISION_oWhip($) {
  with ($) {
    if (whipped == 0 && other.y < y + 12) {
      hp -= other.damage;
      countsAsKill = true;
      instance_create(x + 16, y + 24, oBlood);
      playSound(global.sndHit);
      whipped = 10;
    }
  }
}

function oTombLord_COLLISION_oCharacter($) {
  with ($) {
    // jumped on - oCaveman, oManTrap replaces this script with its own
    if (abs(other.x - (x + 16)) > 16) {
      // do nothing
    } else if (
      !other.dead &&
      (other.state == 15 || other.state == 16) &&
      other.y < y + 8 &&
      !other.swimming
    ) {
      other.yVel = -6 - 0.2 * other.yVel;
      if (global.hasSpikeShoes) {
        hp -= 3 * (floor(other.allTimer / 16) + 1);
      } else hp -= 1 * (floor(other.allTimer / 16) + 1);
      other.allTimer = 0;
      countsAsKill = true;
      instance_create(x + 16, y, oBone);
      playSound(global.sndHit);
    } else if (other.invincible == 0) {
      other.blink = 30;
      other.invincible = 30;
      if (other.y < y) other.yVel = -6;
      if (other.x < x) other.xVel = -6;
      else other.xVel = 6;

      if (global.plife > 0) {
        global.plife -= 2;
        if (global.plife <= 0 && isRealLevel()) global.enemyDeaths[20] += 1;
      }
      playSound(global.sndHurt);
    }
  }
}

function oTombLord_DRAW($) {
  with ($) {
    draw_sprite_ext(
      sprite_index,
      image_index,
      x,
      y,
      1,
      image_yscale,
      image_angle,
      image_blend,
      image_alpha
    );
  }
}

function oTombLord_OTHER($) {
  with ($) {
    if (sprite_index == sTombLordTurnR) {
      facing = RIGHT;
      status = WALK;
    }
    if (sprite_index == sTombLordTurnL) {
      facing = LEFT;
      status = WALK;
    }
    if (sprite_index == sTombLordAttackL || sprite_index == sTombLordAttackR) {
      status = IDLE;
      counter = 30;
      image_speed = 0.25;
    }
  }
}

function oTombLord_STEP($) {
  with ($) {
    try {
      oEnemy_STEP($);
    } catch (err) {}

    if (
      x > view_xview[0] - 36 &&
      x < view_xview[0] + view_wview[0] &&
      y > view_yview[0] - 36 &&
      y < view_yview[0] + view_hview[0]
    ) {
      moveTo(xVel, yVel);

      yVel += myGrav;
      if (yVel > yVelLimit) yVel = yVelLimit;

      if (collision_point(x + 16, y + 16, oSolid, 0, 0)) {
        hp = 0;
      }

      if (hp < 1) {
        scrCreateBlood(x + 14 + rand(0, 4), y + 14 + rand(0, 4), 4);
        for (r = 0; r < c; r++) {
          instance_create(x + 14 + rand(0, 4), y + 12 + rand(0, 6), oBone);
        }
        if (global.currLevel == 13) instance_create(x + 16, y + 16, oSceptre);
        if (countsAsKill) {
          if (isRealLevel()) global.enemyKills[20] += 1;
          global.tomblords += 1;
          global.kills += 1;
        }
        instance_destroy();
      }

      if (isCollisionBottom(1) && status != STUNNED) yVel = 0;

      if (attackTimer > 0) attackTimer -= 1;
      if (whipped > 0) whipped -= 1;

      if (status == IDLE) {
        if (counter > 0) counter -= 1;
        if (counter <= 0) {
          status = WALK;
        }
      } else if (status == WALK) {
        if (counter > 0) counter -= 1;

        if (facing == LEFT) {
          if (
            isCollisionLeft(1) ||
            (oPlayer1.x > x + 16 &&
              abs(oPlayer1.y - (y + 32)) < 16 &&
              counter == 0)
          ) {
            sprite_index = sTombLordTurnR;
            status = TURN;
            counter = 30;
          } else if (
            oPlayer1.x < x + 16 &&
            abs(oPlayer1.y - (y + 16)) < 32 &&
            attackTimer == 0
          ) {
            status = ATTACK;
            sprite_index = sTombLordAttackL;
            image_index = 0;
            xVel = 0;
          } else xVel = -1;
        } else if (facing == RIGHT) {
          if (
            isCollisionRight(1) ||
            (oPlayer1.x < x + 16 &&
              abs(oPlayer1.y - (y + 32)) < 16 &&
              counter == 0)
          ) {
            sprite_index = sTombLordTurnL;
            status = TURN;
            counter = 30;
          } else if (
            oPlayer1.x > x + 16 &&
            abs(oPlayer1.y - (y + 16)) < 32 &&
            attackTimer == 0
          ) {
            status = ATTACK;
            sprite_index = sTombLordAttackR;
            image_index = 0;
            xVel = 0;
          } else xVel = 1;
        }
      } else if (status == TURN) {
        xVel = 0;
      } else if (status == ATTACK) {
        xVel = 0;
        image_speed = 0.5;
        attackTimer = 100;
        if (image_index >= 7 && image_index <= 12) {
          if (facing == LEFT) {
            obj = instance_create(x + 8, y + 12 + rand(0, 4), oFly);
            obj.xVel = -rand(3, 5);
          } else {
            obj = instance_create(x + 24, y + 12 + rand(0, 4), oFly);
            obj.xVel = rand(3, 5);
          }
        }
      } else if (status >= STUNNED) status = WALK;

      if (isCollisionSolid()) y -= 2;

      if (facing == LEFT) {
        if (status == WALK) sprite_index = sTombLordWalkL;
        else if (status == IDLE) sprite_index = sTombLordLeft;
      }
      if (facing == RIGHT) {
        if (status == WALK) sprite_index = sTombLordWalkR;
        else if (status == IDLE) sprite_index = sTombLordRight;
      }
    }
  }
}

function oTombLord_CREATE($) {
  with ($) {
    try {
      oEnemy_CREATE($);
    } catch (err) {}

    makeActive();
    setCollisionBounds(6, 0, 26, 32);
    xVel = 2.5;
    image_speed = 0.25;

    // stats
    type = 'Tomb Lord';
    hp = 20;
    invincible = 0;
    heavy = true;
    bloodless = true;

    IDLE = 0;
    WALK = 1;
    TURN = 2;
    ATTACK = 3;
    STUNNED = 98;
    DEAD = 99;
    status = IDLE;

    canPickUp = false;
    bounced = false;
    dead = false;
    whipped = 0;
    counter = 0;
    attackTimer = 0;

    LEFT = 0;
    RIGHT = 1;
    facing = RIGHT;

    shakeCounter = 0;
    shakeToggle = 1;
  }
}

class oTombLord extends oEnemy {}
