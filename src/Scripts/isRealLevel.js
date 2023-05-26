//
// isRealLevel()
//
// Checks if you are in a non-custom level.  (Only used for stat-checking atm.)
//

if (
  isRoom('rLevel') ||
  isRoom('rLevel2') ||
  isRoom('rLevel3') ||
  isRoom('rOlmec')
)
  return true;
return false;
