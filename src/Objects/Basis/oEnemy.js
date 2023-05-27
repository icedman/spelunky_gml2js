function oEnemy_DESTROY($) {
  with ($) {
    if (bombID != null) {
      bombID.enemyID = 0;
    }

    if (held) {
      oPlayer1.holdItem = 0;
      oPlayer1.pickupItem = '';
    }
  }
}

function oEnemy_COLLISION_oWhip($) {
  with ($) {
    hp -= other.damage;
    countsAsKill = true;
    if (bloodLeft > 0) {
      scrCreateBlood(x + sprite_width / 2, y + sprite_height / 2, 1);
      if (hp < 0) bloodLeft -= 1;
    }
    playSound(global.sndHit);
  }
}

function oEnemy_COLLISION_oWhipPre($) {
  with ($) {
    hp -= other.damage;
    countsAsKill = true;
    if (bloodLeft > 0) {
      scrCreateBlood(x + sprite_width / 2, y + sprite_height / 2, 1);
      if (hp < 0) bloodLeft -= 1;
    }
    playSound(global.sndHit);
  }
}

function oEnemy_COLLISION_oCharacter($) {
  with ($) {
    // jumped on - oCaveman, oManTrap replaces this script with its own
    if (abs(other.x - (x + 8)) > 12) {
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
        scrCreateBlood(other.x, other.y + 8, 1);
      } else hp -= 1 * (floor(other.allTimer / 16) + 1);
      other.allTimer = 0;
      playSound(global.sndHit);
    } else if (!other.invincible) {
      other.blink = 30;
      other.invincible = 30;

      if (other.state != 14) {
        if (other.x < x) other.xVel = -6;
        else other.xVel = 6;
      }

      if (global.plife > 0) {
        global.plife -= 1;

        if (global.plife <= 0 && isRealLevel()) {
          if (type == 'Bat') global.enemyDeaths[0] += 1;
          else if (type == 'Snake') global.enemyDeaths[1] += 1;
          else if (type == 'Spider') global.enemyDeaths[2] += 1;
          else if (type == 'Giant Spider') global.enemyDeaths[3] += 1;
          else if (type == 'Caveman') global.enemyDeaths[4] += 1;
          else if (type == 'Skeleton') global.enemyDeaths[5] += 1;
          else if (type == 'Zombie') global.enemyDeaths[6] += 1;
          else if (type == 'Frog') global.enemyDeaths[8] += 1;
          else if (type == 'Fire Frog') global.enemyDeaths[9] += 1;
          else if (type == 'ManTrap') global.enemyDeaths[10] += 1;
          else if (type == 'Piranha') global.enemyDeaths[11] += 1;
          else if (type == 'MegaMouth') global.enemyDeaths[12] += 1;
          else if (type == 'Yeti') global.enemyDeaths[13] += 1;
          else if (type == 'Yeti King') global.enemyDeaths[14] += 1;
          else if (type == 'Alien') global.enemyDeaths[15] += 1;
          else if (type == 'UFO') global.enemyDeaths[16] += 1;
          else if (type == 'Alien Boss') global.enemyDeaths[17] += 1;
          else if (type == 'Hawkman') global.enemyDeaths[18] += 1;
          else if (type == 'Shopkeeper') global.enemyDeaths[19] += 1;
          else if (type == 'Tomb Lord') global.enemyDeaths[20] += 1;
          else if (type == 'Magma Man') global.enemyDeaths[21] += 1;
          else if (type == 'Olmec') global.enemyDeaths[22] += 1;
        }
      }

      if (type == 'Bat' || type == 'Piranha' || type == 'Vampire')
        scrCreateBlood(x + 4, y + 4, 1);

      playSound(global.sndHurt);
    }
  }
}

function oEnemy_OTHER($) {
  with ($) {
    instance_destroy();
  }
}

function oEnemy_DRAW($) {
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
  }
}

