function oArrowRepeaterL_DESTROY($) {
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

function oArrowRepeaterL_ALARM($) {
  with ($) {
    xAct = x - 1;
    while (!collision_point(xAct, y + 8, oSolid, 0, 0)) {
      if (x - xAct > 96) break;
      xAct -= 1;
    }
    xAct = x + 8 - xAct;

    arrow = instance_create(x + 16, y + 4, oArrow);
    arrow.xVel = 5;
  }
}

function oArrowRepeaterL_STEP($) {
  with ($) {
    firing = false;
    if (fired > 0) fired -= 1;
    else if (!oPlayer1.dead) {
      arrow = instance_create(x - 2, y + 4, oArrow);
      arrow.xVel = -8;
      fired = rand(100, 200);
      playSound(global.sndArrowTrap);
    }
  }
}

function oArrowRepeaterL_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Arrow Trap';
    fired = 100 + rand(100);
    invincible = false;
    xAct = 0; // activate distance
    //alarm[0] = 50;
    //alarm[1] = 1;
  }
}

class oArrowRepeaterL extends oSolid {
  // variables
}
