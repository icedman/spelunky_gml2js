function oTransition_ALARM_1($) {
  with ($) {
    drawLoot += 1;

    if (drawLoot < 0) {
      if (hurryup) alarm[1] = 1;
      else alarm[1] = 30;
    }
  }
}

function oTransition_DRAW($) {
  with ($) {
    draw_set_font(global.myFontSmall);
    draw_set_color(c_white);
    if (instance_exists(oTunnelMan)) {
      person = instance_nearest(176, 176, oTunnelMan);
      if (person.talk == 1) {
        strLen = string_length("HEY THERE! I'M THE TUNNEL MAN!") * 8;
        n = 320 - strLen;
        n = ceil(n / 2);
        draw_text(n, 208, "HEY THERE! I'M THE TUNNEL MAN!");
        strLen = string_length('I DIG SHORTCUTS.') * 8;
        n = 320 - strLen;
        n = ceil(n / 2);
        draw_text(n, 216, 'I DIG SHORTCUTS.');
      } else if (person.talk == 2) {
        strLen = string_length('CAN YOU LEND ME A LITTLE MONEY?') * 8;
        n = 320 - strLen;
        n = ceil(n / 2);
        draw_text(n, 208, 'CAN YOU LEND ME A LITTLE MONEY?');
        if (isRoom('rTransition1x') || isRoom('rTransition3x'))
          strLen =
            string_length(
              'I NEED $' + string(global.tunnel1) + ' FOR A NEW SHORTCUT.'
            ) * 8;
        else
          strLen =
            string_length(
              'I NEED $' + string(global.tunnel2) + ' FOR A NEW SHORTCUT.'
            ) * 8;
        n = 320 - strLen;
        n = ceil(n / 2);
        if (isRoom('rTransition1x') || isRoom('rTransition3x'))
          draw_text(
            n,
            216,
            'I NEED $' + string(global.tunnel1) + ' FOR A NEW SHORTCUT.'
          );
        else
          draw_text(
            n,
            216,
            'I NEED $' + string(global.tunnel2) + ' FOR A NEW SHORTCUT.'
          );
        draw_set_color(c_yellow);
        draw_text(n, 224, 'DONATE: ' + string(oTunnelMan.donate));
        draw_set_color(c_white);
      } else if (person.talk == 3) {
        strLen = string_length("THANKS! YOU WON'T REGRET IT!") * 8;
        n = 320 - strLen;
        n = ceil(n / 2);
        draw_text(n, 216, "THANKS! YOU WON'T REGRET IT!");
      } else if (person.talk == 4) {
        strLen = string_length("I'LL NEVER GET THIS SHORTCUT BUILT!") * 8;
        n = 320 - strLen;
        n = ceil(n / 2);
        draw_text(n, 216, "I'LL NEVER GET THIS SHORTCUT BUILT!");
      } else if (person.talk == 5) {
        strLen = string_length('ONE SHORTCUT, COMING UP!') * 8;
        n = 320 - strLen;
        n = ceil(n / 2);
        draw_text(n, 216, 'ONE SHORTCUT, COMING UP!');
      }
    } else if (instance_exists(oDamselKiss)) {
      person = instance_nearest(176, 176, oDamselKiss);
      if (person.kissed) {
        strLen = string_length('MY HERO!') * 8;
        n = 320 - strLen;
        n = ceil(n / 2);
        draw_text(n, 216, 'MY HERO!');
      }
    }
    /* debug
else
{
        draw_text(8, 208, string(debugCounter));
        if (global.genBlackMarket) draw_text(8, 216, "MARKET : " + string(drawLoot) + " :$ " + string(moneyCount) + " :$ " + string(global.xmoney) + " :A " + string(alarm[0]) + " :A " + string(alarm[1]));
}
*/

    draw_set_color(c_yellow);
    if (global.customLevel)
      draw_text(32, 48, global.customLevelName + ' COMPLETED!');
    else if (global.currLevel - 1 < 1)
      draw_text(32, 48, 'TUTORIAL CAVE COMPLETED!');
    else
      draw_text(
        32,
        48,
        'LEVEL ' + string(global.currLevel - 1) + ' COMPLETED!'
      );
    draw_set_color(c_white);
    draw_text(32, 64, 'TIME  = ');
    draw_text(32, 80, 'LOOT  = ');
    draw_text(32, 96, 'KILLS = ');
    draw_text(32, 112, 'MONEY = ');

    if (drawLoot >= 1 && !isLoot) {
      draw_text(96, 80, 'NONE');
    }

    if (drawLoot > -2) {
      s = global.xtime;
      s = floor(s / 1000);
      m = 0;
      while (s > 59) {
        s -= 60;
        m += 1;
      }

      // don't create a dark level if player is attempting a speed run
      if (s <= 20) global.noDarkLevel = true;
      else global.noDarkLevel = false;

      s2 = global.time;
      s2 = floor(s2 / 1000);
      m2 = 0;
      while (s2 > 59) {
        s2 -= 60;
        m2 += 1;
      }

      if (s < 10 && s2 < 10)
        draw_text(
          96,
          64,
          string(m) + ':0' + string(s) + ' / ' + string(m2) + ':0' + string(s2)
        );
      else if (s < 10)
        draw_text(
          96,
          64,
          string(m) + ':0' + string(s) + ' / ' + string(m2) + ':' + string(s2)
        );
      else if (s2 < 10)
        draw_text(
          96,
          64,
          string(m) + ':' + string(s) + ' / ' + string(m2) + ':0' + string(s2)
        );
      else
        draw_text(
          96,
          64,
          string(m) + ':' + string(s) + ' / ' + string(m2) + ':' + string(s2)
        );
    }

    if (drawLoot == 2) {
      if (!isKills) {
        draw_text(96, 96, 'NONE');
      }
      draw_text(
        96,
        112,
        '$' + string(moneyCount) + ' / $' + string(global.money)
      );
    }
  }
}

