function oSlider2_MOUSE($) {
  with ($) {
    focus = true;
    alarm[0] = 1;
  }
}

function oSlider2_STEP($) {
  with ($) {
    if (mouse_check_button(mb_left) && focus) {
      x = mouse_x - 4;
      if (x > 144) x = 144;
      if (x < 8) x = 8;
      y = 184;
      global.soundVol = floor(x / 8);
      SS_SetSoundVol(global.sndJump, 2000 + 8000 * (global.soundVol / 18));
    } else {
      focus = false;
      move_snap(8, 8);
      y = 184;
      global.soundVol = x / 8;
    }
  }
}

function oSlider2_ALARM_0($) {
  with ($) {
    if (focus) {
      playSound(global.sndJump);
      alarm[0] = 20;
    }
  }
}

function oSlider2_CREATE($) {
  with ($) {
    x = global.soundVol * 8;
    focus = false;
  }
}

class oSlider2 extends oObject {
  soundVol;
}
ObjType.oSlider2 = oSlider2;
