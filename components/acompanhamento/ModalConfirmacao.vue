<template>
  <div class="modal-content">
    <img src="/assets/exclamacao.svg" />
    <h1>{{ title }}</h1>
    <p>{{ description + valorFormatado + '?' }}</p>

    <div class="modal-buttons-container">
      <button class="cancel-button" @click="cancelar">
        Não, alterar
      </button>
      <button @click="confirmar">
        Sim, confirmar
      </button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({

  props: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    valor: { type: String, default: '' }
  },
  data() {
    return {
      valorFormatado: Number(this.valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
  },

  methods: {
    confirmar() {
      this.$emit('confirmar')
    },

    cancelar() {
      this.$emit('cancelar')
    }
  }
})

</script>

<style scoped>
.modal-content {
  padding: 1.5rem 5rem;
  width: 34rem;
  background-color: var( --main-light);
  color: var(--shape);

  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: .8rem;
}

.modal-content img {
  width: 3.25rem;
  height: 3.25rem;
  margin-bottom: 1rem;
}

.modal-content h1 {
  font-size: 1.75rem;
}

.modal-content p {
  margin-bottom: 1.6rem;
}

.modal-buttons-container button {
  border: 0;
  padding: .4rem 1.2rem;
  background-color: #fff;
  margin: 0 .5rem;
  border-radius: 1.2rem;
}

.modal-buttons-container .cancel-button {
  background-color: rgba(255, 255, 255, 0.75);
}
</style>
