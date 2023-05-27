function oSlash_OTHER($) {
  with ($) {
    instance_destroy();
  }
}

function oSlash_STEP($) {
  with ($) {
    if (instance_number(oCharacter) == 0) {
      instance_destroy();
    }
    if (sprite_index == sSlashRight) {
      x = oCharacter.x + 16;
      y = oCharacter.y;
    } else if ((sprite_index = sSlashLeft)) {
      x = oCharacter.x - 16;
      y = oCharacter.y;
    }
  }
}

function oSlash_CREATE($) {
  with ($) {
    try {
      oWhip_CREATE($);
    } catch (err) {}

    type = 'Machete';
    damage = 2;
    image_speed = 1;
    puncture = true;
  }
}

class oSlash extends oWhip {}
