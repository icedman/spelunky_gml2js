function oDamselKiss_OTHER($) {
  with ($) {
    global.plife += 1;

    if (sprite_index == sDamselKissL || sprite_index == sPKissL) {
      kissed = true;
      if (global.isDamsel) sprite_index = sStandLeft;
      else sprite_index = sDamselLeft;
    }
  }
}

function oDamselKiss_STEP($) {
  with ($) {
    action_inherited();

    if (
      (sprite_index == sDamselKissL || sprite_index == sPKissL) &&
      image_index == 7
    ) {
      instance_create(x - 8, y - 8, oHeart);
      playSound(global.sndKiss);
    }
  }
}

function oDamselKiss_CREATE($) {
  with ($) {
    action_inherited();

    image_speed = 0.5;

    kissed = false;

    IDLE = 0;
    RUN = 1;
    THROWN = 2;
    YELL = 3;
    EXIT = 4;
    status = IDLE;

    if (global.isDamsel) sprite_index = sStandLeft;
  }
}

class oDamselKiss extends oDrawnSprite {
  // variables
}
