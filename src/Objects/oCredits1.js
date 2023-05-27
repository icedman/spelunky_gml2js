function oCredits1_ALARM_11($) {
  with ($) {
    drawStatus = 0;
  }
}

function oCredits1_ALARM_3($) {
  with ($) {
    drawStatus = 2;
    alarm[11] = 140;
    alarm[4] = 180;
  }
}

function oCredits1_ALARM_1($) {
  with ($) {
    if (scrolling) {
      if (rand(1, 8) == 1) instance_create(-16, 176, oShrubScroll);
      else if (rand(1, 12) == 1)
        instance_create(-32, 176 - 112, oPalmTreeScroll);

      instance_create(-16, 176, oDesertTopScroll);
      instance_create(-16, 192, oDesertScroll2);
      instance_create(-16, 208, oDesertScroll);
      instance_create(-16, 224, oDesertScroll);
      instances_of(oDesertScroll).forEach(($) => {
        with ($) {
          scroll = true;
        }
      });
      instances_of(oDesertScroll2).forEach(($) => {
        with ($) {
          scroll = true;
        }
      });
      instances_of(oDesertTopScroll).forEach(($) => {
        with ($) {
          scroll = true;
        }
      });
      instances_of(oShrubScroll).forEach(($) => {
        with ($) {
          scroll = true;
        }
      });
      instances_of(oPalmTreeScroll).forEach(($) => {
        with ($) {
          scroll = true;
        }
      });
      alarm[1] = 16;
    }
  }
}

function oCredits1_ALARM_5($) {
  with ($) {
    drawStatus = 4;
    alarm[11] = 140;
    alarm[6] = 180;
  }
}

function oCredits1_ALARM_4($) {
  with ($) {
    drawStatus = 3;
    alarm[11] = 140;
    alarm[5] = 180;
  }
}

function oCredits1_ALARM_2($) {
  with ($) {
    drawStatus = 1;
    alarm[11] = 140;
    alarm[3] = 180;
  }
}

function oCredits1_ALARM_8($) {
  with ($) {
    scrolling = false;
    instances_of(oDesertScroll).forEach(($) => {
      with ($) {
        scroll = false;
      }
    });
    instances_of(oDesertScroll2).forEach(($) => {
      with ($) {
        scroll = false;
      }
    });
    instances_of(oDesertTopScroll).forEach(($) => {
      with ($) {
        scroll = false;
      }
    });
    instances_of(oPalmTreeScroll).forEach(($) => {
      with ($) {
        scroll = false;
      }
    });
    instances_of(oShrubScroll).forEach(($) => {
      with ($) {
        scroll = false;
      }
    });
    oCamel.status = 2;
  }
}

function oCredits1_ALARM_7($) {
  with ($) {
    drawStatus = 6;
    alarm[11] = 240;
    alarm[8] = 280;
  }
}