function oTransition_STEP($) {
  with ($) {
    if (checkAttackPressed() || checkStartPressed()) {
      n = 0;

      if (instance_exists(oTunnelMan)) {
        person = instance_nearest(100, 100, oTunnelMan);
        if (person.talk < 3) n = 1;
      }

      if (drawLoot == 2 && moneyCount == global.xmoney && n == 0) {
        if (gamepad.attackPressed) gamepad.attackPressed = false;
        if (gamepad.startPressed) gamepad.startPressed = false;
        if (alarm[0] > 1) alarm[0] = 1;
        if (alarm[1] > 1) alarm[1] = 1;
        global.gameStart = true;
        global.lake = false;
        if (global.customLevel) room_goto(rLoadLevel);
        else if (
          global.currLevel >= 5 &&
          global.currLevel <= 8 &&
          !global.genBlackMarket
        ) {
          if (rand(1, global.probLake) == 1) {
            global.lake = true;
            room_goto(rLevel3);
          } else room_goto(rLevel);
        } else if (global.currLevel >= 9 && global.currLevel <= 12)
          room_goto(rLevel2);
        else if (global.currLevel == 16) room_goto(rOlmec);
        else room_goto(rLevel);
      } else {
        hurryup = true;
      }
    }

    if (checkUpPressed()) {
      if (instance_exists(oTunnelMan)) {
        person = instance_nearest(100, 100, oTunnelMan);
        person.donate += 100;
        if (isRoom('rTransition1x') || isRoom('rTransition3x')) {
          if (global.money > global.tunnel1) {
            if (person.donate > global.tunnel1) person.donate = global.tunnel1;
          } else if (person.donate > global.money) person.donate = global.money;
        } else {
          if (global.money > global.tunnel2) {
            if (person.donate > global.tunnel2) person.donate = global.tunnel2;
          } else if (person.donate > global.money) person.donate = global.money;
        }
      }
    } else if (checkDownPressed()) {
      if (instance_exists(oTunnelMan)) {
        person = instance_nearest(100, 100, oTunnelMan);
        person.donate -= 100;
        if (person.donate < 0) person.donate = 0;
      }
    }

    if (drawLoot == 2) {
      if (moneyCount < global.xmoney) {
        if (hurryup) moneyCount = global.xmoney;
        else {
          moneyDiff = global.xmoney - moneyCount;
          if (moneyDiff > 100) moneyCount += 100;
          else moneyCount += moneyDiff;
        }
      }
    }

    debugCounter += 1;

    global.moaiX = 0;
    global.moaiY = 0;
  }
}

