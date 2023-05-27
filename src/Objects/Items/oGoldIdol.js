function oGoldIdol_STEP($) {
  with ($) {
    try {
      oItem_STEP($);
    } catch (err) {}

    if (
      x > view_xview[0] - 8 &&
      x < view_xview[0] + view_wview[0] + 8 &&
      y > view_yview[0] - 8 &&
      y < view_yview[0] + view_hview[0] + 8
    ) {
      // get money for idols at shops
      if (isLevel()) {
        if (
          !held &&
          collision_point(x, y + 4, oBrickSmooth, 0, 0) &&
          instance_exists(oShopkeeper) &&
          global.thiefLevel == 0 &&
          !global.murderer
        ) {
          if (oShopkeeper.status == 0 && abs(x - oShopkeeper.x) < 80) {
            global.collect += value * (global.levelType + 1);
            global.collectCounter += 20;
            if (global.collectCounter > 100) global.collectCounter = 100;
            global.idols += 1;
            playSound(global.sndCoin);
            instance_create(x, y - 8, oBigCollect);
            global.message = 'PLEASURE DOING BUSINESS!';
            global.message2 = '';
            global.messageTimer = 100;
            instance_destroy();
          }
        }
      }
      if (!colBot && trigger) {
        trigger = false;
        global.idolsGrabbed += 1;
      }
    }
  }
}

function oGoldIdol_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Gold Idol';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    trigger = true;
    heavy = true;
    value = 5000;
  }
}

class oGoldIdol extends oItem {
  idols;
  idolsGrabbed;
  message;
  message2;
  messageTimer;
  murderer;
  oBigCollect;
  oBrickSmooth;
  thiefLevel;
  sprite_index = sGoldIdol;
  visible = true;
}
ObjType.oGoldIdol = oGoldIdol;
