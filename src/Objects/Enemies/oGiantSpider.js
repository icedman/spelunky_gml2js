function oGiantSpider_COLLISION_oWhip($) {
  with ($) {
    if (whipped == 0) {
      hp -= 1;
      instance_create(x + 16, y + 24, oBlood);
      playSound(global.sndHit);
      whipped = 10;
    }
  }
}

function oGiantSpider_ALARM_1($) {
  with ($) {
    //sprite_index = sSpiderDrown;
  }
}

function oGiantSpider_COLLISION_oCharacter($) {
  with ($) {
    // jumped on - oCaveman, oManTrap replaces this script with its own
    if (abs(other.x - (x + 16)) > 16) {
      // do nothing
    } else if (
      !other.dead &&
      (other.state == 15 || other.state == 16) &&
      other.y < y + 16 &&
      !other.swimming
    ) {
      other.yVel = -6 - 0.2 * other.yVel;
      if (global.hasSpikeShoes) {
        hp -= 3 * (floor(other.allTimer / 16) + 1);
        if (!bloodless) instance_create(other.x, other.y + 8, oBlood);
      } else hp -= 1 * (floor(other.allTimer / 16) + 1);
      other.allTimer = 0;
      instance_create(x + 16, y + 24, oBlood);
      playSound(global.sndHit);
    } else if (other.invincible == 0) {
      if (true) {
        other.blink = 30;
        other.invincible = 30;
        if (other.y < y) other.yVel = -6;
        if (other.x < x) other.xVel = -6;
        else other.xVel = 6;

        if (global.plife > 0) {
          global.plife -= 2;
          if (global.plife <= 0 && isRealLevel()) global.enemyDeaths[3] += 1;
        }
        playSound(global.sndHurt);
      }
    }
  }
}

function oGiantSpider_OTHER($) {
  with ($) {
    if (sprite_index == sGiantSpiderFlip) {
      sprite_index = sGiantSpider;
      image_speed = 0.4;
    } else if (sprite_index == sGiantSpiderSquirt) {
      status = IDLE;
      image_speed = 0.4;
    }
  }
}

function oGiantSpider_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 32 &&
      x < view_xview[0] + view_wview[0] &&
      y > view_yview[0] - 32 &&
      y < view_yview[0] + view_hview[0]
    ) {
      moveTo(xVel, yVel);

      yVel += myGrav;
      if (yVel > yVelLimit) yVel = yVelLimit;

      if (whipped > 0) whipped -= 1;

      if (collision_point(x + 16, y + 24, oSolid, 0, 0)) {
        hp = 0;
      }

      if (hp < 1) {
        r1 = Math.floor(rand(1, 3));
        for (r = 0; r < r1; r++) {
          n = rand(1, 3);
          switch (n) {
            case 1: {
              gem = instance_create(x + 16, y + 24, oEmeraldBig);
              break;
            }
            case 2: {
              gem = instance_create(x + 16, y + 24, oSapphireBig);
              break;
            }
            case 3: {
              gem = instance_create(x + 16, y + 24, oRubyBig);
              break;
            }
          }
          gem.xVel = rand(0, 3) - rand(0, 3);
          gem.yVel = -2;
        }
        obj = instance_create(x + 16, y + 24, oPaste);
        obj.cost = 0;
        obj.orSale = false;
        scrCreateBlood(x + 16, y + 24, 4);
        if (countsAsKill) {
          if (isRealLevel()) global.enemyKills[3] += 1;
          global.giantspiders += 1;
          global.kills += 1;
        }
        instance_destroy();
      }

      if (isCollisionRight(1)) {
        xVel = 1;
      }

      if (isCollisionLeft(1)) {
        xVel = -1;
      }

      if (isCollisionTop(1) && isCollisionBottom(1) && status != CRAWL) {
        status = CRAWL;
        if (oCharacter.x < x + 16) xVel = -1;
        else xVel = 1;
      }

      dist = distance_to_object(oCharacter);

      if (squirtTimer > 0) squirtTimer -= 1;

      if (status == IDLE) {
        if (sprite_index != sGiantSpiderFlip) sprite_index = sGiantSpider;
        alarm[0] = rand(5, 20);
        if (squirtTimer == 0) status = SQUIRT;
        else status = RECOVER;
      } else if (status == CRAWL) {
        sprite_index = sGiantSpiderCrawl;
        if (!isCollisionTop(1) || !isCollisionBottom(1)) status = IDLE;
        else if (isCollisionRight(1)) xVel = -1;
        else if (isCollisionLeft(1)) xVel = 1;
      } else if (status == SQUIRT) {
        sprite_index = sGiantSpiderSquirt;
        if (image_index >= 5 && squirtTimer == 0) {
          instance_create(x + 16, y + 16, oWebBall);
          squirtTimer = rand(100, 1000);
        }
      } else if (status == RECOVER) {
        if (isCollisionBottom(1)) xVel = 0;
      } else if (status == BOUNCE && dist < 120) {
        sprite_index = sGiantSpiderJump;
        if (isCollisionBottom(1)) {
          sprite_index = sGiantSpider;
          yVel = -1 * rand(3, 6);
          if (oCharacter.x < x + 16) {
            xVel = -2.5;
          } else {
            xVel = 2.5;
          }
          playSound(global.sndSpiderJump);

          if (rand(1, 4) == 1) {
            status = IDLE;
            xVel = 0;
            yVel = 0;
          }
        }
      } else if (status != DROWNED) {
        status = IDLE;
        //xVel = 0;
      }

      if (isCollisionTop(1)) yVel = 1;
      /*
if (isCollisionLeft(1) or isCollisionRight(1))
{
    xVel = -xVel;
}
*/

      //if (isCollisionSolid())
      //  y -= 2;
    }
  }
}

function oGiantSpider_ALARM_0($) {
  with ($) {
    if (sprite_index != sGiantSpiderSquirt) {
      status = BOUNCE;
      sprite_index = sGiantSpiderJump;
      if (isCollisionBottom(1)) {
        sprite_index = sGiantSpider;
        yVel = -1 * rand(2, 5);
        if (oCharacter.x < x + 16) {
          xVel = -2.5;
        } else {
          xVel = 2.5;
        }
      }
    }
  }
}

function oGiantSpider_CREATE($) {
  with ($) {
    try {
      oEnemy_CREATE($);
    } catch (err) {}

    type = 'Giant Spider';
    makeActive();
    setCollisionBounds(2, 16, 30, 32);
    xVel = 0;
    yVel = 0;
    yDelta = -0.4;
    myGrav = 0.3;
    myGravNorm = 0.3;
    image_speed = 0.8;

    // stats
    hp = 1;
    invincible = 0;
    whipped = 10;
    squirtTimer = rand(100, 1000);

    // status
    IDLE = 0;
    BOUNCE = 1;
    RECOVER = 2;
    CRAWL = 3;
    DROWNED = 4;
    SQUIRT = 5;

    status = 0;
    bounceCounter = 0;

    shakeCounter = 0;
    shakeToggle = 1;

    playSound(global.sndGiantSpider);
  }
}

class oGiantSpider extends oEnemy {
  CRAWL;
  SQUIRT;
  oWebBall;
  sGiantSpider;
  sGiantSpiderCrawl;
  sGiantSpiderFlip;
  sGiantSpiderJump;
  sGiantSpiderSquirt;
  sndGiantSpider;
  sndSpiderJump;
  squirtTimer;
}
ObjType.oGiantSpider = oGiantSpider;
