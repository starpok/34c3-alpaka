var missedCooldownBlau = 0;
const spriteUrisBlau =
[
"./img/alpakaBlauLO.png","./img/alpakaBlauLU.png","./img/alpakaBlauLN.png",
"./img/alpakaBlauRO.png","./img/alpakaBlauRU.png","./img/alpakaBlauRN.png"
];
const alpakaSpritesBlau = [];
for(const uri of spriteUrisBlau) {alpakaSpritesBlau.push(new Sprite(uri,20*ALPAKA_SCALE,28*ALPAKA_SCALE));}

class AlpakaBlau
{
 constructor(state,x)
 {
  this.x=x;
  this.y=-100;
  this.vx=Math.random()-0.5;
  this.vy=0;
  this.state=state;
  this.isAlive=true;
  this.colour = 2;
  this.missedCooldownBlau = 0;
 }

 update(dt)
 {
  if(!this.isAlive) {return;}
  this.vy+=GRAVITY*dt;
  this.vy=Math.min(this.vy,VY_MAX);
  this.y+=this.vy*dt;

  if(this.y>780)
  {
   state.lost=true;
  }
  /*
  // bounce at the bottom
  if(this.y>620&&this.vy>0)
  {
   this.vy=-1.14*this.vy;
  }
  */
  this.x+=this.vx*dt;
  if(this.x<0&&this.vx<0) {this.vx=-this.vx;}
  if(this.x>1200&&this.vx>0) {this.vx=-this.vx;}
  // in ship?
  if(this.vy<0&&this.y<30)
  {
   if(this.x>MOTHERSHIP_OPENING_LEFT&&this.x<MOTHERSHIP_OPENING_RIGHT)
   {
    this.rescue();
   } else
   {
    this.vy=-this.vy;
   }
  }
  missedCooldownBlau-=1;
 }

 rescue()
 {
  state.addPoints(1);
  this.isAlive=false;
  state.blinks.push(new Blink(this.x-70,this.y-70));
 }

 missed()
 {
	 if(missedCooldownBlau <= 0)
	 {
		 state.addPoints(-2);
		 state.missedBlinks.push(new Missed(this.x-70,this.y-70));
		 //console.log("missed!");
		 missedCooldownBlau = 40;
	 }

 }

 draw(ctx)
 {
  let spriteNr = 0;
  if(Math.abs(this.vy)<VY_SLOW)
  {
  spriteNr=2;
  }
  else
  {
  if(this.vy>0) {spriteNr = 1;}
  }
  if(this.vx>0) {spriteNr+=3;} // right facing row
  const sprite = alpakaSpritesBlau[spriteNr];
  sprite.draw(ctx,this.x,this.y);
 }

 getColour()
 {
	 return this.colour;
 }

}
