function oPalmTreeScroll_STEP($) {
  with ($) {
    if (scroll) x += 1;

    if (x > 320) instance_destroy();
  }
}

function oPalmTreeScroll_CREATE($) {
  with ($) {
    scroll = false;
    if (isRoom('rCredits1')) sprite_index = sPalmTreeDark;
  }
}

class oPalmTreeScroll extends oDrawnSprite {
  sPalmTreeDark;
  sprite_index = sPalmTree;
  visible = true;
}
ObjType.oPalmTreeScroll = oPalmTreeScroll;
