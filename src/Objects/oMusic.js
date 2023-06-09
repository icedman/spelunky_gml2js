function oMusic_OTHER($) {
  with ($) {
    action_execute_script();
  }
}

function oMusic_CREATE($) {
  with ($) {
    action_execute_script();

    global.music = true;

    global.musTitle = SS_LoadSound('sound/title.ogg', 1);
    global.musCave = SS_LoadSound('sound/cave.ogg', 1);
    global.musLush = SS_LoadSound('sound/lush.ogg', 1);
    global.musIce = SS_LoadSound('sound/ice.ogg', 1);
    global.musTemple = SS_LoadSound('sound/temple.ogg', 1);
    global.musBoss = SS_LoadSound('sound/boss.ogg', 1);
    global.musVictory = SS_LoadSound('sound/victory.ogg', 1);
    global.musCredits = SS_LoadSound('sound/credits.ogg', 1);

    global.sndIgnite = SS_LoadSound('sound/ignite.wav', 0);
    global.sndTeleport = SS_LoadSound('sound/teleport.wav', 0);
    global.sndJetpack = SS_LoadSound('sound/jetpack.wav', 0);
    global.sndWhip = SS_LoadSound('sound/whip.wav', 0);
    global.sndJump = SS_LoadSound('sound/jump.wav', 0);
    global.sndThrow = SS_LoadSound('sound/throw.wav', 0);
    global.sndClimb1 = SS_LoadSound('sound/climb1.wav', 0);
    global.sndClimb2 = SS_LoadSound('sound/climb2.wav', 0);
    global.sndShotgun = SS_LoadSound('sound/shotgun.wav', 0);
    global.sndBowPull = SS_LoadSound('sound/bowpull.wav', 0);
    global.sndSteps = SS_LoadSound('sound/steps.wav', 0);
    global.sndBlink1 = SS_LoadSound('sound/blink1.wav', 0);
    global.sndBlink2 = SS_LoadSound('sound/blink2.wav', 0);
    global.sndHit = SS_LoadSound('sound/hit.wav', 0);
    global.sndHurt = SS_LoadSound('sound/hurt.wav', 0);
    global.sndDie = SS_LoadSound('sound/die.wav', 0);
    global.sndCoin = SS_LoadSound('sound/coin.wav', 0);
    global.sndGem = SS_LoadSound('sound/gem.wav', 0);
    global.sndPickup = SS_LoadSound('sound/pickup.wav', 0);
    global.sndChestOpen = SS_LoadSound('sound/chestopen.wav', 0);
    global.sndPush = SS_LoadSound('sound/push.wav', 0);
    global.sndMattockBreak = SS_LoadSound('sound/mattockbreak.wav', 0);
    global.sndTrap = SS_LoadSound('sound/trap.wav', 0);
    global.sndClick = SS_LoadSound('sound/click.wav', 0);
    global.sndBreak = SS_LoadSound('sound/break.wav', 0);
    global.sndThud = SS_LoadSound('sound/thud.wav', 0);
    global.sndThump = SS_LoadSound('sound/thump.wav', 0);
    global.sndCrunch = SS_LoadSound('sound/crunch.wav', 0);
    global.sndSplash = SS_LoadSound('sound/splash.wav', 0);
    global.sndFlame = SS_LoadSound('sound/flame.wav', 0);
    global.sndExplosion = SS_LoadSound('sound/explosion.wav', 0);
    global.sndArrowTrap = SS_LoadSound('sound/arrowtrap.wav', 0);
    global.sndBoing = SS_LoadSound('sound/boing.wav', 0);
    global.sndDamsel = SS_LoadSound('sound/damsel.wav', 0);
    global.sndKiss = SS_LoadSound('sound/kiss.wav', 0);
    global.sndGhost = SS_LoadSound('sound/ghost.wav', 0);
    global.sndBat = SS_LoadSound('sound/bat.wav', 0);
    global.sndGiantSpider = SS_LoadSound('sound/giantspider.wav', 0);
    global.sndSpiderJump = SS_LoadSound('sound/spiderjump.wav', 0);
    global.sndFrog = SS_LoadSound('sound/frog.wav', 0);
    global.sndZombie = SS_LoadSound('sound/zombie.wav', 0);
    global.sndMonkey = SS_LoadSound('sound/monkey.wav', 0);
    global.sndAlert = SS_LoadSound('sound/alert.wav', 0);
    global.sndCavemanDie = SS_LoadSound('sound/cavemandie.wav', 0);
    global.sndAlien = SS_LoadSound('sound/alien.wav', 0);
    global.sndLaser = SS_LoadSound('sound/laser.wav', 0);
    global.sndLaserCharge = SS_LoadSound('sound/lasercharge.wav', 0);
    global.sndSmallExplode = SS_LoadSound('sound/smallexplode.wav', 0);
    global.sndPsychic = SS_LoadSound('sound/psychic.wav', 0);
    global.sndYetiYell = SS_LoadSound('sound/yetiyell.wav', 0);
    global.sndBigJump = SS_LoadSound('sound/bigjump.wav', 0);
    global.sndSlam = SS_LoadSound('sound/slam.wav', 0);
    global.sndPFall = SS_LoadSound('sound/pfall.wav', 0);
    global.sndTFall = SS_LoadSound('sound/tfall.wav', 0);
  }
}

class oMusic extends oObject {
  musIce;
  musLush;
  musTemple;
  musTitle;
  sndBlink1;
  sndBlink2;
  sndIgnite;
  sndJetpack;
  sndPFall;
  sndPush;
  visible = false;
}
ObjType.oMusic = oMusic;
