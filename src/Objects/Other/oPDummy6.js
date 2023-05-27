function oPDummy6_DRAW($) {
  with ($) {
    image_xscale = -1;
    draw_sprite_ext(
      sprite_index,
      -1,
      x,
      y,
      image_xscale,
      image_yscale,
      image_angle,
      image_blend,
      image_alpha
    );
  }
}

function oPDummy6_CREATE($) {
  with ($) {
    // dummy actor for end

    if (global.isDamsel) sprite_index = sDamselLeft;
    else if (global.isTunnelMan) sprite_index = sTunnelLeft;
  }
}

class oPDummy6 extends oDrawnSprite {}
ObjType.oPDummy6 = oPDummy6;
