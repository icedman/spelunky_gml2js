function oTree_DESTROY($) {
  with ($) {
    action_inherited();

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
    }
  }
}

function oTree_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 16 &&
      x < view_xview[0] + view_wview[0] + 16 &&
      y > view_yview[0] - 16 &&
      y < view_yview[0] + view_hview[0] + 16
    ) {
      if (!collision_point(x, y + 16, oSolid, 0, 0)) {
        instance_destroy();
      }
    }
  }
}

function oTree_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Tree';
    burning = false;
  }
}

class oTree extends oSolid {
  // variables
}