function oEnemy_STEP($) {
  with ($) {
    /*
if ((x &gt; view_xview[0]-8 and x &lt; view_xview[0]+view_wview[0]+8 and
     y &gt; view_yview[0]-8 and y &lt; view_yview[0]+view_hview[0]+8))
{
*/

    if (
      x > view_xview[0] - 20 &&
      x < view_xview[0] + view_wview[0] + 4 &&
      y > view_yview[0] - 20 &&
      y < view_yview[0] + view_hview[0] + 4
    ) {
      active = true;

      if (held) {
        xVel = 0;
        yVel = 0;
        myGrav = 0;

        if (oPlayer1.acing == 18) {
          x = oPlayer1.x - 12;
          facing = 0;
        }
        if (oPlayer1.acing == 19) {
          x = oPlayer1.x - 4;
          facing = 1;
        }

        if (oPlayer1.state == 12 && abs(oPlayer1.xVel) < 2) y = oPlayer1.y - 10;
        else y = oPlayer1.y - 12;

        depth = 1;

        if (oPlayer1.holdItem == 0 || status < 98) {
          held = false;
        }
      } else depth = 60;

      if (
        collision_point(
          x + floor(sprite_width / 2),
          y + floor(sprite_height / 2),
          oWaterSwim,
          -1,
          -1
        )
      ) {
        if (!swimming) {
          instance_create(x + floor(sprite_width / 2), y, oSplash);
          swimming = true;
          playSound(global.sndSplash);
        }
        myGrav = myGravWater;

        if (type == 'Fire Frog') {
          obj = instance_create(x, y, oFrog);
          obj.status = status;
          instance_destroy();
        }
      } else {
        swimming = false;
        myGrav = myGravNorm;
      }

      if (burning > 0) {
        if (rand(1, 5) == 1)
          instance_create(
            x + rand(0, sprite_width),
            y + rand(0, sprite_height),
            oBurn
          );
        burning -= 1;
      }

      if (collision_point(x + floor(sprite_width / 2), y - 1, oLava, 0, 0))
        instance_destroy();

      if (
        collision_point(
          x + floor(sprite_width / 2),
          y + sprite_height - 2,
          oLava,
          0,
          0
        )
      ) {
        hp = 0;
        countsAsKill = false;
        burning = 1;
        myGrav = 0;
        xVel = 0;
        yVel = 0.1;
        depth = 999;
      }

      if (
        collision_rectangle(x + 2, y + 2, x + 14, y + 14, oSpearsLeft, 0, 0)
      ) {
        trap = instance_nearest(x, y, oSpearsLeft);
        if (trap.image_index >= 20 && trap.image_index < 24) {
          if (
            type == 'Caveman' ||
            type == 'ManTrap' ||
            type == 'Yeti' ||
            type == 'Hawkman' ||
            type == 'Shopkeeper'
          ) {
            // if (status < 98)
            if (hp > 0) {
              hp -= 2;
              countsAsKill = false;
              status = 98;
              counter = stunTime;
              yVel = -6;
              if (trap.x + 8 < x + 8) xVel = 4;
              else xVel = -4;
              image_speed = 0.5;
              playSound(global.sndHit);
              scrCreateBlood(x + sprite_width / 2, y + sprite_height / 2, 2);
            }
          } else {
            hp -= 2;
            countsAsKill = false;
            playSound(global.sndHit);
            scrCreateBlood(x + sprite_width / 2, y + sprite_height / 2, 1);
          }
        }
      }

      if (collision_point(x + 8, y + 16, oSpikes, 0, 0) && yVel > 2) {
        spikes = instance_place(x + 8, y + 14, oSpikes);

        if (!bloodless) {
          instances_of(spikes).forEach(($) => {
            with ($) {
              sprite_index = sSpikesBlood;
            }
          });
        }

        if (hp > 0) {
          hp = 0;
          countsAsKill = false;
          if (!bloodless)
            scrCreateBlood(x + sprite_width / 2, y + sprite_height / 2, 3);
          if (
            type == 'Caveman' ||
            type == 'ManTrap' ||
            type == 'Yeti' ||
            type == 'Hawkman' ||
            type == 'Shopkeeper'
          )
            status = 99;
        }
        myGrav = 0;
        xVel = 0;
        yVel = 0.2;
      }

      // sacrifice
      if (status >= 98) {
        if (!held && xVel == 0 && yVel == 0) {
          if (collision_point(x + 8, y + 16, oSacAltarLeft, 0, 0)) {
            if (sacCount > 0) sacCount -= 1;
            else {
              instance_create(x + 8, y + 8, oFlame);
              playSound(global.sndSmallExplode);
              scrCreateBlood(x + 8, y + 8, 3);
              global.message = 'KALI ACCEPTS THE SACRIFICE!';
              if (global.avor <= -8) {
                global.message = 'KALI DEVOURS THE SACRIFICE!';
              } else if (global.avor < 0) {
                if (status == 98) global.avor += favor;
                else global.avor += favor / 2;
                if (favor > 0) favor = 0;
              } else {
                if (status == 98) global.avor += favor;
                else global.avor += favor / 2;
              }
              scrGetFavorMsg();
              global.messageTimer = 200;
              global.shake = 10;
              instance_destroy();
            }
          }
        } else sacCount = 20;
      }

      // moving projectile
      if (status == 98) {
        if (abs(xVel) > 2 || abs(yVel) > 2) {
          obj = collision_rectangle(x, y, x + 16, y + 16, oEnemy, 0, 1);
          if (obj != null) {
            if (!obj.invincible && obj.type != 'Magma Man') {
              if (obj.status < 98) obj.xVel = xVel;
              instances_of(obj).forEach(($) => {
                with ($) {
                  if (
                    type == 'Caveman' ||
                    type == 'ManTrap' ||
                    type == 'Vampire' ||
                    type == 'Yeti' ||
                    type == 'Hawkman'
                  ) {
                    if (status < STUNNED) {
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

              // obj.xVel = xVel * 0.3;

              if (type == 'Arrow' || type == 'Fish Bone') instance_destroy();
            }
          }
        }
      }
    } else active = false;
  }
}

function oEnemy_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    hp = 1;
    type = 'None';

    active = true;

    // is this used?
    shaking = 0;
    shakeCounter = 0;

    bloodless = false;
    bloodLeft = 4;
    flying = false;
    heavy = true;
    myGrav = 0.6;
    myGravNorm = 0.6;
    myGravWater = 0.2;
    yVelLimit = 10;
    bounceFactor = 0.5;
    frictionFactor = 0.3;

    // added so enemies can be carried with same code as items
    held = false;
    armed = false;
    trigger = false;
    safe = false;
    sticky = false;
    canPickUp = true;
    cost = 0;
    forSale = false;
    favor = 1;
    sacCount = 20;

    countsAsKill = true; // sometimes it's !the player's fault!
    burning = 0;
    swimming = false;
    stunTime = 200;
    LEFT = 0;
    RIGHT = 1;
    facing = 0;

    //Standard enemy status code
    STUNNED = 98;
    DEAD = 99;
    inWeb = false;
    //
    bombID = null;
  }
}

class oEnemy extends oDrawnSprite {
  myGravWater;
  oAlienEject;
  oFrog;
  shaking;
  spikes;
}
ObjType.oEnemy = oEnemy;
