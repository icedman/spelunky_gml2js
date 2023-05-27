function oArrowTrapTest_COLLISION_oBoulder($) {
  with ($) {
    if (trapID == 0) {
      instance_destroy();
    } else if (abs(other.xVel) > 0 || abs(other.yVel) > 0) {
      [instances_of(trapID)].forEach(($) => {
        with ($) {
          if (fired == 0) {
            if (facing == 0) {
              arrow = instance_create(x - 2, y + 4, oArrow);
              arrow.xVel = -8;
            } else {
              arrow = instance_create(x + 18, y + 4, oArrow);
              arrow.xVel = 8;
            }
            fired += 1;
            playSound(global.sndArrowTrap);
          }
        }
      });

      instance_destroy();
    }
  }
}

function oArrowTrapTest_COLLISION_oCharacter($) {
  with ($) {
    if (trapID == 0) {
      instance_destroy();
    } else if (
      abs(other.xVel) > 0 ||
      abs(other.yVel) > 0 ||
      (oPlayer1.sprite_index = sDuckToHangL && oPlayer1.image_index > 6) ||
      (oPlayer1.sprite_index = sDamselDtHL && oPlayer1.image_index > 6) ||
      (oPlayer1.sprite_index = sTunnelDtHL && oPlayer1.image_index > 6)
    ) {
      [instances_of(trapID)].forEach(($) => {
        with ($) {
          if (fired == 0) {
            if (facing == 0) {
              arrow = instance_create(x - 2, y + 4, oArrow);
              arrow.xVel = -8;
            } else {
              arrow = instance_create(x + 18, y + 4, oArrow);
              arrow.xVel = 8;
            }
            fired += 1;
            playSound(global.sndArrowTrap);
          }
        }
      });

      instance_destroy();
    }
  }
}

function oArrowTrapTest_COLLISION_oMoveableSolid($) {
  with ($) {
    if (trapID == 0) {
      instance_destroy();
    } else if (abs(other.xVel) > 0 || abs(other.yVel) > 0) {
      [instances_of(trapID)].forEach(($) => {
        with ($) {
          if (fired == 0) {
            if (facing == 0) {
              arrow = instance_create(x - 2, y + 4, oArrow);
              arrow.xVel = -8;
            } else {
              arrow = instance_create(x + 18, y + 4, oArrow);
              arrow.xVel = 8;
            }
            fired += 1;
            playSound(global.sndArrowTrap);
          }
        }
      });

      instance_destroy();
    }
  }
}

function oArrowTrapTest_COLLISION_oItem($) {
  with ($) {
    if (trapID == 0) {
      instance_destroy();
    } else if (abs(other.xVel) > 0 || abs(other.yVel) > 0) {
      [instances_of(trapID)].forEach(($) => {
        with ($) {
          if (fired == 0) {
            if (facing == 0) {
              arrow = instance_create(x - 2, y + 4, oArrow);
              arrow.xVel = -8;
            } else {
              arrow = instance_create(x + 18, y + 4, oArrow);
              arrow.xVel = 8;
            }
            fired += 1;
            playSound(global.sndArrowTrap);
          }
        }
      });

      instance_destroy();
    }
  }
}

function oArrowTrapTest_COLLISION_oEnemy($) {
  with ($) {
    if (trapID == 0) {
      instance_destroy();
    } else if (abs(other.xVel) > 0 || abs(other.yVel) > 0) {
      [instances_of(trapID)].forEach(($) => {
        with ($) {
          if (fired == 0) {
            if (facing == 0) {
              arrow = instance_create(x - 2, y + 4, oArrow);
              arrow.xVel = -8;
            } else {
              arrow = instance_create(x + 18, y + 4, oArrow);
              arrow.xVel = 8;
            }
            fired += 1;
            playSound(global.sndArrowTrap);
          }
        }
      });

      instance_destroy();
    }
  }
}

function oArrowTrapTest_CREATE($) {
  with ($) {
    trapID = 0;
  }
}

function oArrowTrapTest_COLLISION_oTreasure($) {
  with ($) {
    if (trapID == 0) {
      instance_destroy();
    } else if (abs(other.xVel) > 0 || abs(other.yVel) > 0) {
      [instances_of(trapID)].forEach(($) => {
        with ($) {
          if (fired == 0) {
            if (facing == 0) {
              arrow = instance_create(x - 2, y + 4, oArrow);
              arrow.xVel = -8;
            } else {
              arrow = instance_create(x + 18, y + 4, oArrow);
              arrow.xVel = 8;
            }
            fired += 1;
            playSound(global.sndArrowTrap);
          }
        }
      });

      instance_destroy();
    }
  }
}

class oArrowTrapTest extends oObject {
  trapID;
}
