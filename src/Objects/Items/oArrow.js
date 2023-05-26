function oArrow_ALARM($) {
  with ($) {
    instance_create(x, y, oExplosion);
    if (global.graphicsHigh) {
      scrCreateFlame(x, y, 3);
    }

    if (held) {
      if (oCharacter) oCharacter.holdItem = 0;
    }
    instance_destroy();

    safe = false;
  }
}

function oArrow_DRAW($) {
  with ($) {
    draw_sprite_ext(
      sprite_index,
      image_index,
      x,
      y,
      1,
      1,
      image_angle,
      c_white,
      1
    );
  }
}

function oArrow_STEP($) {
  with ($) {
    action_inherited();

    if (xVel > 0 && yVel < 0) {
      direction = radtodeg(arctan(-yVel / xVel));
    } else if (xVel < 0 && yVel < 0) {
      direction = 180 - radtodeg(arctan(-yVel / -xVel));
    } else if (xVel > 0 && yVel > 0) {
      direction = radtodeg(arctan(-yVel / xVel));
    } else if (xVel < 0 && yVel > 0) {
      direction = 180 + radtodeg(arctan(yVel / -xVel));
    } else if (xVel < 0) direction = 180;
    else if (!stuck) {
      if (direction > 90 && direction < 270) direction = 180;
      else direction = 0;
    }

    image_angle = direction;

    // ensure the arrow does !shoot through the target in the Moon challenge
    if (isRoom('rMoon')) {
      if (instance_exists(oTarget)) {
        if (
          x > oTarget.x &&
          y > oTarget.y - 16 &&
          y < oTarget.y + 16 &&
          distance_to_object(oTarget) < 4
        ) {
          x = oTarget.x + 4;
          xVel = 0;
          yVel = 0;
        }
      }
    }
  }
}

function oArrow_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Arrow';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    myGrav = 0.2;
  }
}

class oArrow extends oItem {
  // variables
}
