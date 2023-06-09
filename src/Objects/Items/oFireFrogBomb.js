function oFireFrogBomb_ALARM_1($) {
  with ($) {
    instance_create(x, y, oExplosion);
    scrCreateBlood(x, y, 3);
    if (global.graphicsHigh) {
      scrCreateFlame(x, y, 3);
    }

    if (held) {
      if (oCharacter) oCharacter.holdItem = 0;
    }
    instance_destroy();
  }
}

function oFireFrogBomb_STEP($) {
  with ($) {
    try {
      oItem_STEP($);
    } catch (err) {}

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

    if (collision_point(x, y, oWaterSwim, -1, -1)) {
      if (!swimming) {
        instance_create(x, y, oSplash);
        swimming = true;
        playSound(global.sndSplash);
      }
    } else {
      swimming = false;
    }
  }
}

function oFireFrogBomb_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Fire Frog Bomb';
    makeActive();
    setCollisionBounds(-6, -4, 6, 8);
    alarm[1] = 120;
    heavy = true;
    bloodless = false;
    swimming = false;
  }
}

class oFireFrogBomb extends oItem {
  oWaterSwim;
  sprite_index = sFireFrogArmedL;
  visible = true;
}
ObjType.oFireFrogBomb = oFireFrogBomb;
