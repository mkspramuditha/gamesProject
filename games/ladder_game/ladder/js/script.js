		//classes
		class Mark
		{
			constructor(name,isHuman,current_tile,game)
			{
				this.name=name;
				this.isHuman=isHuman;
				this.isFinished=false;
				this.normal_move=false;
				this.diagonal_move=false;
				this.x=-1;
				this.y=0;
				this.steps=0;
				this.grad=0;
				this.current_tile=current_tile;
				this.next_tile=current_tile;
				this.game=game;
			}
			
			//looping method
			move()
			{
				if(!this.isFinished)
				{
					//if mark in finishing tile
					if(this.current_tile==this.game.finish_tile){
						this.normal_move=false;
						this.diagonal_move=false;
						this.isFinished=true;
						this.game.winner=this;
						this.game.finishGame();
					}	
					else if(this.normal_move)
					{
						this.next_tile=this.game.grid[this.current_tile.index+1];
						
						if(this.steps==0){
							this.normal_move=false;
							this.checkCurrentTile();
						}
						else
						{
							this.steps=this.steps-inc;	
							if(this.current_tile.x>this.next_tile.x){
								this.x=this.x-inc;
							}
							else if(this.current_tile.x<this.next_tile.x){
								this.x=this.x+inc;
							}
							if(this.current_tile.y>this.next_tile.y){
								this.y=this.y-inc;
							}
							else if(this.current_tile.y<this.next_tile.y){
								this.y=this.y+inc;
							}
						}
						
						if(this.x==this.next_tile.x && this.y==this.next_tile.y)
						{
							this.current_tile=this.next_tile;
						}
						
						
					}
					else if(this.diagonal_move)
					{
						if(this.x==this.next_tile.x && this.y==this.next_tile.y)
						{
							this.current_tile=this.next_tile;
							this.diagonal_move=false;
							this.finishMove();
						}
						else
						{
							if(this.grad==null){
								if(this.current_tile.y>this.next_tile.y)
								{
									this.y=this.y-inc;
								}
								else if(this.current_tile.y<this.next_tile.y){
									this.y=this.y+inc;
								}	
							}
							else{
								if(this.current_tile.x>this.next_tile.x)
								{
									this.x=this.x-inc;
									this.y=this.y+this.grad*(-inc);
								}
								else if(this.current_tile.x<this.next_tile.x){
									this.x=this.x+inc;
									this.y=this.y+this.grad*inc;
								}
								//to identify e.g 3.000000000000000001
								if( (this.y>Math.round(this.y) && this.y-Math.round(this.y)<0.00001) || (this.y<Math.round(this.y) && Math.round(this.y)-this.y<0.00001))
								{
									this.y=Math.round(this.y);
								}
							}
						}
					}
				}
			}
			
			checkCurrentTile()
			{
				if(this.current_tile.snake!=null)
				{
					this.game.alertTag(this.current_tile);
					var vm=this;
					setTimeout(function(){
						vm.next_tile=vm.current_tile.snake.tail;
						if(vm.next_tile.x==vm.current_tile.x){
							vm.grad=null;
						}
						else{
							vm.grad=(vm.next_tile.y-vm.current_tile.y)/(vm.next_tile.x-vm.current_tile.x);
						}
						vm.diagonal_move=true;	
					}, 6000);
					
				}
				else if(this.current_tile.ladder!=null)
				{
					this.game.alertTag(this.current_tile);
					var vm=this;
					setTimeout(function(){
						console.log("athule");		
						vm.next_tile=vm.current_tile.ladder.head;
						if(vm.next_tile.x==vm.current_tile.x){
							vm.grad=null;
						}
						else{
							vm.grad=(vm.next_tile.y-vm.current_tile.y)/(vm.next_tile.x-vm.current_tile.x);
						}
						vm.diagonal_move=true;
					}, 6000);	
				}
				else{
					this.finishMove();
				}
			}
			///edit accordingly
			finishMove()
			{
				var nextMark=game.getNextMark();
				if(nextMark==null){
					game.finishTurn();
				}
				else{
					nextMark.startMove();
				}
			}
			
			startMove()
			{
				var vm=this;
				
				setTimeout(function(){
					vm.steps=game.dice.getRandomValue();
				}, 500);
				
				setTimeout(function(){ 
					vm.game.dice.roll();
					vm.normal_move=true;
				}, 2000);
				
			}
			
		}
		
		class Tile{
			constructor(x,y,index)
			{
				this.x=x;
				this.y=y;
				this.index=index;
				this.snake=null;
				this.ladder=null;
				this.tag=null;
			}			
		}
		
		class Snake{
			constructor(head,tail)
			{
				this.head=head;
				this.tail=tail;	
			}	
		}
		class Ladder{
			constructor(head,tail)
			{
				this.head=head;
				this.tail=tail;	
			}	
		}
		
		class Dice
		{
			
			getRandomValue()
			{
				this.value=Math.ceil(Math.random()*6);
				
				document.getElementById("txtDice").innerText=game.dice.value;//////////////
				$("#dice_img").css("display","none");
				$("#dice_moving_image").css("display","");
				
				return this.value;				
			}
			
			roll(){
				$("#dice_moving_image").css("display","none"); 
				document.getElementById("dice_img").src="img/"+dice_face_images[game.dice.value-1];
				$("#dice_img").css("display","");
			}
		}
		
		//game variables
		var currentMarkIndex=0;
		
		//constants
		var COLS=10,ROWS=10,inc=0.25;
	
		//game objects
		var game={
			grid:[],
			finish_tile:null,
			winner:null,
			dice:null,
			ladders:[],
			snakes:[],
			marks:[],
			finish_tile:null,

			init:function(COLS,ROWS){
				this.grid=[];
				this.finish_tile=null;
				this.winner=null;
				this.dice=null;
				this.ladders=[];
				this.snakes=[];
				this.marks=[];
				this.finish_tile=null;
				
				//init tiles
				for(var i=0;i<ROWS;i++)
				{
					for(var j=0;j<COLS;j++)
					{
						if(i%2==0){
							this.grid.push(new Tile(j,i,this.grid.length));	
						}
						else{
							this.grid.push(new Tile(COLS-1-j,i,this.grid.length));	
						}
					}
				}
				
				this.finish_tile=this.grid[this.grid.length-1];
				
				//init dice
				this.dice=new Dice();
				
				//init snakes
				this.grid[26].snake=new Snake(this.grid[26],this.grid[4]);
				this.snakes.push(this.grid[26].snake);
				this.grid[26].tag="ඔබ අධික මේදය හා සීනි බහුල ආහාර අනුභව කරන අතර ශරීර ක්‍රියාකාරකම් අඩුය."; ///////new
				
				this.grid[43].snake=new Snake(this.grid[43],this.grid[33]);
				this.snakes.push(this.grid[43].snake);
				this.grid[43].tag="ඔබ නිතිපතා උදය ආහරය මඟහරියි.";					/////new
				
				this.grid[52].snake=new Snake(this.grid[52],this.grid[31]);
				this.snakes.push(this.grid[52].snake);
				this.grid[52].tag="ඔබ සමබල ආහාරයක් අනුභව කිරීම ගැන තැකීමක් නොකරයි."		////new
				
				this.grid[62].snake=new Snake(this.grid[62],this.grid[41]);
				this.snakes.push(this.grid[62].snake);
				this.grid[62].tag="ඔබ ආහාර බැදීම සඳහා එකම තෙල කීපවරක් භාවිතා කරයි.";		/////new
				
				this.grid[87].snake=new Snake(this.grid[87],this.grid[68]);
				this.snakes.push(this.grid[87].snake);
				this.grid[87].tag="ඔබ ආහාර සකස් කරන ප්‍රදේශය පිරිසිදුව තබා නොගනී.";			//////new
				
				this.grid[85].snake=new Snake(this.grid[85],this.grid[65]);
				this.snakes.push(this.grid[85].snake);
				this.grid[85].tag="ඔබ පුරුද්දක් වශයෙන් කොළපැහැති එළවලු හා පළාවර්ග අනුභව නොකරයි.";		/////new
				
				this.grid[96].snake=new Snake(this.grid[96],this.grid[61]);
				this.snakes.push(this.grid[96].snake);
				this.grid[96].tag="ඔබ නිතරම පැණි රස කළ සෝඩා ජලය බොයි.  ";					////new
				
				//init ladders
				this.grid[0].ladder=new Ladder(this.grid[37],this.grid[0]);
				this.ladders.push(this.grid[0].ladder);
				this.grid[0].tag="ඔබ පිරිසිදු භාජනවල ආහාර පිසියි.";							///////new- with bug
				
				this.grid[3].ladder=new Ladder(this.grid[24],this.grid[3]);
				this.ladders.push(this.grid[3].ladder);
				this.grid[3].tag=" මම බත් සමඟ බෝංචි, මෑ වැනි ආහාර වර්ග ආහාරයට ගනී.";			//////new
				
				this.grid[8].ladder=new Ladder(this.grid[30],this.grid[8]);
				this.ladders.push(this.grid[8].ladder);
				this.grid[8].tag="ඔබ ආහාර සකස් කිරීම, බෙදීම හා අනුභව කිරීම ආදී කටයුතු වලට පෙර සබන් ගා අත සෝදා ගනී.";		////new
				
				this.grid[27].ladder=new Ladder(this.grid[46],this.grid[27]);
				this.ladders.push(this.grid[27].ladder);
				this.grid[27].tag="ඔබ එළවලු කැපීමට පසුව නොව කැපීමට පෙර ඒවා සෝදයි.";				
				
				this.grid[20].ladder=new Ladder(this.grid[41],this.grid[20]);
				this.ladders.push(this.grid[20].ladder);
				this.grid[20].tag="පැණි රස කෑමකට වඩා පලතුරක් හෝ පලතුරු සලාදයක් කෑම ඔබ ප්‍රිය කරයි.";			/////new
				
				this.grid[45].ladder=new Ladder(this.grid[66],this.grid[45]);
				this.ladders.push(this.grid[45].ladder);
				this.grid[45].tag="ඔබ පුරුද්දක් වශයෙන් දිනපතා අවශ්‍ය පමණට ජලය පානය ක‍රයි.";						/////new
				
				this.grid[56].ladder=new Ladder(this.grid[75],this.grid[56]);
				this.ladders.push(this.grid[56].ladder);
				this.grid[56].tag="ඔබ සැමවිටම  ආහාර සුරක්ෂිත ලෙස වසයි.";					////new
				
				this.grid[67].ladder=new Ladder(this.grid[73],this.grid[67]);
				this.ladders.push(this.grid[67].ladder);
				this.grid[67].tag="ඔබ සැමවිටම උණුකර නිවාගත් ජලය පානය කරයි.";			/////new
				
				this.grid[70].ladder=new Ladder(this.grid[90],this.grid[70]);
				this.ladders.push(this.grid[70].ladder);
				this.grid[70].tag="උසට සරිලන ලෙස ශරීර බර පවත්වා ගැනීම ගැන ඔබ සලකිලිමත්ය.";			////new
				
				this.grid[76].ladder=new Ladder(this.grid[94],this.grid[76]);
				this.ladders.push(this.grid[76].ladder);
				this.grid[76].tag="ඔබ පලා වර්ග හා අනෙකුත් එළවලු බහුල ලෙස නිතරම අනුභව කරයි.";		////new
				
				this.grid[79].ladder=new Ladder(this.grid[98],this.grid[79]);
				this.ladders.push(this.grid[79].ladder);
				this.grid[79].tag="ඔබ සුදු හාල් වෙනුවට තම්බපු හාල් ආහාරයට ගනී.";						////new
				
				//init marks
				this.marks.push(new Mark("Chamod",true,this.grid[0],this));
				this.marks.push(new Mark("Com",false,this.grid[0],this));
				
				
				
			},	

			getNextMark:function()
			{
				if(currentMarkIndex==this.marks.length)
				{
					currentMarkIndex=0;
					return null;
				}
				else{
					currentMarkIndex++;
					return this.marks[currentMarkIndex-1];
				}
			},		

			finishTurn:function()
			{
				document.getElementById("btnThrow").disabled=false;
				document.getElementById("btnRestart").disabled=false;
			},
			finishGame()
			{
				if(this.winner.isHuman)
				{
					$("#alert_title").text("Success");
					$(".modal-body").css("background-color","green");
					$("#alert_body").text("ඔබ දිනුම් ...!");
					console.log("dgdgd");
					$("#alert_btn").click();
				}
				else
				{
					$("#alert_title").text("Warning");
					$(".modal-body").css("background-color","red");
					$("#alert_body").text("ඔබ පරාදයි ...!");
					console.log("dgdgd");
					$("#alert_btn").click();
				}
				
				document.getElementById("btnRestart").disabled=false;
			},
			alertTag:function(tile){
				if(tile.snake!=null){
					$("#alert_title").text("අවදානයයි");
					$(".modal-body").css("background-color","red");
					$("#alert_body").text(tile.tag);
					console.log("dgdgd");
					$("#alert_btn").click();
				}
				else if(tile.ladder!=null){
					$("#alert_title").text("විශිෂ්ටයි");
					$(".modal-body").css("background-color","green");
					$("#alert_body").text(tile.tag);
					console.log("dgdgd");
					$("#alert_btn").click();
				}			
			},		
		}
		/////////////////////////////////////////////canvas /////////////////////////////////////////////////////////////////////////////
		
		//canvas variables
		var frames=0,canvas,ctx;
		var dice_face_images=["dice_faces_1.png","dice_faces_2.png","dice_faces_3.png","dice_faces_4.png","dice_faces_5.png","dice_faces_6.png"];
		
		//canvas functions
		
		function initCanvas()
		{
			document.getElementById("btnThrow").disabled=false;
			document.getElementById("btnRestart").disabled=false;
			if(document.getElementById("canvas_id")==null){
				canvas=document.createElement("canvas");
				canvas.id="canvas_id";
				canvas.width =ROWS*60;
				canvas.height =COLS*60;
				ctx=canvas.getContext("2d");
				document.getElementById("canvas_div").appendChild(canvas);
				ctx.imageSmoothingEnabled=false;
				//drawCanvas();
			}
			else{
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
		}

		function drawCanvas()
		{
			drawGrid();
			//ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawSnakes();
			drawLadders();
			drawMarks();
		}
		
		function drawGrid()
		{
			/*var tw=canvas.width/COLS;
			var th=canvas.height/ROWS;
			
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			
			for(var x=0;x<COLS;x++){
				for(var y=0;y<ROWS;y++){
					ctx.fillStyle="yellow";
					ctx.fillRect(x*tw,(ROWS-1-y)*th,tw-1,th-1);	
				}
			}*/
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			var img=document.getElementById("grid_img");
			ctx.drawImage(img,0,0,canvas.width,canvas.height);
		}

		function drawMarks()
		{
			var tw=canvas.width/COLS;
			var th=canvas.height/ROWS;
			
			/*ctx.fillStyle="pink";	
			ctx.fillRect(game.marks[0].x*tw+10,(ROWS-1-game.marks[0].y)*th+25,tw-40,th-40);*/
			var img=document.getElementById("mark_img");
			ctx.drawImage(img,game.marks[0].x*tw+10,(ROWS-1-game.marks[0].y)*th+30,tw-35,th-35);
			
			/*ctx.fillStyle="yellow";
			ctx.fillRect(game.marks[1].x*tw+10,(ROWS-1-game.marks[1].y)*th+5,tw-40,th-40);*/
			var img2=document.getElementById("ai_mark_img");
			ctx.drawImage(ai_mark_img,game.marks[1].x*tw+10,(ROWS-1-game.marks[1].y)*th+5,tw-35,th-35);
			
		}
		

		function drawSnakes()
		{
			ctx.strokeStyle="red";
			var tw=canvas.width/COLS;
			var th=canvas.height/ROWS;
			
			for(var i=0;i<game.snakes.length;i++)
			{
				var sna=game.snakes[i];
				
				ctx.beginPath();
				ctx.moveTo(sna.tail.x*tw+tw/2, (ROWS-sna.tail.y)*th-th/2);
				//ctx.lineTo(sna.head.x*tw+tw/2, (ROWS-sna.head.y)*th-th/2);
				ctx.stroke();
			}	
		}

		function drawLadders()
		{
			ctx.strokeStyle="blue";
			var tw=canvas.width/COLS;
			var th=canvas.height/ROWS;
			
			for(var i=0;i<game.ladders.length;i++)
			{
				var lad=game.ladders[i];
				
				ctx.beginPath();
				ctx.moveTo(lad.tail.x*tw+tw/2, (ROWS-lad.tail.y)*th-th/2);
			//	ctx.lineTo(lad.head.x*tw+tw/2, (ROWS-lad.head.y)*th-th/2);
				ctx.stroke();
			}	
		}

		
		
		
		
		/////////////logic functions
		function init()
		{
			game.init(COLS,ROWS);
		}
		function update()
		{
			frames++;
			if(frames%2==0){
				//move marks
				for(var i=0;i<game.marks.length;i++){
					game.marks[i].move();
				}	
			}
			
		}
		
		function loop()
		{
			update();
			drawCanvas();
			window.requestAnimationFrame(loop,canvas);
		}
		
		function main()
		{
			init();
			initCanvas();
			loop();
		}
		
		
		main();
		//////////////////////////////user control
		function startTurn()
		{
			document.getElementById("btnThrow").disabled=true;
			document.getElementById("btnRestart").disabled=true;
			
			game.getNextMark().startMove();
		}
		
		/////////////event handling
		$(function(){
			$('#myModal').on('show.bs.modal', function(){
				var myModal = $(this);
				clearTimeout(myModal.data('hideInterval'));
				myModal.data('hideInterval', setTimeout(function(){
					myModal.modal('hide');
				}, 5000));
			});
		});