function oLockedChest_COLLISION_oKey($) {
  with ($) {
    if (other.held && sprite_index == sLockedChest) {
      other.held = false;
      instances_of(oPlayer1).forEach(($) => {
        with ($) {
          holdItem = 0;
          pickupItemType = '';
        }
      });

      instances_of(other).forEach(($) => {
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
      instances_of(obj).forEach(($) => {
        with ($) {
          xVel = -0.4;
        }
      });
      obj = instance_create(x, y, oPoof);
      instances_of(obj).forEach(($) => {
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
    try {
      oItem_STEP($);
    } catch (err) {}
  }
}

function oLockedChest_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Locked Chest';
    makeActive();
    setCollisionBounds(-6, -2, 6, 8);

    heavy = true;

    yVel = 0;
    yAcc = 0.2;
  }
}

class oLockedChest extends oItem {
  oPoof;
  oUdjatEye;
  sLockedChest;
  sLockedChestOpen;
  sndChestOpen;
}
ObjType.oLockedChest = oLockedChest;
