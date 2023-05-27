function oSpearTrapTop_DESTROY($) {
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

    global.checkWater = true;
  }
}

function oSpearTrapTop_STEP($) {
  with ($) {
    if (fired > 0) fired -= 1;

    range = 64;

    if (
      fired == 0 &&
      abs(oPlayer1.y - y - 8) < prox &&
      oPlayer1.x < x &&
      point_distance(x + 8, y + 8, oPlayer1.x, oPlayer1.y) < range
    ) {
      instance_create(x - 16, y, oSpearsLeft);
      fired = firedMax;
    }

    obj = instance_nearest(x, y, oEnemy);
    if (obj) {
      if (
        fired == 0 &&
        abs(obj.y - y) < prox &&
        obj.x < x &&
        point_distance(x, y, obj.x, obj.y) < range
      ) {
        instance_create(x - 16, y, oSpearsLeft);
        fired = firedMax;
      }
    }

    obj = instance_nearest(x, y, oMoveableSolid);
    if (obj) {
      if (
        fired == 0 &&
        abs(obj.y - y) < prox &&
        obj.x < x &&
        point_distance(x, y, obj.x, obj.y) < range
      ) {
        instance_create(x - 16, y, oSpearsLeft);
        fired = firedMax;
      }
    }

    obj = instance_nearest(x, y, oItem);
    if (obj) {
      if (
        fired == 0 &&
        abs(obj.y - y - 8) < prox &&
        obj.x < x + 8 &&
        point_distance(x + 8, y + 8, obj.x, obj.y) < range
      ) {
        instance_create(x - 16, y, oSpearsLeft);
        fired = firedMax;
      }
    }

    // right

    if (
      fired == 0 &&
      abs(oPlayer1.y - y - 8) < prox &&
      oPlayer1.x > x + 8 &&
      point_distance(x + 8, y + 8, oPlayer1.x, oPlayer1.y) < range
    ) {
      spears = instance_create(x + 16, y, oSpearsLeft);
      spears.sprite_index = sSpearsRight;
      fired = firedMax;
    }

    obj = instance_nearest(x, y, oEnemy);
    if (obj) {
      if (
        fired == 0 &&
        abs(obj.y - y) < prox &&
        obj.x > x &&
        point_distance(x, y, obj.x, obj.y) < range
      ) {
        spears = instance_create(x + 16, y, oSpearsLeft);
        spears.sprite_index = sSpearsRight;
        fired = firedMax;
      }
    }

    obj = instance_nearest(x, y, oMoveableSolid);
    if (obj) {
      if (
        fired == 0 &&
        abs(obj.y - y) < prox &&
        obj.x > x &&
        point_distance(x, y, obj.x, obj.y) < range
      ) {
        spears = instance_create(x + 16, y, oSpearsLeft);
        spears.sprite_index = sSpearsRight;
        fired = firedMax;
      }
    }

    obj = instance_nearest(x, y, oItem);
    if (obj) {
      if (
        fired == 0 &&
        abs(obj.y - y - 8) < prox &&
        obj.x > x + 8 &&
        point_distance(x + 8, y + 8, obj.x, obj.y) < range
      ) {
        spears = instance_create(x + 16, y, oSpearsLeft);
        spears.sprite_index = sSpearsRight;
        fired = firedMax;
      }
    }

    if (
      x > view_xview[0] - 8 &&
      x < view_xview[0] + view_wview[0] + 8 &&
      y > view_yview[0] - 8 &&
      y < view_yview[0] + view_hview[0] + 8
    ) {
      if (!collision_point(x, y + 16, oSolid, 0, 0)) {
        instance_destroy();
      }
    }
  }
}

function oSpearTrapTop_ALARM_0($) {
  with ($) {
    arrow = instance_create(x - 16, y + 4, oArrow);
    arrow.xVel = -5;
  }
}

function oSpearTrapTop_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    fired = 0;
    firedMax = 50;
    prox = 4;
    invincible = false;
    image_speed = 0.5;
    // alarm[0] = 50;
  }
}

class oSpearTrapTop extends oSolid {
  checkWater;
  firedMax;
  oSpearsLeft;
  prox;
  range;
  sSpearsRight;
  spears;
}
ObjType.oSpearTrapTop = oSpearTrapTop;
