function oShopkeeper_COLLISION_oWhip($) {
  with ($) {
    if (!whipped) {
      if (other.type == 'Machete') {
        hp -= other.damage;
        if (bloodLeft > 0) {
          scrCreateBlood(x + sprite_width / 2, y + sprite_height / 2, 1);
          if (hp < 0) bloodLeft -= 1;
        }
      }
      yVel = -2;
      if (other.x < x) xVel = 1;
      else xVel = -1;
      playSound(global.sndHit);
      whipped = true;
      alarm[0] = 10;
      if (status != STUNNED) status = ATTACK;
    }
  }
}

function oShopkeeper_COLLISION_oWhipPre($) {
  with ($) {
    if (!whipped) {
      if (other.type == 'Machete') {
        hp -= other.damage;
        if (bloodLeft > 0) {
          scrCreateBlood(x + sprite_width / 2, y + sprite_height / 2, 1);
          if (hp < 0) bloodLeft -= 1;
        }
      }
      yVel = -2;
      if (other.x < x) xVel = 1;
      else xVel = -1;
      playSound(global.sndHit);
      whipped = true;
      alarm[0] = 10;
      if (status != STUNNED) status = ATTACK;
    }
  }
}

function oShopkeeper_COLLISION_oShotgun($) {
  with ($) {
    if (hp > 0 && status == ATTACK && !hasGun) {
      instances_of(other).forEach(($) => {
        with ($) {
          if (held) {
            oPlayer1.holdItem = 0;
            oPlayer1.pickupItemType = '';
            held = false;
          }
          instance_destroy();
        }
      });

      hasGun = true;
    }
  }
}

