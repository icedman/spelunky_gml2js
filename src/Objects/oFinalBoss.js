function oFinalBoss_STEP($) {
  with ($) {
    //if (!olmecDead && ! doorOpen)
    if (olmecDead && !doorOpen) {
      doorOpen = true;
      obj = instance_place(640, 544, oEntrance);
      [instances_of(obj)].orEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
      instance_create(640, 544, oXEnd);
      if (!collision_point(640, 560, oSolid, 0, 0)) {
        brick = instance_create(640, 560, oTemple);
        [instances_of(brick)].orEach(($) => {
          with ($) {
            invincible = true;
          }
        });
      } else {
        brick = instance_position(640, 560, oSolid);
        [instances_of(brick)].orEach(($) => {
          with ($) {
            invincible = true;
          }
        });
      }
      playSound(global.sndThump);
    }
  }
}

function oFinalBoss_CREATE($) {
  with ($) {
    olmecDead = false;
    doorOpen = false;
  }
}

class oFinalBoss extends oObject {
  // variables
}
