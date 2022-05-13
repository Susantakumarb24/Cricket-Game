var ScoreBoard = /** @class */ (function () {
    function ScoreBoard(team) {
        document.getElementById("result").disabled = true;
        document.getElementById("hit2").disabled = true;
        this.id = team;
        var table = document.getElementById(this.id);
        var thead = document.createElement("thead");
        var head_row = document.createElement("tr");
        for (var i = 0; i < 8; i++) {
            var th = document.createElement("th");
            if (i == 0)
                th.innerHTML = this.id.toUpperCase();
            if (i == 7)
                th.innerText = "Total";
            if (i <= 6 && i >= 1)
                th.innerHTML = "B" + i;
            head_row.appendChild(th);
        }
        thead.appendChild(head_row);
        table.appendChild(thead);
        var tbody = document.createElement("tbody");
        for (var i = 1; i <= 10; i++) {
            var body_tr = document.createElement("tr");
            var th = document.createElement("th");
            th.innerHTML = "Player " + i;
            body_tr.appendChild(th);
            for (var j = 1; j <= 7; j++) {
                var td = document.createElement("td");
                td.setAttribute("id", "".concat(this.id, "_").concat(i).concat(j));
                body_tr.appendChild(td);
            }
            tbody.appendChild(body_tr);
        }
        table.appendChild(tbody);
    }
    return ScoreBoard;
}());
new ScoreBoard("team1");
new ScoreBoard("team2");
document.getElementById("start_again").style.visibility = "hidden";
var Player = /** @class */ (function () {
    // balls = [];
    function Player() {
        // id;
        this.score = 0;
    }
    Player.prototype.hit = function () {
        var run = Math.floor(Math.random() * 6);
        this.score += run;
        // this.balls.push(run);
        return run;
    };
    return Player;
}());
var Team = /** @class */ (function () {
    function Team() {
        // players = [];
        this.teamScore = 0;
        this.playerScore = 0;
        this.row = 1;
        this.col = 1;
        this.arr = [];
        this.max_score_player = 0;
        this.player = new Player();
    }
    Team.prototype.play = function (team) {
        var run = this.player.hit();
        this.teamScore += run;
        this.playerScore += run;
        document.getElementById("".concat(team, "_score")).innerHTML = "".concat(this.teamScore);
        // console.log('Player ID ', this.player.id);
        // console.log('Player Run ', run);
        if (this.col <= 6) {
            document.getElementById("".concat(team, "_").concat(this.row).concat(this.col)).innerHTML = run;
            if (run == 0) {
                document.getElementById("".concat(team, "_").concat(this.row).concat(this.col)).innerHTML = "out";
                this.col = 6;
            }
        }
        this.col = this.col + 1;
        if (this.col == 7) {
            document.getElementById("".concat(team, "_").concat(this.row).concat(this.col)).innerHTML = "".concat(this.playerScore);
            this.arr.push(this.playerScore);
            if (this.row === 10) {
                if (team == "team1") {
                    document.getElementById("hit1").disabled = true;
                    document.getElementById("hit2").disabled = false;
                }
                else
                    document.getElementById("hit2").disabled = true;
            }
            this.max_score_player = this.arr.reduce(function (x, y) {
                return Math.max(parseInt(x), parseInt(y));
            });
            this.row = this.row + 1;
            this.col = 1;
            this.playerScore = 0;
            console.log(this.max_score_player);
            console.log("player", this.arr.indexOf(this.max_score_player) + 1);
        }
        if (this.row > 10 && team == "team2") {
            document.getElementById("result").disabled = false;
        }
    };
    Team.prototype.getTeamScore = function () {
        return this.teamScore;
    };
    return Team;
}());
var team1 = new Team();
var team2 = new Team();
document.getElementById('hit1').addEventListener('click', function () {
    team1.play("team1");
});
document.getElementById('hit2').addEventListener('click', function () {
    team2.play("team2");
});
function result(team1, team2) {
    if (team1.teamScore > team2.teamScore) {
        document.getElementById("winner").innerText = "MATCH WON BY TEAM 1";
        document.getElementById("mom").innerHTML = "MAN OF THE MATCH IS Player".concat(team1.arr.indexOf(team1.max_score_player) + 1);
    }
    if (team1.teamScore < team2.teamScore) {
        document.getElementById("winner").innerText = "MATCH WON BY TEAM 2";
        document.getElementById("mom").innerHTML = "MAN OF THE MATCH IS Player ".concat(team2.arr.indexOf(team2.max_score_player) + 1);
    }
    if (team1.teamScore == team2.teamScore) {
        document.getElementById("winner").innerHTML = "MATCH WAS A DRAW";
        if (team1.max_score_player > team2.max_score_player) {
            document.getElementById("maom").innerHTML = "MAN OF THE MATCH IS<br>TEAM 1 : Player ".concat(team1.arr.indexOf(team1.max_score_player) + 1);
        }
        if (team1.max_score_player < team2.max_score_player) {
            document.getElementById("mom").innerHTML = "MAN OF THE MATCH IS<br>TEAM 2 : Player ".concat(team2.arr.indexOf(team2.max_score_player) + 1);
        }
    }
    document.getElementById("start_again").style.visibility = "visible";
}
