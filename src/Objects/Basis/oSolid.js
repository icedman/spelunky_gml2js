function oSolid_DESTROY($) {
  with ($) {
    if (shopWall) {
      instances_of(oShopkeeper).forEach(($) => {
        with ($) {
          scrShopkeeperAnger(1);
        }
      });
    }

    if (collision_point(x + 8, y - 1, oSpikes, 0, 0)) {
      obj = instance_place(x + 8, y - 1, oSpikes);
      instances_of(obj).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
    }
    if (collision_point(x + 8, y - 1, oTikiTorch, 0, 0)) {
      obj = instance_place(x + 8, y - 1, oTikiTorch);
      instances_of(obj).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
    }
    if (collision_point(x + 8, y - 1, oGrave, 0, 0)) {
      obj = instance_place(x + 8, y - 1, oGrave);
      instances_of(obj).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
    }
    if (collision_point(x + 8, y + 18, oLampRed, 0, 0)) {
      obj = instance_place(x + 8, y + 16, oLampRed);
      instances_of(obj).forEach(($) => {
        with ($) {
          instance_create(x + 8, y + 12, oLampRedItem);
          instance_destroy();
        }
      });
    }
    if (collision_point(x + 8, y + 18, oLamp, 0, 0)) {
      obj = instance_place(x + 8, y + 16, oLamp);
      instances_of(obj).forEach(($) => {
        with ($) {
          instance_create(x + 8, y + 12, oLampItem);
          instance_destroy();
        }
      });
    }

    global.checkWater = true;
  }
}

function oSolid_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    invincible = false;
    shopWall = false;
    type = 'None';
    treasure = '';
    cleanDeath = false;
  }
}

class oSolid extends oDrawnSprite {
  oGrave;
  oLampRed;
  oLampRedItem;
  visible = true;
}
ObjType.oSolid = oSolid;