function oCredits1_DRAW($) {
  with ($) {
    if (drawStatus == 1) {
      draw_set_font(global.myFont);
      draw_set_color(c_yellow);
      draw_text(16, 16, 'SPELUNKY');
    } else if (drawStatus == 2) {
      draw_set_font(global.myFontSmall);
      draw_set_color(c_yellow);
      draw_text(16, 16, 'A GAME BY');
      // draw_set_font(global.myFontSmall);
      draw_set_color(c_white);
      draw_text(64, 32, 'DEREK YU');
    } else if (drawStatus == 3) {
      draw_set_font(global.myFontSmall);
      draw_set_color(c_yellow);
      draw_text(16, 16, 'PLATFORM ENGINE');
      draw_set_color(c_white);
      draw_text(16, 24, 'MARTIN PIECYK');
      draw_set_color(c_yellow);
      draw_text(16, 40, 'SOUND EFFECTS MADE USING');
      draw_set_color(c_white);
      draw_text(16, 48, "DR PETTER'S SFXR");
      draw_set_color(c_yellow);
      draw_text(16, 64, 'SCREEN SCALING CODE');
      draw_set_color(c_white);
      draw_text(16, 72, 'CHEVYRAY');
    } else if (drawStatus == 4) {
      draw_set_font(global.myFontSmall);
      draw_set_color(c_yellow);
      draw_text(16, 16, 'MUSIC BY');
      draw_set_color(c_white);
      draw_text(32, 32, 'GEORGE BUZINKAI');
      draw_text(32, 48, 'JONATHAN PERRY');
    } else if (drawStatus == 5) {
      draw_set_font(global.myFontSmall);
      draw_set_color(c_yellow);
      draw_text(16, 16, 'BETA TESTING BY');
      draw_set_color(c_white);
      draw_text(16, 24, 'ANNABELLE K.');
      draw_text(16, 32, 'BENZIDO');
      draw_text(16, 40, 'CHUTUP');
      draw_text(16, 48, 'CORPUS');
      draw_text(16, 56, 'GENERALVALTER');
      draw_text(16, 64, 'GUERT');
      draw_text(16, 72, 'GRAHAM GORING');
      draw_text(16, 80, 'HAOWAN');
      draw_text(16, 88, 'HIDEOUS');
      draw_text(16, 96, 'INANE');
      //
      draw_text(128, 24, 'INCREPARE');
      draw_text(128, 32, 'KAO');
      draw_text(128, 40, 'MARK JOHNS');
      draw_text(128, 48, 'MELLY');
      draw_text(128, 56, 'PAUL ERES');
      draw_text(128, 64, 'SUPER JOE');
      draw_text(128, 72, 'TANTAN');
      draw_text(128, 80, 'TEAM QUIGGAN');
      draw_text(128, 88, 'TERRY');
      draw_text(128, 96, 'XION');
      draw_text(128, 104, 'ZAPHOS');
    } else if (drawStatus == 6) {
      draw_set_font(global.myFontSmall);
      draw_set_color(c_yellow);
      draw_text(16, 16, 'THANKS FOR PLAYING!');
      // draw_set_font(global.myFontSmall);
      draw_set_color(c_white);
      draw_text(32, 32, 'SEE YOU NEXT ADVENTURE!');
    }

    if (fadeIn || fadeOut) {
      draw_set_color(c_black);
      draw_set_alpha(fadeLevel);
      draw_rectangle(0, 0, 320, 240, false);
      draw_set_alpha(1);
    }
  }
}

function oCredits1_STEP($) {
  with ($) {
    if (
      keyboard_check_pressed(vk_enter) ||
      keyboard_check_pressed(vk_escape) ||
      checkAttack()
    ) {
      if (instance_exists(oCamel)) {
        if (fadeIn) {
          fadeLevel = 0;
        } else {
          fadeOut = true;
        }
      }
    }

    if (instance_exists(oCamel)) {
      if (oCamel.x <= 160 && !scrollStart) {
        instances_of(oDesertScroll).forEach(($) => {
          with ($) {
            scroll = true;
          }
        });

        alarm[1] = 1;
        alarm[2] = 20;
        scrollStart = true;
        scrolling = true;
      }
    }

    if (fadeIn) {
      if (fadeLevel > 0) fadeLevel -= 0.1;
      else {
        fadeIn = false;
        alarm[0] = 20;
      }
    } else if (fadeOut) {
      if (fadeLevel < 1) fadeLevel += 0.1;
      else {
        game_end();
      }
    }
  }
}

function oCredits1_ALARM_0($) {
  with ($) {
    instance_create(320, 144, oCamel);
  }
}

function oCredits1_CREATE($) {
  with ($) {
    fadeIn = true;
    fadeOut = false;
    fadeLevel = 1;

    instance_create(-120, 112, oIntroBG);
    // alarm[0] = 20;

    drawStatus = 0;
    scrollStart = false;
    scrolling = false;
    oScreen.canPause = false;

    stopAllMusic();
  }
}

function oCredits1_ALARM_6($) {
  with ($) {
    drawStatus = 5;
    alarm[11] = 240;
    alarm[7] = 280;
  }
}

class oCredits1 extends oObject {
  canPause;
  oDesertScroll;
  oDesertScroll2;
  oDesertTopScroll;
  oIntroBG;
  oPalmTreeScroll;
  oShrubScroll;
  scrollStart;
  scrolling;
  visible = true;
}
ObjType.oCredits1 = oCredits1;
