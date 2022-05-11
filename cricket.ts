

class ScoreBoard {
    id: string
    constructor(team:string){
      (<HTMLInputElement> document.getElementById("result")).disabled = true;
      (<HTMLInputElement> document.getElementById("hit2")).disabled = true;
        this.id=team
        let table = document.getElementById(this.id);
  
      
        let thead = document.createElement("thead");
        let head_row = document.createElement("tr");
        for(let i = 0;i<8;i++)
        {
            let th=document.createElement("th");
            if(i==0)
                th.innerHTML=this.id.toUpperCase();
            if(i==7)
                th.innerText="Total";
            if(i<=6 && i>=1)
                th.innerHTML="B"+i;
            head_row.appendChild(th);
        }
        thead.appendChild(head_row);
        table.appendChild(thead);
  
       
        let tbody = document.createElement("tbody");
        for(let i =1;i<=10;i++)
        {
            let body_tr = document.createElement("tr");
            let th=document.createElement("th");
            th.innerHTML="Player "+i;
            body_tr.appendChild(th);
            for(let j=1;j<=7;j++)
            {
                let td=document.createElement("td");
                td.setAttribute("id",`${this.id}_${i}${j}`)
                body_tr.appendChild(td);
            }
            tbody.appendChild(body_tr)
        }
        table.appendChild(tbody)
        
        
    }
  }
  new ScoreBoard("team1");
  new ScoreBoard("team2");
  
  
  document.getElementById("start_again").style.visibility = "hidden";

  
  class Player {
      id;
      score = 0;
      balls = [];
    
      constructor() {
      }
      hit() {
        let run = Math.floor(Math.random() * 6);
        this.score += run;
        this.balls.push(run);
        return run;
      }
    }
    
    class Team {
      players = [];
      teamScore = 0;
      playerScore=0;
      player;
      row=1;
      col=1;
      arr=[];
      max_score_player=0;
      
    
      constructor() {
        
        
        this.player =new Player();
      }
    
      play(team:string) {
        let run = this.player.hit();
        this.teamScore += run;
        this.playerScore+=run;
          document.getElementById(`${team}_score`).innerHTML=`${this.teamScore}`;
        
        console.log('Player ID ', this.player.id);
        console.log('Player Run ', run);
        
      if(this.col<=6)
      {
          document.getElementById(`${team}_${this.row}${this.col}`).innerHTML=run;
          if(run==0)
          {
              document.getElementById(`${team}_${this.row}${this.col}`).innerHTML="out";
              this.col=6;
          }
          
      }
      
      this.col=this.col+1;
      if(this.col==7)
      {
          document.getElementById(`${team}_${this.row}${this.col}`).innerHTML=`${this.playerScore}`;
          this.arr.push(this.playerScore)
          if(this.row===10)
          {
            if(team=="team1")
            {
              (<HTMLInputElement> document.getElementById("hit1")).disabled = true;
              (<HTMLInputElement> document.getElementById("hit2")).disabled = false;
            }
              
              else
              (<HTMLInputElement> document.getElementById("hit2")).disabled = true;
  
              
          }
          
         
          this.max_score_player=this.arr.reduce((x,y)=>{
              return Math.max(parseInt(x),parseInt(y))
           })
           this.row=this.row+1;
           this.col=1;
           this.playerScore=0
          
           console.log(this.max_score_player)
           console.log("player",this.arr.indexOf(this.max_score_player)+1)
          
          
      }

      if(this.row==10 && team=="team2"){
        (<HTMLInputElement> document.getElementById("result")).disabled = false;
      }
          
      }
    
      getTeamScore() {
        return this.teamScore;
      }
    }
    
    let team1 = new Team();
    let team2 = new Team();
    
    document.getElementById('hit1').addEventListener('click', () => {
      team1.play("team1");
    });
    
    document.getElementById('hit2').addEventListener('click', () => {
      team2.play("team2");
    });
  
  
    function result(team1:Team,team2:Team)
  {
      if(team1.teamScore>team2.teamScore)
      {
          document.getElementById("winner").innerText="MATCH WON BY TEAM 1"
          document.getElementById("mom").innerHTML=`MAN OF THE MATCH IS Player${team1.arr.indexOf(team1.max_score_player)+1}`;
      }
      
  
      if(team1.teamScore<team2.teamScore)
      {
          document.getElementById("winner").innerText="MATCH WON BY TEAM 2"
          document.getElementById("mom").innerHTML=`MAN OF THE MATCH IS Player ${team2.arr.indexOf(team2.max_score_player)+1}`;
      }
  
      if(team1.teamScore==team2.teamScore)
      {
          document.getElementById("winner").innerHTML="MATCH WAS A DRAW";
          if(team1.max_score_player>team2.max_score_player)
          {
              document.getElementById("maom").innerHTML=`MAN OF THE MATCH IS<br>TEAM 1 : Player ${team1.arr.indexOf(team1.max_score_player)+1}`;
          }
          if(team1.max_score_player<team2.max_score_player)
          {
              document.getElementById("mom").innerHTML=`MAN OF THE MATCH IS<br>TEAM 2 : Player ${team2.arr.indexOf(team2.max_score_player)+1}`
          }
          
      }
      document.getElementById("start_again").style.visibility = "visible";
      
  }
  
    