function oShopkeeper_COLLISION_oCharacter($) {
  with ($) {
    if (
      status == IDLE ||
      status == FOLLOW ||
      status == STUNNED ||
      status == DEAD ||
      hp < 1 ||
      other.dead ||
      other.stunned ||
      abs(other.x - (x + 8)) > 8
    ) {
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
          if (global.plife <= 0 && isRealLevel()) global.enemyDeaths[19] += 1;
        }
        playSound(global.sndHurt);
      } else if (status != THROW) {
        status = THROW;
        xVel = 0;
        if (other.x > x + 8) {
          facing = RIGHT;
          sprite_index = sShopThrowL;
          other.x = x;
          other.y = y;
          other.yVel = -6;
          other.xVel = 6;
        } else {
          facing = LEFT;
          sprite_index = sShopThrowL;
          other.x = x + 16;
          other.y = y;
          other.yVel = -6;
          other.xVel = -6;
        }

        other.stunned = true;
        other.bounced = false;
        other.wallHurt = 1;
        if (global.plife > 0) {
          other.yetiThrow = false;
          other.hawkThrow = false;
          other.shopThrow = true;
        }

        instances_of(other).forEach(($) => {
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

function oShopkeeper_DRAW($) {
  with ($) {
    if (facing == RIGHT)
      draw_sprite_ext(
        sprite_index,
        image_index,
        x + 16,
        y,
        -1,
        image_yscale,
        image_angle,
        image_blend,
        image_alpha
      );
    else
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
    // draw_sprite_ext(sprite_index, image_index, x, y, 1, 1, 0, c_white, 1);
    if (hasGun && status != IDLE && status != FOLLOW) {
      if (facing == LEFT)
        draw_sprite_ext(sShotgunLeft, 0, x + 6, y + 10, 1, 1, 0, c_white, 1);
      else
        draw_sprite_ext(sShotgunRight, 0, x + 10, y + 10, 1, 1, 0, c_white, 1);
    }
  }
}

function oShopkeeper_OTHER($) {
  with ($) {
    if (sprite_index == sShopThrowL) {
      status = ATTACK;
      sprite_index = sShopLeft;
    }
  }
}

function oShopkeeper_STEP($) {
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
      if (yVel > 8) yVel = 8;

      colLeft = false;
      colRight = false;
      colBot = false;
      colTop = false;
      if (isCollisionLeft(1)) colLeft = true;
      if (isCollisionRight(1)) colRight = true;
      if (isCollisionBottom(1)) colBot = true;
      if (isCollisionTop(1)) colTop = true;

      if (colBot && status != STUNNED) yVel = 0;

      if (throwCount > 0) throwCount -= 1;

      // crushed
      if (status >= STUNNED) {
        if (collision_point(x + 8, y + 12, oSolid, 0, 0)) {
          scrCreateBlood(x + 8, y + 8, 3);
          playSound(global.sndCavemanDie);
          if (hp > 0) {
            if (isRealLevel()) global.enemyKills[19] += 1;
            global.shopkeepers += 1;
            global.kills += 1;
          }
          global.murderer = true;
          instance_destroy();
        }
      } else if (!held && collision_point(x + 8, y + 8, oSolid, 0, 0)) {
        scrCreateBlood(x + 8, y + 8, 3);
        playSound(global.sndCavemanDie);
        if (hp > 0) {
          if (isRealLevel()) global.enemyKills[19] += 1;
          global.shopkeepers += 1;
          global.kills += 1;
        }
        global.murderer = true;
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

      if (status != DEAD && status != STUNNED && hp < 1) {
        status = DEAD;
      }

      dist = distance_to_object(oPlayer1);

      if (status == IDLE || status == FOLLOW) {
        if (oPlayer1.holdItem > 0) {
          item = oPlayer1.holdItem;
          if (item.cost > 0) {
            global.message = item.buyMessage;
            if (global.gamepadOn)
              global.message2 =
                'PRESS ' + scrGetJoy(global.joyPayVal) + ' TO PURCHASE.';
            else
              global.message2 =
                'PRESS ' + scrGetKey(global.keyPayVal) + ' TO PURCHASE.';
            global.messageTimer = 200;
          }
        }
      }

      if (status == PATROL || status == WALK) {
        if (
          !oPlayer1.dead &&
          distance_to_object(oPlayer1) < 64 &&
          oPlayer1.y - (y + 8) < 16
        ) {
          status = ATTACK;
        } else if (abs(oPlayer1.x - (x + 8)) < 4) {
          status = ATTACK;
        }
      }

      if (status == IDLE) {
        bounced = false;

        if (colLeft) {
          x += 1;
        }
        if (colRight) {
          x -= 1;
        }
        if (colLeft && colRight) status = ATTACK;

        if (oPlayer1.x < x + 8) facing = LEFT;
        else facing = RIGHT;

        if (yVel < 0 && colTop) {
          yVel = 0;
        }

        if (global.murderer || global.thiefLevel > 0) {
          status = PATROL;
        } else if (
          !welcomed &&
          scrGetRoomX(oPlayer1.x) == scrGetRoomX(x) &&
          scrGetRoomY(oPlayer1.y) == scrGetRoomY(y)
        ) {
          if (style == 'Bomb')
            global.message = 'WELCOME TO ' + scrGetName() + "'S BOMB SHOP!";
          else if (style == 'Weapon')
            global.message = 'WELCOME TO ' + scrGetName() + "'S ARMORY!";
          else if (style == 'Clothing')
            global.message = 'WELCOME TO ' + scrGetName() + "'S CLOTHING SHOP!";
          else if (style == 'Rare')
            global.message =
              'WELCOME TO ' + scrGetName() + "'S SPECIALTY SHOP!";
          else if (style == 'Craps')
            global.message = 'WELCOME TO ' + scrGetName() + "'S DICE HOUSE!";
          else if (style == 'Kissing')
            global.message =
              'WELCOME TO ' + scrGetName() + "'S KISSING PARLOR!";
          else if (style == 'Ankh')
            global.message = 'I HAVE SOMETHING SPECIAL...';
          else
            global.message = 'WELCOME TO ' + scrGetName() + "'S SUPPLY SHOP!";
          if (style == 'Craps') {
            if (global.gamepadOn)
              global.message2 =
                'PRESS ' +
                scrGetJoy(global.joyPayVal) +
                ' TO BET $' +
                betValue +
                '.';
            else
              global.message2 =
                'PRESS ' +
                scrGetKey(global.keyPayVal) +
                ' TO BET $' +
                betValue +
                '.';
          } else if (style == 'Kissing') {
            if (global.gamepadOn)
              global.message2 =
                '$' +
                string(getKissValue()) +
                ' A KISS. PRESS ' +
                scrGetJoy(global.joyPayVal) +
                '.';
            else
              global.message2 =
                '$' +
                string(getKissValue()) +
                ' A KISS. PRESS ' +
                scrGetKey(global.keyPayVal) +
                '.';
          } else global.message2 = '';
          global.messageTimer = 200;
          welcomed = true;
        }

        ///////////////
        // CRAPS
        ///////////////

        if (style == 'Craps') {
          global.diceRolled = true;
          global.diceValue = 0;
          if (instance_number(oDice) == 2 && oPlayer1.bet > 0) {
            instances_of(oDice).forEach(($) => {
              with ($) {
                if (!rolled) global.diceRolled = false;
                global.diceValue += value;
              }
            });
          } else {
            global.diceRolled = false;
          }

          if (global.diceRolled) {
            if (global.diceValue == 7) {
              if (isRealLevel()) global.diceGamesWon += 1;
              global.message = 'YOU ROLLED A SEVEN!';
              global.message2 = 'YOU WIN A PRIZE!';
              global.messageTimer = 200;
              oPlayer1.bet = 0;
              instances_of(oItem).forEach(($) => {
                with ($) {
                  if (inDiceHouse) {
                    obj = instance_create(x - 4, y + 6, oPoof);
                    obj.xVel = -0.4;
                    obj = instance_create(x + 4, y + 6, oPoof);
                    obj.xVel = 0.4;
                    scrGenerateItem(x, y, 1);
                    obj.inDiceHouse = true;
                    if (oPlayer1.x < x) x -= 32;
                    else x += 32;
                    obj = instance_create(x - 4, y + 6, oPoof);
                    obj.xVel = -0.4;
                    obj = instance_create(x + 4, y + 6, oPoof);
                    obj.xVel = 0.4;
                    cost = 0;
                    forSale = false;
                    inDiceHouse = false;
                  }
                }
              });
            } else if (global.diceValue > 7) {
              if (isRealLevel()) global.diceGamesWon += 1;
              global.message = 'YOU ROLLED A ' + string(global.diceValue) + '!';
              global.message2 = 'CONGRATULATIONS! YOU WIN!';
              global.messageTimer = 200;
              global.collect += oPlayer1.bet * 2;
              global.collectCounter += 20;
              if (global.collectCounter > 100) global.collectCounter = 100;
              oPlayer1.bet = 0;
            } else if (global.diceValue < 7) {
              if (isRealLevel()) global.diceGamesLost += 1;
              global.message = 'YOU ROLLED A ' + string(global.diceValue) + '!';
              global.message2 = "I'M SORRY, BUT YOU LOSE!";
              global.messageTimer = 200;
              oPlayer1.bet = 0;
            }
            global.diceRolled = false;
            instances_of(oDice).forEach(($) => {
              with ($) {
                rolled = false;
              }
            });
          }
        } else if (oPlayer1.holdItem > 0) {
          obj = oPlayer1.holdItem;
          if (obj.cost > 0) {
            if (
              scrGetRoomX(oPlayer1.x) == scrGetRoomX(x) &&
              scrGetRoomY(oPlayer1.y) == scrGetRoomY(y)
            ) {
              status = FOLLOW;
            }
          }
        }
      } else if (status == FOLLOW) {
        image_speed = 0.5;

        if (isCollisionLeft(1) || isCollisionRight(1)) {
          if (facing == LEFT) facing = RIGHT;
          else facing = LEFT;
        }

        if (turnTimer > 0) turnTimer -= 1;
        else if (
          abs(oPlayer1.y - (y + 8)) < 8 &&
          isCollisionBottom(1) &&
          dist > 16
        ) {
          if (oPlayer1.x < x) facing = LEFT;
          else facing = RIGHT;
          turnTimer = 10;
        }

        i = Math.floor((dist / 16.0) * 15);
        if (facing == LEFT) {
          xVel = -i;
        } else {
          xVel = i;
        }

        if (xVel < -3) xVel = -3;
        if (xVel > 3) xVel = 3;

        if (dist < 12 || oPlayer1.y < y) xVel = 0;

        if (oPlayer1.holdItem != 0) {
          obj = oPlayer1.holdItem;
          if (obj == 0 || obj.cost == 0) {
            status = IDLE;
          }
        } else {
          status = IDLE;
        }
      } else if (status == PATROL) {
        bounced = false;

        if (yVel < 0 && isCollisionTop(1)) {
          yVel = 0;
        }

        if (colBot && counter > 0) counter -= 1;
        if (counter < 1) {
          facing = rand(0, 1);
          status = WALK;
        }
      } else if (status == WALK) {
        image_speed = 0.5;

        if (isCollisionLeft(1) || isCollisionRight(1)) {
          if (facing == LEFT) facing = RIGHT;
          else facing = LEFT;
        }

        if (facing == LEFT) {
          if (!collision_point(x - 1, y, oSolid, -1, -1)) {
            status = PATROL;
            counter = rand(20, 50);
            xVel = 0;
          }
          xVel = -1.5;
        } else {
          if (!collision_point(x + 16, y, oSolid, -1, -1)) {
            status = PATROL;
            counter = rand(20, 50);
            xVel = 0;
          }
          xVel = 1.5;
        }

        if (rand(1, 100) == 1) {
          status = PATROL;
          counter = rand(20, 50);
          xVel = 0;
        }
      } else if (status == ATTACK) {
        image_speed = 1;

        if (!angered) {
          instances_of(oItem).forEach(($) => {
            with ($) {
              cost = 0;
              forSale = false;
            }
          });

          angered = true;
        }

        if (turnTimer > 0) turnTimer -= 1;
        else if (
          abs(oPlayer1.y - (y + 8)) < 8 &&
          isCollisionBottom(1) &&
          dist > 16
        ) {
          if (oPlayer1.x < x) facing = LEFT;
          else facing = RIGHT;
          turnTimer = 20;
        }

        if (isCollisionLeft(1) || isCollisionRight(1)) {
          if (facing == LEFT) facing = RIGHT;
          else facing = LEFT;
        }

        if (facing == LEFT) xVel = -3;
        else xVel = 3;

        if (hasGun) {
          if (firing > 0) firing -= 1;
          else if (abs(oPlayer1.y - (y + 8)) < 32) {
            if (facing == LEFT && oPlayer1.x < x + 8 && dist < 96) {
              instance_create(x, y + 9, oShotgunBlastLeft);
              for (i = 0; i < 6; i += 1) {
                obj = instance_create(x + 4, y + 8, oBullet);
                obj.xVel = -1 * rand(6, 8) + xVel;
                if (obj.xVel >= -6) obj.xVel = -6;
                obj.yVel = random(1) - random(1);
                obj.safe = true;
                instances_of(obj).forEach(($) => {
                  with ($) {
                    if (collision_point(x, y, oSolid, 0, 0)) instance_destroy();
                  }
                });
              }
              yVel -= 1;
              xVel += 3;
              playSound(global.sndShotgun);
              firing = firingMax;
            }
            if (facing == RIGHT && oPlayer1.x > x + 8 && dist < 96) {
              instance_create(x + 16, y + 9, oShotgunBlastRight);
              for (i = 0; i < 6; i += 1) {
                obj = instance_create(x + 12, y + 8, oBullet);
                obj.xVel = rand(6, 8) + xVel;
                if (obj.xVel < 6) obj.xVel = 6;
                obj.yVel = random(1) - random(1);
                obj.safe = true;
                instances_of(obj).forEach(($) => {
                  with ($) {
                    if (collision_point(x, y, oSolid, 0, 0)) instance_destroy();
                  }
                });
              }
              yVel -= 1;
              xVel -= 3;
              playSound(global.sndShotgun);
              firing = firingMax;
            }
          }
        }

        // jump
        if (oPlayer1.y > y && abs(oPlayer1.x - (x + 8)) < 64) {
          // do nothing
        } else if (
          (facing == LEFT && collision_point(x - 16, y, oSolid, -1, -1)) ||
          (facing == RIGHT && collision_point(x + 32, y, oSolid, -1, -1))
        ) {
          if (colBot && !isCollisionTop(4)) yVel = -1 * rand(7, 8);
          /*
        else
        {
            if (facing == LEFT) xVel = -1.5;
            else xVel = 1.5;
        }
        */
        } else if (
          oPlayer1.y <= y + 16 &&
          ((facing == LEFT &&
            !collision_point(x - 16, y + 16, oSolid, -1, -1)) ||
            (facing == RIGHT &&
              !collision_point(x + 32, y + 16, oSolid, -1, -1)))
        ) {
          if (colBot && !isCollisionTop(4)) yVel = -1 * rand(7, 8);
        }

        if (!colBot && oPlayer1.y > y + 8) {
          if (facing == LEFT) xVel = -1.5;
          else xVel = 1.5;
        }

        if (oPlayer1.dead) {
          status = WALK;
        }
      } else if (status == STUNNED) {
        if (colBot) sprite_index = sShopStunL;
        else if (bounced) {
          if (yVel < 0) sprite_index = sShopBounceL;
          else sprite_index = sShopFallL;
        } else {
          if (xVel < 0) sprite_index = sShopDieLL;
          else sprite_index = sShopDieLR;
        }

        if (colBot && !bounced) {
          bounced = true;
          scrCreateBlood(x + 8, y + 8, 3);
        }

        if (held || colBot) {
          if (counter > 0) counter -= 1;
          else if (hp > 0) {
            status = ATTACK;
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
        if (!dead) {
          if (isRoom('rStars')) {
            //if (oStarsRoom.kills < 99) oStarsRoom.kills += 1;
          } else {
            if (isRealLevel()) global.enemyKills[19] += 1;
            global.shopkeepers += 1;
            global.kills += 1;
            global.murderer = true;
            //repeat(rand(1,4))
            r1 = Math.floor(rand(1, 4));
            for (r = 0; r < r1; r++) {
              obj = instance_create(x + 8, y + 8, oGoldNugget);
              obj.yVel = -1;
              obj.xVel = rand(1, 3) - rand(1, 3);
            }
          }
          playSound(global.sndCavemanDie);

          dead = true;
        }

        sprite_index = sShopDieL;

        if (abs(xVel) > 0 || abs(yVel) > 0) status = STUNNED;
      }

      if (status >= STUNNED) {
        if (hasGun) {
          obj = instance_create(x + 8, y + 8, oShotgun);
          obj.yVel = rand(4, 6);
          if (xVel < 0) obj.xVel = -1 * rand(4, 6);
          else obj.xVel = rand(4, 6);
          obj.cost = 0;
          obj.orSale = false;
          hasGun = false;
        }

        scrCheckCollisions();

        if (xVel == 0 && yVel == 0 && hp < 1) status = DEAD;
      }

      //if (isCollisionSolid()) y -= 2;

      if (xVel > 0) xVel -= 0.1;
      if (xVel < 0) xVel += 0.1;
      if (abs(xVel) < 0.5) xVel = 0;

      if (status < STUNNED && status != THROW) {
        if (abs(xVel) > 0) sprite_index = sShopRunLeft;
        else sprite_index = sShopLeft;
      }
      if (held) {
        if (hp > 0) sprite_index = sShopHeldL;
        else sprite_index = sShopDHeldL;
      }
    }
  }
}

function oShopkeeper_ALARM_0($) {
  with ($) {
    whipped = false;
  }
}

function oShopkeeper_CREATE($) {
  with ($) {
    try {
      oEnemy_CREATE($);
    } catch (err) {}

    makeActive();
    setCollisionBounds(2, 0, sprite_width - 2, sprite_height);
    xVel = 0;
    image_speed = 0.5;
    myGrav = 0.6;

    // stats
    type = 'Shopkeeper';
    style = 'General';
    hp = 20;
    invincible = 0;
    favor = 12;

    IDLE = 0;
    WALK = 1;
    ATTACK = 2;
    THROW = 3;
    PATROL = 4;
    FOLLOW = 5;
    STUNNED = 98;
    DEAD = 99;
    status = 0;

    whipped = false;
    bounced = false;
    dead = false;
    counter = 0;
    sightCounter = 0;
    turnTimer = 0;
    throwCount = 0;
    stunTime = 5;

    betValue = 1000 + global.currLevel * 500;

    LEFT = 0;
    RIGHT = 1;
    facing = LEFT;

    shakeCounter = 0;
    shakeToggle = 1;

    welcomed = false;
    angered = false;

    hasGun = true;
    firing = 0;
    firingMax = 30;
  }
}

class oShopkeeper extends oEnemy {
  FOLLOW;
  PATROL;
  angered;
  betValue;
  diceGamesLost;
  diceGamesWon;
  diceRolled;
  diceValue;
  gamepadOn;
  inDiceHouse;
  item;
  joyPayVal;
  keyPayVal;
  oBullet;
  oDice;
  sShopBounceL;
  sShopDHeldL;
  sShopDieL;
  sShopDieLL;
  sShopDieLR;
  sShopFallL;
  sShopHeldL;
  sShopLeft;
  sShopRunLeft;
  sShopStunL;
  sShopThrowL;
  shopkeepers;
  sndShotgun;
  throwCount;
  turnTimer;
  welcomed;
  sprite_index = sShopLeft;
  visible = true;
}
ObjType.oShopkeeper = oShopkeeper;
