function oEnemySight_COLLISION_oCharacter($) {
  with ($) {
    instances_of(oCaveman).forEach(($) => {
      with ($) {
        if (distance_to_object(oPlayer1) < 100 && status < 98) {
          status = 2;
          playSound(global.sndAlert);
        }
      }
    });

    instances_of(oHawkman).forEach(($) => {
      with ($) {
        if (distance_to_object(oPlayer1) < 100 && status < 98) {
          status = 2;
          playSound(global.sndAlert);
        }
      }
    });
  }
}

function oEnemySight_COLLISION_oSolid($) {
  with ($) {
    action_kill_object();
  }
}

function oEnemySight_CREATE($) {
  with ($) {
    owner = 0;
  }
}

class oEnemySight extends oObject {}
ObjType.oEnemySight = oEnemySight;
