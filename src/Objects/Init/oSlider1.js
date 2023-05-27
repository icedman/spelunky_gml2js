function oSlider1_MOUSE($) {
  with ($) {
    focus = true;
    playMusic(global.musCave, true);
  }
}

function oSlider1_STEP($) {
  with ($) {
    if (mouse_check_button(mb_left) && focus) {
      x = mouse_x - 4;
      if (x > 144) x = 144;
      if (x < 8) x = 8;
      y = 160;
      global.musicVol = floor(x / 8);
      SS_SetSoundVol(global.musCave, 2000 + 8000 * (global.musicVol / 18));
    } else {
      focus = false;
      move_snap(8, 8);
      y = 160;
      global.musicVol = x / 8;
      stopAllMusic();
    }
  }
}

function oSlider1_CREATE($) {
  with ($) {
    x = global.musicVol * 8;
    focus = false;
  }
}

class oSlider1 extends oObject {}
