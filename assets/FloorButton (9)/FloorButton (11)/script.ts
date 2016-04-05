class FloorButtonBehavior extends Sup.Behavior {
  
  secretActor = "";

  //private secretActorInstance = Sup.getActor(this.secretActor);
  //private static playerActorInstance = Sup.getActor("Player");
  
  /*awake() {
  }*/

  update() {
    //let playerPos = this.playerActorInstance.getPosition();
    let playerPos = Sup.getActor("Player").getPosition();
    let playerDist = playerPos.distanceTo(this.actor.getPosition());
    
    //this.secretActorInstance.setVisible(playerDist > 1);
    Sup.getActor(this.secretActor).setVisible(playerDist > 1);// TODO : plutôt collision?
    
    //TODO : 2 etats bouton : released/pressed
  }
}
Sup.registerBehavior(FloorButtonBehavior);
