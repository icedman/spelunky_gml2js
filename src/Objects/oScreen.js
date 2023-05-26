function oScreen_OTHER($) {
  with ($) {
    if (surface_exists(screen)) {
      surface_set_target(screen);
      draw_clear(0);
      surface_free(screen);
    }
    if (surface_exists(pSurf)) {
      surface_set_target(pSurf);
      draw_clear(0);
      surface_free(pSurf);
    }
    if (surface_exists(darkSurf)) {
      surface_set_target(darkSurf);
      draw_clear(0);
      surface_free(darkSurf);
    }
    stopAllMusic();
    SS_Unload();
    scrWriteStats();

    game_end();

    surface_set_target(screen);
    draw_clear(0);

    //Spelunky 1.2 7-3-2012 Soft fullscreen
    if (global.softfullscreen == 1) {
      window_set_size(displaywidth, displayheight);
      window_set_position(0, 0);
    }
  }
}

function oScreen_STEP($) {
  with ($) {
    if (!surface_exists(pSurf)) pSurf = surface_create(screen_w, screen_h);
    if (!surface_exists(screen)) screen = surface_create(screen_w, screen_h);
    if (!surface_exists(darkSurf))
      darkSurf = surface_create(screen_w, screen_h);

    if (checkBombPressed()) {
      if (paused && global.plife > 0 && isLevel()) {
        instance_activate_all();
        paused = false;
        [instances_of(oPlayer1)].forEach(($) => {
          with ($) {
            if (facing == 18) xVel = -3;
            else xVel = 3;
            yVel = -6;
            global.plife = -99;
          }
        });

        if (SS_IsSoundPlaying(global.musTitle))
          SS_SetSoundVol(global.musTitle, 2000 + 8000 * (global.musicVol / 18));
        if (SS_IsSoundPlaying(global.musCave))
          SS_SetSoundVol(global.musCave, 2000 + 8000 * (global.musicVol / 18));
        if (SS_IsSoundPlaying(global.musLush))
          SS_SetSoundVol(global.musLush, 2000 + 8000 * (global.musicVol / 18));
        if (SS_IsSoundPlaying(global.musIce))
          SS_SetSoundVol(global.musIce, 2000 + 8000 * (global.musicVol / 18));
        if (SS_IsSoundPlaying(global.musTemple))
          SS_SetSoundVol(
            global.musTemple,
            2000 + 8000 * (global.musicVol / 18)
          );
        if (SS_IsSoundPlaying(global.musBoss))
          SS_SetSoundVol(global.musBoss, 2000 + 8000 * (global.musicVol / 18));

        if (!global.hasAnkh) stopAllMusic();
      }
    } else if (checkRopePressed()) {
      if (paused) game_end();
    } else if (checkStartPressed()) {
      if (!paused && canPause) {
        if (instance_exists(oPlayer1)) {
          if (!oPlayer1.dead) {
            surface_set_target(pSurf);
            screen_redraw();
            if (global.darkLevel) draw_set_alpha(1);
            else draw_set_alpha(0.9);
            draw_set_color(c_black);
            draw_rectangle(
              0,
              0,
              screen_w * screen_scale,
              screen_h * screen_scale,
              false
            );
            draw_set_alpha(1);
            if (SS_IsSoundPlaying(global.musTitle))
              SS_SetSoundVol(global.musTitle, 0);
            if (SS_IsSoundPlaying(global.musCave))
              SS_SetSoundVol(global.musCave, 0);
            if (SS_IsSoundPlaying(global.musLush))
              SS_SetSoundVol(global.musLush, 0);
            if (SS_IsSoundPlaying(global.musIce))
              SS_SetSoundVol(global.musIce, 0);
            if (SS_IsSoundPlaying(global.musTemple))
              SS_SetSoundVol(global.musTemple, 0);
            if (SS_IsSoundPlaying(global.musBoss))
              SS_SetSoundVol(global.musBoss, 0);
            py = oPlayer1.y;
            instance_deactivate_all(true);
            instance_activate_object(oGamepad);
            paused = true;
          }
        }
      } else {
        instance_activate_all();
        if (SS_IsSoundPlaying(global.musTitle))
          SS_SetSoundVol(global.musTitle, 2000 + 8000 * (global.musicVol / 18));
        if (SS_IsSoundPlaying(global.musCave))
          SS_SetSoundVol(global.musCave, 2000 + 8000 * (global.musicVol / 18));
        if (SS_IsSoundPlaying(global.musLush))
          SS_SetSoundVol(global.musLush, 2000 + 8000 * (global.musicVol / 18));
        if (SS_IsSoundPlaying(global.musIce))
          SS_SetSoundVol(global.musIce, 2000 + 8000 * (global.musicVol / 18));
        if (SS_IsSoundPlaying(global.musTemple))
          SS_SetSoundVol(
            global.musTemple,
            2000 + 8000 * (global.musicVol / 18)
          );
        if (SS_IsSoundPlaying(global.musBoss))
          SS_SetSoundVol(global.musBoss, 2000 + 8000 * (global.musicVol / 18));
        paused = false;
      }
    }

    // this draws the surface on the screen
    surface_reset_target();
    draw_clear(0);
    if (paused) {
      surface_set_target(pSurf);
      draw_set_font(global.myFont);
      draw_set_color(c_white);
      draw_text(112, 200, 'PAUSED');
      draw_set_font(global.myFontSmall);
      if (isLevel()) {
        n = 128 - 24;
        if (global.currLevel < 1) draw_text(40, n - 24, 'TUTORIAL CAVE');
        else if (isRoom('rLoadLevel'))
          draw_text(
            40,
            n - 24,
            'LEVEL: ' +
              global.customLevelName +
              ' BY ' +
              global.customLevelAuthor
          );
        else draw_text(40, n - 24, 'LEVEL ' + string(global.currLevel));
        draw_text(
          40,
          n - 16,
          'DEPTH: ' +
            string(174.8 * (global.currLevel - 1) + (py + 8) * 0.34) +
            ' FEET'
        );
        draw_text(40, n, 'MONEY: ' + string(global.money));
        draw_text(40, n + 8, 'KILLS: ' + string(global.kills));
        s = global.xtime;
        s = floor(s / 1000);
        m = 0;
        while (s > 59) {
          s -= 60;
          m += 1;
        }
        if (s < 10) str = '0' + string(s);
        else str = string(s);
        s2 = global.time;
        s2 = floor(s2 / 1000);
        m2 = 0;
        while (s2 > 59) {
          s2 -= 60;
          m2 += 1;
        }
        if (s2 < 10) str2 = '0' + string(s2);
        else str2 = string(s2);
        draw_text(
          40,
          n + 16,
          'TIME:  ' + string(m) + ':' + str + ' / ' + string(m2) + ':' + str2
        );
        draw_text(40, n + 24, 'SAVES: ' + string(global.damsels));
        if (global.gamepadOn)
          draw_text(24, 216, 'START-RETURN  BOMB-DIE  ROPE-QUIT');
        else draw_text(40, 216, 'ESC-RETURN  F1-DIE  F10-QUIT');
      } else {
        if (global.gamepadOn) draw_text(64, 216, 'START-RETURN  ROPE-QUIT');
        else draw_text(80, 216, 'ESC-RETURN  F10-QUIT');
      }
      surface_reset_target();
      draw_surface_stretched(
        pSurf,
        screen_x,
        screen_y,
        screen_w * screen_scale,
        screen_h * screen_scale
      );
    } else {
      if (isRoom('rTitle')) {
        surface_set_target(screen);
        draw_set_alpha(oTitle.darkness);
        draw_set_color(c_black);
        if (oTitle.darkness > 0)
          draw_rectangle(0, 0, screen_w, screen_h, false);
        if (oTitle.state == 1) {
          draw_set_font(global.myFontSmall);
          draw_set_color(c_white);
          draw_text(88, 48, 'DEREK YU PRESENTS');
        }
        draw_set_alpha(1);
        draw_set_blend_mode_ext(bm_src_color, bm_one);
        draw_set_color(c_black);
        draw_rectangle(0, 0, screen_w, screen_h, 0);
        draw_set_blend_mode(bm_normal);
        surface_reset_target();
      } else if (isLevel() && instance_exists(oPlayer1)) {
        if (global.darkLevel && !oPlayer1.dead) {
          surface_set_target(darkSurf);
          draw_set_color(c_black);
          draw_rectangle(0, 0, screen_w, screen_h, false);
          draw_set_color(
            make_color_rgb(
              255 - 255 * oLevel.darkness,
              255 - 255 * oLevel.darkness,
              255
            )
          );
          if (instance_exists(oLampRed)) {
            [instances_of(oPlayer1)].forEach(($) => {
              with ($) {
                distToLamp = distance_to_object(oLampRed);
                if (distToLamp <= 96) {
                  draw_set_color(
                    make_color_rgb(
                      255 - distToLamp,
                      120 - (96 - distToLamp),
                      120 - (96 - distToLamp)
                    )
                  );
                }
              }
            });
          }
          if (instance_exists(oLampRedItem)) {
            [instances_of(oPlayer1)].forEach(($) => {
              with ($) {
                distToLamp = distance_to_object(oLampRedItem);
                if (distToLamp <= 96) {
                  draw_set_color(
                    make_color_rgb(
                      255 - distToLamp,
                      120 - (96 - distToLamp),
                      120 - (96 - distToLamp)
                    )
                  );
                }
              }
            });
          }
          draw_circle(
            oPlayer1.x - view_xview[0],
            oPlayer1.y - view_yview[0],
            96 - 64 * oLevel.darkness,
            false
          );
          [instances_of(oFlare)]
            .forEach(($) => {
              with ($) {
                draw_circle(x - view_xview[0], y - view_yview[0], 96, false);
              }
            })

            [instances_of(oFlareCrate)].forEach(($) => {
              with ($) {
                draw_circle(x - view_xview[0], y - view_yview[0], 96, false);
              }
            })

            [instances_of(oLamp)].forEach(($) => {
              with ($) {
                draw_circle(
                  x + 8 - view_xview[0],
                  y + 8 - view_yview[0],
                  96,
                  false
                );
              }
            })

            [instances_of(oLampItem)].forEach(($) => {
              with ($) {
                draw_circle(
                  x - view_xview[0],
                  y - 4 - view_yview[0],
                  96,
                  false
                );
              }
            })

            [instances_of(oArrowTrapLeftLit)].forEach(($) => {
              with ($) {
                draw_circle(
                  x + 8 - view_xview[0],
                  y + 8 - view_yview[0],
                  32,
                  false
                );
              }
            })

            [instances_of(oArrowTrapRightLit)].forEach(($) => {
              with ($) {
                draw_circle(
                  x + 8 - view_xview[0],
                  y + 8 - view_yview[0],
                  32,
                  false
                );
              }
            })

            [instances_of(oTikiTorch)].forEach(($) => {
              with ($) {
                draw_circle(
                  x + 8 - view_xview[0],
                  y + 8 - view_yview[0],
                  32,
                  false
                );
              }
            })

            [instances_of(oFireFrog)].forEach(($) => {
              with ($) {
                draw_circle(
                  x + 8 - view_xview[0],
                  y + 8 - view_yview[0],
                  32,
                  false
                );
              }
            })

            [instances_of(oSpearTrapLit)].forEach(($) => {
              with ($) {
                draw_circle(
                  x + 8 - view_xview[0],
                  y + 8 - view_yview[0],
                  32,
                  false
                );
              }
            })

            [instances_of(oSmashTrapLit)].forEach(($) => {
              with ($) {
                draw_circle(
                  x + 8 - view_xview[0],
                  y + 8 - view_yview[0],
                  32,
                  false
                );
              }
            })

            [instances_of(oExplosion)].forEach(($) => {
              with ($) {
                draw_circle(x - view_xview[0], y - view_yview[0], 96, false);
              }
            })

            [instances_of(oLava)].forEach(($) => {
              with ($) {
                draw_circle(
                  x + 8 - view_xview[0],
                  y + 8 - view_yview[0],
                  32,
                  false
                );
              }
            })

            [instances_of(oScarab)].forEach(($) => {
              with ($) {
                draw_circle(
                  x + 8 - view_xview[0],
                  y + 8 - view_yview[0],
                  16,
                  false
                );
              }
            })

            [instances_of(oGhost)].forEach(($) => {
              with ($) {
                draw_circle(
                  x + 16 - view_xview[0],
                  y + 16 - view_yview[0],
                  64,
                  false
                );
              }
            });

          surface_set_target(screen);
          draw_set_blend_mode_ext(bm_dest_color, bm_zero);
          draw_set_alpha(1);
          draw_surface(darkSurf, 0, 0);
          draw_set_blend_mode(bm_normal);
        }
        surface_set_target(screen);
        scrDrawHUD();
        if (global.messageTimer > 0) {
          draw_set_font(global.myFontSmall);
          draw_set_color(c_white);
          strLen = string_length(global.message) * 8;
          n = 320 - strLen;
          n = ceil(n / 2);
          draw_text(n, 216, string(global.message));

          if (!isRoom('rTutorial')) draw_set_color(c_yellow);
          strLen = string_length(global.message2) * 8;
          n = 320 - strLen;
          n = ceil(n / 2);
          draw_text(n, 224, string(global.message2));

          global.messageTimer -= 1;
        }
        draw_set_blend_mode_ext(bm_src_color, bm_one);
        draw_set_color(c_black);
        draw_rectangle(0, 0, screen_w, screen_h, 0);
        draw_set_blend_mode(bm_normal);
        surface_reset_target();
      }
      draw_set_blend_mode_ext(bm_one, bm_zero); // According to ChevyRay, this should fix the black box glitch
      draw_surface_stretched(
        screen,
        screen_x,
        screen_y,
        screen_w * screen_scale,
        screen_h * screen_scale
      );
      draw_set_blend_mode(bm_normal); // According to ChevyRay, this should fix the black box glitch
    }
    screen_refresh();

    // this sets surface 'screen' as the drawing target for everything in the game, so all drawing will be done on this surface && ! on the game screen
    surface_set_target(screen);
  }
}

