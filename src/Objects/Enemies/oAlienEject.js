function oAlienEject_COLLISION_oPlayer1($) {
  with ($) {
    // jumped on - oCaveman, oManTrap replaces this script with its own
    if (
      !other.dead &&
      (other.state == 15 || other.state == 16) &&
      other.y < y - 3 &&
      !other.swimming
    ) {
      other.yVel = -6 - 0.2 * other.yVel;
      other.allTimer = 0;
      playSound(global.sndHit);
      for (r = 0; r < c; r++) {
        instance_create(other.x + 8, other.y + 8, oBlood);
      }
      if (countsAsKill) {
        if (isRealLevel()) global.enemyKills[15] += 1;
        global.aliens += 1;
        global.kills += 1;
      }
      instance_destroy();
    } else if (other.invincible == 0) {
      other.blink = 30;
      other.invincible = 30;
      if (other.y < y) other.yVel = -6;
      if (other.x < x) other.xVel = -6;
      else other.xVel = 6;

      if (global.plife > 0) global.plife -= 1;
      playSound(global.sndHurt);
    }
  }
}

function oAlienEject_COLLISION_oWeb($) {
  with ($) {
    instance_create(x - 8, y - 12, oAlien);
    instance_destroy();
  }
}

function oAlienEject_OTHER($) {
  with ($) {
    instance_destroy();

    if (sprite_index == sAlienDeploy) sprite_index = sAlienParachute;
  }
}

function oAlienEject_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 20 &&
      x < view_xview[0] + view_wview[0] + 4 &&
      y > view_yview[0] - 20 &&
      y < view_yview[0] + view_hview[0] + 16
    ) {
      x += xVel;
      y += yVel;

      if (status == EJECT) {
        xVel = 0;
        yVel += 0.5;
        if (yVel >= 0 || isCollisionTop(1)) {
          yVel = 0;
          status = FLOAT;
          sprite_index = sAlienDeploy;
        }
        if (rand(1, 5) == 1)
          instance_create(
            x + rand(0, 3) - rand(0, 3),
            y + rand(0, 3) - rand(0, 3),
            oBurn
          );
      } else if (status == FLOAT) {
        xVel = 0;
        yVel = 2;
        if (collision_point(x, y + 6, oSolid, 0, 0)) {
          instance_create(x - 8, y - 12, oAlien);
          instance_destroy();
        } else if (dir == 0) {
          xVel = -1;
          if (collision_point(x - 8, y, oSolid, 0, 0)) dir = 99;
        } else if (dir == 1) {
          xVel = 1;
          if (collision_point(x + 8, y, oSolid, 0, 0)) dir = 99;
        }
      }
    }
  }
}

function oAlienEject_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    xVel = 0;
    yVel = -6;
    image_speed = 0.6;

    // stats
    type = 'Alien Eject';
    hp = 1;
    invincible = 0;
    countsAsKill = true;

    EJECT = 0;
    DEPLOY = 1;
    FLOAT = 2;

    status = 0;

    dir = rand(0, 1);
    counter = 0;
  }
}

class oAlienEject extends oDrawnSprite {
  DEPLOY;
  EJECT;
  FLOAT;
  oAlien;
  sAlienDeploy;
  sAlienParachute;
  sprite_index = sAlienEject;
  visible = true;
}
ObjType.oAlienEject = oAlienEject;
