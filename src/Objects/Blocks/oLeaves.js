function oLeaves_DESTROY($) {
  with ($) {
    if (sprite_index != sLeavesDead && sprite_index != sLeavesDeadR) {
      rubble = instance_create(
        x + 8 + rand(0, 8) - rand(0, 8),
        y + 8 + rand(0, 8) - rand(0, 8),
        oLeaf
      );
      rubble = instance_create(
        x + 8 + rand(0, 8) - rand(0, 8),
        y + 8 + rand(0, 8) - rand(0, 8),
        oLeaf
      );
    }
  }
}

function oLeaves_STEP($) {
  with ($) {
    if (!spriteSet) {
      if (
        (collision_point(x - 16, y, oTree, 0, 0) ||
          collision_point(x - 16, y, oLeaves, 0, 0)) &&
        (collision_point(x + 16, y, oTree, 0, 0) ||
          collision_point(x + 16, y, oLeaves, 0, 0))
      ) {
        sprite_index = sLeavesTop;
      }
    }

    if (
      x > view_xview[0] - 16 &&
      x < view_xview[0] + view_wview[0] + 16 &&
      y > view_yview[0] - 16 &&
      y < view_yview[0] + view_hview[0] + 16
    ) {
      if (sprite_index == sLeavesTop) {
        if (
          (!collision_point(x - 16, y, oTree, 0, 0) &&
            !collision_point(x - 16, y, oLeaves, 0, 0)) ||
          (!collision_point(x + 16, y, oTree, 0, 0) &&
            !collision_point(x + 16, y, oLeaves, 0, 0))
        ) {
          instance_destroy();
        }
      } else if (sprite_index == sLeaves || sprite_index == sLeavesDead) {
        if (
          !collision_point(x + 16, y, oTree, 0, 0) &&
          !collision_point(x + 16, y, oLeaves, 0, 0)
        ) {
          instance_destroy();
        }
      } else if (sprite_index == sLeavesRight || sprite_index == sLeavesDeadR) {
        if (
          !collision_point(x - 16, y, oTree, 0, 0) &&
          !collision_point(x - 16, y, oLeaves, 0, 0)
        ) {
          instance_destroy();
        }
      }
    }
  }
}

function oLeaves_CREATE($) {
  with ($) {
    if (global.cemetary) sprite_index = sLeavesDead;

    if (
      collision_point(x - 16, y, oTree, 0, 0) ||
      collision_point(x - 16, y, oLeaves, 0, 0)
    ) {
      if (global.cemetary) sprite_index = sLeavesDeadR;
      else sprite_index = sLeavesRight;
    }

    spriteSet = false;
  }
}

class oLeaves extends oPlatform {
  oLeaves;
  sLeaves;
  sLeavesDead;
  sLeavesDeadR;
  sLeavesRight;
  sLeavesTop;
  spriteSet;
  sprite_index = sLeaves;
  visible = true;
}
ObjType.oLeaves = oLeaves;
