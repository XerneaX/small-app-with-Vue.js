new Vue({
    el:"#app",
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameButtonsShow: false,
        matchInfo:[]
    },
    methods:{
        newGame: function(){
            this.gameButtonsShow = !this.gameButtonsShow;
            console.log(this.matchInfo.length);
        },
        attack: function () {
            let keepPlayerHealth = this.playerHealth;
            let keepMonsterHealth = this.monsterHealth;
            this.playerHealth = Math.round(this.playerHealth - (Math.random()*10+10));
            this.playerHealth = this.checkHeal(this.playerHealth);
            this.matchInfo.push({action:"Canavar Saldırısı", heal: keepPlayerHealth - this.playerHealth, code: 'red' });
            this.monsterHealth = Math.round(this.monsterHealth - (Math.random()*10+10));
            this.monsterHealth = this.checkHeal(this.monsterHealth);
            this.matchInfo.push({action:"Canavarın Canını Azalttın", heal: keepMonsterHealth - this.monsterHealth, code: 'blue'});
        },
        specialAttack: function () {
            let keepPlayerHealth = this.playerHealth;
            let keepMonsterHealth = this.monsterHealth;
            this.playerHealth = Math.round(this.playerHealth - (Math.random()*10+10));
            this.playerHealth = this.checkHeal(this.playerHealth);
            this.matchInfo.push({action:"Canavar Saldırısı", heal: keepPlayerHealth - this.playerHealth , code:'red'});
            this.monsterHealth = Math.round(this.monsterHealth - (Math.random()*10+20));
            this.monsterHealth = this.checkHeal(this.monsterHealth);
            this.matchInfo.push({action:"Canavarın Canını Azalttın", heal: keepMonsterHealth - this.monsterHealth, code: 'blue'});
        },
        heal: function () {
            if(this.playerHealth<100){
                let heal = Math.round(Math.random()*10+10);
                this.playerHealth = Math.round(this.playerHealth + heal - (Math.random()*10+10));
                this.matchInfo.push({action:"İlk Yardım", heal: heal, code:'green'});
            }
        },
        giveUp: function () {
            this.playerHealth = 0;
            this.loseGame();
        },
        checkHeal: function(heal){
            return  heal < 0 ? 0 : heal;
        },

        endGame: function () {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.matchInfo = [];
        }
    },
    computed:{
        drawGame: function () {
           return this.playerHealth == 0 && this.monsterHealth == 0 ? 1 :0;
        },
        winGame: function () {
            return this.playerHealth > 0 && this.monsterHealth == 0 ? 1 : 0;
        },
        loseGame: function () {
            return this.playerHealth == 0 && this.monsterHealth > 0 ? 1 : 0;
        },

    },
    watch:{
        drawGame: function (value) {
            if(value){
                alert("Draw");
                this.endGame();
            }

        },
        winGame: function (value) {
            if(value) {
                alert("Win");
                this.endGame();
            }
        },
        loseGame: function (value) {
            if(value) {
                alert("Lose");
                this.endGame();
            }
        }
    }
})