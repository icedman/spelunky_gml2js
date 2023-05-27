function oBomb_DESTROY($) {
  with ($) {
    if (enemyID) {
      enemyID.bombID = 0;
    }
  }
}

function oBomb_ALARM_1($) {
  with ($) {
    instance_create(x, y, oExplosion);
    if (global.graphicsHigh) {
      scrCreateFlame(x, y, 3);
    }

    if (held) {
      if (oCharacter) oCharacter.holdItem = 0;
    }
    instance_destroy();
  }
}

function oBomb_STEP($) {
  with ($) {
    try {
      oItem_STEP($);
    } catch (err) {}

    if (!instance_exists(enemyID)) {
      enemyID = 0;
    }

    if (enemyID != 0) {
      x = enemyID.x - stickyXDiff;
      y = enemyID.y - stickyYDiff;
    }

    try {
      oItem_STEP($);
    } catch (err) {}

    if ((sprite_index = sBombArmed)) depth = 49;
    if (sticky) depth = 1;

    if (armed && instance_exists(oShopkeeper)) {
      if (
        (global.roomPath[_arrayIndex(scrGetRoomX(x), scrGetRoomY(y))] == 4 ||
          global.roomPath[_arrayIndex(scrGetRoomX(x), scrGetRoomY(y))] == 5) &&
        distance_to_object(oShopkeeper) < 96
      ) {
        instances_of(oShopkeeper).forEach(($) => {
          with ($) {
            scrShopkeeperAnger(2);
          }
        });
      }
    }
  }
}

function oBomb_ALARM_0($) {
  with ($) {
    image_speed = 1;
    alarm[1] = 40;
  }
}

function oBomb_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Bomb';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
  }
}

class oBomb extends oItem {
  bombID;
  enemyID;
  graphicsHigh;
  oExplosion;
  roomPath;
  sticky;
  stickyXDiff;
  stickyYDiff;
  sprite_index = sBomb;
  visible = true;
}
ObjType.oBomb = oBomb;
