function oRubbleDark_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oRubbleDark_STEP($) {
  with ($) {
    y += yVel;
    yVel += yAcc;

    if (
      collision_point(x, y, oBrick, 0, 0) ||
      collision_point(x, y, oBlock, 0, 0)
    ) {
      instance_destroy();
    }
  }
}

function oRubbleDark_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    yVel = 0;
    yAcc = 0.6;
  }
}

class oRubbleDark extends oDrawnSprite {
  oBlock;
  oBrick;
  sprite_index = sRubbleDark;
  visible = true;
}
ObjType.oRubbleDark = oRubbleDark;
