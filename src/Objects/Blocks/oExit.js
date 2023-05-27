function oExit_DRAW($) {
  with ($) {
    draw_sprite(sprite_index, -1, x, y);
    if (isRoom('rLevelEditor')) {
      draw_set_font(global.myFontSmall);
      draw_set_color(c_white);
      draw_text(x, y, leadsTo);
    }
  }
}

function oExit_CREATE($) {
  with ($) {
    type = 'Exit';
    leadsTo = ''; // used for Level Editor only
  }
}

class oExit extends oDrawnSprite {}