function oTransition_ALARM_0($) {
  with ($) {
    if (drawLoot == 0) {
      if (drawPosX > 272) {
        drawPosX = 100;
        drawPosY += 2;
        if (drawPosY > 83 + 4) drawPosY = 83;
      }
    } else if (drawPosX > 232) {
      drawPosX = 96;
      drawPosY += 2;
      if (drawPosY > 91 + 4) drawPosY = 91;
    }

    sprite = instance_create(drawPosX, drawPosY, oSprite);

    if (drawLoot < 0) {
      // nothing
    } else if (global.gold > 0) {
      sprite.sprite_index = sGoldChunk;
      global.gold -= 1;
      isLoot = true;
    } else if (global.emeralds > 0) {
      sprite.sprite_index = sEmerald;
      global.emeralds -= 1;
      isLoot = true;
    } else if (global.sapphires > 0) {
      sprite.sprite_index = sSapphire;
      global.sapphires -= 1;
      isLoot = true;
    } else if (global.rubies > 0) {
      sprite.sprite_index = sRuby;
      global.rubies -= 1;
      isLoot = true;
    } else if (global.nuggets > 0) {
      sprite.sprite_index = sGoldNugget;
      global.nuggets -= 1;
      isLoot = true;
    } else if (global.goldbar > 0) {
      sprite.sprite_index = sGoldBarDraw;
      global.goldbar -= 1;
      isLoot = true;
    } else if (global.goldbars > 0) {
      sprite.sprite_index = sGoldBarsDraw;
      global.goldbars -= 1;
      isLoot = true;
    } else if (global.bigemeralds > 0) {
      sprite.sprite_index = sEmeraldBig;
      global.bigemeralds -= 1;
      isLoot = true;
    } else if (global.bigsapphires > 0) {
      sprite.sprite_index = sSapphireBig;
      global.bigsapphires -= 1;
      isLoot = true;
    } else if (global.bigrubies > 0) {
      sprite.sprite_index = sRubyBig;
      global.bigrubies -= 1;
      isLoot = true;
    } else if (global.diamonds > 0) {
      sprite.sprite_index = sDiamond;
      global.diamonds -= 1;
      isLoot = true;
    } else if (global.xdamsels > 0) {
      if (global.isDamsel) sprite.sprite_index = sStandLeft;
      else sprite.sprite_index = sDamselLeft;
      global.xdamsels -= 1;
      isLoot = true;
    } else if (global.scarabs > 0) {
      sprite.sprite_index = sScarabDisp;
      global.scarabs -= 1;
      isLoot = true;
    } else if (global.idols > 0) {
      sprite.sprite_index = sGoldIdolIco;
      global.idols -= 1;
      isLoot = true;
    } else if (global.skulls > 0) {
      sprite.sprite_index = sCrystalSkullIco;
      global.skulls -= 1;
      isLoot = true;
    } else {
      if (drawLoot == 0) {
        drawPosX = 96;
        drawPosY = 91;
        sprite.x = 96;
        sprite.y = 91;
        drawLoot = 1;
      }

      if (global.bats > 0) {
        sprite.sprite_index = sBatLeft;
        global.bats -= 1;
        isKills = true;
      } else if (global.snakes > 0) {
        sprite.sprite_index = sSnakeLeft;
        global.snakes -= 1;
        isKills = true;
      } else if (global.spiders > 0) {
        sprite.sprite_index = sSpider;
        global.spiders -= 1;
        isKills = true;
      } else if (global.deadfish > 0) {
        sprite.sprite_index = sDeadFishLeftIco;
        global.deadfish -= 1;
        isKills = true;
      } else if (global.piranhas > 0) {
        sprite.sprite_index = sPiranhaLeftIco;
        global.piranhas -= 1;
        isKills = true;
      } else if (global.skeletons > 0) {
        sprite.sprite_index = sSkeletonLeft;
        global.skeletons -= 1;
        isKills = true;
      } else if (global.zombies > 0) {
        sprite.sprite_index = sZombieLeft;
        global.zombies -= 1;
        isKills = true;
      } else if (global.vampires > 0) {
        sprite.sprite_index = sVampireLeft;
        global.vampires -= 1;
        isKills = true;
      } else if (global.rogs > 0) {
        sprite.sprite_index = sFrogLeft;
        global.rogs -= 1;
        isKills = true;
      } else if (global.irefrogs > 0) {
        sprite.sprite_index = sFireFrogLeft;
        global.irefrogs -= 1;
        isKills = true;
      } else if (global.monkeys > 0) {
        sprite.sprite_index = sMonkeyLeft;
        global.monkeys -= 1;
        isKills = true;
      } else if (global.mantraps > 0) {
        sprite.sprite_index = sManTrapLeft;
        global.mantraps -= 1;
        isKills = true;
      } else if (global.yetis > 0) {
        sprite.sprite_index = sYetiLeft;
        global.yetis -= 1;
        isKills = true;
      } else if (global.ufos > 0) {
        sprite.sprite_index = sUFO;
        global.ufos -= 1;
        isKills = true;
      } else if (global.aliens > 0) {
        sprite.sprite_index = sAlien;
        global.aliens -= 1;
        isKills = true;
      } else if (global.alienbosses > 0) {
        sprite.sprite_index = sAlienBossDisp;
        global.alienbosses -= 1;
        isKills = true;
      } else if (global.cavemen > 0) {
        sprite.sprite_index = sCavemanLeft;
        global.cavemen -= 1;
        isKills = true;
      } else if (global.hawkmen > 0) {
        sprite.sprite_index = sHawkLeft;
        global.hawkmen -= 1;
        isKills = true;
      } else if (global.giantspiders > 0) {
        sprite.sprite_index = sGiantSpiderDisp;
        global.giantspiders -= 1;
        isKills = true;
      } else if (global.megamouths > 0) {
        sprite.sprite_index = sMegaMouth;
        global.megamouths -= 1;
        isKills = true;
      } else if (global.yetikings > 0) {
        sprite.sprite_index = sYetiKingDisp;
        global.yetikings -= 1;
        isKills = true;
      } else if (global.tomblords > 0) {
        sprite.sprite_index = sTombLordDisp;
        global.tomblords -= 1;
        isKills = true;
      } else if (global.damselsKilled > 0) {
        if (global.isDamsel) sprite.sprite_index = sStandLeftIco;
        else sprite.sprite_index = sDamselLeftIco;
        global.damselsKilled -= 1;
        isKills = true;
      } else if (global.shopkeepers > 0) {
        sprite.sprite_index = sShopLeftIco;
        global.shopkeepers -= 1;
        isKills = true;
      } else {
        drawLoot = 2;
        instances_of(sprite).forEach(($) => {
          with ($) {
            instance_destroy();
          }
        });
      }
    }

    if (drawLoot < 0) {
      // nothing
    } else if (drawLoot == 0) drawPosX += 4;
    else drawPosX += 8;

    if (drawLoot == 2) {
      // nothing
    } else if (hurryup) alarm[0] = 1;
    else alarm[0] = 3;
  }
}

