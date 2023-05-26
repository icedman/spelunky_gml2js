function oLush_DESTROY($) {
  with ($) {
    action_inherited();

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

      if (sprite_index == sLushGold) {
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

      if (sprite_index == sLushGoldBig) {
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

function oLush_CREATE($) {
  with ($) {
    action_inherited();

    cleanDeath = false;

    n = rand(1, 100);

    if (n < 20) sprite_index = sLushGold;
    else if (n < 30) sprite_index = sLushGoldBig;
    else if (
      isLevel() &&
      x > 1 &&
      x < room_width - 16 &&
      y > 1 &&
      y < room_height - 16
    ) {
      if (rand(1, 80) == 1) instance_create(x + 8, y + 8, oSapphireBig);
      else if (rand(1, 100) == 1) instance_create(x + 8, y + 8, oEmeraldBig);
      else if (rand(1, 120) == 1) instance_create(x + 8, y + 8, oRubyBig);
      else if (rand(1, 1200) == 1) scrGenerateItem(x + 8, y + 8, 2);
    }
  }
}

class oLush extends oSolid {
  // variables
}
