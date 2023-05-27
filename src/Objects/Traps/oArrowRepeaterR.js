function oArrowRepeaterR_DESTROY($) {
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

function oArrowRepeaterR_ALARM_1($) {
  with ($) {
    xAct = x + 16;
    while (!collision_point(xAct, y + 8, oSolid, 0, 0)) {
      if (xAct - x > 96) break;
      xAct += 1;
    }
    xAct -= x + 8;
  }
}

function oArrowRepeaterR_STEP($) {
  with ($) {
    firing = false;
    if (fired > 0) fired -= 1;
    else if (!oPlayer1.dead) {
      arrow = instance_create(x + 18, y + 4, oArrow);
      arrow.xVel = 8;
      fired = rand(100, 200);
      playSound(global.sndArrowTrap);
    }
  }
}

function oArrowRepeaterR_ALARM_0($) {
  with ($) {
    arrow = instance_create(x + 16, y + 4, oArrow);
    arrow.xVel = 5;
  }
}

function oArrowRepeaterR_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    type = 'Arrow Trap';
    fired = 100 + rand(100);
    invincible = false;
    xAct = 0; // activate distance
    //alarm[0] = 50;
    //alarm[1] = 1;
  }
}

class oArrowRepeaterR extends oSolid {
  arrow;
  fired;
  firing;
  oArrow;
  sndArrowTrap;
  xAct;
}
ObjType.oArrowRepeaterR = oArrowRepeaterR;
