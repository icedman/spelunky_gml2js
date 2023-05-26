if (instance_exists(oLoadLevel)) {
  if (oLoadLevel.music == 'LUSH') {
    playMusic(global.musLush, true);
    SS_SetSoundVol(global.musLush, 2000 + 8000 * (global.musicVol / 18));
    SS_SetSoundFreq(global.musLush, 44100);
  } else if (oLoadLevel.music == 'ICE') {
    playMusic(global.musIce, true);
    SS_SetSoundVol(global.musIce, 2000 + 8000 * (global.musicVol / 18));
    SS_SetSoundFreq(global.musIce, 44100);
  } else if (oLoadLevel.music == 'TEMPLE') {
    playMusic(global.musTemple, true);
    SS_SetSoundVol(global.musTemple, 2000 + 8000 * (global.musicVol / 18));
    SS_SetSoundFreq(global.musTemple, 44100);
  } else if (oLoadLevel.music == 'BOSS') {
    if (oPlayer1.active) {
      playMusic(global.musBoss, true);
      SS_SetSoundVol(global.musBoss, 2000 + 8000 * (global.musicVol / 18));
      SS_SetSoundFreq(global.musBoss, 44100);
    }
  } else {
    playMusic(global.musCave, true);
    SS_SetSoundVol(global.musCave, 2000 + 8000 * (global.musicVol / 18));
    SS_SetSoundFreq(global.musCave, 44100);
  }
} else if (isLevel()) {
  if (isRoom('rOlmec')) {
    if (oPlayer1.active) {
      playMusic(global.musBoss, true);
      SS_SetSoundVol(global.musBoss, 2000 + 8000 * (global.musicVol / 18));
      SS_SetSoundFreq(global.musBoss, 44100);
    }
  } else if (global.levelType == 1) {
    playMusic(global.musLush, true);
    SS_SetSoundVol(global.musLush, 2000 + 8000 * (global.musicVol / 18));
    SS_SetSoundFreq(global.musLush, 44100);
  } else if (global.levelType == 2) {
    playMusic(global.musIce, true);
    SS_SetSoundVol(global.musIce, 2000 + 8000 * (global.musicVol / 18));
    SS_SetSoundFreq(global.musIce, 44100);
  } else if (global.levelType == 3) {
    playMusic(global.musTemple, true);
    SS_SetSoundVol(global.musTemple, 2000 + 8000 * (global.musicVol / 18));
    SS_SetSoundFreq(global.musTemple, 44100);
  } else {
    playMusic(global.musCave, true);
    SS_SetSoundVol(global.musCave, 2000 + 8000 * (global.musicVol / 18));
    SS_SetSoundFreq(global.musCave, 44100);
  }
} else if (isRoom('rTitle')) SS_StopSound(global.musTitle);
else if (isRoom('rSun') || isRoom('rMoon') || isRoom('rStars')) {
  playMusic(global.musBoss, true);
  SS_SetSoundVol(global.musBoss, 2000 + 8000 * (global.musicVol / 18));
  SS_SetSoundFreq(global.musBoss, 44100);
}
