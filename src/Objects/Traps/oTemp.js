function oTemp_STEP($) {
  with ($) {
    if (
      fired == 0 &&
      abs(oPlayer1.y - y - 8) < 8 &&
      oPlayer1.x < x + 8 &&
      point_distance(x + 8, y + 8, oPlayer1.x, oPlayer1.y) < 128 &&
      (abs(oPlayer1.xVel) > 0 || abs(oPlayer1.yVel) > 0)
    ) {
      arrow = instance_create(x - 16, y + 4, oArrow);
      arrow.xVel = -8;
      fired += 1;
      sound_play(sndArrowTrap);
    }

    obj = instance_nearest(x, y, oEnemy);
    if (obj) {
      if (
        fired == 0 &&
        abs(obj.y - y - 8) < 8 &&
        obj.x < x &&
        point_distance(x, y, obj.x, obj.y) < 128 &&
        (abs(obj.xVel) > 0 || abs(obj.yVel) > 0)
      ) {
        arrow = instance_create(x - 16, y + 4, oArrow);
        arrow.xVel = -8;
        fired += 1;
        sound_play(sndArrowTrap);
      }
    }

    obj = instance_nearest(x, y, oMoveableSolid);
    if (obj) {
      if (
        fired == 0 &&
        abs(obj.y - y - 8) < 8 &&
        obj.x < x &&
        point_distance(x, y, obj.x, obj.y) < 128
      ) {
        arrow = instance_create(x - 16, y + 4, oArrow);
        arrow.xVel = -8;
        fired += 1;
        sound_play(sndArrowTrap);
      }
    }

    obj = instance_nearest(x - 16, y, oItem);
    if (obj) {
      if (
        fired == 0 &&
        abs(obj.y - y - 8) < 8 &&
        obj.x < x + 8 &&
        point_distance(x + 8, y + 8, obj.x, obj.y) < 128 &&
        (abs(obj.xVel) > 0 || abs(obj.yVel) > 0)
      ) {
        arrow = instance_create(x - 16, y + 4, oArrow);
        arrow.xVel = -8;
        fired += 1;
        sound_play(sndArrowTrap);
      }
    }

    x = ceil(x);
    y = ceil(y);
  }
}

function oTemp_ALARM_0($) {
  with ($) {
    arrow = instance_create(x - 16, y + 4, oArrow);
    arrow.xVel = -5;
  }
}

function oTemp_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    type = 'Arrow Trap';
    fired = 0;
    invincible = false;
    // alarm[0] = 50;
  }
}

class oTemp extends oSolid {
  oEnemy;
  oItem;
  oMoveableSolid;
  sprite_index = sArrowTrapLeft;
  visible = true;
}
ObjType.oTemp = oTemp;
