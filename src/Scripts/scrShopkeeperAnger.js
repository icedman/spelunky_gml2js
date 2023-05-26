//
// scrShopkeeperAnger(message)
//
// Make the nearest shopkeeper angry.  RAWR!
//

shp = instance_nearest(x, y, oShopkeeper);
if (shp) {
  if (!shp.dead && !shp.angered) {
    shp.status = 2;
    if (global.murderer) global.message = "YOU'LL PAY FOR YOUR CRIMES!";
    else if (arguments[0] == 0) global.message = 'COME BACK HERE, THIEF!';
    else if (arguments[0] == 1) global.message = 'DIE, YOU VANDAL!';
    else if (arguments[0] == 2) global.message = 'TERRORIST!';
    else if (arguments[0] == 3) global.message = 'HEY, ONLY I CAN DO THAT!';
    else global.message = "NOW I'M REALLY STEAMED!";
    global.message2 = '';
    global.messageTimer = 80;
    if (global.thiefLevel > 0) global.thiefLevel += 3;
    else global.thiefLevel += 2;
  }
}
