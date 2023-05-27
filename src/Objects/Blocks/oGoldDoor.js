function oGoldDoor_COLLISION_oSceptre($) {
  with ($) {
    if (other.held) {
      if (global.hasCrown) {
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

        playSound(global.sndChestOpen);
        instance_create(x, y, oXGold);
        instance_destroy();
      } else {
        global.message = 'THE SCEPTRE FITS...';
        global.message2 = 'BUT NOTHING IS HAPPENING!';
        global.messageTimer = 100;
      }
    }
  }
}

class oGoldDoor extends oDrawnSprite {
  hasCrown;
  sprite_index = sGoldDoor;
  visible = true;
}
ObjType.oGoldDoor = oGoldDoor;
