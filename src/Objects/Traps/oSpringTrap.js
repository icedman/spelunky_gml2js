function oSpringTrap_COLLISION_oPlayer1($) {
  with ($) {
    if (status == IDLE && abs(other.x - (x + 8)) < 6 && counter == 0) {
      if (
        other.state <= 13 &&
        other.sprite_index != sPExit &&
        other.sprite_index != sDamselExit
      ) {
        sprite_index = sSpringTrapSprung;
        playSound(global.sndBoing);
        status = SPRUNG;
        [instances_of(other)].forEach(($) => {
          with ($) {
            y -= 16;
            yVel = -16;
          }
        });

        counter = 10;
      }
    }
  }
}

function oSpringTrap_COLLISION_oItem($) {
  with ($) {
    if (
      status == IDLE &&
      abs(other.x - (x + 8)) < 6 &&
      !other.held &&
      counter == 0 &&
      other.active
    ) {
      sprite_index = sSpringTrapSprung;
      playSound(global.sndBoing);
      status = SPRUNG;
      [instances_of(other)].forEach(($) => {
        with ($) {
          y -= 24;
          yVel = -8;
          if (type == 'Damsel') {
            if (facing == 18) xVel -= 1;
            else xVel += 1;
          }
        }
      });

      counter = 10;
    }
  }
}

function oSpringTrap_OTHER($) {
  with ($) {
    if (status == SPRUNG) {
      status = IDLE;
      sprite_index = sSpringTrap;
    }
  }
}

function oSpringTrap_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 16 &&
      x < view_xview[0] + view_wview[0] &&
      y > view_yview[0] - 16 &&
      y < view_yview[0] + view_hview[0]
    ) {
      if (counter > 0) counter -= 1;
      if (!collision_point(x, y + 16, oSolid, 0, 0)) instance_destroy();
    }
  }
}

function oSpringTrap_COLLISION_oEnemy($) {
  with ($) {
    if (
      status == IDLE &&
      abs(other.x - x) < 6 &&
      counter == 0 &&
      !other.lying
    ) {
      sprite_index = sSpringTrapSprung;
      playSound(global.sndBoing);
      status = SPRUNG;
      [instances_of(other)].forEach(($) => {
        with ($) {
          y -= 16;
          yVel = -8;
          if (facing == 0) xVel -= 1;
          else xVel += 1;
        }
      });

      counter = 10;
    }
  }
}

function oSpringTrap_CREATE($) {
  with ($) {
    IDLE = 0;
    SPRUNG = 1;
    status = IDLE;
    counter = 0;
  }
}

class oSpringTrap extends oObject {
  // variables
}
