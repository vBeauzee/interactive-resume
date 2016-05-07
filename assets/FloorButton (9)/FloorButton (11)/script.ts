class FloorButtonBehavior extends Sup.Behavior {
  
  secretActor = "";
  private secretActorInstance : Sup.Actor;
  private playerActorInstance : Sup.Actor;
  
  awake() {
    this.secretActorInstance = Sup.getActor(this.secretActor);
    this.playerActorInstance = Sup.getActor("Player");
  }

  update() {
    let playerPos = this.playerActorInstance.getPosition();
    let playerDist = playerPos.distanceTo(this.actor.getPosition());
    
    this.secretActorInstance.setVisible(playerDist > 1);// TODO : plutôt collision?
    
    //TODO : 2 etats bouton : released/pressed
  }
}
Sup.registerBehavior(FloorButtonBehavior);
