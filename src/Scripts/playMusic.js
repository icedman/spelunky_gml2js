if (global.music && !SS_IsSoundPlaying(arguments[0])) {
  if (arguments[1]) SS_LoopSound(arguments[0]);
  else SS_PlaySound(arguments[0]);
}
