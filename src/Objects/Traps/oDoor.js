function oDoor_DESTROY($) {
  with ($) {
    rubble = instance_create(
      x + 8 + rand(0, 4) - rand(0, 4),
      y + 8 + rand(0, 8) - rand(0, 8),
      oRubbleSmall
    );
    rubble.sprite_index = sRubbleTanSmall;
    rubble = instance_create(
      x + 8 + rand(0, 4) - rand(0, 4),
      y + 8 + rand(0, 8) - rand(0, 8),
      oRubbleSmall
    );
    rubble.sprite_index = sRubbleTanSmall;
  }
}

function oDoor_STEP($) {
  with ($) {
    dist = distance_to_object(oCharacter);
    if (status == IDLE) {
      // nothing
    } else if (status == DROP) {
      yVel += myGrav;
      if (yVel > 6) yVel = 6;
      if (isCollisionBottom(1)) {
        status = WAIT;
        yVel = 0;
        counter = 100;
        depth = 100;
      }
    } else if (status == WAIT) {
      if (isCollisionBottom(1)) y -= 1;
    }
  }
}

function oDoor_CREATE($) {
  with ($) {
    try {
      oMovingSolid_CREATE($);
    } catch (err) {}

    makeActive();
    setCollisionBounds(1, 0, 15, 32);
    invincible = false;
    viscidTop = 1;

    xVel = 0;
    yVel = 0;
    myGrav = 1;

    counter = 0;

    status = 0;
    IDLE = 0;
    DROP = 1;
    WAIT = 2;
    RETURN = 3;
  }
}

class oDoor extends oMovingSolid {}
