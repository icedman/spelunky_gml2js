function oEntranceCheck_COLLISION_oSolid($) {
  with ($) {
    if (other.type == 'Arrow Trap') {
      instances_of(other).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
      instance_destroy();
    }
  }
}

function oEntranceCheck_STEP($) {
  with ($) {
    if (dir == 0) x -= 16;
    else x += 16;
  }
}

class oEntranceCheck extends oObject {}
ObjType.oEntranceCheck = oEntranceCheck;
