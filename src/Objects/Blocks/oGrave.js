function oGrave_DESTROY($) {
  with ($) {
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
  }
}

function oGrave_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 20 &&
      x < view_xview[0] + view_wview[0] + 4 &&
      y > view_yview[0] - 20 &&
      y < view_yview[0] + view_hview[0] + 4
    ) {
      if (!collision_point(x, y + 16, oSolid, 0, 0)) instance_destroy();
    }
  }
}

function oGrave_CREATE($) {
  with ($) {
    action_inherited();

    n = rand(1, 5);
    switch (n) {
      case 1: {
        sprite_index = sGrave2;
        break;
      }
      case 2: {
        sprite_index = sGrave3;
        break;
      }
      case 3: {
        sprite_index = sGrave4;
        break;
      }
      case 4: {
        sprite_index = sGrave5;
        break;
      }
      case 5: {
        sprite_index = sGrave6;
        break;
      }
    }
  }
}

class oGrave extends oSolid {
  // variables
}
