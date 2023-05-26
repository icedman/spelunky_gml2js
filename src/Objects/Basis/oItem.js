function oItem_DESTROY($) {
  with ($) {
    if (held) {
      oPlayer1.holdItem = 0;
    }
  }
}

function oItem_ALARM($) {
  with ($) {
    safe = false;
  }
}

function oItem_DRAW($) {
  with ($) {
    draw_sprite_ext(sprite_index, image_index, x, y, 1, 1, 0, c_white, 1);
    if (cost > 0) {
      draw_sprite_ext(sSmallCollect, cimg, x, y - 12, 1, 1, 0, c_white, 1);
      cimg += 1;
      if (cimg > 9) cimg = 0;
    }
  }
}

function oItem_STEP($) {
  with ($) {
    if (
      (x > view_xview[0] - 16 &&
        x < view_xview[0] + view_wview[0] + 16 &&
        y > view_yview[0] - 16 &&
        y < view_yview[0] + view_hview[0] + 16) ||
      (type == 'Rope' && armed)
    ) {
      if (global.hasSpectacles) depth = 51;
      else depth = 101;

      if (
        (!instance_exists(oShopkeeper) ||
          global.thiefLevel > 0 ||
          global.murderer) &&
        cost > 0
      ) {
        if (isRealLevel()) global.itemsStolen += 1;
        cost = 0;
        forSale = false;
      }

      // stealing makes shopkeeper angry
      if (isRealLevel()) {
        if (cost > 0 && forSale && !isInShop(x, y)) {
          global.itemsStolen += 1;
          scrShopkeeperAnger(0);
          cost = 0;
        }
      } else if (isLevel()) {
        if (cost > 0 && forSale && !isInShop(x, y)) {
          scrShopkeeperAnger(0);
          cost = 0;
        }
      } else cost = 0;

      if (held) {
        xVel = 0;
        yVel = 0;
        if (oPlayer1.acing == LEFT) x = oPlayer1.x - 4;
        if (oPlayer1.acing == RIGHT) x = oPlayer1.x + 4;

        if (heavy) {
          if (
            type == 'Gold Idol' ||
            type == 'Crystal Skull' ||
            type == 'Lamp' ||
            type == 'Damsel'
          ) {
            if (oPlayer1.state == DUCKING && abs(oPlayer1.xVel) < 2)
              y = oPlayer1.y + 2;
            else y = oPlayer1.y;
          } else {
            if (oPlayer1.state == DUCKING && abs(oPlayer1.xVel) < 2)
              y = oPlayer1.y - 2;
            else y = oPlayer1.y - 4;
          }
        } else {
          if (oPlayer1.state == DUCKING && abs(oPlayer1.xVel) < 2)
            y = oPlayer1.y + 4;
          else y = oPlayer1.y + 2;
        }
        depth = 1;

        if (oPlayer1.holdItem == 0) {
          held = false;
        }
      } else if (!collision_point(x, y, oSolid, 0, 0)) {
        moveTo(xVel, yVel);

        colLeft = false;
        colRight = false;
        colBot = false;
        colTop = false;
        if (isCollisionLeft(1)) colLeft = true;
        if (isCollisionRight(1)) colRight = true;
        if (isCollisionBottom(1)) colBot = true;
        if (isCollisionTop(1)) colTop = true;

        if (!colLeft && !colRight) stuck = false;

        if (!colBot && !stuck) yVel += myGrav;
        if (yVel > 8) yVel = 8;

        if (colLeft || colRight) {
          xVel = -xVel * 0.5;
          myGrav = 0.6;
        }

        if (colBot) {
          myGrav = 0.6;

          // bounce
          if (yVel > 1) yVel = -yVel * bounceFactor;
          else yVel = 0;

          // friction
          if (abs(xVel) < 0.1) xVel = 0;
          else if (abs(xVel) != 0) xVel *= frictionFactor;

          if (abs(yVel) < 1) {
            y -= 1;
            if (!isCollisionBottom(1)) y += 1;
            yVel = 0;
          }
        }

        if (sticky && type == 'Bomb' && sprite_index == sBombArmed) {
          if (colLeft || colRight || colTop || colBot) {
            xVel = 0;
            yVel = 0;
            if (colBot && abs(yVel) < 1) y += 1;
          }
        } else if (type == 'Arrow' && abs(xVel) > 6) {
          if (colLeft) {
            x -= 2;
            xVel = 0;
            yVel = 0;
          } else if (colRight) {
            x += 2;
            xVel = 0;
            yVel = 0;
          }
          stuck = true;
        } else if (colLeft && !stuck) {
          if (!colRight) x += 1;
          //yVel = 0;
        } else if (colRight && !stuck) {
          x -= 1;
          //yVel = 0;
        }

        if (sticky && type == 'Bomb' && sprite_index == sBombArmed) {
          // do nothing
        } else if (isCollisionTop(1)) {
          if (yVel < 0) yVel = -yVel * 0.8;
          else y += 1;
          myGrav = 0.6;
        }

        if (collision_rectangle(x - 3, y - 3, x + 3, y + 3, oLava, 0, 0)) {
          myGrav = 0;
          xVel = 0;
          yVel = 0;
          y += 0.05;
        } else {
          myGrav = 0.6;
        }

        if (collision_point(x, y - 5, oLava, 0, 0) && type != 'Sceptre') {
          if (type == 'Bomb') {
            instance_create(x, y, oExplosion);
            for (r = 0; r < c; r++) {
              instance_create(x, y, oFlame);
            }

            playSound(global.sndExplosion);
          }
          instance_destroy();
        }
      } else {
        colLeft = false;
        colRight = false;
        colBot = false;
        colTop = false;
        if (isCollisionLeft(1)) colLeft = true;
        if (isCollisionRight(1)) colRight = true;
        if (isCollisionBottom(1)) colBot = true;
        if (isCollisionTop(1)) colTop = true;

        if (colTop && !colBot) {
          y += 1;
        } else if (colLeft && !colRight) {
          x += 1;
        } else if (colRight && !colLeft) {
          x -= 1;
        } else {
          xVel = 0;
          yVel = 0;
        }
      }

      if (type == 'Bomb' && sticky) {
        if (
          abs(xVel) > 2 ||
          (abs(yVel) > 2 &&
            collision_rectangle(x - 2, y - 2, x + 2, y + 2, oEnemy, 0, 0) &&
            enemyID == 0)
        ) {
          enemyID = instance_nearest(x, y, oEnemy);
          /*
            if (enemyID.bombID)
            {
                // Can only have one sticky bomb on someone at a time
                with enemyID.bombID
                {
                    sticky = false;
                    enemyID = 0;
                }
            }
            */
          enemyID.bombID = self; // instance_nearest(x, y, oBomb);
          stickyXDiff = enemyID.x - x;
          stickyYDiff = enemyID.y - y;
        } else if (
          abs(xVel) > 2 ||
          (abs(yVel) > 2 &&
            collision_rectangle(x - 2, y - 2, x + 2, y + 2, oDamsel, 0, 0) &&
            enemyID == 0)
        ) {
          enemyID = collision_rectangle(
            x - 2,
            y - 2,
            x + 2,
            y + 2,
            oDamsel,
            0,
            0
          );
          /*
            if (enemyID.bombID)
            {
                // Can only have one sticky bomb on someone at a time
                with enemyID.bombID
                {
                    sticky = false;
                    enemyID = 0;
                }
            }
            */
          enemyID.bombID = self; // instance_nearest(x, y, oBomb);
          stickyXDiff = enemyID.x - x;
          stickyYDiff = enemyID.y - y;
        }
      } else if (abs(xVel) > 2 || abs(yVel) > 2) {
        if (collision_rectangle(x - 2, y - 2, x + 2, y + 2, oEnemy, 0, 0)) {
          obj = instance_nearest(x, y, oEnemy);
          if (!obj.invincible && obj.type != 'Magma Man') {
            obj.xVel = xVel;

            // vampires are weak to "stakes"
            if (type == 'Arrow' && obj.status != 98 && obj.type == 'Vampire')
              obj.hp -= 3;

            [instances_of(obj)].forEach(($) => {
              with ($) {
                if (
                  type == 'Caveman' ||
                  type == 'ManTrap' ||
                  type == 'Vampire' ||
                  type == 'Yeti' ||
                  type == 'Hawkman'
                ) {
                  if (status != STUNNED) {
                    if (
                      type == 'Caveman' ||
                      type == 'Vampire' ||
                      type == 'Yeti' ||
                      type == 'Hawkman'
                    ) {
                      scrCreateBlood(x + 8, y + 8, 1);
                    } else if (type == 'ManTrap') {
                      instance_create(
                        x + rand(0, 16),
                        y - 8 + rand(0, 16),
                        oLeaf
                      );
                    }
                    hp -= 1;
                    status = STUNNED;
                    counter = stunTime;
                    yVel = -6;
                    playSound(global.sndHit);
                  }
                } else if (type == 'Shopkeeper') {
                  if (status < 98) {
                    scrCreateBlood(x, y, 1);
                    hp -= 1;
                    yVel = -6;
                    status = 2;
                    playSound(global.sndHit);
                  }
                } else if (type == 'Giant Spider') {
                  if (whipped == 0) {
                    scrCreateBlood(x + 16, y + 24, 1);
                    hp -= 1;
                    whipped = 10;
                    playSound(global.sndHit);
                  }
                } else if (type == 'Tomb Lord') {
                  if (whipped == 0) {
                    scrCreateBlood(x + 16, y + 16, 1);
                    hp -= 1;
                    whipped = 20;
                    playSound(global.sndHit);
                  }
                } else if (type == 'Alien Boss') {
                  if (status != 99 && sprite_index != sAlienBossHurt) {
                    scrCreateBlood(x + 8, y + 8, 1);
                    hp -= 1;
                    sprite_index = sAlienBossHurt;
                    image_speed = 0.8;
                    playSound(global.sndHit);
                  }
                } else if (type == 'UFO') {
                  instance_create(x + 8, y + 8, oExplosion);
                  playSound(global.sndExplosion);
                  if (rand(1, 3) == 1)
                    instance_create(x + 8, y + 8, oAlienEject);
                  if (isRealLevel()) global.enemyKills[16] += 1;
                  global.ufos += 1;
                  global.kills += 1;
                  instance_destroy();
                } else {
                  scrCreateBlood(x + 8, y + 8, 1);
                  hp -= 1;
                  origX = x;
                  origY = y;
                  playSound(global.sndHit);
                }
              }
            });

            obj.xVel = xVel * 0.3;

            if (type == 'Arrow' && sprite_index == sBombArrowRight) {
              instance_create(x, y, oExplosion);
              if (global.graphicsHigh) scrCreateFlame(x, y, 3);
            }

            if (type == 'Arrow' || type == 'Fish Bone') {
              instance_destroy();
            }
          }
        }

        if (collision_rectangle(x - 2, y - 2, x + 2, y + 2, oDamsel, 0, 1)) {
          obj = collision_rectangle_obj(
            x - 2,
            y - 2,
            x + 2,
            y + 2,
            oDamsel,
            0,
            1
          );
          if (!obj.invincible && obj.status != 99 && obj.hit == 0) {
            if (!(obj.held && safe)) {
              scrCreateBlood(obj.x, obj.y, 1);
              [instances_of(obj)].forEach(($) => {
                with ($) {
                  if (obj.held) {
                    obj.held = false;
                    obj.oPlayer1.holdItem = 0;
                    obj.oPlayer1.pickupItemType = '';
                  }
                  obj.hp -= 1;
                  obj.yVel = -6;
                  obj.status = 2;
                  obj.counter = 120;
                  obj.hit = 10;
                }
              });

              obj.xVel = xVel * 0.3;

              if (type == 'Arrow' || type == 'Fish Bone') instance_destroy();

              playSound(global.sndHit);

              if (obj.orSale) {
                scrShopkeeperAnger(3);
              }
            }
          }
        }
      }
    }
  }
}

function oItem_CREATE($) {
  with ($) {
    action_inherited();

    active = true;
    type = 'None';
    shopDesc = '';
    objChecked = true; // set to false once player has picked up, currently just used for bow
    held = false;
    LEFT = 18;
    RIGHT = 19;
    DUCKING = 12;
    myGrav = 0.6;
    armed = false;
    trigger = false; // for idols
    safe = false;
    heavy = false;
    value = 0;
    colBot = false;
    canPickUp = true;

    bounceFactor = 0.5;
    frictionFactor = 0.3;
    bloodless = false;
    breakPieces = true;

    cost = 0;
    forSale = false;
    stolen = false;
    inDiceHouse = false; // for dice house
    cimg = 0;

    stuck = false;

    // for sticky bombs
    sticky = false;
    enemyID = 0;
    stickyXDiff = 0;
    stickyYDiff = 0;

    if (global.hasSpectacles) depth = 51;
    else depth = 101;
  }
}

class oItem extends oDrawnSprite {
  // variables
}
