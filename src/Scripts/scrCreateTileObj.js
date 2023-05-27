function scrCreateTileObj() {
  //
  // scrCreateTileObj(tile, x, y)
  //
  // Creates an obj in the level loader.
  //

  /**********************************************************************************
    Copyright (c) 2008, 2009 Derek Yu and Mossmouth, LLC
    
    This file is part of Spelunky.

    You can redistribute and/or modify Spelunky, including its source code, under
    the terms of the Spelunky User License.

    Spelunky is distributed in the hope that it will be entertaining and useful,
    but WITHOUT WARRANTY.  Please see the Spelunky User License for more details.

    The Spelunky User License should be available in "Game Information", which
    can be found in the Resource Explorer, or as an external file called COPYING.
    If not, please obtain a new copy of Spelunky from <http://spelunkyworld.com/>
    
***********************************************************************************/

  if (arguments[0] == '@') {
    obj = instance_create(arguments[1], arguments[2], oEntrance);
  } else if (arguments[0] == 'X') {
    obj = instance_create(arguments[1], arguments[2], oExit);
  } else if (arguments[0] == 'I') {
    obj = instance_create(arguments[1], arguments[2], oMsgSign);
  } else if (arguments[0] == '1') {
    obj = instance_create(arguments[1], arguments[2], oBrick);
    obj.sprite_index = sBrick;
  } else if (arguments[0] == '2') {
    obj = instance_create(arguments[1], arguments[2], oLush);
    obj.sprite_index = sLush;
  } else if (arguments[0] == 'w') {
    obj = instance_create(arguments[1], arguments[2], oWaterSwim);
  } else if (arguments[0] == '3') {
    obj = instance_create(arguments[1], arguments[2], oDark);
    obj.sprite_index = sDark;
  } else if (arguments[0] == 'i') {
    obj = instance_create(arguments[1], arguments[2], oIce);
    [instances_of(oFrozenCaveman)].orEach(($) => {
      with ($) {
        instance_destroy();
      }
    });
  } else if (arguments[0] == 'd') {
    obj = instance_create(arguments[1], arguments[2], oDarkFall);
  } else if (arguments[0] == '4') {
    obj = instance_create(arguments[1], arguments[2], oTemple);
    obj.sprite_index = sTemple;
  } else if (arguments[0] == 'l') {
    obj = instance_create(arguments[1], arguments[2], oLava);
  } else if (arguments[0] == 'L') {
    obj = instance_create(arguments[1], arguments[2], oLadderOrange);
  } else if (arguments[0] == 'P') {
    obj = instance_create(arguments[1], arguments[2], oLadderTop);
  } else if (arguments[0] == 'v') {
    obj = instance_create(arguments[1], arguments[2], oVine);
  } else if (arguments[0] == 't') {
    obj = instance_create(arguments[1], arguments[2], oVineTop);
  } else if (arguments[0] == '|') {
    obj = instance_create(arguments[1], arguments[2], oTree);
  } else if (arguments[0] == 'x') {
    obj = instance_create(arguments[1], arguments[2], oTree);
    obj.sprite_index = sTreeTop;
  } else if (arguments[0] == ')') {
    obj = instance_create(arguments[1], arguments[2], oLeaves);
  } else if (arguments[0] == 'q') {
    obj = instance_create(arguments[1], arguments[2], oTreeBranch);
  } else if (arguments[0] == 'B') {
    obj = instance_create(arguments[1], arguments[2], oPushBlock);
  } else if (arguments[0] == '&') {
    obj = instance_create(arguments[1], arguments[2], oWeb);
  } else if (arguments[0] == 'r') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 12, oRock);
  } else if (arguments[0] == 'j') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 10, oJar);
  } else if (arguments[0] == 'k') {
    obj = instance_create(arguments[1], arguments[2], oBones);
    obj = instance_create(arguments[1] + 12, arguments[2] + 12, oSkull);
  } else if (arguments[0] == 'b') {
    obj = instance_create(arguments[1], arguments[2], oBat);
  } else if (arguments[0] == 'n') {
    obj = instance_create(arguments[1], arguments[2], oSnake);
  } else if (arguments[0] == 's') {
    obj = instance_create(arguments[1], arguments[2], oSpiderHang);
  } else if (arguments[0] == 'S') {
    obj = instance_create(arguments[1], arguments[2], oGiantSpiderHang);
  } else if (arguments[0] == 'K') {
    obj = instance_create(arguments[1], arguments[2], oSkeleton);
  } else if (arguments[0] == 'h') {
    obj = instance_create(arguments[1], arguments[2], oCaveman);
  } else if (arguments[0] == '!') {
    obj = instance_create(arguments[1], arguments[2], oShopkeeper);
    obj.status = 4;
  } else if (arguments[0] == 'f') {
    obj = instance_create(arguments[1], arguments[2], oFrog);
  } else if (arguments[0] == 'F') {
    obj = instance_create(arguments[1], arguments[2], oFireFrog);
  } else if (arguments[0] == 'z') {
    obj = instance_create(arguments[1], arguments[2], oZombie);
  } else if (arguments[0] == 'A') {
    obj = instance_create(arguments[1], arguments[2], oVampire);
  } else if (arguments[0] == 'p') {
    obj = instance_create(arguments[1], arguments[2], oWaterSwim);
    obj = instance_create(arguments[1] + 4, arguments[2] + 4, oPiranha);
  } else if (arguments[0] == '{') {
    instance_create(arguments[1], arguments[2], oWaterSwim);
    instance_create(arguments[1] + 16, arguments[2], oWaterSwim);
    instance_create(arguments[1] + 32, arguments[2], oWaterSwim);
    instance_create(arguments[1] + 48, arguments[2], oWaterSwim);
    instance_create(arguments[1], arguments[2] + 16, oWaterSwim);
    instance_create(arguments[1] + 16, arguments[2] + 16, oWaterSwim);
    instance_create(arguments[1] + 32, arguments[2] + 16, oWaterSwim);
    instance_create(arguments[1] + 48, arguments[2] + 16, oWaterSwim);
    obj = instance_create(arguments[1], arguments[2], oJaws);
  } else if (arguments[0] == 'M') {
    obj = instance_create(arguments[1], arguments[2], oManTrap);
  } else if (arguments[0] == 'm') {
    obj = instance_create(arguments[1], arguments[2], oMonkey);
  } else if (arguments[0] == 'y') {
    obj = instance_create(arguments[1], arguments[2], oYeti);
  } else if (arguments[0] == 'Y') {
    obj = instance_create(arguments[1], arguments[2], oYetiKing);
  } else if (arguments[0] == 'a') {
    obj = instance_create(arguments[1], arguments[2], oAlien);
  } else if (arguments[0] == 'U') {
    obj = instance_create(arguments[1], arguments[2], oUFO);
  } else if (arguments[0] == 'E') {
    obj = instance_create(arguments[1], arguments[2], oAlienBoss);
  } else if (arguments[0] == 'H') {
    obj = instance_create(arguments[1], arguments[2], oHawkman);
  } else if (arguments[0] == 'T') {
    obj = instance_create(arguments[1], arguments[2], oTombLord);
  } else if (arguments[0] == '^') {
    obj = instance_create(arguments[1], arguments[2], oSpikes);
  } else if (arguments[0] == '<') {
    obj = instance_create(arguments[1], arguments[2], oArrowTrapLeft);
  } else if (arguments[0] == '>') {
    obj = instance_create(arguments[1], arguments[2], oArrowTrapRight);
  } else if (arguments[0] == ']') {
    obj = instance_create(arguments[1], arguments[2], oSpearTrapTop);
  } else if (arguments[0] == '[') {
    obj = instance_create(arguments[1], arguments[2], oSpearTrapBottom);
  } else if (arguments[0] == '_') {
    obj = instance_create(arguments[1], arguments[2], oSpringTrap);
  } else if (arguments[0] == '+') {
    obj = instance_create(arguments[1], arguments[2], oSmashTrap);
  } else if (arguments[0] == '$') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 12, oGoldBar);
  } else if (arguments[0] == '*') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 8, oGoldBars);
  } else if (arguments[0] == '#') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 12, oGoldIdol);
  } else if (arguments[0] == 'O') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 12, oCrystalSkull);
  } else if (arguments[0] == '5') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 12, oEmeraldBig);
  } else if (arguments[0] == '6') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 12, oSapphireBig);
  } else if (arguments[0] == '7') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 12, oRubyBig);
  } else if (arguments[0] == '8') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 12, oDiamond);
  } else if (arguments[0] == 'c') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 8, oChest);
  } else if (arguments[0] == 'C') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 8, oCrate);
  } else if (arguments[0] == 'D') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 8, oDamsel);
  } else if (arguments[0] == '.') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 10, oBombBag);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == ':') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 8, oBombBox);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == 'u') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 10, oPaste);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == 'R') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 11, oRopePile);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == '`') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 10, oParaPickup);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == 'o') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 10, oCompass);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == '/') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 12, oMachete);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == '~') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 10, oSpringShoes);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == 'V') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 10, oSpikeShoes);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == '}') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 12, oBow);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == '-') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 12, oPistol);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == '=') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 12, oShotgun);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == 'W') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 12, oWebCannon);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == '%') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 10, oSpectacles);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == 'G') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 8, oGloves);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == 'g') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 8, oMitt);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == '?') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 12, oTeleporter);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == '(') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 10, oMattock);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == '\\') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 10, oCapePickup);
    obj.cost = 0;
    obj.orSale = false;
  } else if (arguments[0] == 'J') {
    obj = instance_create(arguments[1] + 8, arguments[2] + 8, oJetpack);
    obj.cost = 0;
    obj.orSale = false;
  }
}
