//
// scrCreateTile(tile, x, y)
//
// Creates a tile in the level editor.
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

obj = 0;

if (
  collision_rectangle(
    arguments[1],
    arguments[2],
    arguments[1] + 15,
    arguments[2] + 15,
    oDrawnSprite,
    0,
    0
  )
) {
  obj = instance_position(arguments[1] + 8, arguments[2] + 12, oDrawnSprite);
  if (!obj)
    obj = instance_position(arguments[1] + 8, arguments[2] + 4, oDrawnSprite);
  if (obj) {
    [instances_of(obj)].forEach(($) => {
      with ($) {
        if (
          type == 'Giant Spider' ||
          type == 'Mega Mouth' ||
          type == 'Yeti King' ||
          type == 'Alien Boss' ||
          type == 'Tomb Lord'
        ) {
          if (x == arguments[1] && y == arguments[2]) {
            instance_destroy();
          }
        } else instance_destroy();
      }
    });
  }
}

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
  obj = instance_create(arguments[1], arguments[2], oWaterTile);
} else if (arguments[0] == '3') {
  obj = instance_create(arguments[1], arguments[2], oDark);
  obj.sprite_index = sDark;
} else if (arguments[0] == 'i') {
  obj = instance_create(arguments[1], arguments[2], oIceTile);
} else if (arguments[0] == 'd') {
  obj = instance_create(arguments[1], arguments[2], oDarkFall);
} else if (arguments[0] == '4') {
  obj = instance_create(arguments[1], arguments[2], oTemple);
  obj.sprite_index = sTemple;
} else if (arguments[0] == 'l') {
  obj = instance_create(arguments[1], arguments[2], oLavaTile);
} else if (arguments[0] == 'L') {
  obj = instance_create(arguments[1], arguments[2], oLadderOrange);
} else if (arguments[0] == 'P') {
  obj = instance_create(arguments[1], arguments[2], oLadderTop);
} else if (arguments[0] == 'v') {
  obj = instance_create(arguments[1], arguments[2], oVine);
} else if (arguments[0] == 't') {
  obj = instance_create(arguments[1], arguments[2], oVineTop);
} else if (arguments[0] == '|') {
  obj = instance_create(arguments[1], arguments[2], oTreeTile);
} else if (arguments[0] == 'x') {
  obj = instance_create(arguments[1], arguments[2], oTreeTile);
  obj.sprite_index = sTreeTop;
} else if (arguments[0] == ')') {
  obj = instance_create(arguments[1], arguments[2], oLeavesTile);
} else if (arguments[0] == 'q') {
  obj = instance_create(arguments[1], arguments[2], oTreeBranchTile);
} else if (arguments[0] == 'B') {
  obj = instance_create(arguments[1], arguments[2], oBlock);
} else if (arguments[0] == '&') {
  obj = instance_create(arguments[1], arguments[2], oWebTile);
} else if (arguments[0] == 'r') {
  obj = instance_create(arguments[1], arguments[2], oRockTile);
} else if (arguments[0] == 'j') {
  obj = instance_create(arguments[1], arguments[2], oJarTile);
} else if (arguments[0] == 'k') {
  obj = instance_create(arguments[1], arguments[2], oBonesTile);
} else if (arguments[0] == 'b') {
  obj = instance_create(arguments[1], arguments[2], oBatTile);
} else if (arguments[0] == 'n') {
  obj = instance_create(arguments[1], arguments[2], oSnakeTile);
} else if (arguments[0] == 's') {
  obj = instance_create(arguments[1], arguments[2], oSpiderTile);
} else if (arguments[0] == 'S') {
  obj = instance_create(arguments[1], arguments[2], oGiantSpiderTile);
} else if (arguments[0] == 'K') {
  obj = instance_create(arguments[1], arguments[2], oSkeletonTile);
} else if (arguments[0] == 'h') {
  obj = instance_create(arguments[1], arguments[2], oCavemanTile);
} else if (arguments[0] == '!') {
  obj = instance_create(arguments[1], arguments[2], oShopkeeperTile);
} else if (arguments[0] == 'f') {
  obj = instance_create(arguments[1], arguments[2], oFrogTile);
} else if (arguments[0] == 'F') {
  obj = instance_create(arguments[1], arguments[2], oFireFrogTile);
} else if (arguments[0] == 'z') {
  obj = instance_create(arguments[1], arguments[2], oZombieTile);
} else if (arguments[0] == 'A') {
  obj = instance_create(arguments[1], arguments[2], oVampireTile);
} else if (arguments[0] == 'p') {
  obj = instance_create(arguments[1], arguments[2], oPiranhaTile);
} else if (arguments[0] == '{') {
  obj = instance_create(arguments[1], arguments[2], oMegaMouthTile);
} else if (arguments[0] == 'M') {
  obj = instance_create(arguments[1], arguments[2], oManTrapTile);
} else if (arguments[0] == 'm') {
  obj = instance_create(arguments[1], arguments[2], oMonkeyTile);
} else if (arguments[0] == 'y') {
  obj = instance_create(arguments[1], arguments[2], oYetiTile);
} else if (arguments[0] == 'Y') {
  obj = instance_create(arguments[1], arguments[2], oYetiKingTile);
} else if (arguments[0] == 'a') {
  obj = instance_create(arguments[1], arguments[2], oAlienTile);
} else if (arguments[0] == 'U') {
  obj = instance_create(arguments[1], arguments[2], oUFOTile);
} else if (arguments[0] == 'E') {
  obj = instance_create(arguments[1], arguments[2], oAlienBossTile);
} else if (arguments[0] == 'H') {
  obj = instance_create(arguments[1], arguments[2], oHawkmanTile);
} else if (arguments[0] == 'T') {
  obj = instance_create(arguments[1], arguments[2], oTombLordTile);
} else if (arguments[0] == '^') {
  obj = instance_create(arguments[1], arguments[2], oSpikes);
} else if (arguments[0] == '<') {
  obj = instance_create(arguments[1], arguments[2], oArrowTrapLeft);
} else if (arguments[0] == '>') {
  obj = instance_create(arguments[1], arguments[2], oArrowTrapRight);
} else if (arguments[0] == ']') {
  obj = instance_create(arguments[1], arguments[2], oSpearTrapTileTop);
} else if (arguments[0] == '[') {
  obj = instance_create(arguments[1], arguments[2], oSpearTrapTileBot);
} else if (arguments[0] == '_') {
  obj = instance_create(arguments[1], arguments[2], oSpringTrapTile);
} else if (arguments[0] == '+') {
  obj = instance_create(arguments[1], arguments[2], oSmashTrapTile);
} else if (arguments[0] == '$') {
  obj = instance_create(arguments[1], arguments[2], oGoldBarTile);
} else if (arguments[0] == '*') {
  obj = instance_create(arguments[1], arguments[2], oGoldBarsTile);
} else if (arguments[0] == '#') {
  obj = instance_create(arguments[1], arguments[2], oGoldIdolTile);
} else if (arguments[0] == 'O') {
  obj = instance_create(arguments[1], arguments[2], oCrystalSkullTile);
} else if (arguments[0] == '5') {
  obj = instance_create(arguments[1], arguments[2], oEmeraldBigTile);
} else if (arguments[0] == '6') {
  obj = instance_create(arguments[1], arguments[2], oSapphireBigTile);
} else if (arguments[0] == '7') {
  obj = instance_create(arguments[1], arguments[2], oRubyBigTile);
} else if (arguments[0] == '8') {
  obj = instance_create(arguments[1], arguments[2], oDiamondTile);
} else if (arguments[0] == 'c') {
  obj = instance_create(arguments[1], arguments[2], oChestTile);
} else if (arguments[0] == 'C') {
  obj = instance_create(arguments[1], arguments[2], oCrateTile);
} else if (arguments[0] == 'D') {
  obj = instance_create(arguments[1], arguments[2], oDamselTile);
} else if (arguments[0] == '.') {
  obj = instance_create(arguments[1], arguments[2], oBombBagTile);
} else if (arguments[0] == ':') {
  obj = instance_create(arguments[1], arguments[2], oBombBoxTile);
} else if (arguments[0] == 'u') {
  obj = instance_create(arguments[1], arguments[2], oBombPasteTile);
} else if (arguments[0] == 'R') {
  obj = instance_create(arguments[1], arguments[2], oRopePileTile);
} else if (arguments[0] == '`') {
  obj = instance_create(arguments[1], arguments[2], oParachuteTile);
} else if (arguments[0] == 'o') {
  obj = instance_create(arguments[1], arguments[2], oCompassTile);
} else if (arguments[0] == '/') {
  obj = instance_create(arguments[1], arguments[2], oMacheteTile);
} else if (arguments[0] == '~') {
  obj = instance_create(arguments[1], arguments[2], oSpringShoesTile);
} else if (arguments[0] == 'V') {
  obj = instance_create(arguments[1], arguments[2], oSpikeShoesTile);
} else if (arguments[0] == '}') {
  obj = instance_create(arguments[1], arguments[2], oBowTile);
} else if (arguments[0] == '-') {
  obj = instance_create(arguments[1], arguments[2], oPistolTile);
} else if (arguments[0] == '=') {
  obj = instance_create(arguments[1], arguments[2], oShotgunTile);
} else if (arguments[0] == 'W') {
  obj = instance_create(arguments[1], arguments[2], oWebCannonTile);
} else if (arguments[0] == '%') {
  obj = instance_create(arguments[1], arguments[2], oSpectaclesTile);
} else if (arguments[0] == 'G') {
  obj = instance_create(arguments[1], arguments[2], oGlovesTile);
} else if (arguments[0] == 'g') {
  obj = instance_create(arguments[1], arguments[2], oMittTile);
} else if (arguments[0] == '?') {
  obj = instance_create(arguments[1], arguments[2], oTeleporterTile);
} else if (arguments[0] == '(') {
  obj = instance_create(arguments[1], arguments[2], oMattockTile);
} else if (arguments[0] == '\\') {
  obj = instance_create(arguments[1], arguments[2], oCapeTile);
} else if (arguments[0] == 'J') {
  obj = instance_create(arguments[1], arguments[2], oJetpackTile);
}
if (obj) {
  obj.depth = 100;
  if (arguments[0] == '@' || arguments[0] == 'X' || arguments[0] == 'I')
    obj.depth -= floor(room_width / 16) - floor(arguments[1] / 16);
}
