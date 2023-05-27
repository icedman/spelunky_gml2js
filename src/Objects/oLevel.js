function oLevel_DRAW($) {
  with ($) {
    /*
if (global.darkLevel)
{
    draw_set_alpha(darkness);
    draw_set_color(c_black);
    draw_rectangle(view_xview[0], view_yview[0], view_xview[0]+320, view_yview[0]+240, false);
    draw_set_alpha(1);

}
*/
    if (!global.darkLevel && global.messageTimer > 0) {
      draw_set_font(global.myFontSmall);
      draw_set_color(c_white);
      strLen = string_length(global.message) * 8;
      n = 320 - strLen;
      n = ceil(n / 2);
      draw_text(view_xview[0] + n, view_yview[0] + 216, string(global.message));

      if (!isLevel('rTutorial')) draw_set_color(c_yellow);
      strLen = string_length(global.message2) * 8;
      n = 320 - strLen;
      n = ceil(n / 2);
      draw_text(
        view_xview[0] + n,
        view_yview[0] + 224,
        string(global.message2)
      );

      global.messageTimer -= 1;
    }
  }
}

function oLevel_OTHER($) {
  with ($) {
    //sound_stop(sndMusicTest2);
  }
}

function oLevel_STEP($) {
  with ($) {
    if (musicFade && musicFadeTimer < 100) {
      scrMusicFade();
      musicFadeTimer += 1;
    }

    if (view_enabled) {
      // shake the screen
      if (global.shake > 0) {
        if (oPlayer1.y < 96 || oPlayer1.y > room_height - 96)
          view_vborder[0] = 0;
        else view_vborder[0] = 96;
        if (global.shakeToggle || view_yview[0] <= 0) {
          view_yview += 3;
          global.shakeToggle = false;
        } else if (
          !global.shakeToggle ||
          view_yview[0] >= room_height - view_hview[0]
        ) {
          view_yview -= 3;
          global.shakeToggle = true;
        }
        global.shake -= 1;
      } else {
        view_vborder[0] = 96;
      }
      /*
    if (global.shake &gt; 0)
    {
        if (oPlayer1.y &lt; 240-96 or oPlayer1.y &gt; room_height-144) view_vborder[0] = 0;
        else view_vborder[0] = 96;
        //view_xview[0] = view_xview[0] + rand(0,3) - rand(0,3);
        if (global.shakeToggle)
        {
            // if (view_yview[0] &gt;= room_height - view_hview[0]) view_yview[0] = 304;
            // global.yviewPrev = view_yview[0];
            global.yShakeDiff = rand(1,3);
            view_yview[0] = view_yview[0] + global.yShakeDiff;
        }
        else
        {
            view_yview[0] = view_yview[0] - global.yShakeDiff;
        }
        global.shake -= 1;
        global.shakeToggle = not global.shakeToggle;
    }
    else
    {
        global.shakeToggle = false;
        global.yShakeDiff = 0;
        view_vborder[0] = 96;
    }
    */
      /*
    if (global.levelType != 2)
    {
        if (view_yview[0] + view_hview[0] &gt; 560) view_yview[0] = 560;
    }
    */

      offset = 96;
      // deactivate all instances outside the region

      // this is to prevent water from only getting drained partway
      instances_of(oWater).forEach(($) => {
        with ($) {
          if (
            x + 8 < view_xview[0] - 96 ||
            x + 8 > view_xview[0] + view_wview[0] + 96 ||
            y + 8 < view_yview[0] - 96 ||
            y + 8 > view_yview[0] + view_hview[0] + 96
          ) {
            checked = false;
          }
        }
      });

      instance_deactivate_region(
        view_xview[0] - offset,
        view_yview[0] - offset,
        view_wview[0] + offset * 2,
        view_hview[0] + offset * 2,
        false,
        true
      );
      // activate all instances inside the region
      instance_activate_region(
        view_xview[0] - offset,
        view_yview[0] - offset,
        view_wview[0] + offset * 2,
        view_hview[0] + offset * 2,
        true
      );
      // activate all important instances
      // instance_activate_object(oSolid);
      // instance_activate_object(oWater);
      instance_activate_object(oCharacter);
      instance_activate_object(oRope);
      instance_activate_object(oRopeThrow);
      instance_activate_object(oRopeTop);
      // instance_activate_object(oOlmec);
      instance_activate_object(oGame);
      instance_activate_object(oGlobals);
      instance_activate_object(oScreen);
      instance_activate_object(oGamepad);
      instance_activate_object(oExplosion);
      instance_activate_object(oGhost);
      instance_activate_object(oFinalBoss);
      if (instance_exists(oPlayer1))
        instance_activate_region(
          oPlayer1.x - 16,
          oPlayer1.y - 16,
          oPlayer1.x + 16,
          oPlayer1.y + 16,
          true
        );
      instance_activate_object(oBoulder);
      if (instance_exists(oBoulder))
        instance_activate_region(
          oBoulder.x - 32,
          oBoulder.y - 32,
          64,
          64,
          true
        );
      instance_activate_object(oOlmec);
      if (instance_exists(oOlmec))
        instance_activate_region(oOlmec.x - 16, oOlmec.y - 16, 96, 96, true);
      /*
    with oCaveTop { if (not collision_point(x, y+16, oBrick, 0, 0)) instance_destroy(); }
    with oLushTop { if (not collision_point(x, y+16, oLush, 0, 0)) instance_destroy(); }
    with oDarkTop { if (not collision_point(x, y+16, oDark, 0, 0)) instance_destroy(); }
    with oTempleTop { if (not collision_point(x, y+16, oTemple, 0, 0)) instance_destroy(); }
    with oIceBottom { if (not collision_point(x, y-16, oIce, 0, 0)) instance_destroy(); }
    */
    }

    // darkness
    if (global.darkLevel) {
      // darkness = 0 : lightest
      // darkness = 1 : darkest
      dist = 160;
      if (global.hasCrown) dist = 0;
      else if (instance_exists(oFlare)) {
        flare = instance_nearest(oPlayer1.x, oPlayer1.y, oFlare);
        dist = flare.distToPlayer;
      }

      if (
        oPlayer1.distToNearestLightSource < 200 &&
        oPlayer1.distToNearestLightSource < dist
      ) {
        dist = oPlayer1.distToNearestLightSource;
      }
      if (dist == 0) darkness = 0;
      else darkness = dist / 160;

      if (global.darknessLerp > 0) {
        darkness = global.darknessLerp;
        global.darknessLerp -= 0.1;
      }

      if (darkness > 0.9) darkness = 0.9;
    }
  }
}

