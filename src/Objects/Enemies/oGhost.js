function oGhost_COLLISION_oWhip($) {
  with ($) {
    //
  }
}

function oGhost_COLLISION_oCharacter($) {
  with ($) {
    if (other.invincible == 0) {
      if (true) {
        if (isRealLevel()) global.enemyDeaths[23] += 1;
        for (r = 0; r < c; r++) {
          instance_create(other.x, other.y, oBone);
        }
        skull = instance_create(other.x, other.y - 2, oSkull);
        skull.yVel = -rand(1, 3);
        skull.xVel = rand(0, 3) - rand(0, 3);
        other.visible = false;
        other.invincible = 9999;
        other.bounced = true;
        global.plife = -99;
        playSound(global.sndDie);
        //global.drawHUD = false;

        if (other.holdItem) {
          other.holdItem.held = false;
          if (facing == LEFT) other.holdItem.xVel = -2;
          else other.holdItem.xVel = 2;
          other.holdItem.yVel = -4;
          other.holdItem = 0;
        }

        status = IDLE;
        image_speed = 0.2;
        sprite_index = sGhostDisappear;
        playSound(global.sndGhost);
      }
    }
  }
}

function oGhost_OTHER($) {
  with ($) {
    if (sprite_index == sGhostTurnRight) {
      sprite_index = sGhostRight;
    } else if (sprite_index == sGhostTurnLeft) {
      sprite_index = sGhostLeft;
    } else if (sprite_index == sGhostDisappear) {
      instance_destroy();
    }
  }
}

function oGhost_STEP($) {
  with ($) {
    if (hp < 1) {
      //global.bats += 1;
      global.kills += 1;
      instance_destroy();
    }

    dir = 0;
    dist = point_distance(x + 8, y + 8, oCharacter.x, oCharacter.y);

    if (status == IDLE) {
      // do nothing
    } else if (status == ATTACK) {
      dir = point_direction(x + 8, y + 8, oCharacter.x, oCharacter.y);
      x += 1 * cos(degtorad(dir));
      y += -1 * sin(degtorad(dir));
      if (oCharacter.x < x + 8) {
        if (sprite_index == sGhostRight) sprite_index = sGhostTurnLeft;
      } else {
        if (sprite_index == sGhostLeft) sprite_index = sGhostTurnRight;
      }
    }
  }
}

function oGhost_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    image_speed = 0.5;
    setCollisionBounds(4, 0, 12, 16);
    origX = 0;
    origY = 0;
    xVel = 0;
    yVel = 0;
    xAcc = 0.2;
    yAcc = 0.2;

    // stats
    hp = 1;
    invincible = 1;

    // status
    IDLE = 0;
    ATTACK = 1;

    status = 1;

    LEFT = 0;
    RIGHT = 1;
    facing = RIGHT;

    shakeCounter = 0;
    shakeToggle = 1;

    playSound(global.sndGhost);
  }
}

class oGhost extends oDrawnSprite {}
