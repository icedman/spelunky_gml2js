function oLockedChest_COLLISION_oKey($) {
  with ($) {
    if (other.held && sprite_index == sLockedChest) {
      other.held = false;
      [instances_of(oPlayer1)]
        .forEach(($) => {
          with ($) {
            holdItem = 0;
            pickupItemType = '';
          }
        })

        [instances_of(other)].orEach(($) => {
          with ($) {
            instance_destroy();
          }
        });

      sprite_index = sLockedChestOpen;
      playSound(global.sndChestOpen);
      obj = instance_create(x, y, oUdjatEye);
      obj.xVel = rand(0, 3) - rand(0, 3);
      obj.yVel = -2;
      obj = instance_create(x, y, oPoof);
      [instances_of(obj)].orEach(($) => {
        with ($) {
          xVel = -0.4;
        }
      });
      obj = instance_create(x, y, oPoof);
      [instances_of(obj)].orEach(($) => {
        with ($) {
          xVel = 0.4;
        }
      });
      instance_destroy();
    }
  }
}

function oLockedChest_STEP($) {
  with ($) {
    action_inherited();
  }
}

function oLockedChest_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Locked Chest';
    makeActive();
    setCollisionBounds(-6, -2, 6, 8);

    heavy = true;

    yVel = 0;
    yAcc = 0.2;
  }
}

class oLockedChest extends oItem {
  // variables
}
