enum MoveType {
  walk, climb
}

enum PlayerGenre {
  man, woman
}

Sup.ArcadePhysics2D.setGravity(0, -0.02);

class PlayerBehavior extends Sup.Behavior {
  
  speed = 0.3;
  jumpSpeed = 0.45;
  genre = PlayerGenre.man;
  moveType = MoveType.walk;
  
  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());

    // As explained above, we get the current velocity
    let velocity = this.actor.arcadeBody2D.getVelocity();

    // We override the `.x` component based on the player's input
    if (Sup.Input.isKeyDown("LEFT")) {
      this.moveType = MoveType.walk;
      velocity.x = -this.speed;
      // When going left, we flip the sprite
      this.actor.spriteRenderer.setHorizontalFlip(true);
    } else if (Sup.Input.isKeyDown("RIGHT")) {
      this.moveType = MoveType.walk;
      velocity.x = this.speed;
      // When going right, we clear the flip
      this.actor.spriteRenderer.setHorizontalFlip(false);
    } else if (Sup.Input.isKeyDown("UP")) {
      this.moveType = MoveType.climb;
      velocity.y = this.speed;
      this.actor.spriteRenderer.setHorizontalFlip(false);
    } else if (Sup.Input.isKeyDown("DOWN")) {
      this.moveType = MoveType.climb;
      velocity.y = -this.speed;
      this.actor.spriteRenderer.setHorizontalFlip(false);
    } else {
      velocity.x = 0;
    }
    
    // If the player is on the ground and wants to jump,
    // we update the `.y` component accordingly
    let animationName = "idle";
    let touchBottom = this.actor.arcadeBody2D.getTouches().bottom;
    
    // Here, we should play either "Idle" or "Run" depending on the horizontal speed
    if (this.moveType === MoveType.walk && velocity.x !== 0) {
      animationName = "walk";
    }
    if (this.moveType === MoveType.climb && velocity.y !== 0) {
      animationName = "climb";
    }
    
    this.actor.spriteRenderer.setSprite("Player/" + animationName + '-' + this.genre.toString);
    this.actor.spriteRenderer.setAnimation(animationName);

    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(PlayerBehavior);
