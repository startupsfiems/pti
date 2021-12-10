<template>
  <div>
    <a
      :style="{ fontFamily: 'Gotham-light' }"
      :class="{ active: indexEtapaAtual === 0 }"
      role="button"
      @click="trocaAcao(0)"
    >
      Ação 1
    </a>
    <img src="/assets/arrow-right.svg" alt="arrow-right" />
    <a
      :style="{ fontFamily: 'Gotham-light' }"
      :class="{ active: indexEtapaAtual === 1 }"
      role="button"
      @click="trocaAcao(1)"
    >
      Ação 2
    </a>
    <img src="/assets/arrow-right.svg" alt="arrow-right" />
    <a
      :style="{ fontFamily: 'Gotham-light' }"
      :class="{ active: indexEtapaAtual === 2 }"
      role="button"
      @click="trocaAcao(2)"
    >
      Ação 3
    </a>
  </div>
</template>

<script>
export default {
  name: 'BreadAcoes',
  props: {
    indexEtapaAtual: { type: Number, required: true },
    setAcaoAtual: {
      type: Function,
      default: null
    }
  },
  methods: {
    trocaAcao(index) {
      this.$emit('set-acao-atual', index)
    }
  }
}
</script>

<style scoped>
img {
  margin: 0 10px !important;
}
.active {
  font-family: Gotham-Bold !important;
  color: var(--main-light);
  font-size: 17px;
}
</style>
