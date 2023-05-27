function oPlayer1_ALARM_0($) {
  with ($) {
    /*
This script should be placed in the step event for the platform character.
It updates the keys used by the character, moves all of the solids, moves the
character, sets the sprite index, and sets the animation speed for the sprite.
*/
    hangCountMax = 3;

    //////////////////////////////////////
    // KEYS
    //////////////////////////////////////

    kLeft = checkLeft();

    if (kLeft) kLeftPushedSteps += 1;
    else kLeftPushedSteps = 0;

    kLeftPressed = checkLeftPressed();
    kLeftReleased = checkLeftReleased();

    kRight = checkRight();

    if (kRight) kRightPushedSteps += 1;
    else kRightPushedSteps = 0;

    kRightPressed = checkRightPressed();
    kRightReleased = checkRightReleased();

    kUp = checkUp();
    kDown = checkDown();

    //key "run"
    if (canRun) kRun = 0;
    // kRun=runKey
    else kRun = 0;

    kJump = checkJump();
    kJumpPressed = checkJumpPressed();
    kJumpReleased = checkJumpReleased();

    if (cantJump > 0) {
      kJump = 0;
      kJumpPressed = 0;
      kJumpReleased = 0;
      cantJump -= 1;
    } else {
      if (global.isTunnelMan && sprite_index == sTunnelAttackL && !holdItem) {
        kJump = 0;
        kJumpPressed = 0;
        kJumpReleased = 0;
        cantJump -= 1;
      }
    }

    kAttack = checkAttack();
    kAttackPressed = checkAttackPressed();
    kAttackReleased = checkAttackReleased();

    kItemPressed = checkItemPressed();

    xPrev = x;
    yPrev = y;

    if (stunned || dead) {
      kLeft = false;
      kLeftPressed = false;
      kLeftReleased = false;
      kRight = false;
      kRightPressed = false;
      kRightReleased = false;
      kUp = false;
      kDown = false;
      kJump = false;
      kJumpPressed = false;
      kJumpReleased = false;
      kAttack = false;
      kAttackPressed = false;
      kAttackReleased = false;
      kItemPressed = false;
    }

    //////////////////////////////////////////
    // Collisions
    //////////////////////////////////////////

    colSolidLeft = false;
    colSolidRight = false;
    colLeft = false;
    colRight = false;
    colTop = false;
    colBot = false;
    colLadder = false;
    colPlatBot = false;
    colPlat = false;
    colWaterTop = false;
    colIceBot = false;
    runKey = false;
    if (isCollisionMoveableSolidLeft(1)) colSolidLeft = true;
    if (isCollisionMoveableSolidRight(1)) colSolidRight = true;
    if (isCollisionLeft(1)) colLeft = true;
    if (isCollisionRight(1)) colRight = true;
    if (isCollisionTop(1)) colTop = true;
    if (isCollisionBottom(1)) colBot = true;
    if (isCollisionLadder()) colLadder = true;
    if (isCollisionPlatformBottom(1)) colPlatBot = true;
    if (isCollisionPlatform()) colPlat = true;
    if (isCollisionWaterTop(1)) colWaterTop = true;
    if (collision_point(x, y + 8, oIce, 0, 0)) colIceBot = true;
    if (checkRun()) {
      runHeld = 100;
      runKey = true;
    }

    if (checkAttack() && !whipping) {
      runHeld += 1;
      runKey = true;
    }

    if (!runKey || (!kLeft && !kRight)) runHeld = 0;

    // allows the character to run left && right
    // if state!=DUCKING && state!=LOOKING_UP && state!=CLIMBING
    if (state != CLIMBING && state != HANGING) {
      if (kLeftReleased && approximatelyZero(xVel)) xAcc -= 0.5;
      if (kRightReleased && approximatelyZero(xVel)) xAcc += 0.5;

      if (kLeft && !kRight) {
        if (colSolidLeft) {
          // xVel = 3;
          if (platformCharacterIs(ON_GROUND) && state != DUCKING) {
            xAcc -= 1;
            pushTimer += 10;
            //if (!SS_IsSoundPlaying(global.sndPush)) playSound(global.sndPush);
          }
        } else if (
          kLeftPushedSteps > 2 &&
          (facing == LEFT || approximatelyZero(xVel))
        ) {
          xAcc -= runAcc;
        }
        facing = LEFT;
        //if (platformCharacterIs(ON_GROUND) && abs(xVel) > 0 && alarm[3] < 1) alarm[3] = floor(16/-xVel);
      }

      if (kRight && !kLeft) {
        if (colSolidRight) {
          // xVel = 3;
          if (platformCharacterIs(ON_GROUND) && state != DUCKING) {
            xAcc += 1;
            pushTimer += 10;
            //if (!SS_IsSoundPlaying(global.sndPush)) playSound(global.sndPush);
          }
        } else if (
          (kRightPushedSteps > 2 || colSolidLeft) &&
          (facing == RIGHT || approximatelyZero(xVel))
        ) {
          xAcc += runAcc;
        }
        facing = RIGHT;
        //if ((platformCharacterIs(ON_GROUND) && abs(xVel) > 0 && alarm[3] < 1)) alarm[3] = floor(16/xVel);
      }
    }

    /******************************************

  LADDERS
  
*******************************************/

    if (state == CLIMBING) {
      if (instance_exists(oCape)) {
        oCape.open = false;
      }
      kJumped = false;
      ladderTimer = 10;
      ladder = collision_point(x, y, oLadder, 0, 0);
      if (ladder != null) x = ladder.x + 8;

      if (kLeft) facing = LEFT;
      else if (kRight) facing = RIGHT;
      if (kUp) {
        if (
          collision_point(x, y - 8, oLadder, 0, 0) ||
          collision_point(x, y - 8, oLadderTop, 0, 0)
        ) {
          yAcc -= climbAcc;
          if (alarm[2] < 1) alarm[2] = 8;
        }
      } else if (kDown) {
        if (
          collision_point(x, y + 8, oLadder, 0, 0) ||
          collision_point(x, y + 8, oLadderTop, 0, 0)
        ) {
          yAcc += climbAcc;
          if (alarm[2] < 1) alarm[2] = 8;
        } else state = FALLING;
        if (colBot) state = STANDING;
      }

      if (kJumpPressed && !whipping) {
        if (kLeft) xVel = -departLadderXVel;
        else if (kRight) xVel = departLadderXVel;
        else xVel = 0;
        yAcc += departLadderYVel;
        state = JUMPING;
        jumpButtonReleased = false;
        jumpTime = 0;
        ladderTimer = 5;
      }
    } else {
      if (ladderTimer > 0) ladderTimer -= 1;
    }

    if (platformCharacterIs(IN_AIR) && state != HANGING) {
      yAcc += gravityIntensity;
    }

    // Player has landed
    if ((colBot || colPlatBot) && platformCharacterIs(IN_AIR) && yVel >= 0) {
      if (!colPlat || colBot) {
        yVel = 0;
        yAcc = 0;
        state = RUNNING;
        jumps = 0;
      }
      //playSound(global.sndLand);
    }
    if ((colBot || colPlatBot) && !colPlat) yVel = 0;

    // Player has just walked off of the edge of a solid
    if (!colBot && (!colPlatBot || colPlat) && platformCharacterIs(ON_GROUND)) {
      state = FALLING;
      yAcc += grav;
      kJumped = true;
      if (global.hasGloves) hangCount = 5;
    }

    if (colTop) {
      if (dead || stunned) yVel = -yVel * 0.8;
      else if (state == JUMPING) yVel = abs(yVel * 0.3);
    }

    if ((colLeft && facing == LEFT) || (colRight && facing == RIGHT)) {
      if (dead || stunned) xVel = -xVel * 0.5;
      else xVel = 0;
    }

    /******************************************

  JUMPING
  
*******************************************/

    if (kJumpReleased && platformCharacterIs(IN_AIR)) {
      kJumped = true;
    } else if (platformCharacterIs(ON_GROUND)) {
      oCape.open = false;
      kJumped = false;
    }

    if (kJumpPressed && collision_point(x, y, oWeb, 0, 0)) {
      obj = instance_place(x, y, oWeb);
      obj.life -= 1;
      yAcc += initialJumpAcc * 2;
      yVel -= 3;
      xAcc += xVel / 2;

      state = JUMPING;
      jumpButtonReleased = false;
      jumpTime = 0;

      grav = gravNorm;
    } else if (kJumpPressed && colWaterTop) {
      yAcc += initialJumpAcc * 2;
      yVel -= 3;
      xAcc += xVel / 2;

      state = JUMPING;
      jumpButtonReleased = false;
      jumpTime = 0;

      grav = gravNorm;
    } else if (
      global.hasCape &&
      kJumpPressed &&
      kJumped &&
      platformCharacterIs(IN_AIR)
    ) {
      if (!oCape.open) oCape.open = true;
      else oCape.open = false;
    } else if (
      global.hasJetpack &&
      kJump &&
      kJumped &&
      platformCharacterIs(IN_AIR) &&
      jetpackFuel > 0
    ) {
      yAcc += initialJumpAcc;
      yVel = -1;
      jetpackFuel -= 1;
      if (alarm[10] < 1) alarm[10] = 3;

      state = JUMPING;
      jumpButtonReleased = false;
      jumpTime = 0;

      grav = 0;
    } else if (
      platformCharacterIs(ON_GROUND) &&
      kJumpPressed &&
      fallTimer == 0
    ) {
      if (xVel > 3 || xVel < -3) {
        yAcc += initialJumpAcc * 2;
        xAcc += xVel * 2;
      } else {
        yAcc += initialJumpAcc * 2;
        xAcc += xVel / 2;
      }

      if (global.hasJordans) {
        yAcc *= 3;
        yAccLimit = 12;
        grav = 0.5;
      } else if (global.hasSpringShoes) yAcc *= 1.5;
      else {
        yAccLimit = 6;
        grav = gravNorm;
      }

      playSound(global.sndJump);

      pushTimer = 0;

      // the "state" gets changed to JUMPING later on in the code
      state = FALLING;
      // "variable jumping" states
      jumpButtonReleased = false;
      jumpTime = 0;
    }

    if (jumpTime < jumpTimeTotal) jumpTime += 1;
    //let the character continue to jump
    if (kJump == 0) jumpButtonReleased = true;
    if (jumpButtonReleased) jumpTime = jumpTimeTotal;

    gravityIntensity = (jumpTime / jumpTimeTotal) * grav;

    if (kUp && platformCharacterIs(ON_GROUND) && !colLadder) {
      looking = UP;
      if (xVel == 0 && xAcc == 0) state = LOOKING_UP;
    } else looking = 0;

    if (!kUp && state == LOOKING_UP) {
      state = STANDING;
    }

    /******************************************

  HANGING
  
*******************************************/

    if (!colTop) {
      if (global.hasGloves && yVel > 0) {
        if (
          hangCount == 0 &&
          y > 16 &&
          !platformCharacterIs(ON_GROUND) &&
          kRight &&
          colRight &&
          (collision_point(x + 9, y - 5, oSolid, 0, 0) ||
            collision_point(x + 9, y - 6, oSolid, 0, 0))
        ) {
          state = HANGING;
          move_snap(1, 8);
          yVel = 0;
          yAcc = 0;
          grav = 0;
        } else if (
          hangCount == 0 &&
          y > 16 &&
          !platformCharacterIs(ON_GROUND) &&
          kLeft &&
          colLeft &&
          (collision_point(x - 9, y - 5, oSolid, 0, 0) ||
            collision_point(x - 9, y - 6, oSolid, 0, 0))
        ) {
          state = HANGING;
          move_snap(1, 8);
          yVel = 0;
          yAcc = 0;
          grav = 0;
        }
      } else if (
        hangCount == 0 &&
        y > 16 &&
        !platformCharacterIs(ON_GROUND) &&
        kRight &&
        colRight &&
        (collision_point(x + 9, y - 5, oTree, 0, 0) ||
          collision_point(x + 9, y - 6, oTree, 0, 0))
      ) {
        state = HANGING;
        move_snap(1, 8);
        yVel = 0;
        yAcc = 0;
        grav = 0;
      } else if (
        hangCount == 0 &&
        y > 16 &&
        !platformCharacterIs(ON_GROUND) &&
        kLeft &&
        colLeft &&
        (collision_point(x - 9, y - 5, oTree, 0, 0) ||
          collision_point(x - 9, y - 6, oTree, 0, 0))
      ) {
        state = HANGING;
        move_snap(1, 8);
        yVel = 0;
        yAcc = 0;
        grav = 0;
      } else if (
        hangCount == 0 &&
        y > 16 &&
        !platformCharacterIs(ON_GROUND) &&
        kRight &&
        colRight &&
        (collision_point(x + 9, y - 5, oSolid, 0, 0) ||
          collision_point(x + 9, y - 6, oSolid, 0, 0)) &&
        !collision_point(x + 9, y - 9, oSolid, 0, 0) &&
        !collision_point(x, y + 9, oSolid, 0, 0)
      ) {
        state = HANGING;
        move_snap(1, 8);
        yVel = 0;
        yAcc = 0;
        grav = 0;
      } else if (
        hangCount == 0 &&
        y > 16 &&
        !platformCharacterIs(ON_GROUND) &&
        kLeft &&
        colLeft &&
        (collision_point(x - 9, y - 5, oSolid, 0, 0) ||
          collision_point(x - 9, y - 6, oSolid, 0, 0)) &&
        !collision_point(x - 9, y - 9, oSolid, 0, 0) &&
        !collision_point(x, y + 9, oSolid, 0, 0)
      ) {
        state = HANGING;
        move_snap(1, 8);
        yVel = 0;
        yAcc = 0;
        grav = 0;
      }

      if (
        hangCount == 0 &&
        y > 16 &&
        !platformCharacterIs(ON_GROUND) &&
        state == FALLING &&
        (collision_point(x, y - 5, oArrow, 0, 0) ||
          collision_point(x, y - 6, oArrow, 0, 0)) &&
        !collision_point(x, y - 9, oArrow, 0, 0) &&
        !collision_point(x, y + 9, oArrow, 0, 0)
      ) {
        obj = instance_nearest(x, y - 5, oArrow);
        if (obj.stuck) {
          state = HANGING;
          // move_snap(1, 8);
          yVel = 0;
          yAcc = 0;
          grav = 0;
        }
      }

      /*
if (hangCount == 0 and y > 16 and !platformCharacterIs(ON_GROUND) and state == FALLING and
    (collision_point(x, y-5, oTreeBranch, 0, 0) or collision_point(x, y-6, oTreeBranch, 0, 0)) and
    not collision_point(x, y-9, oTreeBranch, 0, 0) and not collision_point(x, y+9, oTreeBranch, 0, 0))
{
  state = HANGING;
  // move_snap(1, 8);
  yVel = 0;
  yAcc = 0;
  grav = 0;
}
*/
    }

    if (hangCount > 0) hangCount -= 1;

    if (state == HANGING) {
      if (instance_exists(oCape)) oCape.open = false;
      kJumped = false;

      if (kDown && kJumpPressed) {
        grav = gravNorm;
        state = FALLING;
        yAcc -= grav;
        hangCount = 5;
        if (global.hasGloves) hangCount = 10;
      } else if (kJumpPressed) {
        grav = gravNorm;
        if ((facing == RIGHT && kLeft) || (facing == LEFT && kRight)) {
          state = FALLING;
          yAcc -= grav;
        } else {
          state = JUMPING;
          yAcc += initialJumpAcc * 2;
          if (facing == RIGHT) x -= 2;
          else x += 2;
        }
        hangCount = hangCountMax;
      }

      if (
        (facing == LEFT && !isCollisionLeft(2)) ||
        (facing == RIGHT && !isCollisionRight(2))
      ) {
        grav = gravNorm;
        state = FALLING;
        yAcc -= grav;
        hangCount = 4;
      }
    } else {
      grav = gravNorm;
    }

    // pressing down while standing
    if (kDown && platformCharacterIs(ON_GROUND) && !whipping) {
      if (colBot) {
        state = DUCKING;
      } else if (colPlatBot) {
        // climb down ladder if possible, els jump down
        fallTimer = 0;
        if (!colBot) {
          ladder = null;
          ladder = instance_place(x, y + 16, oLadder);
          if (instance_exists(oLadder)) {
            if (abs(x - (ladder.x + 8)) < 4) {
              x = ladder.x + 8;

              xVel = 0;
              yVel = 0;
              xAcc = 0;
              yAcc = 0;
              state = CLIMBING;
            }
          } else {
            y += 1;
            state = FALLING;
            yAcc += grav;
          }
        } else {
          //the character can't move down because there is a solid in the way
          state = RUNNING;
        }
      }
    }
    if (!kDown && state == DUCKING) {
      state = STANDING;
      xVel = 0;
      xAcc = 0;
    }
    if (xVel == 0 && xAcc == 0 && state == RUNNING) {
      state = STANDING;
    }
    if (xAcc != 0 && state == STANDING) {
      state = RUNNING;
    }
    if (yVel < 0 && platformCharacterIs(IN_AIR) && state != HANGING) {
      state = JUMPING;
    }
    if (yVel > 0 && platformCharacterIs(IN_AIR) && state != HANGING) {
      state = FALLING;
      setCollisionBounds(-5, -6, 5, 8);
    } else setCollisionBounds(-5, -8, 5, 8);

    // CLIMB LADDER
    colPointLadder =
      null != collision_point(x, y, oLadder, 0, 0) ||
      null != collision_point(x, y, oLadderTop, 0, 0);

    if (
      (kUp &&
        platformCharacterIs(IN_AIR) &&
        collision_point(x, y - 8, oLadder, 0, 0) &&
        ladderTimer == 0) ||
      (kUp && colPointLadder && ladderTimer == 0) ||
      (kDown &&
        colPointLadder &&
        ladderTimer == 0 &&
        platformCharacterIs(ON_GROUND) &&
        collision_point(x, y + 9, oLadderTop, 0, 0) &&
        xVel == 0)
    ) {
      ladder = null;
      ladder = instance_place(x, y - 8, oLadder);
      if (instance_exists(oLadder)) {
        if (abs(x - (ladder.x + 8)) < 4) {
          x = ladder.x + 8;
          if (
            !collision_point(x, y, oLadder, 0, 0) &&
            !collision_point(x, y, oLadderTop, 0, 0)
          ) {
            y = ladder.y + 14;
          }

          xVel = 0;
          yVel = 0;
          xAcc = 0;
          yAcc = 0;
          state = CLIMBING;
        }
      }
    }

    /*
if (sprite_index == sDuckToHangL or sprite_index == sDamselDtHL)
{
    ladder = null;
    if (facing == LEFT and collision_rectangle(x-8, y, x, y+16, oLadder, 0, 0) and not collision_point(x-4, y+16, oSolid, 0, 0))
    {
        ladder = instance_nearest(x-4, y+16, oLadder);
    }
    else if (facing == RIGHT and collision_rectangle(x, y, x+8, y+16, oLadder, 0, 0) and not collision_point(x+4, y+16, oSolid, 0, 0))
    {
        ladder = instance_nearest(x+4, y+16, oLadder);
    }
    
    if (ladder != null)
    {
        x = ladder.x + 8;

        xVel = 0;
        yVel = 0;
        xAcc = 0;
        yAcc = 0;
        state = CLIMBING;
    }
}
*/
    /*
if (colLadder and state == CLIMBING and kJumpPressed and not whipping)
{
    if (kLeft)
        xVel = -departLadderXVel;
    else if (kRight)
        xVel = departLadderXVel;
    else
        xVel = 0;
    yAcc += departLadderYVel;
    state = JUMPING;
    jumpButtonReleased = false;
    jumpTime = 0;
    ladderTimer = 5;
}
*/

    // Calculate horizontal/vertical friction
    if (state == CLIMBING) {
      xFric = frictionClimbingX;
      yFric = frictionClimbingY;
    } else {
      if (runKey && platformCharacterIs(ON_GROUND) && runHeld >= 10) {
        if (kLeft) {
          // run
          xVel -= 0.1;
          xVelLimit = 6;
          xFric = frictionRunningFastX;
        } else if (kRight) {
          xVel += 0.1;
          xVelLimit = 6;
          xFric = frictionRunningFastX;
        }
      } else if (state == DUCKING) {
        if (xVel < 2 && xVel > -2) {
          xFric = 0.2;
          xVelLimit = 3;
          image_speed = 0.8;
        } else if (kLeft && global.downToRun) {
          // run
          xVel -= 0.1;
          xVelLimit = 6;
          xFric = frictionRunningFastX;
        } else if (kRight && global.downToRun) {
          xVel += 0.1;
          xVelLimit = 6;
          xFric = frictionRunningFastX;
        } else {
          xVel *= 0.8;
          if (xVel < 0.5) xVel = 0;
          xFric = 0.2;
          xVelLimit = 3;
          image_speed = 0.8;
        }
      } else {
        //decrease the friction when the character is "flying"
        if (platformCharacterIs(IN_AIR)) {
          if (dead || stunned) xFric = 1.0;
          else xFric = 0.8;
        } else {
          xFric = frictionRunningX;
        }
      }

      // Stuck on web || underwater
      if (collision_point(x, y, oWeb, 0, 0)) {
        xFric = 0.2;
        yFric = 0.2;
        fallTimer = 0;
      } else if (collision_point(x, y, oWater, -1, -1)) {
        if (instance_exists(oCape)) oCape.open = false;

        if (state == FALLING && yVel > 0) {
          yFric = 0.5;
        } else if (!collision_point(x, y - 9, oWater, -1, -1)) {
          yFric = 1;
        } else {
          yFric = 0.9;
        }
      } else {
        swimming = false;
        yFric = 1;
      }
    }

    if (colIceBot && state != DUCKING && !global.hasSpikeShoes) {
      xFric = 0.98;
      yFric = 1;
    }

    // RUNNING

    if (platformCharacterIs(ON_GROUND)) {
      if (state == RUNNING && kLeft && colLeft) {
        pushTimer += 1;
      } else if (state == RUNNING && kRight && colRight) {
        pushTimer += 1;
      } else {
        pushTimer = 0;
      }

      if (platformCharacterIs(ON_GROUND) && !kJump && !kDown && !runKey) {
        xVelLimit = 3;
      }

      // ledge flip
      if (
        state == DUCKING &&
        abs(xVel) < 3 &&
        facing == LEFT &&
        collision_point(x, y + 9, oSolid, 0, 0) &&
        !collision_line(x - 1, y + 9, x - 10, y + 9, oSolid, 0, 0) &&
        kLeft
      ) {
        state = DUCKTOHANG;

        if (holdItem) {
          holdItem.held = false;
          if (holdItem.type == 'Gold Idol') holdItem.y -= 8;
          scrDropItem(-1, -4);
        }

        instances_of(oMonkey).forEach(($) => {
          with ($) {
            // knock off monkeys that grabbed you
            if (status == 7) {
              xVel = -1;
              yVel = -4;
              status = 1;
              vineCounter = 20;
              grabCounter = 60;
            }
          }
        });
      } else if (
        state == DUCKING &&
        abs(xVel) < 3 &&
        facing == RIGHT &&
        collision_point(x, y + 9, oSolid, 0, 0) &&
        !collision_line(x + 1, y + 9, x + 10, y + 9, oSolid, 0, 0) &&
        kRight
      ) {
        state = DUCKTOHANG;

        if (holdItem) {
          // holdItem.held = false;
          if (holdItem.type == 'Gold Idol') holdItem.y -= 8;
          scrDropItem(1, -4);
        }

        instances_of(oMonkey).forEach(($) => {
          with ($) {
            // knock off monkeys that grabbed you
            if (status == 7) {
              xVel = 1;
              yVel = -4;
              status = 1;
              vineCounter = 20;
              grabCounter = 60;
            }
          }
        });
      }
    }

    if (state == DUCKTOHANG) {
      x = xPrev;
      y = yPrev;
      xVel = 0;
      yVel = 0;
      xAcc = 0;
      yAcc = 0;
      grav = 0;
    }

    // PARACHUTE AND CAPE
    if (instance_exists(oParachute)) {
      yFric = 0.5;
    }
    if (instance_exists(oCape)) {
      if (oCape.open) yFric = 0.5;
    }

    if (pushTimer > 100) pushTimer = 100;

    // limits the acceleration if it is too extreme
    if (xAcc > xAccLimit) xAcc = xAccLimit;
    else if (xAcc < -xAccLimit) xAcc = -xAccLimit;
    if (yAcc > yAccLimit) yAcc = yAccLimit;
    else if (yAcc < -yAccLimit) yAcc = -yAccLimit;

    // applies the acceleration
    xVel += xAcc;
    if (dead || stunned) yVel += 0.6;
    else yVel += yAcc;

    // nullifies the acceleration
    xAcc = 0;
    yAcc = 0;

    // applies the friction to the velocity, now that the velocity has been calculated
    xVel *= xFric;
    yVel *= yFric;

    // apply ball && chain
    if (instance_exists(oBall)) {
      if (distance_to_object(oBall) >= 24) {
        if (xVel > 0 && oBall.x < x && abs(oBall.x - x) > 24) xVel = 0;
        if (xVel < 0 && oBall.x > x && abs(oBall.x - x) > 24) xVel = 0;
        if (yVel > 0 && oBall.y < y && abs(oBall.y - y) > 24) {
          if (abs(oBall.x - x) < 1) {
            x = oBall.x;
          } else if (oBall.x < x && !kRight) {
            if (xVel > 0) xVel *= -0.25;
            else if (xVel == 0) xVel -= 1;
          } else if (oBall.x > x && !kLeft) {
            if (xVel < 0) xVel *= -0.25;
            else if (xVel == 0) xVel += 1;
          }
          yVel = 0;
          fallTimer = 0;
        }
        if (yVel < 0 && oBall.y > y && abs(oBall.y - y) > 24) yVel = 0;
      }
    }

    // apply the limits since the velocity may be too extreme
    if (!dead && !stunned) {
      if (xVel > xVelLimit) xVel = xVelLimit;
      else if (xVel < -xVelLimit) xVel = -xVelLimit;
    }
    if (yVel > yVelLimit) yVel = yVelLimit;
    else if (yVel < -yVelLimit) yVel = -yVelLimit;

    // approximates the "active" variables
    if (approximatelyZero(xVel)) xVel = 0;
    if (approximatelyZero(yVel)) yVel = 0;
    if (approximatelyZero(xAcc)) xAcc = 0;
    if (approximatelyZero(yAcc)) yAcc = 0;

    // prepares the character to move up a hill
    // we need to use the "slopeYPrev" variable later to know the "true" y previous value
    // keep this condition the same
    if (maxSlope > 0 && platformCharacterIs(ON_GROUND) && xVel != 0) {
      slopeYPrev = y;
      for (y = y; y >= slopeYPrev - maxSlope; y -= 1) if (colTop) break;
      slopeChangeInY = slopeYPrev - y;
    } else slopeChangeInY = 0;

    // moves the character, && balances out the effects caused by other processes
    // keep this condition the same
    if (maxSlope * abs(xVel) > 0 && platformCharacterIs(ON_GROUND)) {
      // we need to check if we should dampen out the speed as the character runs on upward slopes
      xPrev = x;
      yPrev = slopeYPrev; // we don't want to use y, because y is too high
      yPrevHigh = y; // we'll use the higher previous variable later
      moveTo(xVel, yVel + slopeChangeInY);
      dist = point_distance(xPrev, yPrev, x, y); // overall distance that has been traveled
      // we should have only ran at xVel
      if (dist > abs(xVelInteger)) {
        // show_message(string(dist)+ " "+string(abs(xVelInteger)))
        excess = dist - abs(xVelInteger);
        if (xVelInteger < 0) excess *= -1;
        // move back since the character moved too far
        x = xPrev;
        y = yPrevHigh; // we need the character to be high so the character can move down
        // this time we'll move the correct distance, but we need to shorten out the xVel a little
        // these lines can be changed for different types of slowing down when running up hills
        ratio = (abs(xVelInteger) / dist) * 0.9; //can be changed
        moveTo(
          round(xVelInteger * ratio),
          round(yVelInteger * ratio + slopeChangeInY)
        );
      }
    } else {
      // we simply move xVel && yVel while in the air || on a ladder
      moveTo(xVel, yVel);
    }
    // move the character downhill if possible
    // we need to multiply maxDownSlope by the absolute value of xVel since the character normally runs at an xVel larger than 1
    if (
      !colBot &&
      maxDownSlope > 0 &&
      xVelInteger != 0 &&
      platformCharacterIs(ON_GROUND)
    ) {
      //the character is floating just above the slope, so move the character down
      upYPrev = y;
      for (y = y; y <= upYPrev + maxDownSlope; y += 1)
        if (colBot) {
          // we hit a solid below
          upYPrev = y; // I know that this doesn't seem to make sense, because of the name of the variable, but it all works out correctly after we break out of this loop
          break;
        }
      y = upYPrev;
    }

    //figures out what the sprite index of the character should be
    characterSprite();

    //sets the previous state && the previously previous state
    statePrevPrev = statePrev;
    statePrev = state;

    //calculates the image_speed based on the character's velocity
    if (state == RUNNING || state == DUCKING || state == LOOKING_UP) {
      if (state == RUNNING || state == LOOKING_UP)
        image_speed = abs(xVel) * runAnimSpeed + 0.1;
    }

    if (state == CLIMBING)
      image_speed = sqrt(sqr(abs(xVel)) + sqr(abs(yVel))) * climbAnimSpeed;
    if (xVel >= 4 || xVel <= -4) {
      image_speed = 1;
      if (platformCharacterIs(ON_GROUND)) setCollisionBounds(-8, -8, 8, 8);
      else setCollisionBounds(-5, -8, 5, 8);
    } else setCollisionBounds(-5, -8, 5, 8);
    if (whipping) image_speed = 1;
    if (state == DUCKTOHANG) {
      image_index = 0;
      image_speed = 0.8;
    }
    //limit the image_speed at 1 so the animation always looks good
    if (image_speed > 1) image_speed = 1;
  }
}

