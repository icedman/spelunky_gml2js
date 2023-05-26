//
// isLevel()
//
// Checks if you are in a level.
//

if (
  isRoom('rTutorial') ||
  isRoom('rLoadLevel') ||
  isRoom('rLevel') ||
  isRoom('rLevel2') ||
  isRoom('rLevel3') ||
  isRoom('rOlmec')
)
  return true;
return false;
