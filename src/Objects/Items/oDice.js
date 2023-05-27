function oDice_DRAW($) {
  with ($) {
    draw_sprite_ext(
      sprite_index,
      -1,
      x,
      y,
      image_xscale,
      image_yscale,
      image_angle,
      image_blend,
      image_alpha
    );

    if (!rolled && oPlayer1.bet > 0) {
      draw_sprite_ext(sRedArrowDown, 0, x, y - 12, 1, 1, 0, c_white, 1);
    }
  }
}

function oDice_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 16 &&
      x < view_xview[0] + view_wview[0] + 16 &&
      y > view_yview[0] - 16 &&
      y < view_yview[0] + view_hview[0] + 16
    ) {
      if (cost > 0 && !instance_exists(oShopkeeper)) {
        cost = 0;
      }

      // stealing makes shopkeeper angry
      if (isLevel()) {
        if (!isInShop(x, y)) {
          scrShopkeeperAnger(0);
        }
      }

      if (held) {
        if (oCharacter.acing == LEFT) x = oCharacter.x - 4;
        else if (oCharacter.acing == RIGHT) x = oCharacter.x + 4;

        if (heavy) {
          if (oCharacter.state == DUCKING && abs(oCharacter.xVel) < 2)
            y = oCharacter.y;
          else y = oCharacter.y - 2;
        } else {
          if (oCharacter.state == DUCKING && abs(oCharacter.xVel) < 2)
            y = oCharacter.y + 4;
          else y = oCharacter.y + 2;
        }
        depth = 1;

        if (oCharacter.holdItem == 0) {
          held = false;
        }
      } else {
        moveTo(xVel, yVel);

        colLeft = false;
        colRight = false;
        colBot = false;
        colTop = false;
        if (isCollisionLeft(1)) colLeft = true;
        if (isCollisionRight(1)) colRight = true;
        if (isCollisionBottom(1)) colBot = true;
        if (isCollisionTop(1)) colTop = true;

        if (!colBot && yVel < 6) yVel += myGrav;

        if (colLeft || colRight) xVel = -xVel * 0.5;

        if (colBot) {
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

        if (colLeft) {
          if (!colRight) x += 1;
          //yVel = 0;
        } else if (colRight) {
          x -= 1;
          //yVel = 0;
        }

        if (isCollisionTop(1)) {
          if (yVel < 0) yVel = -yVel * 0.8;
          else y += 1;
        }

        if (global.hasSpectacles) depth = 0;
        else depth = 101;

        if (collision_rectangle(x - 3, y - 3, x + 3, y + 3, oLava, 0, 0)) {
          myGrav = 0;
          xVel = 0;
          yVel = 0;
          y += 0.05;
        } else myGrav = 0.6;
        if (collision_point(x, y - 5, oLava, 0, 0)) {
          instance_destroy();
        }
      }

      if (abs(xVel) > 3 || abs(yVel) > 3) {
        if (collision_rectangle(x - 2, y - 2, x + 2, y + 2, oEnemy, 0, 0)) {
          obj = instance_nearest(x, y, oEnemy);
          if (!obj.invincible && obj.type != 'Magma Man') {
            obj.xVel = xVel;
            instances_of(obj).forEach(($) => {
              with ($) {
                if (
                  type == 'Caveman' ||
                  type == 'ManTrap' ||
                  type == 'Yeti' ||
                  type == 'Hawkman'
                ) {
                  if (status != STUNNED) {
                    if (
                      type == 'Caveman' ||
                      type == 'Yeti' ||
                      type == 'Hawkman'
                    ) {
                      instance_create(x, y, oBlood);
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
                    instance_create(x, y, oBlood);
                    hp -= 1;
                    yVel = -6;
                    status = 2;
                    playSound(global.sndHit);
                  }
                } else if (type == 'Giant Spider') {
                  if (whipped == 0) {
                    instance_create(x + 16, y + 24, oBlood);
                    hp -= 1;
                    whipped = 10;
                    playSound(global.sndHit);
                  }
                } else if (type == 'Alien Boss') {
                  if (status != 99 && sprite_index != sAlienBossHurt) {
                    instance_create(x + 8, y + 8, oBlood);
                    hp -= 1;
                    sprite_index = sAlienBossHurt;
                    image_speed = 0.8;
                    playSound(global.sndHit);
                  }
                } else {
                  instance_create(x + 8, y + 8, oBlood);
                  hp -= 1;
                  origX = x;
                  origY = y;
                  playSound(global.sndHit);
                }
              }
            });

            obj.xVel = xVel * 0.3;
          }
        }

        if (collision_rectangle(x - 2, y - 2, x + 2, y + 2, oDamsel, 0, 0)) {
          obj = instance_nearest(x, y, oDamsel);
          if (!obj.invincible && obj.status != 2 && obj.status != 99) {
            instance_create(x, y, oBlood);
            instances_of(obj).forEach(($) => {
              with ($) {
                if (held) {
                  held = false;
                  instances_of(oPlayer1).forEach(($) => {
                    with ($) {
                      holdItem = 0;
                      pickupItemType = '';
                    }
                  });
                }
                hp -= 1;
                yVel = -6;
                status = 2;
                counter = 120;
              }
            });

            obj.xVel = xVel * 0.3;

            playSound(global.sndHit);
          }
        }
      }
    }

    if (abs(yVel) > 2 || abs(xVel) > 6) {
      sprite_index = sDiceRoll;
      value = rand(1, 6);
      if (oPlayer1.bet > 0) rolling = true;
    } else if (isCollisionBottom(1)) {
      if (rolling && yVel == 0) {
        if (rolled) scrShopkeeperAnger(0); // NO CHEATING!
        rolled = true;
        rolling = false;
      }
      if (value == 1) sprite_index = sDice1;
      else if (value == 2) sprite_index = sDice2;
      else if (value == 3) sprite_index = sDice3;
      else if (value == 4) sprite_index = sDice4;
      else if (value == 5) sprite_index = sDice5;
      else sprite_index = sDice6;
    }
  }
}

function oDice_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Dice';
    makeActive();
    setCollisionBounds(-6, 0, 6, 8);
    heavy = true;
    rolled = false;
    rolling = false;
    value = rand(1, 6);
  }
}

class oDice extends oItem {
  bet;
  bounceFactor;
  c_white;
  frictionFactor;
  hasSpectacles;
  rolled;
  rolling;
  sDice1;
  sDice2;
  sDice3;
  sDice4;
  sDice5;
  sDice6;
  sDiceRoll;
  sRedArrowDown;
}
ObjType.oDice = oDice;
