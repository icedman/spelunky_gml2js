function oTempleFake_STEP($) {
  with ($) {
    if (!collision_point(x + 8, y + 8, oDoor, 0, 0)) {
      instance_create(x, y, oTemple);
      instance_destroy();
    }
  }
}

class oTempleFake extends oObject {
  // variables
}
