function randomValue(min, max) {
  return (attackValue = Math.floor(Math.random() * (max - min)) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      round: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monterBarStyle() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    specialAttackDisable() {
      return this.round % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        //draw
        this.winner = "draw";
      } else if (value <= 0) {
        //lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        //draw
        this.winner = "draw";
      } else if (value <= 0) {
        //monster lost
        this.winner = "player";
      }
    },
  },
  methods: {
    attackMonster() {
      const attackValue = randomValue(15, 5);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.round++;
      this.LogMsg("player", "attack", attackValue);
    },
    attackPlayer() {
      const attackValue = randomValue(17, 7);
      this.playerHealth -= attackValue;
      this.LogMsg("monster", "attack", attackValue);
    },
    specialAttack() {
      const attackValue = randomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.round++;
      this.LogMsg("player", "special-attack", attackValue);
    },
    heal() {
      this.round++;
      const healValue = randomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.LogMsg("player", "heal", healValue);

      this.attackPlayer();
    },
    restart() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.round = 0;
      this.winner = null;
    },
    surrender() {
      this.winner = "monster";
    },
    LogMsg(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
