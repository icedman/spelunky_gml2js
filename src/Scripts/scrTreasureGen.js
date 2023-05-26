//
// scrTreasureGen(bonesChance)
//
// Generates crates, chests, gold, gems, && bones.
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

// arguments[0]: bones

// alcove
if (distance_to_object(oEntrance) < 32) return 0;
if (distance_to_object(oExit) < 32) return 0;
if (distance_to_object(oGoldIdol) < 64) return 0;

colStuff = true;
if (
  !collision_point(x, y - 16, oSolid, 0, 0) &&
  !collision_point(x, y - 1, oTreasure, 0, 0) &&
  !collision_point(x, y - 8, oChest, 0, 0) &&
  !collision_point(x, y - 8, oSpikes, 0, 0) &&
  !collision_point(x, y - 8, oEntrance, 0, 0) &&
  !collision_point(x, y - 8, oExit, 0, 0)
) {
  colStuff = false;
}

if (!colStuff) {
  if (rand(1, 100) == 1) {
    instance_create(x + 8, y - 4, oRock);
    return 0;
  } else if (rand(1, 40) == 1) {
    instance_create(x + 8, y - 6, oJar);
    return 0;
  }
}
// alcove
if (
  !colStuff &&
  collision_point(x, y - 32, oSolid, 0, 0) &&
  (collision_point(x - 16, y - 16, oSolid, 0, 0) ||
    collision_point(x + 16, y - 16, oSolid, 0, 0) ||
    collision_point(x - 16, y - 16, oBlock, 0, 0) ||
    collision_point(x + 16, y - 16, oBlock, 0, 0))
) {
  n = 60;
  if (distance_to_object(oGiantSpider < 100)) n = 5;

  if (global.levelType != 2 && rand(1, n) == 1)
    instance_create(x, y - 16, oWeb);
  else if (global.genUdjatEye && !global.LockedChest) {
    if (rand(1, global.lockedChestChance) == 1) {
      instance_create(x + 8, y - 8, oLockedChest);
      global.LockedChest = true;
    } else global.lockedChestChance -= 1;
  } else if (rand(1, 10) == 1) {
    instance_create(x + 8, y - 8, oCrate);
  } else if (rand(1, 15) == 1) {
    instance_create(x + 8, y - 8, oChest);
  } else if (
    !oGame.damsel &&
    rand(1, 8) == 1 &&
    !collision_point(x + 8, y - 8, oWater, 0, 0)
  ) {
    obj = instance_create(x + 8, y - 8, oDamsel);
    obj.cost = 0;
    obj.orSale = false;
    oGame.damsel = true;
  } else if (rand(1, 40 - 2 * global.currLevel) <= 1 + arguments[0]) {
    if (rand(1, 8) == 1) instance_create(x, y - 16, oFakeBones);
    else {
      instance_create(x, y - 16, oBones);
      instance_create(x + 12, y - 4, oSkull);
    }
  } else if (rand(1, 3) == 1) instance_create(x + 8, y - 4, oGoldBar);
  else if (rand(1, 6) == 1) instance_create(x + 8, y - 8, oGoldBars);
  else if (rand(1, 6) == 1) instance_create(x + 8, y - 4, oEmeraldBig);
  else if (rand(1, 8) == 1) instance_create(x + 8, y - 4, oSapphireBig);
  else if (rand(1, 10) == 1) instance_create(x + 8, y - 4, oRubyBig);
} // tunnel
else if (
  !colStuff &&
  collision_point(x - 16, y - 16, oSolid, 0, 0) &&
  collision_point(x + 16, y - 16, oSolid, 0, 0)
) {
  n = 60;
  if (distance_to_object(oGiantSpider < 100)) n = 10;
  if (global.levelType != 2 && rand(1, n) == 1)
    instance_create(x, y - 16, oWeb);
  else if (rand(1, 4) == 1) instance_create(x + 8, y - 4, oGoldBar);
  else if (rand(1, 8) == 1) instance_create(x + 8, y - 8, oGoldBars);
  else if (rand(1, 80 - global.currLevel) <= 1 + arguments[0]) {
    if (rand(1, 8) == 1) instance_create(x, y - 16, oFakeBones);
    else {
      instance_create(x, y - 16, oBones);
      instance_create(x + 12, y - 4, oSkull);
    }
  } else if (rand(1, 8) == 1) instance_create(x + 8, y - 4, oEmeraldBig);
  else if (rand(1, 9) == 1) instance_create(x + 8, y - 4, oSapphireBig);
  else if (rand(1, 10) == 1) instance_create(x + 8, y - 4, oRubyBig);
} // normal
else if (
  !collision_point(x, y - 16, oSolid, 0, 0) &&
  !collision_point(x, y - 8, oChest, 0, 0) &&
  !collision_point(x, y - 8, oSpikes, 0, 0) &&
  !collision_point(x, y - 8, oEntrance, 0, 0) &&
  !collision_point(x, y - 8, oExit, 0, 0)
) {
  if (rand(1, 40) == 1) instance_create(x + 8, y - 4, oGoldBar);
  else if (rand(1, 50) == 1) instance_create(x + 8, y - 8, oGoldBars);
  else if (rand(1, 140 - 2 * global.currLevel) <= 1 + arguments[0]) {
    if (rand(1, 8) == 1) instance_create(x, y - 16, oFakeBones);
    else {
      instance_create(x, y - 16, oBones);
      instance_create(x + 12, y - 4, oSkull);
    }
  }
}
