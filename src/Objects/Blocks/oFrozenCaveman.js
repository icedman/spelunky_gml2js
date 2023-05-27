function oFrozenCaveman_DESTROY($) {
  with ($) {
    if (!global.cleanSolids) {
      enemy = instance_create(x, y, oCaveman);
      enemy.invincible = 20;
      enemy.status = 98;
      enemy.counter = enemy.stunTime;
    }
  }
}

function oFrozenCaveman_STEP($) {
  with ($) {
    if (!collision_point(x, y, oIce, 0, 0)) instance_destroy();
  }
}

class oFrozenCaveman extends oDrawnSprite {
  sprite_index = sFrozenCaveman;
  visible = true;
}
ObjType.oFrozenCaveman = oFrozenCaveman;
