//
// scrEntityGen()
//
// Generates enemies, traps, && treasure.
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

// Note: depth of trees, statues is 9005

global.LockedChest = false;
global.Key = false;
global.lockedChestChance = 8;

if (global.levelType == 0)
{
    global.giantSpider = false;
    global.genGiantSpider = false;
    if (rand(1,6) == 1) global.genGiantSpider = true;
[instances_of(oSolid)].forEach(($) => { with($)

    {
        if (!isInShop(x, y) && y > 16)
        {
            if (type != "Altar")
            {
                scrTreasureGen();
            }
        
            // enemies
            if (scrGetRoomX(x) != global.startRoomX || scrGetRoomY(y-16) != global.startRoomY)
            {
                if (y < room_height - 64 && 
                    !collision_point(x, y+16, oSolid, 0, 0) && ! collision_point(x, y+32, oSolid, 0, 0) &&
                    !collision_point(x, y+16, oWater, 0, 0) && ! collision_point(x, y+32, oWater, 0, 0) &&
                    !collision_point(x, y+16, oEnemy, 0, 0))
                {
                    if (global.genGiantSpider &&
                        !global.giantSpider &&
                        !collision_point(x+16, y+16, oSolid, 0, 0) &&
                        !collision_point(x+16, y+32, oSolid, 0, 0) &&
                        rand(1,40) == 1)
                    {
                        instance_create(x, y+16, oGiantSpiderHang);
                        global.giantSpider = true;
                    }
                    else if (global.darkLevel && rand(1,60) == 1) instance_create(x, y+16, oLamp);
                    else if (global.darkLevel && rand(1,40) == 1) instance_create(x, y+16, oScarab);
                    else if (rand(1,60) == 1) instance_create(x, y+16, oBat);
                    else if (rand(1,80) == 1) instance_create(x, y+16, oSpiderHang);
                }
            
                if (!collision_point(x, y-16, oSolid, 0, 0))
                {
                    if (rand(1,60) == 1) instance_create(x, y-16, oSnake);
                    else if (rand(1,800) == 1) instance_create(x, y-16, oCaveman);
                }
            }
        }
}})

    
    // force generate chest
    if (global.genUdjatEye && ! global.LockedChest)
    {
[instances_of(oExit)].forEach(($) => { with($)

        {
            if (!collision_point(x-8, y, oSolid, 0, 0) &&
                !collision_point(x-8, y+15, oTreasure, 0, 0) &&
                !collision_point(x-8, y+8, oChest, 0, 0) &&
                !collision_point(x-8, y+8, oSpikes, 0, 0))
            {
                instance_create(x-8, y+8, oLockedChest);
                global.LockedChest = true;
                break;
            }
            else if (!collision_point(x+8, y, oSolid, 0, 0) &&
                     !collision_point(x+8, y+15, oTreasure, 0, 0) &&
                     !collision_point(x+8, y+8, oChest, 0, 0) &&
                     !collision_point(x+8, y+8, oSpikes, 0, 0))
            {
                instance_create(x+16+8, y+8, oLockedChest);
                global.LockedChest = true;
                break;
            }
            else
            {
                instance_create(x+8, y+8, oLockedChest);
                global.LockedChest = true;
                break;
            }
}})

    }
    
    // generate key if locked chest has been generated
    if (instance_exists(oLockedChest))
    {
        n = 1;
        while (n < 8 && global.Key == false)
        {
[instances_of(oTreasure)].forEach(($) => { with($)

            {
                if (rand(1,8) <= 1 && ! collision_point(x, y, oSolid, 0, 0) && global.Key == false)
                {
                    if (type == "Gold Bars") instance_create(x, y+4, oKey);
                    else instance_create(x, y, oKey);
                    global.Key = true;
                    instance_destroy();
                    break;
                }
}})

            n += 1;
        }
        if (!global.Key)
        {
[instances_of(oTreasure)].forEach(($) => { with($)

            {
                if (!collision_point(x, y, oSolid, 0, 0))
                {
                    if (type == "Gold Bars") instance_create(x, y+4, oKey);
                    else instance_create(x, y, oKey);
                    global.Key = true;
                    instance_destroy();
                    break;
                }
}})

        }
    }
    
    if (global.Key) global.madeUdjatEye = true;
    
[instances_of(oBlock)].forEach(($) => { with($)

    {
        if (!isInShop(x, y))
        {
            n = point_distance(x, y, oEntrance.x, oEntrance.y);
            if (!isInShop(x, y) &&
                rand(1,4) == 1 && !
                (y == oEntrance.y && n < 144) &&
                n > 48)
            {
                if (collision_point(x+16, y, oSolid, 0, 0) && !
                    collision_rectangle(x-32, y, x-1, y+15, oSolid, 0, 0))
                {
                    if (global.darkLevel) instance_create(x, y, oArrowTrapLeftLit);
                    else instance_create(x, y, oArrowTrapLeft);
                    cleanDeath = true;
                    instance_destroy();
                }
                else if (collision_point(x-16, y, oSolid, 0, 0) && !
                    collision_rectangle(x+16, y, x+48, y+15, oSolid, 0, 0))
                {
                    if (global.darkLevel) instance_create(x, y, oArrowTrapRightLit);
                    else instance_create(x, y, oArrowTrapRight);
                    cleanDeath = true;
                    instance_destroy();
                }
            }
        }
}})

}
else if (global.levelType == 1)
{
    global.ashGrave = false;
    if (global.cemetary)
    {
[instances_of(oLush)].forEach(($) => { with($)

        {
            // generate graves
            if (!collision_point(x, y-16, oSolid, 0, 0) &&
                !collision_point(x, y-16, oEntrance, 0, 0) &&
                !collision_point(x, y-16, oExit, 0, 0) &&
                rand(1,20) == 1 &&
                x != 160 && x != 176 && x != 320 && x != 336 && x != 480 && x != 496)
            {
                obj = instance_create(x, y-16, oGrave);
                if (!global.ashGrave && rand(1,40) == 1)
                {
                    obj.sprite_index = sGraveAsh;
                    obj = instance_create(x+8, y+8, oShotgun);
                    obj.cost = 0;
                    obj.orSale = false;
                    ashGrave = true;                
                }
                else if (!collision_point(x+8, y+8, oTreasure, 0, 0))
                {
                    if (rand(1,2) == 1) instance_create(x+8, y+8, oGoldNugget);
                    else if (rand(1,4) == 1) instance_create(x+8, y+8, oSapphireBig);
                    else if (rand(1,6) == 1) instance_create(x+8, y+8, oEmeraldBig);
                    else if (rand(1,8) == 1) instance_create(x+8, y+8, oRubyBig);
                }
            }
}})

    }

[instances_of(oSolid)].forEach(($) => { with($)

    {
        // bg
        if (rand(1,100) == 1 && ! collision_point(x, y-16, oSolid, 0, 0)) tile_add(bgTrees, 0, 0, 16, 48, x, y-32, 9005);
        
        if (!isInShop(x, y))
        {
        
        if (y > 32 && collision_point(x, y-16, oSolid, 0, 0) && global.genMarketEntrance && ! global.madeMarketEntrance)
        {
            obj = instance_place(x, y-16, oSolid);
            if (obj.type != "Tree" && type != "Altar" && ! obj.invincible && rand(1,global.marketChance) <= 1)
            {
                instance_create(x, y-16, oXMarket);
                invincible = true;
                global.madeMarketEntrance = true;
            }
            else global.marketChance -= 1;
        }
        else if (type != "Tree" && type != "Altar" && y != 0 &&
                 !collision_rectangle(x, y-32, x+15, y-1, oSolid, false, true) &&
                 !collision_rectangle(x, y-16, x+15, y-1, oEnemy, 0, 0) &&
                 (!collision_point(x-16, y, oSolid, 0, 0) || !collision_point(x+16, y, oSolid, 0, 0)) &&
                 collision_point(x, y+16, oSolid, 0, 0) &&
                 !collision_point(x, y, oXMarket, 0, 0) &&
                 !isInShop(x, y) &&
                 point_distance(x, y, oEntrance.x, oEntrance.y) > 64)
        {
            if (global.darkLevel && ! collision_point(x, y-32, oWater, 0, 0) && rand(1,20) == 1)
            {
                instance_create(x, y-32, oTikiTorch);
            }
            else if (rand(1,12) == 1 &&
                     x != 160 && x != 176 && x != 320 && x != 336 && x != 480 && x != 496)
            {
                if (collision_point(x, y-16, oSolid, 0, 0))
                {
                    sol = instance_nearest(x, y-16, oSolid);
[instances_of(sol)].orEach(($) => { with($)
 { cleanDeath = true; instance_destroy(); }
})
                }
                instance_create(x, y, oSpearTrapBottom);
                if (global.darkLevel) instance_create(x, y-16, oSpearTrapLit);
                else instance_create(x, y-16, oSpearTrapTop);
                cleanDeath = true;
                instance_destroy();
            }
        }
        
        if (type != "Altar")
        {
            if (global.cemetary) scrTreasureGen(10);
            else scrTreasureGen();
        }
    
        // enemies
        if (scrGetRoomX(x) != global.startRoomX || scrGetRoomY(y-16) != global.startRoomY)
        {
            if (y < room_height - 64 && 
                !collision_point(x, y+16, oSolid, 0, 0) && ! collision_point(x, y+32, oSolid, 0, 0) &&
                !collision_point(x, y+16, oWater, 0, 0) && ! collision_point(x, y+32, oWater, 0, 0))
            {
                if (global.cemetary) n = 60;
                else n = 80;
                
                if (global.darkLevel && rand(1,40) == 1) instance_create(x, y+16, oScarab);
                else if (rand(1,n) == 1) instance_create(x, y+16, oBat);
                // else if (rand(1,40) == 1) instance_create(x, y+16, oSpiderHang);
            }
            
            if (y > 16 && ! collision_point(x, y-16, oSolid, 0, 0) &&
                !collision_point(x, y, oEnemy, 0, 0) &&
                !collision_point(x, y, oSpikes, 0, 0))
            {
                if (global.cemetary)
                {
                    if (rand(1,25) == 1) instance_create(x, y-16, oZombie);
                    else if (rand(1,160) == 1) instance_create(x, y-16, oVampire);
                }
                else if (!collision_point(x, y-16, oWater, 0, 0))
                {
                    if (global.blackMarket && (y % 128 == 0)) n = 0; // to prevent mantraps from spawning near shopkeepers in black market 
                    else n = 1;
                    if (rand(1,60) == n) instance_create(x, y-16, oManTrap);
                    else if (rand(1,60) == 1) instance_create(x, y-16, oCaveman);
                    else if (rand(1,120) == 1) instance_create(x, y-16, oFireFrog);
                    else if (rand(1,30) == 1) instance_create(x, y-16, oFrog);
                }
                else if (rand(1,120) == 1) instance_create(x, y-16, oFireFrog);
                else if (rand(1,30) == 1) instance_create(x, y-16, oFrog);
            }
        }
        
        // rock
        }
}})


    // force market entrance
    if (global.genMarketEntrance && ! global.madeMarketEntrance)
    {
[instances_of(oSolid)].forEach(($) => { with($)

        {
            if (y > 32 && collision_point(x, y-16, oSolid, 0, 0))
            {
                obj = instance_place(x, y-16, oSolid);
                if (obj.type != "Tree" && type != "Altar" && ! obj.invincible)
                {
                    instance_create(x, y-16, oXMarket);
                    invincible = true;
                    global.madeMarketEntrance = true;
                }
            }
}})

    }
    
[instances_of(oVine)].forEach(($) => { with($)

    {
        if (rand(1,15) == 1) instance_create(x, y, oMonkey);
}})

    
[instances_of(oWater)].forEach(($) => { with($)

    {
        if (!collision_point(x, y, oSolid, 0, 0))
        {
            if (rand(1,30) == 1)
            {
                if (global.cemetary) instance_create(x+4, y+4, oDeadFish);
                else instance_create(x+4, y+4, oPiranha);
            }
        }
}})

}
else if (global.levelType == 2)
{
[instances_of(oSolid)].forEach(($) => { with($)

    {
        if (!isInShop(x, y))
        {
        // enemies
        n = 30;
        if (global.yetiLair) n = 90;
        
        if (scrGetRoomX(x) != global.startRoomX || scrGetRoomY(y-16) != global.startRoomY)
        {
            if (y < room_height - 64 && 
                !collision_point(x, y+16, oSolid, 0, 0) && ! collision_point(x, y+32, oSolid, 0, 0) &&
                !collision_point(x, y+16, oWater, 0, 0) && ! collision_point(x, y+32, oWater, 0, 0))
            {
                if (global.darkLevel && rand(1,40) == 1) instance_create(x, y+16, oScarab);
            }
            else if (y > 16 && y < 592 && ! collision_point(x, y-16, oSolid, 0, 0) && ! isInShop(x, y))
            {
                if (rand(1,n) == 1) instance_create(x, y-16, oUFO);
            }
        }
        
        if (y > 16 && y < 592 &&
            !collision_point(x, y-16, oSolid, 0, 0) &&
            !collision_point(x+8, y-8, oEnemy, 0, 0) &&
            !collision_point(x+8, y-1, oSpikes, 0, 0) &&
            point_distance(x, y, oEntrance.x, oEntrance.y) > 64 &&
            !isInShop(x, y))
        {
            if (rand(1,10) == 1 && sprite_index = sDark && ! collision_rectangle(x, y-64, x+15, y-1, oSolid, 0, 0) && distance_to_object(oExit) > 64) instance_create(x, y-16, oSpringTrap);
            else if (rand(1,20) == 1 && point_distance(x, y, oEntrance.x, oEntrance.y) > 64) instance_create(x, y-16, oYeti);
        }
        
        if (type != "Altar")
        {    
            scrTreasureGen();
        }
        }
}})

}
else if (global.levelType == 3)
{
    global.TombLord = false;
    global.genTombLord = false;
    if (global.currLevel == 13) global.genTombLord = true;
    else if (rand(1,4) == 1) global.genTombLord = true;
    
    global.genGoldEntrance = false;
    if (global.currLevel == 14) global.genGoldEntrance = true;
    global.madeGoldEntrance = false;

[instances_of(oSolid)].forEach(($) => { with($)

    {   
        // bg
        if (rand(1,100) == 1 && ! collision_point(x, y-16, oSolid, 0, 0)) tile_add(bgStatues, 0, 0, 16, 48, x, y-32, 9005);
    
        if (!isInShop(x, y))
        {
        
        // traps
        if (y > 32 && ! collision_point(x, y-16, oSolid, 0, 0) && global.genGoldEntrance && ! global.madeGoldEntrance)
        {
            if (rand(1,global.goldChance) == 1)
            {
                instance_create(x, y-16, oGoldDoor);
                invincible = true;
                global.madeGoldEntrance = true;
            }
            else global.goldChance -= 1;
        }
        else if (type != "Tree" && type != "Altar" && y != 0 &&
                 !collision_point(x, y-16, oSolid, 0, 0) &&
                 !collision_point(x, y-16, oLava, 0, 0) &&
                 !collision_rectangle(x, y-16, x+15, y-1, oEnemy, 0, 0) &&
                 !collision_point(x, y-32, oSolid, 0, 0) &&
                 (!collision_point(x-16, y, oSolid, 0, 0) || !collision_point(x+16, y, oSolid, 0, 0)) &&
                 collision_point(x, y+16, oSolid, 0, 0) &&
                 !isInShop(x, y) &&
                 x != 160 && x != 176 && x != 320 && x != 336 && x != 480 && x != 496)
        {
            if (rand(1,12) == 1 && point_distance(x, y, oEntrance.x, oEntrance.y) > 64)
            {
                // to keep the spear trap from plugging up lava passage
                if (collision_point(x-16, y-32, oSolid, 0, 0) && collision_point(x+16, y-32, oSolid, 0, 0) &&
                    !collision_point(x, y-32, oSolid, 0, 0))
                {
                    // do nothing
                }
                else
                {
                    if (collision_point(x, y-16, oSolid, 0, 0))
                    {
                        sol = instance_nearest(x, y-16, oSolid);
[instances_of(sol)].orEach(($) => { with($)
 { cleanDeath = true; instance_destroy(); }
})
                    }
                    instance_create(x, y, oSpearTrapBottom);
                    if (global.darkLevel) instance_create(x, y-16, oSpearTrapLit);
                    else instance_create(x, y-16, oSpearTrapTop);
                    cleanDeath = true;
                    instance_destroy();
                }
            }
        }
    
        // enemies
        if (y < room_height - 64 && 
                !collision_point(x, y+16, oSolid, 0, 0) && ! collision_point(x, y+32, oSolid, 0, 0) &&
                !collision_point(x, y+16, oWater, 0, 0) && ! collision_point(x, y+32, oWater, 0, 0))
        {
            if (global.darkLevel && rand(1,40) == 1) instance_create(x, y+16, oScarab);
        }

        if (scrGetRoomX(x) != global.startRoomX || scrGetRoomY(y-16) != global.startRoomY &&
            !collision_point(x, y-16, oEnemy, 0, 0))
        {         
            if (y > 16 && ! collision_point(x, y-16, oSolid, 0, 0))
            {
                if (global.genTombLord &&
                    !global.TombLord &&
                    !collision_rectangle(x, y-32, x+32, y-1, oSolid, 0, 0) &&
                    rand(1,40) == 1)
                {
                    instance_create(x, y-32, oTombLord);
                    global.TombLord = true;
                }
                else if (rand(1,40) == 1) instance_create(x, y-16, oCaveman);
                else if (rand(1,40) == 1) instance_create(x, y-16, oHawkman);
                else if (rand(1,60) == 1)
                {
                    if (global.darkLevel) instance_create(x, y-16, oSmashTrapLit);
                    else instance_create(x, y-16, oSmashTrap);
                }
            }
        }
        
        if (type != "Altar")
        {       
            scrTreasureGen();
        }
        }
}})

    
    // force generate TombLord
    if (global.currLevel == 13 && global.genTombLord && ! global.TombLord)
    {
[instances_of(oExit)].forEach(($) => { with($)

        {
        if (!collision_rectangle(x, y-32, x+32, y-1, oSolid, 0, 0))
            {
            instance_create(x, y-32, oTombLord);
            }
        else
            {
            instance_create(x, y-64, oTombLord);
            }
        global.TombLord = true;
}})

    }
    
    // force generate gold door
    if (global.genGoldEntrance && ! global.madeGoldEntrance)
    {
[instances_of(oSolid)].forEach(($) => { with($)

        {
            if (y > 32 && ! collision_point(x, y-16, oSolid, 0, 0))
            {
                instance_create(x, y-16, oGoldDoor);
                invincible = true;
                global.madeGoldEntrance = true;
                break;
            }
}})

    }
    
[instances_of(oBlock)].forEach(($) => { with($)

    {   
        if (!isInShop(x, y))
        {
            n = point_distance(x, y, oEntrance.x, oEntrance.y);
            if (!isInShop(x, y) &&
                rand(1,3) == 1 && !
                (y == oEntrance.y && n < 144) &&
                n > 48)
            {
                if (collision_point(x+16, y, oSolid, 0, 0) && !
                    collision_rectangle(x-32, y, x-1, y+15, oSolid, 0, 0))
                {
                    if (global.darkLevel) instance_create(x, y, oArrowTrapLeftLit);
                    else instance_create(x, y, oArrowTrapLeft);
                    cleanDeath = true;
                    instance_destroy();
                }
                else if (collision_point(x-16, y, oSolid, 0, 0) && !
                    collision_rectangle(x+16, y, x+48, y+15, oSolid, 0, 0))
                {
                    if (global.darkLevel) instance_create(x, y, oArrowTrapRightLit);
                    else instance_create(x, y, oArrowTrapRight);
                    cleanDeath = true;
                    instance_destroy();
                }
            }
        }
}})

}

// add box of flares to dark level
if (global.darkLevel)
{
[instances_of(oEntrance)].forEach(($) => { with($)

    {
        if (!collision_point(x-16, y, oSolid, 0, 0))
        {
            instance_create(x-16+8, y+8, oFlareCrate);
        }
        else if (!collision_point(x+16, y, oSolid, 0, 0))
        {
            instance_create(x+16+8, y+8, oFlareCrate);
        }
        else
        {
            instance_create(x+8, y+8, oFlareCrate);
        }
}})

}

global.cleanSolids = false;