function oPlayer1_STEP($) {
  with ($) {
    // prevent player from dying on title screen
    if (isRoom('rTitle') || isRoom('rHighscores')) {
      if (global.isTunnelMan) global.plife = 2;
      else global.plife = 4;
    }

    if (global.plife > 99) global.plife = 99;
    if (global.bombs > 99) global.bombs = 99;
    if (global.rope > 99) global.rope = 99;

    if (global.hasCape && !instance_exists(oCape)) instance_create(x, y, oCape);

    if (instance_exists(oCape)) {
      if (oCape.open) fallTimer = 0;
    }

    // kapala
    if (redColor > 0) {
      if (redToggle) redColor -= 5;
      else if (redColor < 20) redColor += 5;
      else redToggle = true;
    } else redColor = 0;

    if (holdArrow == ARROW_BOMB) {
      if (bombArrowCounter > 0) bombArrowCounter -= 1;
      else {
        instance_create(x, y, oExplosion);
        if (global.graphicsHigh) {
          scrCreateFlame(x, y, 3);
        }
        bombArrowCounter = 80;
        holdArrow = 0;
      }

      if (isInShop(x, y)) {
        scrShopkeeperAnger(2);
      }
    }

    // exit game from title screen
    if (isRoom('rTitle') && state == CLIMBING && y < 32) {
      if (holdItem != null) {
        holdItem.held = false;
        holdItem = 0;
        pickupItemType = '';
      }
      instance_create(x, y, oPDummy5);
      instance_destroy();
    }

    // instead of destroying the player instance when dead, we occasionally make him disappear
    // i.e. being eaten by plant
    if (dead && !visible) {
      xVel = 0;
      yVel = 0;
      grav = 0;
      myGrav = 0;
      bounced = true;
    }

    // find distance to nearest light source, used for dark rooms
    // aka longest variable name ever
    distToNearestLightSource = 999;
    if (instance_exists(oExplosion)) {
      source = instance_nearest(x, y, oExplosion);
      distToNearestLightSource = distance_to_object(source);
      if (source.image_index <= 3)
        distToNearestLightSource -= source.image_index * 16;
      else distToNearestLightSource += (source.image_index - 3) * 16;
    }
    if (instance_exists(oLava)) {
      source = instance_nearest(x, y, oLava);
      if (distance_to_object(source) < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source);
    }
    if (instance_exists(oLamp)) {
      source = instance_nearest(x, y, oLamp);
      if (distance_to_object(source) < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source);
    }
    if (instance_exists(oLampItem)) {
      source = instance_nearest(x, y, oLampItem);
      if (distance_to_object(source) < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source);
    }
    if (instance_exists(oFlareCrate)) {
      source = instance_nearest(x, y, oFlareCrate);
      if (distance_to_object(source) < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source);
    }
    if (instance_exists(oTikiTorch)) {
      source = instance_nearest(x, y, oTikiTorch);
      if (distance_to_object(source) + 48 < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source) + 48;
    }
    if (instance_exists(oArrowTrapLeftLit)) {
      source = instance_nearest(x, y, oArrowTrapLeftLit);
      if (distance_to_object(source) + 48 < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source) + 48;
    }
    if (instance_exists(oArrowTrapRightLit)) {
      source = instance_nearest(x, y, oArrowTrapRightLit);
      if (distance_to_object(source) + 48 < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source) + 48;
    }
    if (instance_exists(oSpearTrapLit)) {
      source = instance_nearest(x, y, oSpearTrapLit);
      if (distance_to_object(source) + 48 < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source) + 48;
    }
    if (instance_exists(oSmashTrapLit)) {
      source = instance_nearest(x, y, oSmashTrapLit);
      if (distance_to_object(source) + 48 < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source) + 48;
    }
    if (instance_exists(oShotgunBlastLeft)) {
      source = instance_nearest(x, y, oShotgunBlastLeft);
      if (distance_to_object(source) < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source);
    }
    if (instance_exists(oShotgunBlastRight)) {
      source = instance_nearest(x, y, oShotgunBlastRight);
      if (distance_to_object(source) < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source);
    }

    // WHOA
    if (
      sprite_index == sWhoaLeft ||
      sprite_index == sDamselWhoaL ||
      sprite_index == sTunnelWhoaL
    ) {
      if (whoaTimer > 0) whoaTimer -= 1;
      else if (holdItem != null) {
        holdItem.held = false;
        if (facing == LEFT) holdItem.xVel = -2;
        else holdItem.xVel = 2;
        if (holdItem.type == 'Damsel') playSound(global.sndDamsel);
        if (holdItem.type == 'Bow' && bowArmed) {
          scrFireBow();
        }
        if (holdItem.type == pickupItemType) {
          holdItem = 0;
          pickupItemType = '';
        } else scrHoldItem(pickupItemType);
      }
    } else whoaTimer = whoaTimerMax;

    // FIRING
    if (firing > 0) firing -= 1;

    // WATER
    if (collision_point(x, y, oWaterSwim, -1, -1)) {
      if (!swimming) {
        instance_create(x, y - 8, oSplash);
        swimming = true;
        playSound(global.sndSplash);
      }
    }

    // BURNING
    if (burning > 0) {
      if (rand(1, 5) == 1)
        instance_create(x - 8 + rand(4, 12), y - 8 + rand(4, 12), oBurn);
      burning -= 1;
    }

    // LAVA
    if (collision_point(x, y + 6, oLava, 0, 0)) {
      if (!dead) {
        if (isRealLevel()) global.miscDeaths[11] += 1;
        playSound(global.sndFlame);
      }
      global.plife -= 99;
      // dead = true;
      xVel = 0;
      yVel = 0.1;
      grav = 0;
      myGrav = 0;
      bounced = true;
      burning = 100;
      depth = 999;
    }

    // JETPACK
    if (global.hasJetpack && platformCharacterIs(ON_GROUND)) {
      jetpackFuel = 50;
    }

    // fall off bottom of screen
    if (y > room_height + 16 && !dead) {
      if (isRealLevel()) global.miscDeaths[10] += 1;
      global.plife -= 99;
      xVel = 0;
      yVel = 0;
      grav = 0;
      myGrav = 0;
      bounced = true;
      if (holdItem != null) {
        holdItem.visible = true;
        holdItem.held = false;
        holdItem = 0;
        pickupItemType = '';
      }
      playSound(global.sndThud);
      playSound(global.sndDie);
    }

    if (active) {
      if (
        stunTimer > 0 &&
        (sprite_index == sStunL ||
          sprite_index == sDamselStunL ||
          sprite_index == sTunnelStunL)
      ) {
        image_speed = 0.4;
        stunTimer -= 1;
      }

      if (
        stunTimer < 1 &&
        (sprite_index == sStunL ||
          sprite_index == sDamselStunL ||
          sprite_index == sTunnelStunL)
      )
        stunned = false;

      if (instance_exists(oParachute)) fallTimer = 0;

      if (yVel > 1 && state != CLIMBING) {
        fallTimer += 1;
        if (fallTimer > 16) wallHurt = 0; // no sense in them taking extra damage from being thrown here
        if (global.hasParachute && !stunned && fallTimer > 12) {
          if (!collision_line(x, y + 16, x, y + 32, oSolid, 0, 0)) {
            instance_create(x - 8, y - 16, oParachute);
            fallTimer = 0;
            global.hasParachute = false;
          }
        }
      } else if (
        platformCharacterIs(ON_GROUND) &&
        fallTimer > 16 &&
        !collision_rectangle(x - 8, y - 8, x + 8, y + 8, oSpringTrap, 0, 0)
      ) {
        // LONG DROP
        // LONG DROP
        stunned = true;
        if (fallTimer > 48) global.plife -= 10;
        else if (fallTimer > 32) global.plife -= 2;
        else global.plife -= 1;
        if (global.plife < 1) {
          scrCreateBlood(x, y, 3);
          if (isRealLevel()) global.miscDeaths[3] += 1;
        }
        bounced = true;
        stunTimer += 60;
        yVel = -3;
        fallTimer = 0;
        obj = instance_create(x - 4, y + 6, oPoof);
        instances_of(obj).forEach(($) => {
          with ($) {
            xVel = -0.4;
          }
        });
        obj = instance_create(x + 4, y + 6, oPoof);
        instances_of(obj).forEach(($) => {
          with ($) {
            xVel = 0.4;
          }
        });
        playSound(global.sndThud);
      } // if (collision_point(x, y+9, oSolid, 0, 0) || state == JUMPING || state == HANGING || state == CLIMBING || state == DUCKING)
      else {
        fallTimer = 0;
        if (instance_exists(oParachute)) {
          instance_create(x - 8, y - 16 - 8, oParaUsed);
          instances_of(oParachute).forEach(($) => {
            with ($) {
              instance_destroy();
            }
          });
        }
      }

      // if (stunned) fallTimer = 0;

      if (swimming && !collision_point(x, y, oLava, 0, 0)) {
        fallTimer = 0;
        if (bubbleTimer > 0) bubbleTimer -= 1;
        else {
          instance_create(x, y - 4, oBubble);
          bubbleTimer = bubbleTimerMax;
        }
      } else {
        bubbleTimer = bubbleTimerMax;
      }

      if (
        state != DUCKTOHANG &&
        !stunned &&
        !dead &&
        sprite_index != sPExit &&
        sprite_index != sDamselExit &&
        sprite_index != sTunnelExit
      ) {
        bounced = false;
        characterStepEvent();
      } else if (state != DUCKING && state != DUCKTOHANG) {
        state = STANDING;
      }
    }

    // if (dead || stunned)
    if (dead || stunned) {
      if (holdItem != null) {
        if (holdItem.type == 'Bow' && bowArmed) {
          scrFireBow();
        }

        holdItem.visible = true;
        holdItem.held = false;

        if (holdItem.type == 'Arrow') {
          holdItem.safe = true;
          holdItem.alarm[2] = 30;
        }

        holdItem.xVel = xVel;
        holdItem.yVel = -3;

        if (holdItem.type == 'Damsel') {
          holdItem.status = 2;
          holdItem.counter = 120;
        }

        if (holdItem.type == pickupItemType) {
          holdItem = 0;
          pickupItemType = '';
        } else scrHoldItem(pickupItemType);
      }

      if (bounced) yVel += 1;
      else yVel += 0.6;

      if (isCollisionTop(1) && yVel < 0) {
        yVel = -yVel * 0.8;
      }

      if (isCollisionLeft(1) || isCollisionRight(1)) {
        xVel = -xVel * 0.5;
      }

      collisionbottomcheck = isCollisionBottom(1);
      if (collisionbottomcheck || isCollisionPlatformBottom(1)) {
        // bounce
        if (collisionbottomcheck) {
          if (yVel > 2.5) yVel = -yVel * 0.5;
          else yVel = 0;
        } else fallTimer -= 1; //after falling onto a platform don't take extra damage after recovering from stunning

        // friction
        if (abs(xVel) < 0.1) xVel = 0;
        else if (abs(xVel) != 0 && collision_point(x, y + 16, oIce, 0, 0))
          xVel *= 0.8;
        else if (abs(xVel) != 0) xVel *= 0.3;

        bounced = true;
      }

      // apply the limits since the velocity may be too extreme
      xVelLimit = 10;
      if (xVel > xVelLimit) xVel = xVelLimit;
      else if (xVel < -xVelLimit) xVel = -xVelLimit;
      if (yVel > yVelLimit) yVel = yVelLimit;
      else if (yVel < -yVelLimit) yVel = -yVelLimit;

      moveTo(xVel, yVel);
    } else if (isLevel()) {
      // look up && down
      if (
        kDown &&
        (platformCharacterIs(ON_GROUND) || state == HANGING) &&
        !kRight &&
        !kLeft
      ) {
        if (viewCount <= 30) viewCount += 1;
        else view_yview[0] += 4;
      } else if (
        kUp &&
        (platformCharacterIs(ON_GROUND) || state == HANGING) &&
        !kRight &&
        !kLeft
      ) {
        if (viewCount <= 30) viewCount += 1;
        else view_yview[0] -= 4;
      } else viewCount = 0;
    }

    if (dead) {
      kAttackPressed = checkAttackPressed();
    }

    if (global.plife > 0) kBombPressed = checkBombPressed();
    else kBombPressed = false;

    if (global.plife > 0) kRopePressed = checkRopePressed();
    else kRopePressed = false;

    kPayPressed = checkPayPressed();
    // kFlarePressed = checkFlarePressed();

    if (
      (sprite_index == sAttackLeft ||
        sprite_index == sDamselAttackL ||
        sprite_index == sTunnelAttackL) &&
      facing == LEFT &&
      image_index > 4 &&
      instance_number(oWhip) == 0
    ) {
      if (holdItem != null) {
        if (holdItem.type == 'Machete') {
          obj = instance_create(x - 16, y, oSlash);
          obj.sprite_index = sSlashLeft;
          playSound(global.sndWhip);
        } else if (holdItem.type == 'Mattock') {
          obj = instance_create(x - 16, y, oMattockHit);
          obj.sprite_index = sMattockHitL;
          playSound(global.sndWhip);
        }
      } else {
        if (global.isTunnelMan) {
          obj = instance_create(x - 16, y, oMattockHit);
          obj.sprite_index = sMattockHitL;
          playSound(global.sndWhip);
        } else {
          obj = instance_create(x - 16, y, oWhip);
          obj.sprite_index = sWhipLeft;
          playSound(global.sndWhip);
        }
      }
    } else if (
      (sprite_index == sAttackLeft ||
        sprite_index == sDamselAttackL ||
        sprite_index == sTunnelAttackL) &&
      facing == RIGHT &&
      image_index > 4 &&
      instance_number(oWhip) == 0
    ) {
      if (holdItem != null) {
        if (holdItem.type == 'Machete') {
          obj = instance_create(x + 16, y, oSlash);
          obj.sprite_index = sSlashRight;
          playSound(global.sndWhip);
        } else if (holdItem.type == 'Mattock') {
          obj = instance_create(x + 16, y, oMattockHit);
          obj.sprite_index = sMattockHitR;
          playSound(global.sndWhip);
        }
      } else {
        if (global.isTunnelMan) {
          obj = instance_create(x + 16, y, oMattockHit);
          obj.sprite_index = sMattockHitR;
          playSound(global.sndWhip);
        } else {
          obj = instance_create(x + 16, y, oWhip);
          obj.sprite_index = sWhipRight;
          playSound(global.sndWhip);
        }
      }
    }

    if (holdItem != null) {
      if (holdItem.type == 'Machete') {
        if (
          (sprite_index == sAttackLeft ||
            sprite_index == sDamselAttackL ||
            sprite_index == sTunnelAttackL) &&
          facing == LEFT &&
          image_index < 2 &&
          instance_number(oMachetePre) == 0
        ) {
          obj = instance_create(x + 16, y, oMachetePre);
          obj.sprite_index = sMachetePreL;
        } else if (
          (sprite_index == sAttackLeft ||
            sprite_index == sDamselAttackL ||
            sprite_index == sTunnelAttackL) &&
          facing == RIGHT &&
          image_index < 2 &&
          instance_number(oMachetePre) == 0
        ) {
          obj = instance_create(x - 16, y, oMachetePre);
          obj.sprite_index = sMachetePreR;
        }
      } else if (holdItem.type == 'Mattock') {
        if (
          (sprite_index == sAttackLeft ||
            sprite_index == sDamselAttackL ||
            sprite_index == sTunnelAttackL) &&
          facing == LEFT &&
          image_index < 2 &&
          instance_number(oMachetePre) == 0
        ) {
          obj = instance_create(x + 16, y, oMattockPre);
          obj.sprite_index = sMattockPreL;
        } else if (
          (sprite_index == sAttackLeft ||
            sprite_index == sDamselAttackL ||
            sprite_index == sTunnelAttackL) &&
          facing == RIGHT &&
          image_index < 2 &&
          instance_number(oMachetePre) == 0
        ) {
          obj = instance_create(x - 16, y, oMattockPre);
          obj.sprite_index = sMattockPreR;
        }
      }
    } else if (
      sprite_index == sTunnelAttackL &&
      image_index < 2 &&
      instance_number(oMattockPre) == 0
    ) {
      if (facing == LEFT) {
        obj = instance_create(x + 16, y, oMattockPre);
        obj.sprite_index = sMattockPreL;
      } else {
        obj = instance_create(x - 16, y, oMattockPre);
        obj.sprite_index = sMattockPreR;
      }
    } else if (
      (sprite_index == sAttackLeft ||
        sprite_index == sDamselAttackL ||
        sprite_index == sTunnelAttackL) &&
      facing == LEFT &&
      image_index < 2 &&
      instance_number(oWhipPre) == 0
    ) {
      obj = instance_create(x + 16, y, oWhipPre);
      obj.sprite_index = sWhipPreL;
    } else if (
      (sprite_index == sAttackLeft ||
        sprite_index == sDamselAttackL ||
        sprite_index == sTunnelAttackL) &&
      facing == RIGHT &&
      image_index < 2 &&
      instance_number(oWhipPre) == 0
    ) {
      obj = instance_create(x - 16, y, oWhipPre);
      obj.sprite_index = sWhipPreR;
    }

    if (!whipping) {
      instances_of(oWhip).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
      instances_of(oWhipPre).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
    }

    if (holdItem > 0) {
      if (holdItem.cost > 0 && isLevel()) {
        if (
          global.roomPath[_arrayIndex(scrGetRoomX(x), scrGetRoomY(y))] != 4 &&
          global.roomPath[_arrayIndex(scrGetRoomX(x), scrGetRoomY(y))] != 5
        ) {
          scrStealItem();
          if (instance_exists(oShopkeeper)) {
            scrShopkeeperAnger(0);
          }
        }
      } else if (holdItem.cost > 0) {
        scrStealItem();
      }
    }

    // open chest
    if (kUp && kAttackPressed && collision_point(x, y, oChest, 0, 0)) {
      if (isRealLevel()) global.totalChests += 1;
      chest = instance_place(x, y, oChest);
      if (chest.sprite_index == sChest) {
        chest.sprite_index = sChestOpen;
        if (rand(1, 12) == 1 && global.currLevel > 0) {
          obj = instance_create(chest.x, chest.y, oBomb);
          obj.xVel = rand(0, 3) - rand(0, 3);
          obj.yVel = -2;
          instances_of(obj).forEach(($) => {
            with ($) {
              sprite_index = sBombArmed;
              alarm[1] = 40;
            }
          });

          playSound(global.sndTrap);
        } else {
          playSound(global.sndChestOpen);
          //repeat(rand(3,4))
          r1 = Math.floor(rand(3, 4));
          for (rr = 0; rr < r1; rr++) {
            n = rand(1, 3);
            switch (n) {
              case 1: {
                obj = instance_create(chest.x, chest.y, oEmerald);
                break;
              }
              case 2: {
                obj = instance_create(chest.x, chest.y, oSapphire);
                break;
              }
              case 3: {
                obj = instance_create(chest.x, chest.y, oRuby);
                break;
              }
            }
            obj.xVel = rand(0, 3) - rand(0, 3);
            obj.yVel = -2;
          }
          if (rand(1, 4) == 1) {
            n = rand(1, 3);
            switch (n) {
              case 1: {
                obj = instance_create(chest.x, chest.y, oEmeraldBig);
                break;
              }
              case 2: {
                obj = instance_create(chest.x, chest.y, oSapphireBig);
                break;
              }
              case 3: {
                obj = instance_create(chest.x, chest.y, oRubyBig);
                break;
              }
            }
            obj.xVel = rand(0, 3) - rand(0, 3);
            obj.yVel = -2;
          }
        }

        kAttackPressed = false;
      }
    }

    // open crate
    if (kUp && kAttackPressed && collision_point(x, y, oCrate, 0, 0)) {
      if (isRealLevel()) global.totalCrates += 1;
      chest = instance_place(x, y, oCrate);
      if (isRoom('rTutorial'))
        obj = instance_create(chest.x, chest.y, oBombBag);
      else if (rand(1, 500) == 1)
        obj = instance_create(chest.x, chest.y, oJetpack);
      else if (rand(1, 200) == 1)
        obj = instance_create(chest.x, chest.y, oCapePickup);
      else if (rand(1, 100) == 1)
        obj = instance_create(chest.x, chest.y, oShotgun);
      else if (rand(1, 100) == 1)
        obj = instance_create(chest.x, chest.y, oMattock);
      else if (rand(1, 100) == 1)
        obj = instance_create(chest.x, chest.y, oTeleporter);
      else if (rand(1, 90) == 1)
        obj = instance_create(chest.x, chest.y, oGloves);
      else if (rand(1, 90) == 1)
        obj = instance_create(chest.x, chest.y, oSpectacles);
      else if (rand(1, 80) == 1)
        obj = instance_create(chest.x, chest.y, oWebCannon);
      else if (rand(1, 80) == 1)
        obj = instance_create(chest.x, chest.y, oPistol);
      else if (rand(1, 80) == 1) obj = instance_create(chest.x, chest.y, oMitt);
      else if (rand(1, 60) == 1)
        obj = instance_create(chest.x, chest.y, oPaste);
      else if (rand(1, 60) == 1)
        obj = instance_create(chest.x, chest.y, oSpringShoes);
      else if (rand(1, 60) == 1)
        obj = instance_create(chest.x, chest.y, oSpikeShoes);
      else if (rand(1, 60) == 1)
        obj = instance_create(chest.x, chest.y, oMachete);
      else if (rand(1, 40) == 1)
        obj = instance_create(chest.x, chest.y, oBombBox);
      else if (rand(1, 40) == 1) obj = instance_create(chest.x, chest.y, oBow);
      else if (rand(1, 20) == 1)
        obj = instance_create(chest.x, chest.y, oCompass);
      else if (rand(1, 10) == 1)
        obj = instance_create(chest.x, chest.y, oParaPickup);
      else if (rand(1, 2) == 1)
        obj = instance_create(chest.x, chest.y, oRopePile);
      else obj = instance_create(chest.x, chest.y, oBombBag);
      obj.cost = 0;
      playSound(global.sndPickup);
      if (chest == holdItem) {
        holdItem = 0;
        pickupItemType = '';
      }
      instances_of(chest).forEach(($) => {
        with ($) {
          instance_create(x, y, oPoof);
          instance_destroy();
        }
      });

      kAttackPressed = false;
    }

    // open flare crate

    if (kUp && kAttackPressed && collision_point(x, y, oFlareCrate, 0, 0)) {
      chest = instance_place(x, y, oFlareCrate);
      for (i = 0; i < 3; i += 1) {
        obj = instance_create(chest.x, chest.y, oFlare);
        obj.xVel = rand(0, 3) - rand(0, 3);
        obj.yVel = rand(1, 3) * -1;
      }
      playSound(global.sndPickup);
      if (chest == holdItem) {
        holdItem = 0;
        pickupItemType = '';
      }
      instances_of(chest).forEach(($) => {
        with ($) {
          instance_create(x, y, oPoof);
          instance_destroy();
        }
      });

      kAttackPressed = false;
    }

    //
    // start game
    //
    if (
      !dead &&
      !stunned &&
      !whipping &&
      collision_point(x, y, oXStart, 0, 0) &&
      kUp &&
      platformCharacterIs(ON_GROUND) &&
      sprite_index != sPExit &&
      sprite_index != sDamselExit &&
      sprite_index != sTunnelExit
    ) {
      // oXEnd is the child of oXStart, for some reason, that's why this is here:
      if (isRoom('rOlmec') && holdItem) {
        if (holdItem.heavy) {
          holdItem.held = false;
          holdItem = 0;
          pickupItemType = '';
        } else if (holdItem.type == 'Bomb') {
          if (holdItem.armed) {
            holdItem.held = false;
          } else {
            global.bombs += 1;
            instances_of(holdItem).forEach(($) => {
              with ($) {
                instance_destroy();
              }
            });
          }

          global.pickupItem = pickupItemType;
        } else if (holdItem.type == 'Rope') {
          global.rope += 1;
          instances_of(holdItem).forEach(($) => {
            with ($) {
              instance_destroy();
            }
          });

          global.pickupItem = pickupItemType;
        } else {
          global.pickupItem = holdItem.type;
          instances_of(holdItem).forEach(($) => {
            with ($) {
              breakPieces = false;
              instance_destroy();
            }
          });
        }
      } else if (isRoom('rOlmec')) global.pickupItem = '';
      else if (holdItem != null) holdItem.held = false;
      holdItem = 0;
      pickupItemType = '';

      door = instance_place(x, y, oXStart);
      if (door) x = door.x + 8;
      if (global.isDamsel) sprite_index = sDamselExit;
      else if (global.isTunnelMan) sprite_index = sTunnelExit;
      else sprite_index = sPExit;
      image_speed = 0.5;
      active = false;
      depth = 999;
      invincible = 999;

      pExit = xSTART;
      if (collision_point(x, y, oXScores, 0, 0)) pExit = xSCORES;
      else if (collision_point(x, y, oXTutorial, 0, 0)) pExit = xTUTORIAL;
      else if (collision_point(x, y, oXTitle, 0, 0)) pExit = xTITLE;
      else if (collision_point(x, y, oXEnd, 0, 0)) pExit = xEND;
      else if (collision_point(x, y, oXShortcut5, 0, 0)) pExit = xSHORTCUT5;
      else if (collision_point(x, y, oXShortcut9, 0, 0)) pExit = xSHORTCUT9;
      else if (collision_point(x, y, oXShortcut13, 0, 0)) pExit = xSHORTCUT13;
      else if (collision_point(x, y, oXSun, 0, 0)) pExit = xSUN;
      else if (collision_point(x, y, oXMoon, 0, 0)) pExit = xMOON;
      else if (collision_point(x, y, oXStars, 0, 0)) pExit = xSTARS;
      else if (collision_point(x, y, oXChange, 0, 0)) pExit = xCHANGE;
      else if (collision_point(x, y, oXChange2, 0, 0)) pExit = xCHANGE2;

      if (pExit != xCHANGE2) stopAllMusic();

      playSound(global.sndSteps);
    }

    //
    // exit level
    //
    if (
      !dead &&
      !stunned &&
      !whipping &&
      collision_point(x, y, oExit, 0, 0) &&
      kUp &&
      platformCharacterIs(ON_GROUND) &&
      sprite_index != sPExit &&
      sprite_index != sDamselExit &&
      sprite_index != sTunnelExit
    ) {
      holdArrow = 0;
      global.pickupItem = '';
      if (holdItem != null) {
        if (holdItem.type == 'Gold Idol') {
          if (isRealLevel()) global.idolsConverted += 1;
          global.money += holdItem.value * (global.levelType + 1);
          if (holdItem.sprite_index == sCrystalSkull) global.skulls += 1;
          else global.idols += 1;
          playSound(global.sndCoin);
          instance_create(x, y - 8, oBigCollect);
          instances_of(holdItem).forEach(($) => {
            with ($) {
              instance_destroy();
            }
          });
          holdItem = 0;
        } else if (holdItem.type == 'Damsel') {
          if (holdItem.hp > 0) {
            // global.plife += 1;
            if (isRealLevel()) global.damselsSavedTotal += 1;
            global.damsels += 1;
            global.xdamsels += 1;
            door = instance_place(x, y, oExit);
            holdItem.x = door.x + 8;
            holdItem.y = door.y + 8;
            instances_of(holdItem).forEach(($) => {
              with ($) {
                if (global.isDamsel) sprite_index = sPExit;
                else sprite_index = sDamselExit;
                status = 4;
                held = false;
                xVel = 0;
                yVel = 0;
                playSound(global.sndSteps);
                depth = 1000;
                active = false;
              }
            });

            holdItem = 0;
          } else {
            holdItem.status = 2;
            holdItem.held = false;
            holdItem = 0;
            pickupItemType = '';
          }
        } else if (holdItem.heavy) {
          holdItem.held = false;
          holdItem = 0;
          pickupItemType = '';
        } else if (holdItem.type == 'Bomb') {
          if (holdItem.armed) {
            holdItem.held = false;
          } else {
            global.bombs += 1;
            instances_of(holdItem).forEach(($) => {
              with ($) {
                instance_destroy();
              }
            });
          }

          global.pickupItem = pickupItemType;
        } else if (holdItem.type == 'Rope') {
          global.rope += 1;
          instances_of(holdItem).forEach(($) => {
            with ($) {
              instance_destroy();
            }
          });

          global.pickupItem = pickupItemType;
        } else {
          global.pickupItem = holdItem.type;
          instances_of(holdItem).forEach(($) => {
            with ($) {
              breakPieces = false;
              instance_destroy();
            }
          });
        }
        holdItem = 0;
        pickupItemType = '';
      }

      door = instance_place(x, y, oExit);
      if (door) {
        x = door.x + 8;
        y = door.y + 8;
      }

      // money
      global.money += global.collect;
      global.xmoney += global.collect;
      global.collect = 0;

      if (global.isDamsel) sprite_index = sDamselExit;
      else if (global.isTunnelMan) sprite_index = sTunnelExit;
      else sprite_index = sPExit;
      image_speed = 0.5;
      active = false;
      invincible = 999;
      depth = 999;
      if (global.thiefLevel > 0) global.thiefLevel -= 1;
      if (global.currLevel == 1) global.currLevel += firstLevelSkip;
      else global.currLevel += levelSkip;
      stopAllMusic();
      playSound(global.sndSteps);
      if (collision_point(x, y, oXMarket, 0, 0)) global.genBlackMarket = true;
      if (collision_point(x, y, oXGold, 0, 0)) global.cityOfGold = true;
      obj = collision_point(x, y, oExit, 0, 0);
      if (obj) {
        if (obj.leadsTo != '') {
          global.nextCustomLevel = obj.leadsTo;
        }
      }

      instances_of(oMonkey).forEach(($) => {
        with ($) {
          // knock off monkeys that grabbed you
          if (status == 7) {
            xVel = rand(0, 1) - rand(0, 1);
            yVel = -4;
            status = 1;
            vineCounter = 20;
            grabCounter = 60;
          }
        }
      });
    }

    //
    // Game Over
    //
    if ((checkAttackPressed() || checkStartPressed()) && dead) {
      if (oGame.moneyCount < global.money || oGame.drawStatus < 3) {
        oGame.drawStatus = 3;
        oGame.moneyCount = global.money;
      } else {
        // Stats!
        if (isRealLevel()) global.levelDeaths[global.currLevel - 1] += 1;

        if (gamepad.attackPressed) gamepad.attackPressed = false;
        if (gamepad.startPressed) gamepad.startPressed = false;
        global.prevCustomLevel = '';
        if (global.testLevel != '') {
          scrClearGlobals();
          room_goto(rLevelEditor);
        } else if (global.customLevel) {
          scrClearGlobals();
          global.customLevel = false;
          room_goto(rLoadLevel);
        } else {
          scrClearGlobals();
          if (isRoom('rSun')) global.scoresStart = 1;
          if (isRoom('rMoon')) global.scoresStart = 2;
          if (isRoom('rStars')) global.scoresStart = 3;
          room_goto(rHighscores);
        }
      }
    }

    inGame = true;
    if (!isLevel()) {
      inGame = false;
    }

    if (dead || stunned || !active) {
      // do nothing
    } else if (inGame && kItemPressed && !whipping) {
      // switch items
      if (holdItem != null) {
        if (holdItem.sprite_index == sBombArmed) {
          // do nothing
        } else if (holdItem.sprite_index == sBomb) {
          instances_of(holdItem).forEach(($) => {
            with ($) {
              global.bombs += 1;
              instance_destroy();
            }
          });

          if (global.rope > 0) {
            holdItem = instance_create(x, y, oRopeThrow);
            holdItem.held = true;
            global.rope -= 1;
            whoaTimer = whoaTimerMax;
          } else {
            scrHoldItem(pickupItemType);
          }
        } else if (holdItem.sprite_index == sRopeEnd) {
          instances_of(holdItem).forEach(($) => {
            with ($) {
              global.rope += 1;
              instance_destroy();
            }
          });

          scrHoldItem(pickupItemType);
        } else if (!holdItem.heavy && holdItem.cost == 0) {
          if (global.bombs > 0 || global.rope > 0) {
            pickupItemType = holdItem.type;
            if (holdItem.type == 'Bow' && bowArmed) {
              scrFireBow();
            }
            instances_of(holdItem).forEach(($) => {
              with ($) {
                breakPieces = false;
                instance_destroy();
              }
            });
          }

          if (global.bombs > 0) {
            holdItem = instance_create(x, y, oBomb);
            if (global.hasStickyBombs) holdItem.sticky = true;
            holdItem.held = true;
            global.bombs -= 1;
            whoaTimer = whoaTimerMax;
          } else if (global.rope > 0) {
            holdItem = instance_create(x, y, oRopeThrow);
            holdItem.held = true;
            global.rope -= 1;
            whoaTimer = whoaTimerMax;
          }
        }
      } else {
        if (global.bombs > 0) {
          holdItem = instance_create(x, y, oBomb);
          if (global.hasStickyBombs) holdItem.sticky = true;
          holdItem.held = true;
          global.bombs -= 1;
          whoaTimer = whoaTimerMax;
        } else if (global.rope > 0) {
          holdItem = instance_create(x, y, oRopeThrow);
          holdItem.held = true;
          global.rope -= 1;
          whoaTimer = whoaTimerMax;
        }
      }
    } else if (inGame && kRopePressed && global.rope > 0 && !whipping) {
      if (!kDown && colTop) {
        // do nothing
      } else {
        if (kDown) {
          if (facing == LEFT) {
            obj = instance_create(x - 16, y, oRopeThrow);
          } else {
            obj = instance_create(x + 16, y, oRopeThrow);
          }

          instances_of(obj).forEach(($) => {
            with ($) {
              t = true;
              move_snap(16, 1);
              if (oPlayer1.x < x) {
                if (
                  !collision_point(oPlayer1.x + 8, oPlayer1.y, oSolid, 0, 0)
                ) {
                  if (
                    !collision_rectangle(x - 8, y, x - 7, y + 16, oSolid, 0, 0)
                  )
                    x -= 8;
                  else if (
                    !collision_rectangle(x + 7, y, x + 8, y + 16, oSolid, 0, 0)
                  )
                    x += 8;
                  else t = false;
                } else t = false;
              } else if (
                !collision_point(oPlayer1.x - 8, oPlayer1.y, oSolid, 0, 0)
              ) {
                if (!collision_rectangle(x + 7, y, x + 8, y + 16, oSolid, 0, 0))
                  x += 8;
                else if (
                  !collision_rectangle(x - 8, y, x - 7, y + 16, oSolid, 0, 0)
                )
                  x -= 8;
                else t = false;
              } else t = false;

              if (!t) {
                /*
                if (oPlayer1.facing == 18)
                {
                    obj = instance_create(oPlayer1.x-4, oPlayer1.y+2, oRopeThrow);
                    obj.xVel = -3.2;                
                }
                else
                {
                    obj = instance_create(oPlayer1.x+4, oPlayer1.y+2, oRopeThrow);
                    obj.xVel = 3.2;
                }
                obj.yVel = 0.5;
                */
                instance_destroy();
              } else {
                instance_create(x, y, oRopeTop);
                armed = false;
                falling = true;
                xVel = 0;
                yVel = 0;
                global.rope -= 1;
                playSound(global.sndThrow);
              }
            }
          });
        } else {
          obj = instance_create(x, y, oRopeThrow);
          obj.armed = true;
          obj.px = x;
          obj.py = y;
          obj.xVel = 0;
          obj.yVel = -12;
          global.rope -= 1;
          playSound(global.sndThrow);
        }
      }
    } else if (
      inGame &&
      kBombPressed &&
      global.bombs > 0 &&
      !whipping &&
      bowArmed
    ) {
      holdArrow = ARROW_BOMB;
      alarm[11] = 1;
    } else if (inGame && kBombPressed && global.bombs > 0 && !whipping) {
      obj = instance_create(x, y, oBomb);
      if (global.hasStickyBombs) obj.sticky = true;
      obj.sprite_index = sBombArmed;
      obj.armed = true;
      instances_of(obj).forEach(($) => {
        with ($) {
          alarm[0] = 80;
          image_speed = 0.2;
        }
      });

      obj.safe = true;
      obj.alarm[2] = 10;

      if (facing == LEFT) {
        obj.xVel = -8 + xVel;
      } else if (facing == RIGHT) {
        obj.xVel = 8 + xVel;
      }
      obj.yVel = -3;

      if (kUp) {
        obj.yVel = -9;
      }

      if (kDown) {
        if (platformCharacterIs(ON_GROUND)) obj.xVel *= 0.1;
        obj.yVel = 3;
      }

      global.bombs -= 1;
      playSound(global.sndThrow);
    } else if (holdItem == 0) {
      if (
        kAttackPressed &&
        state != DUCKING &&
        state != DUCKTOHANG &&
        !whipping &&
        sprite_index != sPExit &&
        sprite_index != sDamselExit
      ) {
        image_speed = 0.6;
        if (global.isTunnelMan) {
          if (platformCharacterIs(ON_GROUND)) {
            sprite_index = sTunnelAttackL;
            image_index = 0;
            whipping = true;
          }
        } else if (global.isDamsel) {
          sprite_index = sDamselAttackL;
          image_index = 0;
          whipping = true;
        } else {
          sprite_index = sAttackLeft;
          image_index = 0;
          whipping = true;
        }
      } else if (kAttackPressed && kDown) {
        // pick up item
        if (collision_rectangle(x - 8, y, x + 8, y + 8, oItem, 0, 0)) {
          obj = instance_nearest(x, y, oItem);
          if (obj.canPickUp && !collision_point(obj.x, obj.y, oSolid, 0, 0)) {
            holdItem = obj;
            holdItem.held = true;
            whoaTimer = whoaTimerMax;
            pickupItemType = holdItem.type;

            if (holdItem.type == 'Bow' && holdItem.newObj) {
              holdItem.newObj = false;
              global.arrows += 6;
            }

            if (
              holdItem.type == 'Gold Idol' &&
              holdItem.trigger &&
              !isRoom('rLoadLevel')
            ) {
              global.idolsGrabbed += 1;
              if (global.levelType == 0) {
                trap = instance_nearest(x, y - 64, oGiantTikiHead);
                instances_of(trap).forEach(($) => {
                  with ($) {
                    alarm[0] = 100;
                  }
                });
                scrShake(100);
                holdItem.trigger = false;
              } else if (global.levelType == 1) {
                if (global.cemetary && !global.ghostExists) {
                  if (oPlayer1.x > room_width / 2)
                    instance_create(
                      view_xview[0] + view_wview[0] + 8,
                      view_yview[0] + floor(view_hview[0] / 2),
                      oGhost
                    );
                  else
                    instance_create(
                      view_xview[0] - 32,
                      view_yview[0] + floor(view_hview[0] / 2),
                      oGhost
                    );
                  global.ghostExists = true;
                }
                instances_of(oTrapBlock).forEach(($) => {
                  with ($) {
                    dist = distance_to_object(oCharacter);
                    if (dist < 90) {
                      dying = true;
                      //instance_destroy();
                    }
                  }
                });
              } else if (global.levelType == 3) {
                if (instance_exists(oCeilingTrap)) {
                  instances_of(oCeilingTrap).forEach(($) => {
                    with ($) {
                      status = 1;
                      yVel = 0.5;
                    }
                  });

                  scrShake(20);
                  trap = instance_nearest(x - 64, y - 64, oDoor);
                  if (trap != null) {
                    trap.status = 1;
                    trap.yVel = 1;
                  }
                  trap = instance_nearest(x + 64, y - 64, oDoor);
                  if (trap != null) {
                    trap.status = 1;
                    trap.yVel = 1;
                  }
                } else {
                  instances_of(oTrapBlock).forEach(($) => {
                    with ($) {
                      dist = distance_to_object(oCharacter);
                      if (dist < 90) {
                        instance_destroy();
                      }
                      playSound(global.sndThump);
                      scrShake(10);
                    }
                  });
                }

                holdItem.trigger = false;
              }
            } else if (holdItem.type == 'Damsel') {
              if (holdItem.status == 4) {
                // exiting
                holdItem = 0;
                holdItem.held = false;
              } else {
                if (global.isDamsel) holdItem.sprite_index = sDieLBounce;
                else holdItem.sprite_index = sDamselHoldL;
              }
            } else if (holdItem.cost == 0) scrStealItem();
          }
        } else if (collision_rectangle(x - 8, y, x + 8, y + 8, oEnemy, 0, 0)) {
          obj = instance_nearest(x, y, oEnemy);
          if (obj.status >= 98 && obj.canPickUp) {
            holdItem = obj;
            holdItem.held = true;
            whoaTimer = whoaTimerMax;
            pickupItemType = holdItem.type;
          }
        }
      }
    } else if (kAttackPressed) {
      if (holdItem != null) {
        scrUseItem();
      }
    }

    /*
if (isLevel() and kFlarePressed and active and not dead and not stunned)
{
    if (global.flares &gt; 0)
    {
        flare = instance_create(x, y, oFlare);

        // drop any item you're already carrying
        if (holdItem != null)
        {
            if (facing == LEFT) holdItem.xVel = -1;
            else holdItem.xVel = 1;
            holdItem.yYel = -2;
            holdItem.held = false;
            holdItem = 0;
            pickupItemType = "";
        }

        with flare { held = true; }
        holdItem = flare;
        playSound(global.sndIgnite);
        global.darknessLerp = 1;
        global.flares -= 1;

        if (global.flares &gt; 1) global.message = string(global.flares) + " FLARES REMAINING.";
        else if (global.flares == 1) global.message = string(global.flares) + " FLARE REMAINING.";
        else global.message = "NO MORE FLARES!";
        global.message2 = "";
        global.messageTimer = 80;
    }
    else
    {
        global.message = "NO MORE FLARES!";
        global.message2 = "";
        global.messageTimer = 80;
    }
}
*/
    if (isLevel() && active && kPayPressed && !dead && !stunned) {
      if (isInShop(x, y) && instance_exists(oShopkeeper)) {
        n = 0;
        if (holdItem != null) {
          if (holdItem.cost <= 0) {
            // do nothing
          } else if (holdItem.cost > global.money) {
            global.message = "YOU HAVEN'T GOT ENOUGH MONEY!";
            global.message2 = '';
            global.messageTimer = 80;
            instances_of(holdItem).forEach(($) => {
              with ($) {
                held = false;
              }
            });
            holdItem = 0;
            pickupItemType = '';
            n = 1;
          } else {
            if (isRealLevel()) global.itemsBought += 1;
            global.money -= holdItem.cost;
            scrStealItem();
            //global.message = "THANK YOU!";
            //global.message2 = "";
            global.messageTimer = 80;
            // holdItem = 0;
          }
        }

        if (
          (global.blackMarket &&
            global.roomPath[_arrayIndex(scrGetRoomX(x), scrGetRoomY(y))] ==
              5) ||
          (!global.blackMarket && oShopkeeper.style == 'Craps')
        ) {
          if (global.thiefLevel > 0 || global.murderer) {
            // do nothing
          } else if (
            bet == 0 &&
            global.money >= 1000 + global.currLevel * 500
          ) {
            if (isRealLevel()) global.diceGamesPlayed += 1;
            bet = 1000 + global.currLevel * 500;
            global.money -= 1000 + global.currLevel * 500;
            global.message =
              'YOU BET $' + string(1000 + global.currLevel * 500) + '!';
            global.message2 = 'NOW ROLL THE DICE!';
            global.messageTimer = 200;
          } else if (bet > 0) {
            global.message = 'ONE BET AT A TIME!';
            global.message2 = 'PLEASE ROLL THE DICE!';
            global.messageTimer = 200;
          } else {
            global.message =
              'YOU NEED $' + string(1000 + global.currLevel * 500) + ' TO BET!';
            global.message2 = '';
            global.messageTimer = 200;
          }
        }

        if (
          oShopkeeper.style == 'Kissing' &&
          distance_to_object(oDamsel) < 16
        ) {
          obj = instance_nearest(x, y, oDamsel);
          if (global.thiefLevel > 0 || global.murderer || !obj.orSale) {
            // do nothing
          } else if (n == 0 && global.money >= getKissValue()) {
            if (obj.orSale && !obj.held) {
              if (isRealLevel()) global.kissesBought += 1;
              obj.status = 6;
              if (global.isDamsel) {
                obj.sprite_index = sPKissL;
              } else {
                obj.sprite_index = sDamselKissL;
              }
              global.money -= getKissValue();
              global.plife += 1;
              if (global.isDamsel) global.message = "NOW AIN'T HE SWEET!";
              else global.message = "NOW AIN'T SHE SWEET!";
              global.message2 = '';
              global.messageTimer = 200;
            }
          } else {
            if (n == 0)
              global.message = 'YOU NEED $' + string(getKissValue()) + '!';
            else global.message = 'YOU NEED $' + string(obj.cost) + '!';
            global.message2 = 'GET OUTTA HERE, DEADBEAT!';
            global.messageTimer = 200;
          }
        }
      }
    }

    if (kAttack && bowArmed && bowStrength < 12) {
      bowStrength += 0.2;
      if (!holdItem) {
        bowArmed = false;
        bowStrength = 0;
        if (SS_IsSoundPlaying(global.sndBowPull))
          SS_StopSound(global.sndBowPull);
      }
      holdArrow = ARROW_NORM;
    }

    if (kAttackReleased && bowArmed) {
      scrFireBow();
    }

    if (global.plife < -10000) global.plife = -10000;

    if (global.plife < -99 && visible) {
      scrCreateBlood(x, y, 3);
      visible = false;
    }

    if (
      global.plife >= -99 &&
      visible &&
      sprite_index != sPExit &&
      sprite_index != sDamselExit &&
      sprite_index != sTunnelExit
    ) {
      // crushed
      if (collision_point(x, y, oSolid, 0, 0)) {
        if (!collision_point(x, y, oMoaiInside, 0, 0)) {
          if (global.plife > 0) {
            if (isRealLevel()) {
              if (isRoom('rOlmec')) global.enemyDeaths[22] += 1;
              else if (collision_point(x, y, oBoulder, 0, 0))
                global.miscDeaths[5] += 1;
              else if (collision_point(x, y, oSmashTrap, 0, 0))
                global.miscDeaths[8] += 1;
              else global.miscDeaths[2] += 1;
            }
          }
          global.plife -= 99;
          active = false;
          yVel = -3;
          playSound(global.sndDie);

          scrCreateBlood(x, y, 3);

          visible = false;
        }
      }
      if (holdItem != 0) instance_deactivate_object(holdItem);
      if (collision_rectangle(x - 8, y - 8, x + 8, y + 8, oArrow, 0, 0)) {
        obj = instance_nearest(x, y, oArrow);
        if (obj && abs(obj.xVel) > 3 && !obj.safe) {
          if (global.plife > 0) {
            global.plife -= 2;
            if (global.plife <= 0 && isRealLevel()) global.miscDeaths[6] += 1;
          }
          xVel = obj.xVel;
          yVel = -4;

          scrCreateBlood(x, y, 3);

          instances_of(obj).forEach(($) => {
            with ($) {
              instance_destroy();
            }
          });

          playSound(global.sndHurt);
          stunned = true;
          stunTimer = 20;
        }
      }

      if (collision_rectangle(x - 8, y - 8, x + 8, y + 8, oRock, 0, 0)) {
        obj = instance_nearest(x, y, oRock);
        if (obj && abs(obj.xVel) > 4 && !obj.safe && !stunned && !dead) {
          if (global.hasMitt && !holdItem) {
            holdItem = oRock;
            holdItem.held = true;
            pickupItemType = holdItem.type;
          } else {
            if (global.plife > 0) {
              global.plife -= 2;
              if (global.plife <= 0 && isRealLevel()) global.miscDeaths[0] += 1;
            }
            xVel = obj.xVel;
            yVel = -4;

            scrCreateBlood(x, y, 3);

            playSound(global.sndHurt);
            stunned = true;
            stunTimer = 20;
          }
        }
      }
      if (holdItem != 0) instance_activate_object(holdItem);
      if (collision_rectangle(x - 8, y - 8, x + 8, y + 8, oLaser, 0, 0)) {
        obj = instance_nearest(x, y, oLaser);
        if (obj) {
          if (global.plife > 0) {
            global.plife -= 3;
            if (global.plife <= 0 && isRealLevel()) global.enemyDeaths[16] += 1;
          }
          if (obj.x < x) xVel = 2;
          else xVel = -2;
          yVel = -4;

          scrCreateBlood(x, y, 3);

          instances_of(obj).forEach(($) => {
            with ($) {
              instance_create(x, y, oLaserExplode);
              instance_destroy();
            }
          });

          playSound(global.sndHurt);
          stunned = true;
          stunTimer = 20;
        }
      }

      if (
        collision_rectangle(x - 8, y - 8, x + 8, y + 8, oPsychicWave, 0, 0) &&
        !stunned &&
        !dead
      ) {
        obj = instance_nearest(x, y, oPsychicWave);
        if (obj) {
          if (global.plife > 0) {
            global.plife -= 1;
            if (global.plife <= 0 && isRealLevel()) global.enemyDeaths[17] += 1;
          }
          if (obj.x < x) xVel = 2;
          else xVel = -2;
          yVel = -4;

          playSound(global.sndHurt);
          stunned = true;
          stunTimer = 40;
        }
      }

      if (collision_rectangle(x - 8, y - 8, x + 8, y + 8, oExplosion, 0, 0)) {
        global.plife -= 10;
        if (global.plife > 0 && isRealLevel()) global.miscDeaths[1] += 1;
        explosion = instance_nearest(x, y, oExplosion);
        if (explosion.x < x) xVel = rand(4, 6);
        else xVel = -rand(4, 6);
        yVel = -6;
        burning = 50;
        stunned = true;
        stunTimer = 100;

        scrCreateBlood(x, y, 1);
      }

      obj = collision_rectangle(x - 6, y - 6, x + 6, y + 7, oSpearsLeft, 0, 0);
      instance_nearest(x, y, oSpearsLeft);
      if (obj) {
        if (obj.image_index >= 20 && obj.image_index < 24) {
          if (global.plife > 0 && isRealLevel()) global.miscDeaths[7] += 1;

          // stunned = true;
          // bounced  = false;
          global.plife -= 4;
          if (obj.sprite_index == sSpearsLeft) xVel = -rand(4, 6);
          else xVel = rand(4, 6);
          yVel = -6;
          y -= 1;
          // state = FALLING;

          scrCreateBlood(x, y, 1);
        }
      }

      if (collision_rectangle(x - 6, y - 6, x + 6, y + 7, oSmashTrap, 0, 0)) {
        if (global.plife > 0 && isRealLevel()) global.miscDeaths[8] += 1;

        obj = instance_nearest(x, y, oSmashTrap);
        global.plife -= 10;
        if (obj.x + 8 < x) xVel = -rand(4, 6);
        else xVel = rand(4, 6);
        yVel = -6;
        if (obj) {
          if (obj.dir == 1) yVel = 4;
        }
        //RIGHT = 0;
        //DOWN = 1;
        //LEFT = 2;
        //UP = 3;
        scrCreateBlood(x, y, 1);
        if (holdItem != null) {
          holdItem.held = false;
          holdItem = 0;
        }
      }

      obj = collision_rectangle(x - 2, y - 9, x + 2, y - 7, oCeilingTrap, 0, 0); //instance_nearest(x, y-8, oCeilingTrap);
      if (obj) {
        if (obj.status > 0) {
          if (global.plife > 0 && isRealLevel()) global.miscDeaths[9] += 1;

          global.plife -= 10;
          scrCreateBlood(x, y, 1);
        }
      }

      colSpikes = false;
      if (collision_rectangle(x - 4, y - 4, x + 4, y + 8, oSpikes, 0, 0))
        colSpikes = true;

      if (colSpikes && dead) {
        //grav = 0;
        if (!collision_point(x, y + 9, oSolid, 0, 0)) y += 0.05;
        else myGrav = 0.6;
      } else myGrav = 0.6;

      if (colSpikes && yVel > 0 && (fallTimer > 3 || stunned)) {
        if (!dead) {
          if (isRealLevel()) global.miscDeaths[4] += 1;
          scrCreateBlood(x, y, 3);
          global.plife -= 99;
          xVel = 0;
          yVel = 0;
          myGrav = 0;
        }

        obj = instance_place(x, y, oSpikes);
        if (obj) {
          instances_of(obj).forEach(($) => {
            with ($) {
              sprite_index = sSpikesBlood;
            }
          });
        }
      }
      //else if (!dead) myGrav = 0.6;
    }

    /* Deprecated, see similar code in first code block.
if ((dead or stunned) and holdItem != 0)
{
    holdItem.held = false;
    
    holdItem.xVel = xVel;
    holdItem.yVel = -6;
    holdItem.armed = true;
    if (holdItem.type == "Damsel")
    {
        holdItem.status = 2;
    }
    else if (holdItem.type == "Bow")
    {
        scrFireBow();
    }
    
    if (holdItem.type == pickupItemType)
    {
        holdItem = 0;
        pickupItemType = "";
    }
    else scrHoldItem(pickupItemType);
}
*/

    if (dead || stunned) {
      if (instance_exists(oParachute)) {
        instance_create(x - 8, y - 16 - 8, oParaUsed);
        instances_of(oParachute).forEach(($) => {
          with ($) {
            instance_destroy();
          }
        });
      }

      if (whipping) {
        whipping = false;
        instances_of(oWhip).forEach(($) => {
          with ($) {
            instance_destroy();
          }
        });
      }

      if (global.isDamsel) {
        if (xVel == 0) {
          if (dead) sprite_index = sDamselDieL;
          else if (stunned) sprite_index = sDamselStunL;
        } else if (bounced) {
          if (yVel < 0) sprite_index = sDamselBounceL;
          else sprite_index = sDamselFallL;
        } else {
          if (xVel < 0) sprite_index = sDamselDieLL;
          else sprite_index = sDamselDieLR;
        }
      } else if (global.isTunnelMan) {
        if (xVel == 0) {
          if (dead) sprite_index = sTunnelDieL;
          else if (stunned) sprite_index = sTunnelStunL;
        } else if (bounced) {
          if (yVel < 0) sprite_index = sTunnelLBounce;
          else sprite_index = sTunnelFallL;
        } else {
          if (xVel < 0) sprite_index = sTunnelDieLL;
          else sprite_index = sTunnelDieLR;
        }
      } else {
        if (xVel == 0) {
          if (dead) sprite_index = sDieL;
          else if (stunned) sprite_index = sStunL;
        } else if (bounced) {
          if (yVel < 0) sprite_index = sDieLBounce;
          else sprite_index = sDieLFall;
        } else {
          if (xVel < 0) sprite_index = sDieLL;
          else sprite_index = sDieLR;
        }
      }

      if (collision_point(x, y, oSpikes, 0, 0) && dead && yVel != 0) {
        if (rand(1, 8) == 1) scrCreateBlood(other.x, other.y, 1);
      }

      if (isCollisionRight(1) || isCollisionLeft(1) || isCollisionBottom(1)) {
        if (wallHurt > 0) {
          for (i = 0; i < 3; i += 1) {
            instance_create(other.x, other.y, oBlood);
          }
          global.plife -= 1;
          if (global.plife <= 0) {
            if (shopThrow && isRealLevel()) global.enemyDeaths[19] += 1;
            else if (yetiThrow && isRealLevel()) global.enemyDeaths[13] += 1;
            else if (hawkThrow && isRealLevel()) global.enemyDeaths[18] += 1;
          }
          wallHurt -= 1;
          playSound(global.sndHurt);
        }
      }

      if (isCollisionBottom(1) && !bounced) {
        bounced = true;
        for (i = 0; i < 3; i += 1) {
          scrCreateBlood(other.x, other.y, 1);
        }

        if (wallHurt > 0) {
          global.plife -= 1;
          if (global.plife <= 0) {
            if (shopThrow && isRealLevel()) global.enemyDeaths[19] += 1;
            else if (yetiThrow && isRealLevel()) global.enemyDeaths[13] += 1;
            else if (hawkThrow && isRealLevel()) global.enemyDeaths[18] += 1;
          }
          wallHurt -= 1;
        }
      }

      if (wallHurt == 0) {
        shopThrow = false;
        yetiThrow = false;
        hawkThrow = false;
      }
    }

    // DIED

    if (dead && deadCounter > 0) deadCounter -= 1;

    if (isLevel() || isRoom('rSun') || isRoom('rMoon') || isRoom('rStars')) {
      if (!dead && global.plife < 1) {
        if (global.hasAnkh) {
          global.plife = 4;
          if (global.moaiX != 0) {
            x = global.moaiX + 8;
            y = global.moaiY + 8;
            instances_of(oMoaiInside).forEach(($) => {
              with ($) {
                instance_destroy();
              }
            });
          } else if (isRoom('rOlmec')) {
            x = 16 + 8;
            y = 544 + 8;
          } else {
            instance_activate_object(oEntrance);
            x = oEntrance.x + 8;
            y = oEntrance.y + 8;
          }
          instances_of(oBall).forEach(($) => {
            with ($) {
              x = oPlayer1.x;
              y = oPlayer1.y;
            }
          });

          instances_of(oChain).forEach(($) => {
            with ($) {
              x = oPlayer1.x;
              y = oPlayer1.y;
            }
          });

          xVel = 0;
          yVel = 0;
          blink = 60;
          invincible = 60;
          fallTimer = 0;
          visible = true;
          active = true;
          dead = false;
          global.hasAnkh = false;
          global.message = 'THE ANKH SHATTERS!';
          global.message2 = 'YOU HAVE BEEN REVIVED!';
          global.messageTimer = 150;
          playSound(global.sndTeleport);
        } else {
          global.plife = 0;
          global.drawHUD = false;
          global.money += global.collect;
          global.xmoney += global.collect;
          global.collect = 0;
          if (isRoom('rSun')) global.mini1 = oSunRoom.points;
          if (isRoom('rMoon')) {
            global.mini2 = oMoonRoom.baskets;
            oMoonRoom.timer = -1;
            oMoonRoom.alarm[10] = 30;
          }
          if (isRoom('rStars')) global.mini3 = oStarsRoom.kills;
          if (global.mini1 > 99) global.mini1 = 99;
          if (global.mini2 > 99) global.mini2 = 99;
          if (global.mini3 > 99) global.mini3 = 99;

          if (isRoom('rSun') || isRoom('rMoon') || isRoom('rStars'))
            scrUpdateHighscores(2);
          else scrUpdateHighscores(0);

          dead = true;
          //active = false;
          playSound(global.sndDie);
        }
      }

      if (dead) {
        if (instance_exists(oCape)) oCape.open = false;
        stopAllMusic();
      }
    }

    if (!dead && invincible > 0) invincible -= 1;

    if (blink > 0) {
      blinkToggle *= -1;
      blink -= 1;
    } else blinkToggle = -1;

    /*
if (sprite_index == sSlideRight)
{
    spark = instance_create(x, y, oGroundSpark);
    with spark { x += random(3)}
}
else if (sprite_index == sSlideLeft)
{
    spark = instance_create(x, y, oGroundSpark);
    with spark { sprite_index = sSparkLeft; x += random(3)}
}
*/

    money = global.money;

    if (global.collectCounter == 0) {
      if (global.collect > 100) {
        global.money += 100;
        global.collect -= 100;
      } else {
        global.money += global.collect;
        global.collect -= global.collect;
      }
    } else {
      global.collectCounter -= 1;
    }

    if (holdItem != null) {
      if (holdItem.type == 'Bow') {
        if (
          collision_rectangle(x - 8, y - 8, x + 8, y + 8, oArrow, 0, 0) &&
          !dead &&
          !stunned
        ) {
          obj = instance_nearest(x, y, oArrow);
          if (abs(obj.xVel) < 1 && abs(obj.yVel) < 1 && !obj.stuck) {
            global.arrows += 1;
            playSound(global.sndPickup);
            instances_of(obj).forEach(($) => {
              with ($) {
                instance_destroy();
              }
            });
          }
        }
      }
    }

    if (
      collision_rectangle(x - 8, y - 8, x + 8, y + 8, oTreasure, 0, 0) &&
      !dead &&
      !stunned
    ) {
      gem = instance_nearest(x, y, oTreasure);
      if (gem.canCollect) {
        // global.money += gem.value;
        global.collect += gem.value + ceil(gem.value / 4) * global.levelType;
        global.collectCounter += 20;
        if (global.collectCounter > 100) global.collectCounter = 100;

        coin = false;
        //instance_create(x, y-8, oSmallCollect);
        if (gem.type == 'Gold Chunk') {
          global.gold += 1;
          coin = true;
        }
        if (gem.type == 'Gold Nugget') {
          global.nuggets += 1;
          coin = true;
        }
        if (gem.type == 'Gold Bar') {
          global.goldbar += 1;
          coin = true;
        }
        if (gem.type == 'Gold Bars') {
          global.goldbars += 1;
          coin = true;
        }
        if (gem.type == 'Emerald') global.emeralds += 1;
        if (gem.type == 'Big Emerald') global.bigemeralds += 1;
        if (gem.type == 'Sapphire') global.sapphires += 1;
        if (gem.type == 'Big Sapphire') global.bigsapphires += 1;
        if (gem.type == 'Ruby') global.rubies += 1;
        if (gem.type == 'Big Ruby') global.bigrubies += 1;
        if (gem.type == 'Diamond') global.diamonds += 1;
        if (coin) playSound(global.sndCoin);
        else playSound(global.sndGem);

        instances_of(gem).forEach(($) => {
          with ($) {
            instance_destroy();
          }
        });
      }
    }

    if (
      collision_rectangle(x - 8, y - 8, x + 8, y + 8, oBombBag, 0, 0) &&
      !dead &&
      !stunned
    ) {
      obj = collision_rectangle(x - 8, y - 8, x + 8, y + 8, oBombBag, 0, 0);
      if (
        !obj.held &&
        obj.cost == 0 &&
        !collision_point(obj.x, obj.y, oSolid, 0, 0)
      ) {
        global.bombs += 3;
        disp = instance_create(obj.x, obj.y - 14, oItemsGet);
        disp.sprite_index = sBombsGet;
        instances_of(obj).forEach(($) => {
          with ($) {
            instance_destroy();
          }
        });
        playSound(global.sndPickup);
        global.message = 'YOU GOT 3 MORE BOMBS!';
        global.message2 = '';
        global.messageTimer = 120;
      }
    }

    if (
      collision_rectangle(x - 8, y - 8, x + 8, y + 8, oBombBox, 0, 0) &&
      !dead &&
      !stunned
    ) {
      obj = collision_rectangle(x - 8, y - 8, x + 8, y + 8, oBombBox, 0, 0);
      if (
        !obj.held &&
        obj.cost == 0 &&
        !collision_point(obj.x, obj.y, oSolid, 0, 0)
      ) {
        global.bombs += 12;
        disp = instance_create(obj.x, obj.y - 14, oItemsGet);
        disp.sprite_index = sBombsGet;
        instances_of(obj).forEach(($) => {
          with ($) {
            instance_destroy();
          }
        });
        playSound(global.sndPickup);
        global.message = 'YOU GOT 12 MORE BOMBS!';
        global.message2 = '';
        global.messageTimer = 120;
      }
    }

    if (
      collision_rectangle(x - 8, y - 8, x + 8, y + 8, oRopePile, 0, 0) &&
      !dead &&
      !stunned
    ) {
      obj = collision_rectangle(x - 8, y - 8, x + 8, y + 8, oRopePile, 0, 0);
      if (
        !obj.held &&
        obj.cost == 0 &&
        !collision_point(obj.x, obj.y, oSolid, 0, 0)
      ) {
        global.rope += 3;
        disp = instance_create(obj.x, obj.y - 15, oItemsGet);
        disp.sprite_index = sRopeGet;
        instances_of(obj).forEach(($) => {
          with ($) {
            instance_destroy();
          }
        });
        playSound(global.sndPickup);
        global.message = 'YOU GOT 3 MORE ROPES!';
        global.message2 = '';
        global.messageTimer = 120;
      }
    }

    if (collision_point(x, y, oExit, 0, 0)) {
      if (holdItem != 0) {
        collect = false;
        if (holdItem.type == 'Gold Idol') {
          if (isRealLevel()) global.idolsConverted += 1;
          global.collect += holdItem.value * (global.levelType + 1);
          global.collectCounter += 20;
          if (global.collectCounter > 100) global.collectCounter = 100;
          if (holdItem.sprite_index == sCrystalSkull) global.skulls += 1;
          else global.idols += 1;
          playSound(global.sndCoin);
          instance_create(x, y - 8, oBigCollect);
          instances_of(holdItem).forEach(($) => {
            with ($) {
              instance_destroy();
            }
          });
          holdItem = 0;
        } else if (holdItem.type == 'Damsel') {
          if (holdItem.active && holdItem.hp > 0) {
            if (isRealLevel()) global.damselsSavedTotal += 1;
            global.damsels += 1;
            global.xdamsels += 1;
            door = instance_place(x, y, oExit);
            holdItem.x = door.x + 8;
            holdItem.y = door.y + 8;
            instances_of(holdItem).forEach(($) => {
              with ($) {
                if (global.isDamsel) sprite_index = sPExit;
                else sprite_index = sDamselExit2;
                status = 4;
                held = false;
                xVel = 0;
                yVel = 0;
                playSound(global.sndSteps);
                depth = 1000;
                active = false;
                canPickUp = false;
              }
            });

            holdItem = 0;
          }
        }
      }
    }

    global.xmoney += global.money - money;

    if (holdItem) {
      if (state == CLIMBING && (global.hasJetpack || global.hasCape))
        holdItem.depth = 51;
      else holdItem.depth = 0;
    }

    if (
      state == DUCKTOHANG &&
      sprite_index != sDuckToHangL &&
      sprite_index != sDamselDtHL &&
      sprite_index != sTunnelDtHL
    ) {
      state = STANDING;
    }

    // prevent player from dying on title screen
    if (isRoom('rTitle') || isRoom('rHighscores')) {
      if (global.isTunnelMan) global.plife = 2;
      else global.plife = 4;
    }

    if (global.plife > 99) global.plife = 99;
    if (global.bombs > 99) global.bombs = 99;
    if (global.rope > 99) global.rope = 99;

    if (global.hasCape && !instance_exists(oCape)) instance_create(x, y, oCape);

    if (instance_exists(oCape)) {
      if (oCape.open) fallTimer = 0;
    }

    // kapala
    if (redColor > 0) {
      if (redToggle) redColor -= 5;
      else if (redColor < 20) redColor += 5;
      else redToggle = true;
    } else redColor = 0;

    if (holdArrow == ARROW_BOMB) {
      if (bombArrowCounter > 0) bombArrowCounter -= 1;
      else {
        instance_create(x, y, oExplosion);
        if (global.graphicsHigh) {
          scrCreateFlame(x, y, 3);
        }
        bombArrowCounter = 80;
        holdArrow = 0;
      }

      if (isInShop(x, y)) {
        scrShopkeeperAnger(2);
      }
    }

    // exit game from title screen
    if (isRoom('rTitle') && state == CLIMBING && y < 32) {
      if (holdItem) {
        holdItem.held = false;
        holdItem = 0;
        pickupItemType = '';
      }
      instance_create(x, y, oPDummy5);
      instance_destroy();
    }

    // instead of destroying the player instance when dead, we occasionally make him disappear
    // i.e. being eaten by plant
    if (dead && !visible) {
      xVel = 0;
      yVel = 0;
      grav = 0;
      myGrav = 0;
      bounced = true;
    }

    // find distance to nearest light source, used for dark rooms
    // aka longest variable name ever
    distToNearestLightSource = 999;
    if (instance_exists(oExplosion)) {
      source = instance_nearest(x, y, oExplosion);
      distToNearestLightSource = distance_to_object(source);
      if (source.image_index <= 3)
        distToNearestLightSource -= source.image_index * 16;
      else distToNearestLightSource += (source.image_index - 3) * 16;
    }
    if (instance_exists(oLava)) {
      source = instance_nearest(x, y, oLava);
      if (distance_to_object(source) < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source);
    }
    if (instance_exists(oLamp)) {
      source = instance_nearest(x, y, oLamp);
      if (distance_to_object(source) < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source);
    }
    if (instance_exists(oLampItem)) {
      source = instance_nearest(x, y, oLampItem);
      if (distance_to_object(source) < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source);
    }
    if (instance_exists(oFlareCrate)) {
      source = instance_nearest(x, y, oFlareCrate);
      if (distance_to_object(source) < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source);
    }
    if (instance_exists(oTikiTorch)) {
      source = instance_nearest(x, y, oTikiTorch);
      if (distance_to_object(source) + 48 < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source) + 48;
    }
    if (instance_exists(oArrowTrapLeftLit)) {
      source = instance_nearest(x, y, oArrowTrapLeftLit);
      if (distance_to_object(source) + 48 < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source) + 48;
    }
    if (instance_exists(oArrowTrapRightLit)) {
      source = instance_nearest(x, y, oArrowTrapRightLit);
      if (distance_to_object(source) + 48 < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source) + 48;
    }
    if (instance_exists(oSpearTrapLit)) {
      source = instance_nearest(x, y, oSpearTrapLit);
      if (distance_to_object(source) + 48 < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source) + 48;
    }
    if (instance_exists(oSmashTrapLit)) {
      source = instance_nearest(x, y, oSmashTrapLit);
      if (distance_to_object(source) + 48 < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source) + 48;
    }
    if (instance_exists(oShotgunBlastLeft)) {
      source = instance_nearest(x, y, oShotgunBlastLeft);
      if (distance_to_object(source) < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source);
    }
    if (instance_exists(oShotgunBlastRight)) {
      source = instance_nearest(x, y, oShotgunBlastRight);
      if (distance_to_object(source) < distToNearestLightSource)
        distToNearestLightSource = distance_to_object(source);
    }

    // WHOA
    if (
      sprite_index == sWhoaLeft ||
      sprite_index == sDamselWhoaL ||
      sprite_index == sTunnelWhoaL
    ) {
      if (whoaTimer > 0) whoaTimer -= 1;
      else if (holdItem) {
        holdItem.held = false;
        if (facing == LEFT) holdItem.xVel = -2;
        else holdItem.xVel = 2;
        if (holdItem.type == 'Damsel') playSound(global.sndDamsel);
        if (holdItem.type == 'Bow' && bowArmed) {
          scrFireBow();
        }
        if (holdItem.type == pickupItemType) {
          holdItem = 0;
          pickupItemType = '';
        } else scrHoldItem(pickupItemType);
      }
    } else whoaTimer = whoaTimerMax;

    // FIRING
    if (firing > 0) firing -= 1;

    // WATER
    if (collision_point(x, y, oWaterSwim, -1, -1)) {
      if (!swimming) {
        instance_create(x, y - 8, oSplash);
        swimming = true;
        playSound(global.sndSplash);
      }
    }

    // BURNING
    if (burning > 0) {
      if (rand(1, 5) == 1)
        instance_create(x - 8 + rand(4, 12), y - 8 + rand(4, 12), oBurn);
      burning -= 1;
    }

    // LAVA
    if (collision_point(x, y + 6, oLava, 0, 0)) {
      if (!dead) {
        if (isRealLevel()) global.miscDeaths[11] += 1;
        playSound(global.sndFlame);
      }
      global.plife -= 99;
      // dead = true;
      xVel = 0;
      yVel = 0.1;
      grav = 0;
      myGrav = 0;
      bounced = true;
      burning = 100;
      depth = 999;
    }

    // JETPACK
    if (global.hasJetpack && platformCharacterIs(ON_GROUND)) {
      jetpackFuel = 50;
    }

    // fall off bottom of screen
    if (y > room_height + 16 && !dead) {
      if (isRealLevel()) global.miscDeaths[10] += 1;
      global.plife -= 99;
      xVel = 0;
      yVel = 0;
      grav = 0;
      myGrav = 0;
      bounced = true;
      if (holdItem) {
        holdItem.visible = true;
        holdItem.held = false;
        holdItem = 0;
        pickupItemType = '';
      }
      playSound(global.sndThud);
      playSound(global.sndDie);
    }

    if (active) {
      if (
        stunTimer > 0 &&
        (sprite_index == sStunL ||
          sprite_index == sDamselStunL ||
          sprite_index == sTunnelStunL)
      ) {
        image_speed = 0.4;
        stunTimer -= 1;
      }

      if (
        stunTimer < 1 &&
        (sprite_index == sStunL ||
          sprite_index == sDamselStunL ||
          sprite_index == sTunnelStunL)
      )
        stunned = false;

      if (instance_exists(oParachute)) fallTimer = 0;

      if (yVel > 1 && state != CLIMBING) {
        fallTimer += 1;
        if (fallTimer > 16) wallHurt = 0; // no sense in them taking extra damage from being thrown here
        if (global.hasParachute && !stunned && fallTimer > 12) {
          if (!collision_line(x, y + 16, x, y + 32, oSolid, 0, 0)) {
            instance_create(x - 8, y - 16, oParachute);
            fallTimer = 0;
            global.hasParachute = false;
          }
        }
      } else if (
        platformCharacterIs(ON_GROUND) &&
        fallTimer > 16 &&
        !collision_rectangle(x - 8, y - 8, x + 8, y + 8, oSpringTrap, 0, 0)
      ) {
        // LONG DROP
        // LONG DROP
        stunned = true;
        if (fallTimer > 48) global.plife -= 10;
        else if (fallTimer > 32) global.plife -= 2;
        else global.plife -= 1;
        if (global.plife < 1) {
          scrCreateBlood(x, y, 3);
          if (isRealLevel()) global.miscDeaths[3] += 1;
        }
        bounced = true;
        stunTimer += 60;
        yVel = -3;
        fallTimer = 0;
        obj = instance_create(x - 4, y + 6, oPoof);
        instances_of(obj).forEach(($) => {
          with ($) {
            xVel = -0.4;
          }
        });
        obj = instance_create(x + 4, y + 6, oPoof);
        instances_of(obj).forEach(($) => {
          with ($) {
            xVel = 0.4;
          }
        });
        playSound(global.sndThud);
      } // if (collision_point(x, y+9, oSolid, 0, 0) || state == JUMPING || state == HANGING || state == CLIMBING || state == DUCKING)
      else {
        fallTimer = 0;
        if (instance_exists(oParachute)) {
          instance_create(x - 8, y - 16 - 8, oParaUsed);
          instances_of(oParachute).forEach(($) => {
            with ($) {
              instance_destroy();
            }
          });
        }
      }

      // if (stunned) fallTimer = 0;

      if (swimming && !collision_point(x, y, oLava, 0, 0)) {
        fallTimer = 0;
        if (bubbleTimer > 0) bubbleTimer -= 1;
        else {
          instance_create(x, y - 4, oBubble);
          bubbleTimer = bubbleTimerMax;
        }
      } else {
        bubbleTimer = bubbleTimerMax;
      }

      if (
        state != DUCKTOHANG &&
        !stunned &&
        !dead &&
        sprite_index != sPExit &&
        sprite_index != sDamselExit &&
        sprite_index != sTunnelExit
      ) {
        bounced = false;
        characterStepEvent();
      } else if (state != DUCKING && state != DUCKTOHANG) {
        state = STANDING;
      }
    }

    // if (dead || stunned)
    if (dead || stunned) {
      if (holdItem) {
        if (holdItem.type == 'Bow' && bowArmed) {
          scrFireBow();
        }

        holdItem.visible = true;
        holdItem.held = false;

        if (holdItem.type == 'Arrow') {
          holdItem.safe = true;
          holdItem.alarm[2] = 30;
        }

        holdItem.xVel = xVel;
        holdItem.yVel = -3;

        if (holdItem.type == 'Damsel') {
          holdItem.status = 2;
          holdItem.counter = 120;
        }

        if (holdItem.type == pickupItemType) {
          holdItem = 0;
          pickupItemType = '';
        } else scrHoldItem(pickupItemType);
      }

      if (bounced) yVel += 1;
      else yVel += 0.6;

      if (isCollisionTop(1) && yVel < 0) {
        yVel = -yVel * 0.8;
      }

      if (isCollisionLeft(1) || isCollisionRight(1)) {
        xVel = -xVel * 0.5;
      }

      var collisionbottomcheck;
      collisionbottomcheck = isCollisionBottom(1);
      if (collisionbottomcheck || isCollisionPlatformBottom(1)) {
        // bounce
        if (collisionbottomcheck) {
          if (yVel > 2.5) yVel = -yVel * 0.5;
          else yVel = 0;
        } else fallTimer -= 1; //after falling onto a platform don't take extra damage after recovering from stunning

        // friction
        if (abs(xVel) < 0.1) xVel = 0;
        else if (abs(xVel) != 0 && collision_point(x, y + 16, oIce, 0, 0))
          xVel *= 0.8;
        else if (abs(xVel) != 0) xVel *= 0.3;

        bounced = true;
      }

      // apply the limits since the velocity may be too extreme
      xVelLimit = 10;
      if (xVel > xVelLimit) xVel = xVelLimit;
      else if (xVel < -xVelLimit) xVel = -xVelLimit;
      if (yVel > yVelLimit) yVel = yVelLimit;
      else if (yVel < -yVelLimit) yVel = -yVelLimit;

      moveTo(xVel, yVel);
    } else if (isLevel()) {
      // look up && down
      if (
        kDown &&
        (platformCharacterIs(ON_GROUND) || state == HANGING) &&
        !kRight &&
        !kLeft
      ) {
        if (viewCount <= 30) viewCount += 1;
        else view_yview[0] += 4;
      } else if (
        kUp &&
        (platformCharacterIs(ON_GROUND) || state == HANGING) &&
        !kRight &&
        !kLeft
      ) {
        if (viewCount <= 30) viewCount += 1;
        else view_yview[0] -= 4;
      } else viewCount = 0;
    }

    if (dead) {
      kAttackPressed = checkAttackPressed();
    }

    if (global.plife > 0) kBombPressed = checkBombPressed();
    else kBombPressed = false;

    if (global.plife > 0) kRopePressed = checkRopePressed();
    else kRopePressed = false;

    kPayPressed = checkPayPressed();
    // kFlarePressed = checkFlarePressed();

    if (
      (sprite_index == sAttackLeft ||
        sprite_index == sDamselAttackL ||
        sprite_index == sTunnelAttackL) &&
      facing == LEFT &&
      image_index > 4 &&
      instance_number(oWhip) == 0
    ) {
      if (holdItem) {
        if (holdItem.type == 'Machete') {
          obj = instance_create(x - 16, y, oSlash);
          obj.sprite_index = sSlashLeft;
          playSound(global.sndWhip);
        } else if (holdItem.type == 'Mattock') {
          obj = instance_create(x - 16, y, oMattockHit);
          obj.sprite_index = sMattockHitL;
          playSound(global.sndWhip);
        }
      } else {
        if (global.isTunnelMan) {
          obj = instance_create(x - 16, y, oMattockHit);
          obj.sprite_index = sMattockHitL;
          playSound(global.sndWhip);
        } else {
          obj = instance_create(x - 16, y, oWhip);
          obj.sprite_index = sWhipLeft;
          playSound(global.sndWhip);
        }
      }
    } else if (
      (sprite_index == sAttackLeft ||
        sprite_index == sDamselAttackL ||
        sprite_index == sTunnelAttackL) &&
      facing == RIGHT &&
      image_index > 4 &&
      instance_number(oWhip) == 0
    ) {
      if (holdItem) {
        if (holdItem.type == 'Machete') {
          obj = instance_create(x + 16, y, oSlash);
          obj.sprite_index = sSlashRight;
          playSound(global.sndWhip);
        } else if (holdItem.type == 'Mattock') {
          obj = instance_create(x + 16, y, oMattockHit);
          obj.sprite_index = sMattockHitR;
          playSound(global.sndWhip);
        }
      } else {
        if (global.isTunnelMan) {
          obj = instance_create(x + 16, y, oMattockHit);
          obj.sprite_index = sMattockHitR;
          playSound(global.sndWhip);
        } else {
          obj = instance_create(x + 16, y, oWhip);
          obj.sprite_index = sWhipRight;
          playSound(global.sndWhip);
        }
      }
    }

    if (holdItem) {
      if (holdItem.type == 'Machete') {
        if (
          (sprite_index == sAttackLeft ||
            sprite_index == sDamselAttackL ||
            sprite_index == sTunnelAttackL) &&
          facing == LEFT &&
          image_index < 2 &&
          instance_number(oMachetePre) == 0
        ) {
          obj = instance_create(x + 16, y, oMachetePre);
          obj.sprite_index = sMachetePreL;
        } else if (
          (sprite_index == sAttackLeft ||
            sprite_index == sDamselAttackL ||
            sprite_index == sTunnelAttackL) &&
          facing == RIGHT &&
          image_index < 2 &&
          instance_number(oMachetePre) == 0
        ) {
          obj = instance_create(x - 16, y, oMachetePre);
          obj.sprite_index = sMachetePreR;
        }
      } else if (holdItem.type == 'Mattock') {
        if (
          (sprite_index == sAttackLeft ||
            sprite_index == sDamselAttackL ||
            sprite_index == sTunnelAttackL) &&
          facing == LEFT &&
          image_index < 2 &&
          instance_number(oMachetePre) == 0
        ) {
          obj = instance_create(x + 16, y, oMattockPre);
          obj.sprite_index = sMattockPreL;
        } else if (
          (sprite_index == sAttackLeft ||
            sprite_index == sDamselAttackL ||
            sprite_index == sTunnelAttackL) &&
          facing == RIGHT &&
          image_index < 2 &&
          instance_number(oMachetePre) == 0
        ) {
          obj = instance_create(x - 16, y, oMattockPre);
          obj.sprite_index = sMattockPreR;
        }
      }
    } else if (
      sprite_index == sTunnelAttackL &&
      image_index < 2 &&
      instance_number(oMattockPre) == 0
    ) {
      if (facing == LEFT) {
        obj = instance_create(x + 16, y, oMattockPre);
        obj.sprite_index = sMattockPreL;
      } else {
        obj = instance_create(x - 16, y, oMattockPre);
        obj.sprite_index = sMattockPreR;
      }
    } else if (
      (sprite_index == sAttackLeft ||
        sprite_index == sDamselAttackL ||
        sprite_index == sTunnelAttackL) &&
      facing == LEFT &&
      image_index < 2 &&
      instance_number(oWhipPre) == 0
    ) {
      obj = instance_create(x + 16, y, oWhipPre);
      obj.sprite_index = sWhipPreL;
    } else if (
      (sprite_index == sAttackLeft ||
        sprite_index == sDamselAttackL ||
        sprite_index == sTunnelAttackL) &&
      facing == RIGHT &&
      image_index < 2 &&
      instance_number(oWhipPre) == 0
    ) {
      obj = instance_create(x - 16, y, oWhipPre);
      obj.sprite_index = sWhipPreR;
    }

    if (!whipping) {
      instances_of(oWhip).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
      instances_of(oWhipPre).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
    }

    if (holdItem > 0) {
      if (holdItem.cost > 0 && isLevel()) {
        if (
          global.roomPath[_arrayIndex(scrGetRoomX(x), scrGetRoomY(y))] != 4 &&
          global.roomPath[_arrayIndex(scrGetRoomX(x), scrGetRoomY(y))] != 5
        ) {
          scrStealItem();
          if (instance_exists(oShopkeeper)) {
            scrShopkeeperAnger(0);
          }
        }
      } else if (holdItem.cost > 0) {
        scrStealItem();
      }
    }

    // open chest
    if (kUp && kAttackPressed && collision_point(x, y, oChest, 0, 0)) {
      if (isRealLevel()) global.totalChests += 1;
      chest = instance_place(x, y, oChest);
      if (chest.sprite_index == sChest) {
        chest.sprite_index = sChestOpen;
        if (rand(1, 12) == 1 && global.currLevel > 0) {
          obj = instance_create(chest.x, chest.y, oBomb);
          obj.xVel = rand(0, 3) - rand(0, 3);
          obj.yVel = -2;
          instances_of(obj).forEach(($) => {
            with ($) {
              sprite_index = sBombArmed;
              alarm[1] = 40;
            }
          });

          playSound(global.sndTrap);
        } else {
          playSound(global.sndChestOpen);
          repeat(rand(3, 4));
          {
            n = rand(1, 3);
            switch (n) {
              case 1: {
                obj = instance_create(chest.x, chest.y, oEmerald);
                break;
              }
              case 2: {
                obj = instance_create(chest.x, chest.y, oSapphire);
                break;
              }
              case 3: {
                obj = instance_create(chest.x, chest.y, oRuby);
                break;
              }
            }
            obj.xVel = rand(0, 3) - rand(0, 3);
            obj.yVel = -2;
          }
          if (rand(1, 4) == 1) {
            n = rand(1, 3);
            switch (n) {
              case 1: {
                obj = instance_create(chest.x, chest.y, oEmeraldBig);
                break;
              }
              case 2: {
                obj = instance_create(chest.x, chest.y, oSapphireBig);
                break;
              }
              case 3: {
                obj = instance_create(chest.x, chest.y, oRubyBig);
                break;
              }
            }
            obj.xVel = rand(0, 3) - rand(0, 3);
            obj.yVel = -2;
          }
        }

        kAttackPressed = false;
      }
    }

    // open crate
    if (kUp && kAttackPressed && collision_point(x, y, oCrate, 0, 0)) {
      if (isRealLevel()) global.totalCrates += 1;
      chest = instance_place(x, y, oCrate);
      if (isRoom('rTutorial'))
        obj = instance_create(chest.x, chest.y, oBombBag);
      else if (rand(1, 500) == 1)
        obj = instance_create(chest.x, chest.y, oJetpack);
      else if (rand(1, 200) == 1)
        obj = instance_create(chest.x, chest.y, oCapePickup);
      else if (rand(1, 100) == 1)
        obj = instance_create(chest.x, chest.y, oShotgun);
      else if (rand(1, 100) == 1)
        obj = instance_create(chest.x, chest.y, oMattock);
      else if (rand(1, 100) == 1)
        obj = instance_create(chest.x, chest.y, oTeleporter);
      else if (rand(1, 90) == 1)
        obj = instance_create(chest.x, chest.y, oGloves);
      else if (rand(1, 90) == 1)
        obj = instance_create(chest.x, chest.y, oSpectacles);
      else if (rand(1, 80) == 1)
        obj = instance_create(chest.x, chest.y, oWebCannon);
      else if (rand(1, 80) == 1)
        obj = instance_create(chest.x, chest.y, oPistol);
      else if (rand(1, 80) == 1) obj = instance_create(chest.x, chest.y, oMitt);
      else if (rand(1, 60) == 1)
        obj = instance_create(chest.x, chest.y, oPaste);
      else if (rand(1, 60) == 1)
        obj = instance_create(chest.x, chest.y, oSpringShoes);
      else if (rand(1, 60) == 1)
        obj = instance_create(chest.x, chest.y, oSpikeShoes);
      else if (rand(1, 60) == 1)
        obj = instance_create(chest.x, chest.y, oMachete);
      else if (rand(1, 40) == 1)
        obj = instance_create(chest.x, chest.y, oBombBox);
      else if (rand(1, 40) == 1) obj = instance_create(chest.x, chest.y, oBow);
      else if (rand(1, 20) == 1)
        obj = instance_create(chest.x, chest.y, oCompass);
      else if (rand(1, 10) == 1)
        obj = instance_create(chest.x, chest.y, oParaPickup);
      else if (rand(1, 2) == 1)
        obj = instance_create(chest.x, chest.y, oRopePile);
      else obj = instance_create(chest.x, chest.y, oBombBag);
      obj.cost = 0;
      playSound(global.sndPickup);
      if (chest == holdItem) {
        holdItem = 0;
        pickupItemType = '';
      }
      instances_of(chest).forEach(($) => {
        with ($) {
          instance_create(x, y, oPoof);
          instance_destroy();
        }
      });

      kAttackPressed = false;
    }

    // open flare crate

    if (kUp && kAttackPressed && collision_point(x, y, oFlareCrate, 0, 0)) {
      chest = instance_place(x, y, oFlareCrate);
      for (i = 0; i < 3; i += 1) {
        obj = instance_create(chest.x, chest.y, oFlare);
        obj.xVel = rand(0, 3) - rand(0, 3);
        obj.yVel = rand(1, 3) * -1;
      }
      playSound(global.sndPickup);
      if (chest == holdItem) {
        holdItem = 0;
        pickupItemType = '';
      }
      instances_of(chest).forEach(($) => {
        with ($) {
          instance_create(x, y, oPoof);
          instance_destroy();
        }
      });

      kAttackPressed = false;
    }

    //
    // start game
    //
    if (
      !dead &&
      !stunned &&
      !whipping &&
      collision_point(x, y, oXStart, 0, 0) &&
      kUp &&
      platformCharacterIs(ON_GROUND) &&
      sprite_index != sPExit &&
      sprite_index != sDamselExit &&
      sprite_index != sTunnelExit
    ) {
      // oXEnd is the child of oXStart, for some reason, that's why this is here:
      if (isRoom('rOlmec') && holdItem) {
        if (holdItem.heavy) {
          holdItem.held = false;
          holdItem = 0;
          pickupItemType = '';
        } else if (holdItem.type == 'Bomb') {
          if (holdItem.armed) {
            holdItem.held = false;
          } else {
            global.bombs += 1;
            instances_of(holdItem).forEach(($) => {
              with ($) {
                instance_destroy();
              }
            });
          }

          global.pickupItem = pickupItemType;
        } else if (holdItem.type == 'Rope') {
          global.rope += 1;
          instances_of(holdItem).forEach(($) => {
            with ($) {
              instance_destroy();
            }
          });

          global.pickupItem = pickupItemType;
        } else {
          global.pickupItem = holdItem.type;
          instances_of(holdItem).forEach(($) => {
            with ($) {
              breakPieces = false;
              instance_destroy();
            }
          });
        }
      } else if (isRoom('rOlmec')) global.pickupItem = '';
      else if (holdItem) holdItem.held = false;
      holdItem = 0;
      pickupItemType = '';

      door = instance_place(x, y, oXStart);
      if (door) x = door.x + 8;
      if (global.isDamsel) sprite_index = sDamselExit;
      else if (global.isTunnelMan) sprite_index = sTunnelExit;
      else sprite_index = sPExit;
      image_speed = 0.5;
      active = false;
      depth = 999;
      invincible = 999;

      pExit = xSTART;
      if (collision_point(x, y, oXScores, 0, 0)) pExit = xSCORES;
      else if (collision_point(x, y, oXTutorial, 0, 0)) pExit = xTUTORIAL;
      else if (collision_point(x, y, oXTitle, 0, 0)) pExit = xTITLE;
      else if (collision_point(x, y, oXEnd, 0, 0)) pExit = xEND;
      else if (collision_point(x, y, oXShortcut5, 0, 0)) pExit = xSHORTCUT5;
      else if (collision_point(x, y, oXShortcut9, 0, 0)) pExit = xSHORTCUT9;
      else if (collision_point(x, y, oXShortcut13, 0, 0)) pExit = xSHORTCUT13;
      else if (collision_point(x, y, oXSun, 0, 0)) pExit = xSUN;
      else if (collision_point(x, y, oXMoon, 0, 0)) pExit = xMOON;
      else if (collision_point(x, y, oXStars, 0, 0)) pExit = xSTARS;
      else if (collision_point(x, y, oXChange, 0, 0)) pExit = xCHANGE;
      else if (collision_point(x, y, oXChange2, 0, 0)) pExit = xCHANGE2;

      if (pExit != xCHANGE2) stopAllMusic();

      playSound(global.sndSteps);
    }

    //
    // exit level
    //
    if (
      !dead &&
      !stunned &&
      !whipping &&
      collision_point(x, y, oExit, 0, 0) &&
      kUp &&
      platformCharacterIs(ON_GROUND) &&
      sprite_index != sPExit &&
      sprite_index != sDamselExit &&
      sprite_index != sTunnelExit
    ) {
      holdArrow = 0;
      global.pickupItem = '';
      if (holdItem) {
        if (holdItem.type == 'Gold Idol') {
          if (isRealLevel()) global.idolsConverted += 1;
          global.money += holdItem.value * (global.levelType + 1);
          if (holdItem.sprite_index == sCrystalSkull) global.skulls += 1;
          else global.idols += 1;
          playSound(global.sndCoin);
          instance_create(x, y - 8, oBigCollect);
          instances_of(holdItem).forEach(($) => {
            with ($) {
              instance_destroy();
            }
          });
          holdItem = 0;
        } else if (holdItem.type == 'Damsel') {
          if (holdItem.hp > 0) {
            // global.plife += 1;
            if (isRealLevel()) global.damselsSavedTotal += 1;
            global.damsels += 1;
            global.xdamsels += 1;
            door = instance_place(x, y, oExit);
            holdItem.x = door.x + 8;
            holdItem.y = door.y + 8;
            instances_of(holdItem).forEach(($) => {
              with ($) {
                if (global.isDamsel) sprite_index = sPExit;
                else sprite_index = sDamselExit;
                status = 4;
                held = false;
                xVel = 0;
                yVel = 0;
                playSound(global.sndSteps);
                depth = 1000;
                active = false;
              }
            });

            holdItem = 0;
          } else {
            holdItem.status = 2;
            holdItem.held = false;
            holdItem = 0;
            pickupItemType = '';
          }
        } else if (holdItem.heavy) {
          holdItem.held = false;
          holdItem = 0;
          pickupItemType = '';
        } else if (holdItem.type == 'Bomb') {
          if (holdItem.armed) {
            holdItem.held = false;
          } else {
            global.bombs += 1;
            instances_of(holdItem).forEach(($) => {
              with ($) {
                instance_destroy();
              }
            });
          }

          global.pickupItem = pickupItemType;
        } else if (holdItem.type == 'Rope') {
          global.rope += 1;
          instances_of(holdItem).forEach(($) => {
            with ($) {
              instance_destroy();
            }
          });

          global.pickupItem = pickupItemType;
        } else {
          global.pickupItem = holdItem.type;
          instances_of(holdItem).forEach(($) => {
            with ($) {
              breakPieces = false;
              instance_destroy();
            }
          });
        }
        holdItem = 0;
        pickupItemType = '';
      }

      door = instance_place(x, y, oExit);
      if (door) {
        x = door.x + 8;
        y = door.y + 8;
      }

      // money
      global.money += global.collect;
      global.xmoney += global.collect;
      global.collect = 0;

      if (global.isDamsel) sprite_index = sDamselExit;
      else if (global.isTunnelMan) sprite_index = sTunnelExit;
      else sprite_index = sPExit;
      image_speed = 0.5;
      active = false;
      invincible = 999;
      depth = 999;
      if (global.thiefLevel > 0) global.thiefLevel -= 1;
      if (global.currLevel == 1) global.currLevel += firstLevelSkip;
      else global.currLevel += levelSkip;
      stopAllMusic();
      playSound(global.sndSteps);
      if (collision_point(x, y, oXMarket, 0, 0)) global.genBlackMarket = true;
      if (collision_point(x, y, oXGold, 0, 0)) global.cityOfGold = true;
      obj = collision_point(x, y, oExit, 0, 0);
      if (obj) {
        if (obj.leadsTo != '') {
          global.nextCustomLevel = obj.leadsTo;
        }
      }

      instances_of(oMonkey).forEach(($) => {
        with ($) {
          // knock off monkeys that grabbed you
          if (status == 7) {
            xVel = rand(0, 1) - rand(0, 1);
            yVel = -4;
            status = 1;
            vineCounter = 20;
            grabCounter = 60;
          }
        }
      });
    }

    //
    // Game Over
    //
    if ((checkAttackPressed() || checkStartPressed()) && dead) {
      if (oGame.moneyCount < global.money || oGame.drawStatus < 3) {
        oGame.drawStatus = 3;
        oGame.moneyCount = global.money;
      } else {
        // Stats!
        if (isRealLevel()) global.levelDeaths[global.currLevel - 1] += 1;

        if (gamepad.attackPressed) gamepad.attackPressed = false;
        if (gamepad.startPressed) gamepad.startPressed = false;
        global.prevCustomLevel = '';
        if (global.testLevel != '') {
          scrClearGlobals();
          room_goto(rLevelEditor);
        } else if (global.customLevel) {
          scrClearGlobals();
          global.customLevel = false;
          room_goto(rLoadLevel);
        } else {
          scrClearGlobals();
          if (isRoom('rSun')) global.scoresStart = 1;
          if (isRoom('rMoon')) global.scoresStart = 2;
          if (isRoom('rStars')) global.scoresStart = 3;
          room_goto(rHighscores);
        }
      }
    }

    inGame = true;
    if (!isLevel()) {
      inGame = false;
    }

    if (dead || stunned || !active) {
      // do nothing
    } else if (inGame && kItemPressed && !whipping) {
      // switch items
      if (holdItem) {
        if (holdItem.sprite_index == sBombArmed) {
          // do nothing
        } else if (holdItem.sprite_index == sBomb) {
          instances_of(holdItem).forEach(($) => {
            with ($) {
              global.bombs += 1;
              instance_destroy();
            }
          });

          if (global.rope > 0) {
            holdItem = instance_create(x, y, oRopeThrow);
            holdItem.held = true;
            global.rope -= 1;
            whoaTimer = whoaTimerMax;
          } else {
            scrHoldItem(pickupItemType);
          }
        } else if (holdItem.sprite_index == sRopeEnd) {
          instances_of(holdItem).forEach(($) => {
            with ($) {
              global.rope += 1;
              instance_destroy();
            }
          });

          scrHoldItem(pickupItemType);
        } else if (!holdItem.heavy && holdItem.cost == 0) {
          if (global.bombs > 0 || global.rope > 0) {
            pickupItemType = holdItem.type;
            if (holdItem.type == 'Bow' && bowArmed) {
              scrFireBow();
            }
            instances_of(holdItem).forEach(($) => {
              with ($) {
                breakPieces = false;
                instance_destroy();
              }
            });
          }

          if (global.bombs > 0) {
            holdItem = instance_create(x, y, oBomb);
            if (global.hasStickyBombs) holdItem.sticky = true;
            holdItem.held = true;
            global.bombs -= 1;
            whoaTimer = whoaTimerMax;
          } else if (global.rope > 0) {
            holdItem = instance_create(x, y, oRopeThrow);
            holdItem.held = true;
            global.rope -= 1;
            whoaTimer = whoaTimerMax;
          }
        }
      } else {
        if (global.bombs > 0) {
          holdItem = instance_create(x, y, oBomb);
          if (global.hasStickyBombs) holdItem.sticky = true;
          holdItem.held = true;
          global.bombs -= 1;
          whoaTimer = whoaTimerMax;
        } else if (global.rope > 0) {
          holdItem = instance_create(x, y, oRopeThrow);
          holdItem.held = true;
          global.rope -= 1;
          whoaTimer = whoaTimerMax;
        }
      }
    } else if (inGame && kRopePressed && global.rope > 0 && !whipping) {
      if (!kDown && colTop) {
        // do nothing
      } else {
        if (kDown) {
          if (facing == LEFT) {
            obj = instance_create(x - 16, y, oRopeThrow);
          } else {
            obj = instance_create(x + 16, y, oRopeThrow);
          }

          instances_of(obj).forEach(($) => {
            with ($) {
              t = true;
              move_snap(16, 1);
              if (oPlayer1.x < x) {
                if (
                  !collision_point(oPlayer1.x + 8, oPlayer1.y, oSolid, 0, 0)
                ) {
                  if (
                    !collision_rectangle(x - 8, y, x - 7, y + 16, oSolid, 0, 0)
                  )
                    x -= 8;
                  else if (
                    !collision_rectangle(x + 7, y, x + 8, y + 16, oSolid, 0, 0)
                  )
                    x += 8;
                  else t = false;
                } else t = false;
              } else if (
                !collision_point(oPlayer1.x - 8, oPlayer1.y, oSolid, 0, 0)
              ) {
                if (!collision_rectangle(x + 7, y, x + 8, y + 16, oSolid, 0, 0))
                  x += 8;
                else if (
                  !collision_rectangle(x - 8, y, x - 7, y + 16, oSolid, 0, 0)
                )
                  x -= 8;
                else t = false;
              } else t = false;

              if (!t) {
                /*
                if (oPlayer1.facing == 18)
                {
                    obj = instance_create(oPlayer1.x-4, oPlayer1.y+2, oRopeThrow);
                    obj.xVel = -3.2;                
                }
                else
                {
                    obj = instance_create(oPlayer1.x+4, oPlayer1.y+2, oRopeThrow);
                    obj.xVel = 3.2;
                }
                obj.yVel = 0.5;
                */
                instance_destroy();
              } else {
                instance_create(x, y, oRopeTop);
                armed = false;
                falling = true;
                xVel = 0;
                yVel = 8;
                global.rope -= 1;
                playSound(global.sndThrow);
              }
            }
          });
        } else {
          obj = instance_create(x, y, oRopeThrow);
          obj.armed = true;
          obj.px = x;
          obj.py = y;
          obj.xVel = 0;
          obj.yVel = -12;
          global.rope -= 1;
          playSound(global.sndThrow);
        }
      }
    } else if (
      inGame &&
      kBombPressed &&
      global.bombs > 0 &&
      !whipping &&
      bowArmed
    ) {
      holdArrow = ARROW_BOMB;
      alarm[11] = 1;
    } else if (inGame && kBombPressed && global.bombs > 0 && !whipping) {
      obj = instance_create(x, y, oBomb);
      if (global.hasStickyBombs) obj.sticky = true;
      obj.sprite_index = sBombArmed;
      obj.armed = true;
      instances_of(obj).forEach(($) => {
        with ($) {
          alarm[0] = 80;
          image_speed = 0.2;
        }
      });

      obj.safe = true;
      obj.alarm[2] = 10;

      if (facing == LEFT) {
        obj.xVel = -8 + xVel;
      } else if (facing == RIGHT) {
        obj.xVel = 8 + xVel;
      }
      obj.yVel = -3;

      if (kUp) {
        obj.yVel = -9;
      }

      if (kDown) {
        if (platformCharacterIs(ON_GROUND)) obj.xVel *= 0.1;
        obj.yVel = 3;
      }

      global.bombs -= 1;
      playSound(global.sndThrow);
    } else if (holdItem == 0) {
      if (
        kAttackPressed &&
        state != DUCKING &&
        state != DUCKTOHANG &&
        !whipping &&
        sprite_index != sPExit &&
        sprite_index != sDamselExit
      ) {
        image_speed = 0.6;
        if (global.isTunnelMan) {
          if (platformCharacterIs(ON_GROUND)) {
            sprite_index = sTunnelAttackL;
            image_index = 0;
            whipping = true;
          }
        } else if (global.isDamsel) {
          sprite_index = sDamselAttackL;
          image_index = 0;
          whipping = true;
        } else {
          sprite_index = sAttackLeft;
          image_index = 0;
          whipping = true;
        }
      } else if (kAttackPressed && kDown) {
        // pick up item
        if (collision_rectangle(x - 8, y, x + 8, y + 8, oItem, 0, 0)) {
          obj = instance_nearest(x, y, oItem);
          if (obj.canPickUp && !collision_point(obj.x, obj.y, oSolid, 0, 0)) {
            holdItem = obj;
            holdItem.held = true;
            whoaTimer = whoaTimerMax;
            pickupItemType = holdItem.type;

            if (holdItem.type == 'Bow' && holdItem.new) {
              holdItem.new = false;
              global.arrows += 6;
            }

            if (
              holdItem.type == 'Gold Idol' &&
              holdItem.trigger &&
              !isRoom('rLoadLevel')
            ) {
              global.idolsGrabbed += 1;
              if (global.levelType == 0) {
                trap = instance_nearest(x, y - 64, oGiantTikiHead);
                instances_of(trap).forEach(($) => {
                  with ($) {
                    alarm[0] = 100;
                  }
                });
                scrShake(100);
                holdItem.trigger = false;
              } else if (global.levelType == 1) {
                if (global.cemetary && !global.ghostExists) {
                  if (oPlayer1.x > room_width / 2)
                    instance_create(
                      view_xview[0] + view_wview[0] + 8,
                      view_yview[0] + floor(view_hview[0] / 2),
                      oGhost
                    );
                  else
                    instance_create(
                      view_xview[0] - 32,
                      view_yview[0] + floor(view_hview[0] / 2),
                      oGhost
                    );
                  global.ghostExists = true;
                }
                instances_of(oTrapBlock).forEach(($) => {
                  with ($) {
                    dist = distance_to_object(oCharacter);
                    if (dist < 90) {
                      dying = true;
                      //instance_destroy();
                    }
                  }
                });
              } else if (global.levelType == 3) {
                if (instance_exists(oCeilingTrap)) {
                  instances_of(oCeilingTrap).forEach(($) => {
                    with ($) {
                      status = 1;
                      yVel = 0.5;
                    }
                  });

                  scrShake(20);
                  trap = instance_nearest(x - 64, y - 64, oDoor);
                  if (trap) {
                    trap.status = 1;
                    trap.yVel = 1;
                  }
                  trap = instance_nearest(x + 64, y - 64, oDoor);
                  if (trap) {
                    trap.status = 1;
                    trap.yVel = 1;
                  }
                } else {
                  instances_of(oTrapBlock).forEach(($) => {
                    with ($) {
                      dist = distance_to_object(oCharacter);
                      if (dist < 90) {
                        instance_destroy();
                      }
                      playSound(global.sndThump);
                      scrShake(10);
                    }
                  });
                }

                holdItem.trigger = false;
              }
            } else if (holdItem.type == 'Damsel') {
              if (holdItem.status == 4) {
                // exiting
                holdItem = 0;
                holdItem.held = false;
              } else {
                if (global.isDamsel) holdItem.sprite_index = sDieLBounce;
                else holdItem.sprite_index = sDamselHoldL;
              }
            } else if (holdItem.cost == 0) scrStealItem();
          }
        } else if (collision_rectangle(x - 8, y, x + 8, y + 8, oEnemy, 0, 0)) {
          obj = instance_nearest(x, y, oEnemy);
          if (obj.status >= 98 && obj.canPickUp) {
            holdItem = obj;
            holdItem.held = true;
            whoaTimer = whoaTimerMax;
            pickupItemType = holdItem.type;
          }
        }
      }
    } else if (kAttackPressed) {
      if (holdItem) {
        scrUseItem();
      }
    }

    /*
if (isLevel() and kFlarePressed and active and not dead and not stunned)
{
    if (global.flares &gt; 0)
    {
        flare = instance_create(x, y, oFlare);

        // drop any item you're already carrying
        if (holdItem)
        {
            if (facing == LEFT) holdItem.xVel = -1;
            else holdItem.xVel = 1;
            holdItem.yYel = -2;
            holdItem.held = false;
            holdItem = 0;
            pickupItemType = "";
        }

        with flare { held = true; }
        holdItem = flare;
        playSound(global.sndIgnite);
        global.darknessLerp = 1;
        global.flares -= 1;

        if (global.flares &gt; 1) global.message = string(global.flares) + " FLARES REMAINING.";
        else if (global.flares == 1) global.message = string(global.flares) + " FLARE REMAINING.";
        else global.message = "NO MORE FLARES!";
        global.message2 = "";
        global.messageTimer = 80;
    }
    else
    {
        global.message = "NO MORE FLARES!";
        global.message2 = "";
        global.messageTimer = 80;
    }
}
*/
    if (isLevel() && active && kPayPressed && !dead && !stunned) {
      if (isInShop(x, y) && instance_exists(oShopkeeper)) {
        n = 0;
        if (holdItem) {
          if (holdItem.cost <= 0) {
            // do nothing
          } else if (holdItem.cost > global.money) {
            global.message = "YOU HAVEN'T GOT ENOUGH MONEY!";
            global.message2 = '';
            global.messageTimer = 80;
            instances_of(holdItem).forEach(($) => {
              with ($) {
                held = false;
              }
            });
            holdItem = 0;
            pickupItemType = '';
            n = 1;
          } else {
            if (isRealLevel()) global.itemsBought += 1;
            global.money -= holdItem.cost;
            scrStealItem();
            //global.message = "THANK YOU!";
            //global.message2 = "";
            global.messageTimer = 80;
            // holdItem = 0;
          }
        }

        if (
          (global.blackMarket &&
            global.roomPath[_arrayIndex(scrGetRoomX(x), scrGetRoomY(y))] ==
              5) ||
          (!global.blackMarket && oShopkeeper.style == 'Craps')
        ) {
          if (global.thiefLevel > 0 || global.murderer) {
            // do nothing
          } else if (
            bet == 0 &&
            global.money >= 1000 + global.currLevel * 500
          ) {
            if (isRealLevel()) global.diceGamesPlayed += 1;
            bet = 1000 + global.currLevel * 500;
            global.money -= 1000 + global.currLevel * 500;
            global.message =
              'YOU BET $' + string(1000 + global.currLevel * 500) + '!';
            global.message2 = 'NOW ROLL THE DICE!';
            global.messageTimer = 200;
          } else if (bet > 0) {
            global.message = 'ONE BET AT A TIME!';
            global.message2 = 'PLEASE ROLL THE DICE!';
            global.messageTimer = 200;
          } else {
            global.message =
              'YOU NEED $' + string(1000 + global.currLevel * 500) + ' TO BET!';
            global.message2 = '';
            global.messageTimer = 200;
          }
        }

        if (
          oShopkeeper.style == 'Kissing' &&
          distance_to_object(oDamsel) < 16
        ) {
          obj = instance_nearest(x, y, oDamsel);
          if (global.thiefLevel > 0 || global.murderer || !obj.orSale) {
            // do nothing
          } else if (n == 0 && global.money >= getKissValue()) {
            if (obj.orSale && !obj.held) {
              if (isRealLevel()) global.kissesBought += 1;
              obj.status = 6;
              if (global.isDamsel) {
                obj.sprite_index = sPKissL;
              } else {
                obj.sprite_index = sDamselKissL;
              }
              global.money -= getKissValue();
              global.plife += 1;
              if (global.isDamsel) global.message = "NOW AIN'T HE SWEET!";
              else global.message = "NOW AIN'T SHE SWEET!";
              global.message2 = '';
              global.messageTimer = 200;
            }
          } else {
            if (n == 0)
              global.message = 'YOU NEED $' + string(getKissValue()) + '!';
            else global.message = 'YOU NEED $' + string(obj.cost) + '!';
            global.message2 = 'GET OUTTA HERE, DEADBEAT!';
            global.messageTimer = 200;
          }
        }
      }
    }

    if (kAttack && bowArmed && bowStrength < 12) {
      bowStrength += 0.2;
      if (!holdItem) {
        bowArmed = false;
        bowStrength = 0;
        if (SS_IsSoundPlaying(global.sndBowPull))
          SS_StopSound(global.sndBowPull);
      }
      holdArrow = ARROW_NORM;
    }

    if (kAttackReleased && bowArmed) {
      scrFireBow();
    }

    if (global.plife < -10000) global.plife = -10000;

    if (global.plife < -99 && visible) {
      scrCreateBlood(x, y, 3);
      visible = false;
    }

    if (
      global.plife >= -99 &&
      visible &&
      sprite_index != sPExit &&
      sprite_index != sDamselExit &&
      sprite_index != sTunnelExit
    ) {
      // crushed
      if (collision_point(x, y, oSolid, 0, 0)) {
        if (!collision_point(x, y, oMoaiInside, 0, 0)) {
          if (global.plife > 0) {
            if (isRealLevel()) {
              if (isRoom('rOlmec')) global.enemyDeaths[22] += 1;
              else if (collision_point(x, y, oBoulder, 0, 0))
                global.miscDeaths[5] += 1;
              else if (collision_point(x, y, oSmashTrap, 0, 0))
                global.miscDeaths[8] += 1;
              else global.miscDeaths[2] += 1;
            }
          }
          global.plife -= 99;
          active = false;
          yVel = -3;
          playSound(global.sndDie);

          scrCreateBlood(x, y, 3);

          visible = false;
        }
      }
      if (holdItem != 0) instance_deactivate_object(holdItem);
      if (collision_rectangle(x - 8, y - 8, x + 8, y + 8, oArrow, 0, 0)) {
        obj = instance_nearest(x, y, oArrow);
        if (obj && abs(obj.xVel) > 3 && !obj.safe) {
          if (global.plife > 0) {
            global.plife -= 2;
            if (global.plife <= 0 && isRealLevel()) global.miscDeaths[6] += 1;
          }
          xVel = obj.xVel;
          yVel = -4;

          scrCreateBlood(x, y, 3);

          instances_of(obj).forEach(($) => {
            with ($) {
              instance_destroy();
            }
          });

          playSound(global.sndHurt);
          stunned = true;
          stunTimer = 20;
        }
      }

      if (collision_rectangle(x - 8, y - 8, x + 8, y + 8, oRock, 0, 0)) {
        obj = instance_nearest(x, y, oRock);
        if (obj && abs(obj.xVel) > 4 && !obj.safe && !stunned && !dead) {
          if (global.hasMitt && !holdItem) {
            holdItem = oRock;
            holdItem.held = true;
            pickupItemType = holdItem.type;
          } else {
            if (global.plife > 0) {
              global.plife -= 2;
              if (global.plife <= 0 && isRealLevel()) global.miscDeaths[0] += 1;
            }
            xVel = obj.xVel;
            yVel = -4;

            scrCreateBlood(x, y, 3);

            playSound(global.sndHurt);
            stunned = true;
            stunTimer = 20;
          }
        }
      }
      if (holdItem != 0) instance_activate_object(holdItem);
      if (collision_rectangle(x - 8, y - 8, x + 8, y + 8, oLaser, 0, 0)) {
        obj = instance_nearest(x, y, oLaser);
        if (obj) {
          if (global.plife > 0) {
            global.plife -= 3;
            if (global.plife <= 0 && isRealLevel()) global.enemyDeaths[16] += 1;
          }
          if (obj.x < x) xVel = 2;
          else xVel = -2;
          yVel = -4;

          scrCreateBlood(x, y, 3);

          instances_of(obj).forEach(($) => {
            with ($) {
              instance_create(x, y, oLaserExplode);
              instance_destroy();
            }
          });

          playSound(global.sndHurt);
          stunned = true;
          stunTimer = 20;
        }
      }

      if (
        collision_rectangle(x - 8, y - 8, x + 8, y + 8, oPsychicWave, 0, 0) &&
        !stunned &&
        !dead
      ) {
        obj = instance_nearest(x, y, oPsychicWave);
        if (obj) {
          if (global.plife > 0) {
            global.plife -= 1;
            if (global.plife <= 0 && isRealLevel()) global.enemyDeaths[17] += 1;
          }
          if (obj.x < x) xVel = 2;
          else xVel = -2;
          yVel = -4;

          playSound(global.sndHurt);
          stunned = true;
          stunTimer = 40;
        }
      }

      if (collision_rectangle(x - 8, y - 8, x + 8, y + 8, oExplosion, 0, 0)) {
        global.plife -= 10;
        if (global.plife > 0 && isRealLevel()) global.miscDeaths[1] += 1;
        explosion = instance_nearest(x, y, oExplosion);
        if (explosion.x < x) xVel = rand(4, 6);
        else xVel = -rand(4, 6);
        yVel = -6;
        burning = 50;
        stunned = true;
        stunTimer = 100;

        scrCreateBlood(x, y, 1);
      }

      obj = collision_rectangle(x - 6, y - 6, x + 6, y + 7, oSpearsLeft, 0, 0);
      instance_nearest(x, y, oSpearsLeft);
      if (obj) {
        if (obj.image_index >= 20 && obj.image_index < 24) {
          if (global.plife > 0 && isRealLevel()) global.miscDeaths[7] += 1;

          // stunned = true;
          // bounced  = false;
          global.plife -= 4;
          if ((obj.sprite_index = sSpearsLeft)) xVel = -rand(4, 6);
          else xVel = rand(4, 6);
          yVel = -6;
          y -= 1;
          // state = FALLING;

          scrCreateBlood(x, y, 1);
        }
      }

      if (collision_rectangle(x - 6, y - 6, x + 6, y + 7, oSmashTrap, 0, 0)) {
        if (global.plife > 0 && isRealLevel()) global.miscDeaths[8] += 1;

        obj = instance_nearest(x, y, oSmashTrap);
        global.plife -= 10;
        if (obj.x + 8 < x) xVel = -rand(4, 6);
        else xVel = rand(4, 6);
        yVel = -6;
        if (obj) {
          if (obj.dir == 1) yVel = 4;
        }
        //RIGHT = 0;
        //DOWN = 1;
        //LEFT = 2;
        //UP = 3;
        scrCreateBlood(x, y, 1);
        if (holdItem) {
          holdItem.held = false;
          holdItem = 0;
        }
      }

      obj = collision_rectangle(x - 2, y - 9, x + 2, y - 7, oCeilingTrap, 0, 0); //instance_nearest(x, y-8, oCeilingTrap);
      if (obj) {
        if (obj.status > 0) {
          if (global.plife > 0 && isRealLevel()) global.miscDeaths[9] += 1;

          global.plife -= 10;
          scrCreateBlood(x, y, 1);
        }
      }

      colSpikes = false;
      if (collision_rectangle(x - 4, y - 4, x + 4, y + 8, oSpikes, 0, 0))
        colSpikes = true;

      if (colSpikes && dead) {
        //grav = 0;
        if (!collision_point(x, y + 9, oSolid, 0, 0)) y += 0.05;
        else myGrav = 0.6;
      } else myGrav = 0.6;

      if (colSpikes && yVel > 0 && (fallTimer > 3 || stunned)) {
        if (!dead) {
          if (isRealLevel()) global.miscDeaths[4] += 1;
          scrCreateBlood(x, y, 3);
          global.plife -= 99;
          xVel = 0;
          yVel = 0;
          myGrav = 0;
        }

        obj = instance_place(x, y, oSpikes);
        if (obj) {
          instances_of(obj).forEach(($) => {
            with ($) {
              sprite_index = sSpikesBlood;
            }
          });
        }
      }
      //else if (!dead) myGrav = 0.6;
    }

    /* Deprecated, see similar code in first code block.
if ((dead or stunned) and holdItem != 0)
{
    holdItem.held = false;
    
    holdItem.xVel = xVel;
    holdItem.yVel = -6;
    holdItem.armed = true;
    if (holdItem.type == "Damsel")
    {
        holdItem.status = 2;
    }
    else if (holdItem.type == "Bow")
    {
        scrFireBow();
    }
    
    if (holdItem.type == pickupItemType)
    {
        holdItem = 0;
        pickupItemType = "";
    }
    else scrHoldItem(pickupItemType);
}
*/

    if (dead || stunned) {
      if (instance_exists(oParachute)) {
        instance_create(x - 8, y - 16 - 8, oParaUsed);
        instances_of(oParachute).forEach(($) => {
          with ($) {
            instance_destroy();
          }
        });
      }

      if (whipping) {
        whipping = false;
        instances_of(oWhip).forEach(($) => {
          with ($) {
            instance_destroy();
          }
        });
      }

      if (global.isDamsel) {
        if (xVel == 0) {
          if (dead) sprite_index = sDamselDieL;
          else if (stunned) sprite_index = sDamselStunL;
        } else if (bounced) {
          if (yVel < 0) sprite_index = sDamselBounceL;
          else sprite_index = sDamselFallL;
        } else {
          if (xVel < 0) sprite_index = sDamselDieLL;
          else sprite_index = sDamselDieLR;
        }
      } else if (global.isTunnelMan) {
        if (xVel == 0) {
          if (dead) sprite_index = sTunnelDieL;
          else if (stunned) sprite_index = sTunnelStunL;
        } else if (bounced) {
          if (yVel < 0) sprite_index = sTunnelLBounce;
          else sprite_index = sTunnelFallL;
        } else {
          if (xVel < 0) sprite_index = sTunnelDieLL;
          else sprite_index = sTunnelDieLR;
        }
      } else {
        if (xVel == 0) {
          if (dead) sprite_index = sDieL;
          else if (stunned) sprite_index = sStunL;
        } else if (bounced) {
          if (yVel < 0) sprite_index = sDieLBounce;
          else sprite_index = sDieLFall;
        } else {
          if (xVel < 0) sprite_index = sDieLL;
          else sprite_index = sDieLR;
        }
      }

      if (collision_point(x, y, oSpikes, 0, 0) && dead && yVel != 0) {
        if (rand(1, 8) == 1) scrCreateBlood(other.x, other.y, 1);
      }

      if (isCollisionRight(1) || isCollisionLeft(1) || isCollisionBottom(1)) {
        if (wallHurt > 0) {
          for (i = 0; i < 3; i += 1) {
            instance_create(other.x, other.y, oBlood);
          }
          global.plife -= 1;
          if (global.plife <= 0) {
            if (shopThrow && isRealLevel()) global.enemyDeaths[19] += 1;
            else if (yetiThrow && isRealLevel()) global.enemyDeaths[13] += 1;
            else if (hawkThrow && isRealLevel()) global.enemyDeaths[18] += 1;
          }
          wallHurt -= 1;
          playSound(global.sndHurt);
        }
      }

      if (isCollisionBottom(1) && !bounced) {
        bounced = true;
        for (i = 0; i < 3; i += 1) {
          scrCreateBlood(other.x, other.y, 1);
        }

        if (wallHurt > 0) {
          global.plife -= 1;
          if (global.plife <= 0) {
            if (shopThrow && isRealLevel()) global.enemyDeaths[19] += 1;
            else if (yetiThrow && isRealLevel()) global.enemyDeaths[13] += 1;
            else if (hawkThrow && isRealLevel()) global.enemyDeaths[18] += 1;
          }
          wallHurt -= 1;
        }
      }

      if (wallHurt == 0) {
        shopThrow = false;
        yetiThrow = false;
        hawkThrow = false;
      }
    }

    // DIED

    if (dead && deadCounter > 0) deadCounter -= 1;

    if (isLevel() || isRoom('rSun') || isRoom('rMoon') || isRoom('rStars')) {
      if (!dead && global.plife < 1) {
        if (global.hasAnkh) {
          global.plife = 4;
          if (global.moaiX != 0) {
            x = global.moaiX + 8;
            y = global.moaiY + 8;
            instances_of(oMoaiInside).forEach(($) => {
              with ($) {
                instance_destroy();
              }
            });
          } else if (isRoom('rOlmec')) {
            x = 16 + 8;
            y = 544 + 8;
          } else {
            instance_activate_object(oEntrance);
            x = oEntrance.x + 8;
            y = oEntrance.y + 8;
          }
          instances_of(oBall).forEach(($) => {
            with ($) {
              x = oPlayer1.x;
              y = oPlayer1.y;
            }
          });

          instances_of(oChain).forEach(($) => {
            with ($) {
              x = oPlayer1.x;
              y = oPlayer1.y;
            }
          });

          xVel = 0;
          yVel = 0;
          blink = 60;
          invincible = 60;
          fallTimer = 0;
          visible = true;
          active = true;
          dead = false;
          global.hasAnkh = false;
          global.message = 'THE ANKH SHATTERS!';
          global.message2 = 'YOU HAVE BEEN REVIVED!';
          global.messageTimer = 150;
          playSound(global.sndTeleport);
        } else {
          global.plife = 0;
          global.drawHUD = false;
          global.money += global.collect;
          global.xmoney += global.collect;
          global.collect = 0;
          if (isRoom('rSun')) global.mini1 = oSunRoom.points;
          if (isRoom('rMoon')) {
            global.mini2 = oMoonRoom.baskets;
            oMoonRoom.timer = -1;
            oMoonRoom.alarm[10] = 30;
          }
          if (isRoom('rStars')) global.mini3 = oStarsRoom.kills;
          if (global.mini1 > 99) global.mini1 = 99;
          if (global.mini2 > 99) global.mini2 = 99;
          if (global.mini3 > 99) global.mini3 = 99;

          if (isRoom('rSun') || isRoom('rMoon') || isRoom('rStars'))
            scrUpdateHighscores(2);
          else scrUpdateHighscores(0);

          dead = true;
          //active = false;
          playSound(global.sndDie);
        }
      }

      if (dead) {
        if (instance_exists(oCape)) oCape.open = false;
        stopAllMusic();
      }
    }

    if (!dead && invincible > 0) invincible -= 1;

    if (blink > 0) {
      blinkToggle *= -1;
      blink -= 1;
    } else blinkToggle = -1;

    /*
if (sprite_index == sSlideRight)
{
    spark = instance_create(x, y, oGroundSpark);
    with spark { x += random(3)}
}
else if (sprite_index == sSlideLeft)
{
    spark = instance_create(x, y, oGroundSpark);
    with spark { sprite_index = sSparkLeft; x += random(3)}
}
*/

    money = global.money;

    if (global.collectCounter == 0) {
      if (global.collect > 100) {
        global.money += 100;
        global.collect -= 100;
      } else {
        global.money += global.collect;
        global.collect -= global.collect;
      }
    } else {
      global.collectCounter -= 1;
    }

    if (holdItem) {
      if (holdItem.type == 'Bow') {
        if (
          collision_rectangle(x - 8, y - 8, x + 8, y + 8, oArrow, 0, 0) &&
          !dead &&
          !stunned
        ) {
          obj = instance_nearest(x, y, oArrow);
          if (abs(obj.xVel) < 1 && abs(obj.yVel) < 1 && !obj.stuck) {
            global.arrows += 1;
            playSound(global.sndPickup);
            instances_of(obj).forEach(($) => {
              with ($) {
                instance_destroy();
              }
            });
          }
        }
      }
    }

    if (
      collision_rectangle(x - 8, y - 8, x + 8, y + 8, oTreasure, 0, 0) &&
      !dead &&
      !stunned
    ) {
      gem = instance_nearest(x, y, oTreasure);
      if (gem.canCollect) {
        // global.money += gem.value;
        global.collect += gem.value + ceil(gem.value / 4) * global.levelType;
        global.collectCounter += 20;
        if (global.collectCounter > 100) global.collectCounter = 100;

        coin = false;
        //instance_create(x, y-8, oSmallCollect);
        if (gem.type == 'Gold Chunk') {
          global.gold += 1;
          coin = true;
        }
        if (gem.type == 'Gold Nugget') {
          global.nuggets += 1;
          coin = true;
        }
        if (gem.type == 'Gold Bar') {
          global.goldbar += 1;
          coin = true;
        }
        if (gem.type == 'Gold Bars') {
          global.goldbars += 1;
          coin = true;
        }
        if (gem.type == 'Emerald') global.emeralds += 1;
        if (gem.type == 'Big Emerald') global.bigemeralds += 1;
        if (gem.type == 'Sapphire') global.sapphires += 1;
        if (gem.type == 'Big Sapphire') global.bigsapphires += 1;
        if (gem.type == 'Ruby') global.rubies += 1;
        if (gem.type == 'Big Ruby') global.bigrubies += 1;
        if (gem.type == 'Diamond') global.diamonds += 1;
        if (coin) playSound(global.sndCoin);
        else playSound(global.sndGem);

        instances_of(gem).forEach(($) => {
          with ($) {
            instance_destroy();
          }
        });
      }
    }

    if (
      collision_rectangle(x - 8, y - 8, x + 8, y + 8, oBombBag, 0, 0) &&
      !dead &&
      !stunned
    ) {
      obj = collision_rectangle(x - 8, y - 8, x + 8, y + 8, oBombBag, 0, 0);
      if (
        !obj.held &&
        obj.cost == 0 &&
        !collision_point(obj.x, obj.y, oSolid, 0, 0)
      ) {
        global.bombs += 3;
        disp = instance_create(obj.x, obj.y - 14, oItemsGet);
        disp.sprite_index = sBombsGet;
        instances_of(obj).forEach(($) => {
          with ($) {
            instance_destroy();
          }
        });
        playSound(global.sndPickup);
        global.message = 'YOU GOT 3 MORE BOMBS!';
        global.message2 = '';
        global.messageTimer = 120;
      }
    }

    if (
      collision_rectangle(x - 8, y - 8, x + 8, y + 8, oBombBox, 0, 0) &&
      !dead &&
      !stunned
    ) {
      obj = collision_rectangle(x - 8, y - 8, x + 8, y + 8, oBombBox, 0, 0);
      if (
        !obj.held &&
        obj.cost == 0 &&
        !collision_point(obj.x, obj.y, oSolid, 0, 0)
      ) {
        global.bombs += 12;
        disp = instance_create(obj.x, obj.y - 14, oItemsGet);
        disp.sprite_index = sBombsGet;
        instances_of(obj).forEach(($) => {
          with ($) {
            instance_destroy();
          }
        });
        playSound(global.sndPickup);
        global.message = 'YOU GOT 12 MORE BOMBS!';
        global.message2 = '';
        global.messageTimer = 120;
      }
    }

    if (
      collision_rectangle(x - 8, y - 8, x + 8, y + 8, oRopePile, 0, 0) &&
      !dead &&
      !stunned
    ) {
      obj = collision_rectangle(x - 8, y - 8, x + 8, y + 8, oRopePile, 0, 0);
      if (
        !obj.held &&
        obj.cost == 0 &&
        !collision_point(obj.x, obj.y, oSolid, 0, 0)
      ) {
        global.rope += 3;
        disp = instance_create(obj.x, obj.y - 15, oItemsGet);
        disp.sprite_index = sRopeGet;
        instances_of(obj).forEach(($) => {
          with ($) {
            instance_destroy();
          }
        });
        playSound(global.sndPickup);
        global.message = 'YOU GOT 3 MORE ROPES!';
        global.message2 = '';
        global.messageTimer = 120;
      }
    }

    if (collision_point(x, y, oExit, 0, 0)) {
      if (holdItem != 0) {
        collect = false;
        if (holdItem.type == 'Gold Idol') {
          if (isRealLevel()) global.idolsConverted += 1;
          global.collect += holdItem.value * (global.levelType + 1);
          global.collectCounter += 20;
          if (global.collectCounter > 100) global.collectCounter = 100;
          if (holdItem.sprite_index == sCrystalSkull) global.skulls += 1;
          else global.idols += 1;
          playSound(global.sndCoin);
          instance_create(x, y - 8, oBigCollect);
          instances_of(holdItem).forEach(($) => {
            with ($) {
              instance_destroy();
            }
          });
          holdItem = 0;
        } else if (holdItem.type == 'Damsel') {
          if (holdItem.active && holdItem.hp > 0) {
            if (isRealLevel()) global.damselsSavedTotal += 1;
            global.damsels += 1;
            global.xdamsels += 1;
            door = instance_place(x, y, oExit);
            holdItem.x = door.x + 8;
            holdItem.y = door.y + 8;
            instances_of(holdItem).forEach(($) => {
              with ($) {
                if (global.isDamsel) sprite_index = sPExit;
                else sprite_index = sDamselExit2;
                status = 4;
                held = false;
                xVel = 0;
                yVel = 0;
                playSound(global.sndSteps);
                depth = 1000;
                active = false;
                canPickUp = false;
              }
            });

            holdItem = 0;
          }
        }
      }
    }

    global.xmoney += global.money - money;
  }
}

