class Game{
    constructor(){

    }
    getState(){
       var dbref= db.ref('gameState')
       dbref.on('value',(data)=>{
           gameState=data.val()

       })
       
        

    }
    updateState(state){
        db.ref('/').update({
            'gameState':state
        })

    }
   async start(){
        if (gameState==0) {
            player=new Player();
            var playerCountref = await db.ref('playerCount').once("value");
            if (playerCountref.exists()) {
              playerCount=playerCountref.val();
              player.getPlayerCount();
            }
            form=new Form();
            form.display();


        }
        car1=createSprite(100,300);
        car1.addImage(car1img);
        car2=createSprite(300,300);
        car2.addImage(car2img);
        car3=createSprite(500,300);
        car3.addImage(car3img);
        car4=createSprite(700,300);
        car4.addImage(car4img);
        cars=[car1,car2,car3,car4];
    }
    play (){
        image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5)
        form.hide();
        Player.getInfo();
        player.getCarsAtEnd();
        if(allPlayers!==undefined){
            var x=175;
            var y;
            var index=0;
            for (var plr in allPlayers) {
                index=index+1
                x=x+200
                y=displayHeight-allPlayers[plr].distance;
                cars[index-1].x=x;
                cars[index-1].y=y;
                if(index==player.index){
                    cars[index-1].shapeColor="blue"
                    stroke(10);
                  fill("yellow");
                  ellipse(x,y,60,60);
                    camera.position.x=displayWidth/2
                    camera.position.y=cars[index-1].y;
                    
                }
            }

        }
        if(keyIsDown(UP_ARROW)&&player.index!==null){
            player.distance+=10;
            player.update();
        }
        if (player.distance>3980) {
            gameState=2;
            player.rank=player.rank+1;
            Player.updateCarsAtEnd(player.rank);
        
        }
        drawSprites();
 }
   end(){
    console.log("game Over!") ;
    console.log(player.rank);
   var result=createElement('h1');
    result.html("congratulation!!you have got"+player.rank+"rank")
    result.position(500,300);
   }     
}