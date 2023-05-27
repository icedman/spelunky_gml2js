function oYetiKing_COLLISION_oWhip($) {
  with ($) {
    if (whipped == 0 && other.y < y + 12) {
      if (other.puncture) {
        hp -= other.damage;
        countsAsKill = true;
        scrCreateBlood(x + sprite_width / 2, y + sprite_height / 2, 1);
        playSound(global.sndHit);
        whipped = 10;
      } else {
        playSound(global.sndHit);
        whipped = 10;
      }
    }
  }
}

function oYetiKing_COLLISION_oCharacter($) {
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
        hp -= 3 * ceil(other.allTimer / 16);
        instance_create(other.x, other.y + 8, oBlood);
      } else hp -= 1 * ceil(other.allTimer / 16);
      other.allTimer = 0;
      countsAsKill = true;
      instance_create(x + 16, y + 8, oBlood);
      playSound(global.sndHit);
    } else if (other.invincible == 0) {
      other.blink = 30;
      other.invincible = 30;
      if (other.y < y) other.yVel = -6;
      if (other.x < x) other.xVel = -6;
      else other.xVel = 6;

      if (global.plife > 0 && isLevel()) {
        global.plife -= 2;
        if (global.plife <= 0) global.enemyDeaths[14] += 1;
      }
      playSound(global.sndHurt);
    }
  }
}

function oYetiKing_DRAW($) {
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

function oYetiKing_OTHER($) {
  with ($) {
    if (sprite_index == sYetiKingTurnR) {
      facing = RIGHT;
      status = WALK;
    }
    if (sprite_index == sYetiKingTurnL) {
      facing = LEFT;
      status = WALK;
    }
    if (sprite_index == sYetiKingYellL || sprite_index == sYetiKingYellR) {
      status = IDLE;
      counter = 30;
      image_speed = 0.25;
    }
  }
}

function oYetiKing_STEP($) {
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
        scrCreateBlood(x + 14 + rand(0, 4), y + 14 + rand(0, 4), 3);
        for (r = 0; r < c; r++) {
          instance_create(x + 14 + rand(0, 4), y + 14 + rand(0, 6), oBone);
        }
        for (r = 0; r < c; r++) {
          if (rand(1, 12) == 1) {
            obj = instance_create(x + 16, y + 16, oSpikeShoes);
            obj.cost = 0;
            obj.orSale = false;
          } else if (rand(1, 2) == 1)
            obj = instance_create(x + 16, y + 16, oSapphireBig);
          else {
            obj = instance_create(x + 16, y + 16, oRopePile);
            obj.cost = 0;
            obj.orSale = false;
          }
          obj.xVel = rand(0, 3) - rand(0, 3);
          obj.yVel = -rand(1, 2);
        }
        if (countsAsKill) {
          global.enemyKills[14] += 1;
          global.yetikings += 1;
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
            sprite_index = sYetiKingTurnR;
            status = TURN;
            counter = 30;
          } else if (
            oPlayer1.x < x + 16 &&
            abs(oPlayer1.y - (y + 16)) < 32 &&
            attackTimer == 0
          ) {
            status = ATTACK;
            sprite_index = sYetiKingYellL;
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
            sprite_index = sYetiKingTurnL;
            status = TURN;
            counter = 30;
          } else if (
            oPlayer1.x > x + 16 &&
            abs(oPlayer1.y - (y + 16)) < 32 &&
            attackTimer == 0
          ) {
            status = ATTACK;
            sprite_index = sYetiKingYellR;
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
          if (!SS_IsSoundPlaying(global.sndYetiYell))
            playSound(global.sndYetiYell);
          instances_of(oIce).forEach(($) => {
            with ($) {
              if (instance_exists(oYetiKing)) {
                if (
                  rand(1, 60) == 1 &&
                  abs(oYetiKing.x + 16 - (x + 8)) > 16 &&
                  point_distance(x, y, oYetiKing.x, oYetiKing.y) < 96
                ) {
                  instance_create(x, y, oIceBlock);
                  instance_destroy();
                }
              }
            }
          });

          instances_of(oThinIce).forEach(($) => {
            with ($) {
              thickness -= 2;
            }
          });
        }
      }

      if (isCollisionSolid()) y -= 2;

      if (facing == LEFT) {
        if (status == WALK) sprite_index = sYetiKingWalkL;
        else if (status == IDLE) sprite_index = sYetiKingLeft;
      }
      if (facing == RIGHT) {
        if (status == WALK) sprite_index = sYetiKingWalkR;
        else if (status == IDLE) sprite_index = sYetiKingRight;
      }
    }
  }
}

function oYetiKing_CREATE($) {
  with ($) {
    try {
      oEnemy_CREATE($);
    } catch (err) {}

    makeActive();
    setCollisionBounds(6, 0, 26, 32);
    xVel = 2.5;
    image_speed = 0.25;

    // stats
    type = 'Yeti King';
    hp = 30;
    invincible = 0;
    heavy = true;

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

class oYetiKing extends oEnemy {
  oIce;
  oIceBlock;
  oRopePile;
  oSapphireBig;
  oSpikeShoes;
  oThinIce;
  oYetiKing;
  puncture;
  sYetiKingLeft;
  sYetiKingRight;
  sYetiKingTurnL;
  sYetiKingTurnR;
  sYetiKingWalkL;
  sYetiKingWalkR;
  sYetiKingYellL;
  sYetiKingYellR;
  sndYetiYell;
  thickness;
  yetikings;
}
ObjType.oYetiKing = oYetiKing;