function oPlayer1_CREATE($) {
  with ($) {
    try {
      oCharacter_CREATE($);
    } catch (err) {}

    action_execute_script();

    // for debugging
    firstLevelSkip = 1;
    levelSkip = 1;

    if (global.isDamsel) sprite_index = sDamselLeft;
    else if (global.isTunnelMan) sprite_index = sTunnelLeft;

    // reset gamepad
    /*
gamepad.attackPressed = false;
gamepad.attack = false;
gamepad.startPressed = false;
gamepad.start = false;
*/

    active = true;
    dead = false;
    deadCounter = 100;
    stunned = false;
    bounced = false;
    myGrav = 0.6;

    fallTimer = 0;
    stunTimer = 0;
    wallHurt = 0;
    shopThrow = false;
    yetiThrow = false;
    hawkThrow = false;
    pushTimer = 0;
    whoaTimer = 0;
    whoaTimerMax = 30;
    distToNearestLightSource = 999;

    // swimming
    bubbleTimer = 0;
    bubbleTimerMax = 20;

    // gambling
    bet = 0;
    point = false;

    climbSndToggle = false;
    walkSndToggle = false;

    kAttack = true;
    kAttackPressed = false;
    whipping = false;
    cantJump = 0;
    kJumped = false;
    burning = 0;
    firing = 0;
    firingMax = 20;
    firingPistolMax = 20;
    firingShotgunMax = 40;
    bowArmed = false;
    bowStrength = 0;
    jetpackFuel = 0;
    bloodless = false;

    // used with Kapala
    redColor = 0;
    redToggle = false;

    kAttackReleased = false;
    holdItem = 0;
    holdItemType = '';
    pickupItemType = '';
    kItem = 0;
    kItemPressed = false;
    kItemReleased = false;
    kRope = 0;
    kBomb = 0;
    kPay = 0;

    holdArrow = 0;
    holdArrowToggle = false;
    bombArrowCounter = 80;
    ARROW_NORM = 1;
    ARROW_BOMB = 2;

    moveToggle = true;

    viewCount = 0;
    lookOff = 0;

    pExit = 0;

    xSTART = 0;
    xTUTORIAL = 1;
    xSCORES = 2;
    xTITLE = 3;
    xEND = 4;
    xSHORTCUT5 = 5;
    xSHORTCUT9 = 6;
    xSUN = 7;
    xMOON = 8;
    xSTARS = 9;
    xCHANGE = 10;
    xSHORTCUT13 = 11;
    xCHANGE2 = 12;

    if (isRoom('rOlmec')) active = false;
  }
}

