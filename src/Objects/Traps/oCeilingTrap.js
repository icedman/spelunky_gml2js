function oCeilingTrap_DESTROY($) {
  with ($) {
    if (!cleanDeath && !global.cleanSolids) {
      rubble = instance_create(
        x + 8 + rand(0, 8) - rand(0, 8),
        y + 8 + rand(0, 8) - rand(0, 8),
        oRubble
      );
      rubble.sprite_index = sRubbleTan;
      rubble = instance_create(
        x + 8 + rand(0, 8) - rand(0, 8),
        y + 8 + rand(0, 8) - rand(0, 8),
        oRubbleSmall
      );
      rubble.sprite_index = sRubbleTanSmall;
      rubble = instance_create(
        x + 8 + rand(0, 8) - rand(0, 8),
        y + 8 + rand(0, 8) - rand(0, 8),
        oRubbleSmall
      );
      rubble.sprite_index = sRubbleTanSmall;
    }
  }
}

function oCeilingTrap_OTHER($) {
  with ($) {
    if ((sprite_index = sCeilingTrapS)) sprite_index = sCeilingTrap;
  }
}

function oCeilingTrap_STEP($) {
  with ($) {
    if (status == IDLE) {
      // nothing
    } else if (status == DROP) {
      if (counter > 0) counter -= 1;
      else {
        counter = 3;
        y += 1;
      }
      yVel = 0;
      if (collision_point(x + 8, y + 17, oSolid, 0, 0)) status = WAIT;
      if ((sprite_index = sBlock)) sprite_index = sCeilingTrapS;
    } else if (status == WAIT) {
      yVel = 0;
      if (isCollisionBottom(1)) y -= 1;
    }
  }
}

function oCeilingTrap_CREATE($) {
  with ($) {
    try {
      oMovingSolid_CREATE($);
    } catch (err) {}

    makeActive();
    setCollisionBounds(0, 0, 16, 16);
    invincible = false;
    viscidTop = 1;
    image_speed = 0.4;

    xVel = 0;
    yVel = 0;
    myGrav = 1;

    counter = 3;

    status = 0;
    IDLE = 0;
    DROP = 1;
    WAIT = 2;
    RETURN = 3;
  }
}

class oCeilingTrap extends oMovingSolid {}
