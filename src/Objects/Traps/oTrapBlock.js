function oTrapBlock_DESTROY($) {
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
      if (dying) {
        playSound(global.sndThump);
        scrShake(10);
      }
    }
  }
}

function oTrapBlock_STEP($) {
  with ($) {
    try {
      oSolid_STEP($);
    } catch (err) {}

    if (dying) {
      if (deathTimer > 0) deathTimer -= 1;
      else instance_destroy();
    }
  }
}

function oTrapBlock_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    dying = false;
    deathTimer = 0;
  }
}

class oTrapBlock extends oSolid {
  sprite_index = sSkullBlock;
  visible = true;
}
ObjType.oTrapBlock = oTrapBlock;
