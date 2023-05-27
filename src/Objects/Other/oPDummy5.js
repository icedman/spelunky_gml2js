function oPDummy5_STEP($) {
  with ($) {
    x += xVel;
    y += yVel;

    if (y < -32) {
      oTitle.adeOut = true;
      //room_goto(rCredits1);
    }
  }
}

function oPDummy5_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    // dummy actor for title

    image_speed = 0.6;
    if (global.isDamsel) sprite_index = sDamselClimb2;
    else if (global.isTunnelMan) sprite_index = sTunnelClimb2;
    else sprite_index = sClimbUp2;
    status = 0;

    xVel = 0;
    yVel = -1;
  }
}

class oPDummy5 extends oDrawnSprite {
  oTitle;
  sClimbUp2;
  sDamselClimb2;
  sTunnelClimb2;
}
ObjType.oPDummy5 = oPDummy5;
