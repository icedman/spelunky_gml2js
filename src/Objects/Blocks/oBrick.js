function oBrick_DESTROY($) {
  with ($) {
    try {
      oSolid_DESTROY($);
    } catch (err) {}

    if (!cleanDeath && !global.cleanSolids) {
      instance_create(
        x + 8 + rand(0, 8) - rand(0, 8),
        y + 8 + rand(0, 8) - rand(0, 8),
        oRubble
      );
      instance_create(
        x + 8 + rand(0, 8) - rand(0, 8),
        y + 8 + rand(0, 8) - rand(0, 8),
        oRubbleSmall
      );
      instance_create(
        x + 8 + rand(0, 8) - rand(0, 8),
        y + 8 + rand(0, 8) - rand(0, 8),
        oRubbleSmall
      );

      if (sprite_index == sBrickGold) {
        for (i = 0; i < 3; i += 1) {
          gold = instance_create(
            x + 8 + rand(0, 4) - rand(0, 4),
            y + 8 + rand(0, 4) - rand(0, 4),
            oGoldChunk
          );
          gold.xVel = rand(0, 3) - rand(0, 3);
          gold.yVel = rand(2, 4) * 1;
        }
      }
      if (sprite_index == sBrickGoldBig) {
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

function oBrick_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    n = rand(1, 10);

    if (n == 1) sprite_index = sBrick2;

    n = rand(1, 100);
    if (n < 20) sprite_index = sBrickGold;
    else if (n < 30) sprite_index = sBrickGoldBig;
    else if (
      isLevel() &&
      x > 1 &&
      x < room_width - 16 &&
      y > 1 &&
      y < room_height - 16
    ) {
      if (rand(1, 100) == 1) instance_create(x + 8, y + 8, oSapphireBig);
      else if (rand(1, 120) == 1) instance_create(x + 8, y + 8, oEmeraldBig);
      else if (rand(1, 140) == 1) instance_create(x + 8, y + 8, oRubyBig);
      else if (rand(1, 1200) == 1) scrGenerateItem(x + 8, y + 8, 2);
    }
  }
}

class oBrick extends oSolid {}
