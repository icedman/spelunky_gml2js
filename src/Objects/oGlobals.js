function oGlobals_CREATE($) {
  with ($) {
    // gamepad

    // globalvar joyid;

    joyid = 1;

    if (!joystick_exists(1) && joystick_exists(2)) joyid = 2;

    //

    global.levelSelect = 0; //DEBUG

    global.customLevel = false;
    global.testLevel = '';

    global.irstTime = false;
    global.usedShortcut = false;

    global.darkLevel = false;
    global.lake = false;

    global.music = true;
    global.message = '';
    global.message2 = '';
    global.messageTimer = 0;
    global.darknessLerp = 0;
    global.hadDarkLevel = false;

    global.udjatBlink = false;
    global.udjatCounter = 0;

    global.cleanSolids = false;

    // Tunnel Man
    global.tunnel1Max = 100000;
    global.tunnel2Max = 200000;
    global.tunnel3Max = 300000;

    global.dataFile = 'scores.dat'; // path/filename to save scores
    global.tunnel1 = scrGetScore(8);
    global.tunnel2 = scrGetScore(9);

    // Minigames
    global.mini1 = 0;
    global.mini2 = 0;
    global.mini3 = 0;
    global.scoresStart = 0;
    global.isDamsel = false;
    global.isTunnelMan = false;

    // Highscores
    global.newMoney = false;
    global.newKills = false;
    global.newSaves = false;
    global.newTime = false;

    scrClearGlobals();

    //Spelunky 1.2 July 3, 2012 implementation of portable highscores. Loads old scores from registry, then saves to data file in directory
    // global.emptyHighscores is used in oImport && oTitle (doesn't allow player to import scores if none exist)
    if (
      highscore_value(1) <= 9000000 &&
      highscore_value(2) <= 8000000 &&
      highscore_value(3) <= 7000000 &&
      highscore_value(4) <= 6000000 &&
      highscore_value(5) <= 5000000 &&
      highscore_value(6) <= 4000000 &&
      highscore_value(7) <= 3000000 &&
      highscore_value(8) <= 2000000 &&
      highscore_value(9) <= 1000000
    ) {
      global.emptyHighscores = true; // no Spelunky scores found in registry
    } else global.emptyHighscores = false;

    if (!file_exists(global.dataFile)) {
      if ((global.emptyHighscores = true)) {
        scrResetHighscores();
        global.irstTime = true;
      } else {
        scrImportHighscores();
      }
    }
  }
}

class oGlobals extends oObject {
  darknessLerp;
  dataFile;
  emptyHighscores;
  hadDarkLevel;
  irstTime;
  lake;
  levelSelect;
  newKills;
  newMoney;
  newSaves;
  newTime;
  tunnel1Max;
  tunnel2Max;
  udjatBlink;
  udjatCounter;
  usedShortcut;
}
ObjType.oGlobals = oGlobals;
