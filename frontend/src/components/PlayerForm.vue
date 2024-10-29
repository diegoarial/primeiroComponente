<template>
  <div>
    <h1>Cadastro de Jogadores</h1>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="player.nome" placeholder="Nome" required />
      <input type="number" v-model="player.idade" placeholder="Idade" required />
      <input type="text" v-model="player.posicao" placeholder="Posição" required />
      <input type="number" v-model="player.numeroCamisa" placeholder="Número da Camisa" required />
      <input type="text" v-model="player.peDominante" placeholder="Pé Dominante" required />
      <input type="number" v-model="player.numeroGols" placeholder="Número de Gols" required />
      <button type="submit">Cadastrar Jogador</button>
    </form>

    <div id="playersList">
      <div class="player-box" v-for="(player, index) in players" :key="index">
        <p><strong>Nome:</strong> {{ player.nome }}</p>
        <p><strong>Idade:</strong> {{ player.idade }}</p>
        <p><strong>Posição:</strong> {{ player.posicao }}</p>
        <p><strong>Número da Camisa:</strong> {{ player.numeroCamisa }}</p>
        <p><strong>Pé Dominante:</strong> {{ player.peDominante }}</p>
        <p><strong>Número de Gols:</strong> {{ player.numeroGols }}</p>
        <button @click="deletePlayer(index)">Deletar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      player: {
        nome: "",
        idade: "",
        posicao: "",
        numeroCamisa: "",
        peDominante: "",
        numeroGols: "",
      },
      players: [],
    };
  },
  methods: {
    async submitForm() {
      const response = await fetch("http://localhost:5000/api/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.player),
      });
      const result = await response.json();
      alert(result.message);
      this.loadPlayers();
      this.resetForm();
    },
    async loadPlayers() {
      const response = await fetch("http://localhost:5000/api/players");
      this.players = await response.json();
    },
    async deletePlayer(index) {
      await fetch(`http://localhost:5000/api/players/${index}`, {
        method: "DELETE",
      });
      this.loadPlayers();
    },
    resetForm() {
      this.player = {
        nome: "",
        idade: "",
        posicao: "",
        numeroCamisa: "",
        peDominante: "",
        numeroGols: "",
      };
    },
  },
  mounted() {
    this.loadPlayers();
  },
};
</script>

<style scoped>
.player-box {
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
}
</style>