function oTransition_CREATE($) {
  with ($) {
    debugCounter = 0;

    global.message = '';
    global.message2 = '';

    drawPosX = 100;
    drawPosY = 83;
    drawLoot = -2;
    moneyCount = 0;
    hurryup = false;

    isLoot = false;
    isKills = false;

    if (global.hasCape) {
      instance_create(0, 0, oCape);
    }

    if (global.currLevel - 1 < 1) {
      scrClearGlobals();
      global.irstTime = false;
    }

    if (global.kaliPunish >= 2) {
      instance_create(oPDummy.x, oPDummy.y + 2, oBall2);
      obj = instance_create(oPDummy.x, oPDummy.y, oChain2);
      obj.linkVal = 1;
      obj = instance_create(oPDummy.x, oPDummy.y, oChain2);
      obj.linkVal = 2;
      obj = instance_create(oPDummy.x, oPDummy.y, oChain2);
      obj.linkVal = 3;
      obj = instance_create(oPDummy.x, oPDummy.y, oChain2);
      obj.linkVal = 4;
    }

    alarm[0] = 10;
    alarm[1] = 30;

    if (global.xdamsels > 0) {
      instance_create(176 + 8, 176 + 8, oDamselKiss);
    }

    if (global.tunnel1 > 0 && global.tunnel2 > 0 && isRoom('rTransition1x')) {
      if (global.tunnel1 > global.tunnel1Max) global.tunnel1 -= 1;
      else instance_create(96 + 8, 176 + 8, oTunnelMan);
    } else if (
      global.tunnel1 == 0 &&
      global.tunnel2 > 0 &&
      isRoom('rTransition2x')
    ) {
      if (global.tunnel2 > global.tunnel2Max) global.tunnel2 -= 1;
      else instance_create(96 + 8, 176 + 8, oTunnelMan);
    } else if (
      global.tunnel1 > 0 &&
      global.tunnel2 == 0 &&
      isRoom('rTransition3x')
    ) {
      if (global.tunnel1 > global.tunnel3Max) global.tunnel1 -= 1;
      else instance_create(96 + 8, 176 + 8, oTunnelMan);
    }

    upHeld = 0;
    downHeld = 0;

    stopAllMusic();
  }
}

class oTransition extends oObject {
  customLevelName;
  debugCounter;
  drawLoot;
  drawPosX;
  drawPosY;
  hurryup;
  isKills;
  isLoot;
  m2;
  noDarkLevel;
  oSprite;
  probLake;
  rLevel;
  rLevel2;
  rLevel3;
  rOlmec;
  s2;
  sAlien;
  sAlienBossDisp;
  sCrystalSkullIco;
  sDamselLeftIco;
  sDeadFishLeftIco;
  sDiamond;
  sEmerald;
  sEmeraldBig;
  sGiantSpiderDisp;
  sGoldBarDraw;
  sGoldBarsDraw;
  sGoldChunk;
  sGoldIdolIco;
  sGoldNugget;
  sMegaMouth;
  sPiranhaLeftIco;
  sRuby;
  sRubyBig;
  sSapphire;
  sSapphireBig;
  sScarabDisp;
  sShopLeftIco;
  sSnakeLeft;
  sStandLeftIco;
  sTombLordDisp;
  sYetiKingDisp;
  sprite;
  xtime;
  visible = true;
}
ObjType.oTransition = oTransition;
