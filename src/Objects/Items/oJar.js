function oJar_DESTROY($) {
  with ($) {
    try {
      oItem_DESTROY($);
    } catch (err) {}

    if (breakPieces) {
      playSound(global.sndBreak);
      instance_create(x, y, oSmokePuff);
      for (i = 0; i < 3; i += 1) {
        piece = instance_create(x - 2, y - 2, oRubbleSmall);
        if (colLeft) piece.xVel = rand(1, 3);
        else if (colRight) piece.xVel = -rand(1, 3);
        else piece.xVel = rand(1, 3) - rand(1, 3);
        if (colTop) piece.yVel = rand(0, 3);
        else piece.yVel = -rand(0, 3);
      }

      if (rand(1, 3) == 1) instance_create(x, y, oGoldChunk);
      else if (rand(1, 6) == 1) instance_create(x, y, oGoldNugget);
      else if (rand(1, 12) == 1) instance_create(x, y, oEmeraldBig);
      else if (rand(1, 12) == 1) instance_create(x, y, oSapphireBig);
      else if (rand(1, 12) == 1) instance_create(x, y, oRubyBig);
      else if (rand(1, 6) == 1) instance_create(x - 8, y - 8, oSpider);
      else if (rand(1, 12) == 1) {
        if (colLeft) instance_create(x, y - 8, oSnake);
        else if (colRight) instance_create(x - 16, y - 8, oSnake);
        else instance_create(x - 8, y - 8, oSnake);
      }

      if (held) {
        oPlayer1.holdItem = 0;
        oPlayer1.pickupItem = '';
      }
    }
  }
}

function oJar_COLLISION_oWhip($) {
  with ($) {
    instance_destroy();
  }
}

function oJar_COLLISION_oBullet($) {
  with ($) {
    instance_destroy();
  }
}

function oJar_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 16 &&
      x < view_xview[0] + view_wview[0] + 16 &&
      y > view_yview[0] - 16 &&
      y < view_yview[0] + view_hview[0] + 16
    ) {
      destroy = false;
      colTop = false;
      colLeft = false;
      colRight = false;
      colBot = false;
      if (held) {
        if (oCharacter.acing == LEFT) {
          x = oCharacter.x - 4;
        } else if (oCharacter.acing == RIGHT) {
          x = oCharacter.x + 4;
        }

        if (oCharacter.state == DUCKING && abs(oCharacter.xVel) < 2)
          y = oCharacter.y + 4;
        else y = oCharacter.y;
        depth = 1;
      } else {
        moveTo(xVel, yVel);

        if (yVel < 6) {
          yVel += myGrav;
        }

        if (isCollisionTop(1)) colTop = true;
        if (isCollisionLeft(1)) colLeft = true;
        if (isCollisionRight(1)) colRight = true;
        if (isCollisionBottom(1)) colBot = true;

        if (colTop && yVel < 0) {
          if (yVel < -3) destroy = true;
          yVel = -yVel * 0.8;
        }

        if (colLeft || colRight) {
          if (abs(xVel) > 3) destroy = true;
          xVel = -xVel * 0.5;
        }

        if (collision_point(x, y, oSolid, 0, 0)) destroy = true;

        if (colBot) {
          if (yVel > 3) destroy = true;

          // bounce
          if (yVel > 1) yVel = -yVel * 0.5;
          else yVel = 0;

          // friction
          if (abs(xVel) < 0.1) xVel = 0;
          else if (abs(xVel) != 0) xVel *= 0.3;
        }

        if (colLeft) {
          if (!colRight) x += 1;
          yVel = 0;
        } else if (colRight) {
          x -= 1;
          yVel = 0;
        }

        if (isCollisionBottom(0) && abs(yVel) < 1) {
          y -= 1;
          yVel = 0;
        }

        depth = 100;

        if (collision_rectangle(x - 3, y - 3, x + 3, y + 3, oLava, 0, 0)) {
          myGrav = 0;
          xVel = 0;
          yVel = 0;
          y += 0.05;
        } else myGrav = 0.6;
        if (collision_point(x, y - 5, oLava, 0, 0)) {
          if (type == 'Bomb') {
            instance_create(x, y, oExplosion);
            for (i = 0; i < 3; i += 1) {
              instance_create(x, y, oFlame);
            }

            playSound(global.sndExplosion);
          }
          instance_destroy();
        }
      }

      if (
        collision_rectangle(x - 3, y - 3, x + 3, y + 3, oEnemy, 0, 0) &&
        (abs(xVel) > 2 || abs(yVel) > 2)
      ) {
        enemy = instance_nearest(x, y, oEnemy);
        if (!enemy.invincible) {
          enemy.xVel = xVel;
          instances_of(enemy).forEach(($) => {
            with ($) {
              if (
                type == 'Caveman' ||
                type == 'ManTrap' ||
                type == 'Yeti' ||
                type == 'Hawkman' ||
                type == 'Shopkeeper'
              ) {
                if (status != 98) {
                  if (
                    type == 'Caveman' ||
                    type == 'Yeti' ||
                    type == 'Hawkman' ||
                    type == 'Shopkeeper'
                  ) {
                    for (i = 0; i < 1; i += 1) {
                      instance_create(x, y, oBlood);
                    }
                  }
                  status = STUNNED;
                  counter = stunTime;
                  yVel = -6;
                  playSound(global.sndHit);
                }
              } else {
                instance_create(x + 8, y + 8, oBlood);
                hp -= 1;
                origX = x;
                origY = y;
                shakeCounter = 10;
                playSound(global.sndHit);
              }
            }
          });

          enemy.xVel = xVel * 0.3;

          if (type == 'Arrow' || type == 'Fish Bone') instance_destroy();
        }

        destroy = true;
      }

      if (
        type != 'Damsel' &&
        collision_rectangle(x - 3, y - 3, x + 3, y + 3, oDamsel, 0, 0) &&
        (abs(xVel) > 2 || abs(yVel) > 2)
      ) {
        enemy = instance_nearest(x, y, oDamsel);
        if (!enemy.invincible && (abs(xVel) > 1 || abs(yVel) > 1)) {
          for (i = 0; i < 1; i += 1) {
            instance_create(x, y, oBlood);
          }
        }
        instances_of(enemy).forEach(($) => {
          with ($) {
            if (held) held = false;
            instances_of(oPlayer1).forEach(($) => {
              with ($) {
                holdItem = 0;
              }
            });
            hp -= 1;
            yVel = -6;
            status = 2;
            counter = 120;
          }
        });

        enemy.xVel = xVel * 0.3;

        destroy = true;
      }

      if (destroy) {
        if (held) {
          oPlayer1.holdItem = 0;
          oPlayer1.pickupItemType = '';
        }
        instance_destroy();
      }
    }
  }
}

function oJar_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Jar';
    makeActive();
    setCollisionBounds(-4, -6, 4, 6);
    breakPieces = true;
    destroy = false;
    colTop = false;
    colLeft = false;
    colRight = false;
    colBot = false;
  }
}

class oJar extends oItem {
  DUCKING;
  breakPieces;
  destroy;
  enemy;
  oDamsel;
  oFlame;
  oSnake;
  pickupItem;
  piece;
  sndExplosion;
  sprite_index = sJar;
  visible = true;
}
ObjType.oJar = oJar;
