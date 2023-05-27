function oCape_STEP($) {
  with ($) {
    if (instance_exists(oTransition) && !instance_exists(oPDummy)) {
      instance_destroy();
    } else if (instance_exists(oPDummy)) {
      if (
        oPDummy.sprite_index == sPExit ||
        oPDummy.sprite_index == sDamselExit ||
        oPDummy.sprite_index == sTunnelExit
      ) {
        x = oPDummy.x;
        y = oPDummy.y + 4;
        sprite_index = sCapeBack;
        depth = 0;
      } else {
        x = oPDummy.x - 4;
        y = oPDummy.y - 2;
        if (
          oPDummy.sprite_index == sRunLeft ||
          oPDummy.sprite_index == sDamselRunL ||
          oPDummy.sprite_index == sTunnelRunL
        )
          sprite_index = sCapeRight;
        else sprite_index = sCapeDR;
        depth = 100;
      }
    } else if (
      (oPlayer1.state == 14 ||
        oPlayer1.sprite_index == sPExit ||
        oPlayer1.sprite_index == sDamselExit ||
        oPlayer1.sprite_index == sTunnelExit) &&
      !oPlayer1.whipping
    ) {
      x = oPlayer1.x;
      y = oPlayer1.y + 4;
      sprite_index = sCapeBack;
      depth = 0;
    } else if (oPlayer1.acing == 19) {
      x = oPlayer1.x - 4;
      y = oPlayer1.y - 2;
      if (oCape.open) sprite_index = sCapeUR;
      else if (abs(oPlayer1.xVel) > 0) sprite_index = sCapeRight;
      else sprite_index = sCapeDR;
      depth = 100;
    } else {
      x = oPlayer1.x + 4;
      y = oPlayer1.y - 2;
      if (oCape.open) sprite_index = sCapeUL;
      else if (abs(oPlayer1.xVel) > 0) sprite_index = sCapeLeft;
      else sprite_index = sCapeDL;
      depth = 100;
    }

    if (instance_exists(oPlayer1)) if (!oPlayer1.visible) instance_destroy();
  }
}

function oCape_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    open = false;
  }
}

class oCape extends oDrawnSprite {
  oTransition;
  sCapeBack;
  sCapeDL;
  sCapeDR;
  sCapeLeft;
  sCapeRight;
  sCapeUL;
  sCapeUR;
  sTunnelRunL;
  sprite_index = sCapeRight;
  visible = true;
}
ObjType.oCape = oCape;
