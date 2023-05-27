function oTemple_DESTROY($) {
  with ($) {
    try {
      oSolid_DESTROY($);
    } catch (err) {}

    if (!cleanDeath && !global.cleanSolids) {
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

      if (sprite_index == sTempleGold) {
        for (i = 0; i < 3; i += 1) {
          gold = instance_create(
            x + 8 + rand(0, 4) - rand(0, 4),
            y + 8 + rand(0, 4) - rand(0, 4),
            oGoldChunk
          );
          gold.xVel = rand(0, 3) - rand(0, 3);
          gold.yVel = rand(2, 4) * 1;
        }
      } else if (sprite_index == sTempleGoldBig || global.cityOfGold) {
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

      if (treasure == 'Big Ruby') {
        instance_create(x + 8, y + 8, oRubyBig);
      }
    }
  }
}

function oTemple_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    cleanDeath = false;

    n = rand(1, 100);

    if (global.cityOfGold) sprite_index = sGTemple;
    else if (n < 20) sprite_index = sTempleGold;
    else if (n < 30) sprite_index = sTempleGoldBig;
    else if (
      isLevel() &&
      x > 1 &&
      x < room_width - 16 &&
      y > 1 &&
      y < room_height - 16
    ) {
      if (rand(1, 60) == 1) instance_create(x + 8, y + 8, oSapphireBig);
      else if (rand(1, 80) == 1) instance_create(x + 8, y + 8, oEmeraldBig);
      else if (rand(1, 100) == 1) instance_create(x + 8, y + 8, oRubyBig);
      else if (rand(1, 1200) == 1) scrGenerateItem(x + 8, y + 8, 2);
    }
  }
}

class oTemple extends oSolid {}