function oLevel_CREATE($) {
  with ($) {
    oScreen.enabled = true;
    global.drawHUD = true;
    global.gameStart = true;
    global.shake = 0;
    shakeSwitch = false;
    musicFade = false;
    musicFadeTimer = 0;
    global.xviewPrev = 0;
    global.yviewPrev = 0;

    global.xmoney = 0;
    global.xtime = 0;

    global.ghostExists = false;

    if (global.darkLevel) darkness = 1;
    else darkness = 0;
    global.darknessLerp = 0;

    if (global.music) {
      startMusic();
    }

    if (instance_exists(oPlayer1)) {
      instances_of(oPlayer1).forEach(($) => {
        with ($) {
          scrHoldItem(global.pickupItem);
          holdItem.cost = 0;
          if (global.kaliPunish >= 2) {
            instance_create(x, y, oBall);
            obj = instance_create(x, y, oChain);
            obj.linkVal = 1;
            obj = instance_create(x, y, oChain);
            obj.linkVal = 2;
            obj = instance_create(x, y, oChain);
            obj.linkVal = 3;
            obj = instance_create(x, y, oChain);
            obj.linkVal = 4;
          }
        }
      });
    }
  }
}

class oLevel extends oObject {
  checked;
  musicFadeTimer;
  oGamepad;
  oGlobals;
  offset;
  shakeSwitch;
  xviewPrev;
  yviewPrev;
  visible = true;
}
ObjType.oLevel = oLevel;
