function oPushBlock_DESTROY($) {
  with ($) {
    if (!cleanDeath && !global.cleanSolids) {
      if (!global.cityOfGold) {
        rubble = instance_create(
          x + 8 + rand(0, 8) - rand(0, 8),
          y + 8 + rand(0, 8) - rand(0, 8),
          oRubble
        );
        rubble.sprite_index = sRubbleLush;
        rubble = instance_create(
          x + 8 + rand(0, 8) - rand(0, 8),
          y + 8 + rand(0, 8) - rand(0, 8),
          oRubbleSmall
        );
        rubble.sprite_index = sRubbleLushSmall;
        rubble = instance_create(
          x + 8 + rand(0, 8) - rand(0, 8),
          y + 8 + rand(0, 8) - rand(0, 8),
          oRubbleSmall
        );
        rubble.sprite_index = sRubbleLushSmall;
      } else {
        for (i = 0; i < 3; i += 1) {
          gold = instance_create(
            x + 8 + rand(0, 4) - rand(0, 4),
            y + 8 + rand(0, 4) - rand(0, 4),
            oGoldChunk
          );
          gold.xVel = rand(0, 3) - rand(0, 3);
          gold.yVel = rand(2, 4) * 1;
        }
        gold = instance_create(
          x + 8 + rand(0, 4) - rand(0, 4),
          y + 8 + rand(0, 4) - rand(0, 4),
          oGoldNugget
        );
        gold.xVel = rand(0, 3) - rand(0, 3);
        gold.yVel = rand(2, 4) * 1;
      }
    }
  }
}

function oPushBlock_OTHER($) {
  with ($) {
    instance_destroy();
  }
}

function oPushBlock_STEP($) {
  with ($) {
    try {
      oMoveableSolid_STEP($);
    } catch (err) {}

    if (
      collision_point(x + 8, y + 14, oLava, 0, 0) &&
      !collision_point(x + 8, y + 17, oSolid, 0, 0)
    ) {
      yVel = 0;
      myGrav = 0;
      scrMoveableSolidRecurseDrop();
      y += 0.05;
    }
  }
}

function oPushBlock_CREATE($) {
  with ($) {
    try {
      oMoveableSolid_CREATE($);
    } catch (err) {}

    invincible = false;
    setCollisionBounds(0, 0, 16, 16);
    if (global.cityOfGold) sprite_index = sGoldBlock;
    cleanDeath = false;
  }
}

class oPushBlock extends oMoveableSolid {
  cityOfGold;
  gold;
  oGoldChunk;
  oGoldNugget;
  sGoldBlock;
  sRubbleLush;
  sRubbleLushSmall;
  sprite_index = sBlock;
  visible = true;
}
ObjType.oPushBlock = oPushBlock;
