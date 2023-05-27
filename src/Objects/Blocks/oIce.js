function oIce_DESTROY($) {
  with ($) {
    if (!cleanDeath && !global.cleanSolids) {
      for (r = 0; r < c; r++) {
        instance_create(x + rand(0, 16), y + rand(0, 16), oDrip);
      }

      if (collision_point(x + 8, y + 8, oFrozenCaveman, 0, 0)) {
        obj = instance_place(x + 8, y + 8, oFrozenCaveman);
        [instances_of(obj)].orEach(($) => {
          with ($) {
            instance_destroy();
          }
        });
      }
    }
  }
}

function oIce_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    if (rand(1, 80) == 1) instance_create(x, y, oFrozenCaveman);
    // else if (rand(1,800) == 1) scrGenerateItem(x+8, y+8, 2);
  }
}

class oIce extends oSolid {}