class oPlayer1 extends oCharacter {
  ARROW_BOMB;
  ARROW_NORM;
  CLIMBING;
  DUCKTOHANG;
  FALLING;
  HANGING;
  IN_AIR;
  JUMPING;
  LOOKING_UP;
  ON_GROUND;
  RUNNING;
  STANDING;
  arrows;
  attackPressed;
  bigemeralds;
  bigrubies;
  bigsapphires;
  blackMarket;
  blinkToggle;
  bombArrowCounter;
  bowArmed;
  canRun;
  cantJump;
  cemetary;
  chest;
  climbAcc;
  climbAnimSpeed;
  climbSndToggle;
  coin;
  colIceBot;
  colLadder;
  colPlat;
  colPlatBot;
  colPointLadder;
  colSolidLeft;
  colSolidRight;
  colSpikes;
  colWaterTop;
  collisionbottomcheck;
  customLevel;
  deadCounter;
  departLadderXVel;
  departLadderYVel;
  diamonds;
  diceGamesPlayed;
  disp;
  distToNearestLightSource;
  downToRun;
  drawHUD;
  drawStatus;
  emeralds;
  excess;
  explosion;
  fallTimer;
  firingMax;
  firingPistolMax;
  firingShotgunMax;
  firstLevelSkip;
  frictionClimbingX;
  frictionClimbingY;
  frictionRunningFastX;
  frictionRunningX;
  gamepad;
  genBlackMarket;
  ghostExists;
  goldbar;
  goldbars;
  gravNorm;
  gravityIntensity;
  hangCount;
  hangCountMax;
  hasAnkh;
  hasCape;
  hasGloves;
  hasJetpack;
  hasJordans;
  hasMitt;
  hasParachute;
  hasSpringShoes;
  hasStickyBombs;
  holdArrow;
  holdArrowToggle;
  holdItemType;
  idolsConverted;
  inGame;
  initialJumpAcc;
  itemsBought;
  jetpackFuel;
  jumpButtonReleased;
  jumpTime;
  jumpTimeTotal;
  jumps;
  kAttack;
  kAttackPressed;
  kAttackReleased;
  kBomb;
  kBombPressed;
  kDown;
  kItem;
  kItemPressed;
  kItemReleased;
  kJump;
  kJumpPressed;
  kJumpReleased;
  kJumped;
  kLeft;
  kLeftPressed;
  kLeftPushedSteps;
  kLeftReleased;
  kPay;
  kPayPressed;
  kRight;
  kRightPressed;
  kRightPushedSteps;
  kRightReleased;
  kRope;
  kRopePressed;
  kRun;
  kUp;
  kissesBought;
  ladder;
  ladderTimer;
  leadsTo;
  levelDeaths;
  levelSkip;
  life;
  lookOff;
  looking;
  maxDownSlope;
  maxSlope;
  mini1;
  mini2;
  mini3;
  miscDeaths;
  moaiX;
  moaiY;
  moneyCount;
  moveToggle;
  new;
  newObj;
  nextCustomLevel;
  nuggets;
  oArrowTrapLeftLit;
  oArrowTrapRightLit;
  oBall;
  oBombBag;
  oBombBox;
  oBoulder;
  oBow;
  oCape;
  oCeilingTrap;
  oChain;
  oChest;
  oCompass;
  oDoor;
  oEmerald;
  oEntrance;
  oFlare;
  oFlareCrate;
  oGame;
  oGhost;
  oGiantTikiHead;
  oGloves;
  oItemsGet;
  oJetpack;
  oLadder;
  oLadderTop;
  oLamp;
  oLampItem;
  oLaserExplode;
  oMachete;
  oMachetePre;
  oMattockHit;
  oMattockPre;
  oMitt;
  oMoaiInside;
  oMonkey;
  oPDummy5;
  oParaPickup;
  oParaUsed;
  oParachute;
  oPistol;
  oRock;
  oRuby;
  oSapphire;
  oShotgunBlastLeft;
  oShotgunBlastRight;
  oSlash;
  oSmashTrap;
  oSmashTrapLit;
  oSpearTrapLit;
  oSpectacles;
  oSpringShoes;
  oSpringTrap;
  oStarsRoom;
  oSunRoom;
  oTeleporter;
  oTikiTorch;
  oTrapBlock;
  oTree;
  oWebCannon;
  oWhip;
  oWhipPre;
  oXChange;
  oXChange2;
  oXEnd;
  oXGold;
  oXMarket;
  oXMoon;
  oXScores;
  oXShortcut13;
  oXShortcut5;
  oXShortcut9;
  oXStars;
  oXStart;
  oXSun;
  oXTitle;
  oXTutorial;
  open;
  pExit;
  point;
  points;
  prevCustomLevel;
  pushTimer;
  rHighscores;
  rLevelEditor;
  rLoadLevel;
  ratio;
  redColor;
  redToggle;
  room_height;
  room_width;
  rr;
  rubies;
  runAcc;
  runAnimSpeed;
  runHeld;
  runKey;
  sAttackLeft;
  sBomb;
  sBombsGet;
  sChest;
  sChestOpen;
  sCrystalSkull;
  sDamselAttackL;
  sDamselDtHL;
  sDamselExit;
  sDamselHoldL;
  sDamselWhoaL;
  sDuckToHangL;
  sRopeEnd;
  sRopeGet;
  sSpearsLeft;
  sTunnelAttackL;
  sTunnelDieL;
  sTunnelDieLL;
  sTunnelDieLR;
  sTunnelDtHL;
  sTunnelExit;
  sTunnelFallL;
  sTunnelLBounce;
  sTunnelLeft;
  sTunnelStunL;
  sTunnelWhoaL;
  sWhipLeft;
  sWhipPreL;
  sWhipPreR;
  sWhipRight;
  sWhoaLeft;
  sapphires;
  scoresStart;
  skulls;
  slopeChangeInY;
  slopeYPrev;
  sndBowPull;
  sndGem;
  sndJump;
  sndPickup;
  sndTeleport;
  sndThud;
  sndTrap;
  sndWhip;
  source;
  startPressed;
  statePrev;
  statePrevPrev;
  style;
  t;
  testLevel;
  timer;
  totalChests;
  totalCrates;
  trap;
  upYPrev;
  viewCount;
  walkSndToggle;
  whipping;
  whoaTimer;
  whoaTimerMax;
  xAccLimit;
  xCHANGE;
  xCHANGE2;
  xEND;
  xFric;
  xMOON;
  xPrev;
  xSCORES;
  xSHORTCUT13;
  xSHORTCUT5;
  xSHORTCUT9;
  xSTARS;
  xSTART;
  xSUN;
  xTITLE;
  xTUTORIAL;
  xVelInteger;
  xVelLimit;
  xmoney;
  yAccLimit;
  yFric;
  yPrev;
  yPrevHigh;
  yVelInteger;
  sprite_index = sStandLeft;
  visible = true;
}
ObjType.oPlayer1 = oPlayer1;