function oScreen_KEYPRESS($) {
  with ($) {
    if (paused && global.plife > 0 && isLevel()) {
      instance_activate_all();
      paused = false;
      [instances_of(oPlayer1)].forEach(($) => {
        with ($) {
          if (facing == 18) xVel = -3;
          else xVel = 3;
          yVel = -6;
          global.plife = -99;
        }
      });

      if (SS_IsSoundPlaying(global.musTitle))
        SS_SetSoundVol(global.musTitle, 10000);
      if (SS_IsSoundPlaying(global.musCave))
        SS_SetSoundVol(global.musCave, 10000);
      if (SS_IsSoundPlaying(global.musLush))
        SS_SetSoundVol(global.musLush, 10000);
      if (SS_IsSoundPlaying(global.musTemple))
        SS_SetSoundVol(global.musTemple, 10000);
      if (SS_IsSoundPlaying(global.musBoss))
        SS_SetSoundVol(global.musBoss, 10000);
      stopAllMusic();
    }

    if (paused) game_end();
  }
}

function oScreen_CREATE($) {
  with ($) {
    scrReadStats();
    scrInit();

    action_if();

    action_fullscreen();

    action_if();

    action_fullscreen();

    py = 0; // player Y coord

    displayheight = display_get_height();
    displaywidth = display_get_width();

    // screen base(view_wview && view_hview)
    screen_x = 0;
    screen_y = 0;
    screen_w = 320;
    screen_h = 240;
    screen_scale = global.screenScale;

    //Spelunky 1.2 7-3-2012 Scale up to resolution
    if (global.screenScale == 5) {
      if (displayheight < displaywidth) screen_scale = displayheight / screen_h;
      else screen_scale = displaywidth / screen_w;
      global.screenScale = screen_scale;
    }
    //Spelunky 1.2 7-3-2012 Soft fullscreen
    if (global.softfullscreen == 1) {
      window_set_showborder(false);
      window_set_size(displaywidth, displayheight);
      window_set_position(0, 0);
    }

    enabled = true;

    // pause
    pSurf = surface_create(screen_w, screen_h);
    canPause = true;
    paused = false;

    // create a surface for the whole screen to be drawn on
    screen = surface_create(screen_w, screen_h);
    darkSurf = surface_create(screen_w, screen_h);

    if (screen) {
      surface_set_target(screen);
      draw_clear(c_black);
    }

    // set up rooms
    var w, h;
    w = 320 * screen_scale;
    h = 240 * screen_scale;
    room_set_view(
      rIntro,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      128,
      0,
      -1,
      -1,
      oPDummy3
    );
    room_set_view(
      rCredits1,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      0,
      0,
      0,
      0,
      noone
    );
    room_set_view(
      rCredits2,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      0,
      0,
      0,
      0,
      noone
    );
    room_set_view(
      rTitle,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      0,
      0,
      0,
      0,
      noone
    );
    room_set_view(
      rHighscores,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      0,
      0,
      0,
      0,
      noone
    );
    room_set_view(rSun, 0, true, 0, 0, 320, 240, 0, 0, w, h, 0, 0, 0, 0, noone);
    room_set_view(
      rMoon,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      0,
      0,
      0,
      0,
      noone
    );
    room_set_view(
      rStars,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      0,
      0,
      0,
      0,
      noone
    );
    room_set_view(
      rLevelEditor,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      0,
      0,
      -1,
      -1,
      noone
    );
    room_set_view(
      rLoadLevel,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      128,
      96,
      -1,
      -1,
      oPlayer1
    );
    room_set_view(
      rTutorial,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      128,
      96,
      -1,
      -1,
      oPlayer1
    );
    room_set_view(
      rLevel,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      128,
      96,
      -1,
      -1,
      oPlayer1
    );
    room_set_view(
      rLevel2,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      128,
      96,
      -1,
      -1,
      oPlayer1
    );
    room_set_view(
      rLevel3,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      128,
      96,
      -1,
      -1,
      oPlayer1
    );
    room_set_view(
      rOlmec,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      128,
      96,
      -1,
      -1,
      oPlayer1
    );
    room_set_view(
      rTransition1,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      0,
      0,
      0,
      0,
      noone
    );
    room_set_view(
      rTransition1x,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      0,
      0,
      0,
      0,
      noone
    );
    room_set_view(
      rTransition2,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      0,
      0,
      0,
      0,
      noone
    );
    room_set_view(
      rTransition2x,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      0,
      0,
      0,
      0,
      noone
    );
    room_set_view(
      rTransition3,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      0,
      0,
      0,
      0,
      noone
    );
    room_set_view(
      rTransition3x,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      0,
      0,
      0,
      0,
      noone
    );
    room_set_view(
      rTransition4,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      0,
      0,
      0,
      0,
      noone
    );
    room_set_view(
      rEnd,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      0,
      0,
      0,
      0,
      oPDummy
    );
    room_set_view(
      rEnd2,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      0,
      0,
      0,
      0,
      noone
    );
    room_set_view(
      rEnd3,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      0,
      0,
      0,
      0,
      noone
    );
    room_set_view(
      rEndCustom,
      0,
      true,
      0,
      0,
      320,
      240,
      0,
      0,
      w,
      h,
      0,
      0,
      0,
      0,
      noone
    );

    // this will destroy the screen object if surfaces are !supported on the graphics card, reverting to the viewport method
    if (screen == -1) game_end();
    else room_goto_next();
  }
}

class oScreen extends oObject {
  // variables
}
