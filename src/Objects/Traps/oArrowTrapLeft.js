function oArrowTrapLeft_DESTROY($) {
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
      if (fired == 0) instance_create(x + 8, y + 8, oArrow);
    }
  }
}

function oArrowTrapLeft_ALARM_1($) {
  with ($) {
    if (!isRoom('rLevelEditor')) {
      xAct = x - 1;
      while (!collision_point(xAct, y + 8, oSolid, 0, 0)) {
        if (x - xAct > 96) break;
        xAct -= 1;
      }
      if (xAct > x - 16) {
        xAct = x - 16;
      }
      obj = instance_create(xAct, y, oArrowTrapTest);
      obj.image_xscale = ceil((x - 1 - xAct) / 16);
      obj.trapID = id;
    }
  }
}

function oArrowTrapLeft_STEP($) {
  with ($) {
    firing = false;
    if (fired == 0) {
      /*
    if (collision_line(x+8, y+8, (x+8)-xAct, y+8, oItem, 0, 0))
    {
        obj = collision_line(x+8, y+8, (x+8)-xAct, y+8, oItem, 0, 0);
        if (abs(obj.xVel) &gt; 0 or abs(obj.yVel) &gt; 0) firing = true;
        if (obj.type == "Rope") firing = true;
    }
    
    if (collision_line(x+8, y+8, (x+8)-xAct, y+8, oTreasure, 0, 0))
    {
        obj = collision_line(x+8, y+8, (x+8)-xAct, y+8, oTreasure, 0, 0);
        if (abs(obj.xVel) &gt; 0 or abs(obj.yVel) &gt; 0) firing = true;
    }
    
    if (collision_line(x+8, y+8, (x+8)-xAct, y+8, oEnemy, 0, 0))
    {
        obj = collision_line(x+8, y+8, (x+8)-xAct, y+8, oEnemy, 0, 0);
        if (abs(obj.xVel) &gt; 0 or abs(obj.yVel) &gt; 0) firing = true;
    }
    
    if (collision_line(x+8, y+8, (x+8)-xAct, y+8, oMoveableSolid, 0, 0))
    {
        obj = collision_line(x+8, y+8, (x+8)-xAct, y+8, oMoveableSolid, 0, 0);
        if (abs(obj.xVel) &gt; 0 or abs(obj.yVel) &gt; 0) firing = true;
    }
    
    if (collision_line(x+8, y+8, (x+8)-xAct, y+8, oPlayer1, 0, 0))
    {
        obj = collision_line(x+8, y+8, (x+8)-xAct, y+8, oPlayer1, 0, 0);
        if (abs(obj.xVel) &gt; 0 or abs(obj.yVel) &gt; 0) firing = true;
    }
    
    if (firing)
    {
        arrow = instance_create(x-2, y+4, oArrow);
        arrow.xVel = -8;
        fired += 1;
        playSound(global.sndArrowTrap);
    }
    */
    }
  }
}

function oArrowTrapLeft_ALARM_0($) {
  with ($) {
    arrow = instance_create(x + 16, y + 4, oArrow);
    arrow.xVel = 5;
  }
}

function oArrowTrapLeft_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    type = 'Arrow Trap';
    facing = 0;
    fired = 0;
    invincible = false;
    xAct = 0; // activate distance
    //alarm[0] = 50;
    alarm[1] = 1;
  }
}

class oArrowTrapLeft extends oSolid {}
