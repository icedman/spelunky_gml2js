function oBlock_DESTROY($) {
  with ($) {
    if (!cleanDeath) {
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

function oBlock_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    cleanDeath = false;
    if (global.cityOfGold) sprite_index = sGoldBlock;
  }
}

class oBlock extends oSolid {}
ObjType.oBlock = oBlock;
