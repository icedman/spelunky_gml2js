function oTreeBranch_DESTROY($) {
  with ($) {
    if (sprite_index != sTreeBranchDeadL && sprite_index != sTreeBranchDeadR) {
      rubble = instance_create(
        x + 8 + rand(0, 8) - rand(0, 8),
        y + 8 + rand(0, 8) - rand(0, 8),
        oLeaf
      );
    }
  }
}

function oTreeBranch_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 16 &&
      x < view_xview[0] + view_wview[0] + 16 &&
      y > view_yview[0] - 16 &&
      y < view_yview[0] + view_hview[0] + 16
    ) {
      if (
        !collision_point(x - 16, y, oTree, 0, 0) &&
        !collision_point(x + 16, y, oTree, 0, 0)
      ) {
        instance_destroy();
      }
    }
  }
}

function oTreeBranch_CREATE($) {
  with ($) {
    try {
      oPlatform_CREATE($);
    } catch (err) {}

    if (global.cemetary) sprite_index = sTreeBranchDeadR;
  }
}

class oTreeBranch extends oPlatform {
  sTreeBranchDeadL;
  sTreeBranchDeadR;
  sprite_index = sTreeBranchRight;
  visible = true;
}
ObjType.oTreeBranch = oTreeBranch;
