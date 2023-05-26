function oBarrierEmitter_DESTROY($) {
  with ($) {
    for (r = 0; r < c; r++) {
      obj = instance_create(
        x + 2 + rand(0, 14),
        y + 2 + rand(0, 14),
        oFlareSpark
      );
      obj.yVel = rand(1, 3);
    }
    scrShake(10);
    playSound(global.sndSmallExplode);
    [instances_of(oBarrier)].forEach(($) => {
      with ($) {
        instance_destroy();
      }
    });
  }
}

function oBarrierEmitter_COLLISION_oBullet($) {
  with ($) {
    instance_destroy();
  }
}

function oBarrierEmitter_COLLISION_oItem($) {
  with ($) {
    if (abs(other.xVel) > 2 || abs(other.yVel) > 2) {
      instance_destroy();
    }
  }
}

function oBarrierEmitter_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 8 &&
      x < view_xview[0] + view_wview[0] + 8 &&
      y > view_yview[0] - 8 &&
      y < view_yview[0] + view_hview[0] + 8
    ) {
      if (!collision_point(x, y - 16, oSolid, 0, 0)) instance_destroy();
    }
  }
}

function oBarrierEmitter_CREATE($) {
  with ($) {
    image_speed = 0.5;
    if (!instance_exists(oBarrier)) {
      instance_create(x, y + 16, oBarrier);
    }
  }
}

class oBarrierEmitter extends oObject {
  // variables
}
