function oOlmecSlam_COLLISION_oSolid($) {
  with ($) {
    instances_of(other).forEach(($) => {
      with ($) {
        cleanDeath = false;
        tile = tile_layer_find(3, x, y - 16);
        if (tile) tile_delete(tile);
        instance_destroy();
      }
    });
  }
}

function oOlmecSlam_ALARM_0($) {
  with ($) {
    action_kill_object();
  }
}

function oOlmecSlam_CREATE($) {
  with ($) {
    alarm[0] = 1;
    playSound(global.sndSlam);
  }
}

class oOlmecSlam extends oObject {
  sndSlam;
  sprite_index = sOlmecSlam;
  visible = false;
}
ObjType.oOlmecSlam = oOlmecSlam;
