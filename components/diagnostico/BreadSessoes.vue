<template>
  <div>
    <a
      prefetch
      :style="{ fontFamily: 'Gotham-light' }"
      :class="{ active: indexEtapaAtual === 0 }"
      role="button"
      @click="abrirSessao(0)"
    >
      Pessoas
    </a>
    <img src="assets/arrow-right.svg" alt="arrow-left" />
    <a
      prefetch
      :style="{ fontFamily: 'Gotham-light' }"
      :class="{ active: indexEtapaAtual === 1 }"
      role="button"
      @click="abrirSessao(1)"
    >
      Gestão
    </a>
    <img src="assets/arrow-right.svg" alt="arrow-left" />
    <a
      prefetch
      :style="{ fontFamily: 'Gotham-light' }"
      :class="{ active: indexEtapaAtual === 2 }"
      role="button"
      @click="abrirSessao(2)"
    >
      SST
    </a>
    <img src="assets/arrow-right.svg" alt="arrow-left" />
    <a
      prefetch
      :style="{ fontFamily: 'Gotham-light' }"
      :class="{ active: indexEtapaAtual === 3 }"
      role="button"
      @click="abrirSessao(3)"
    >
      Inovação e Mercado
    </a>
  </div>
</template>

<script>
export default {
  name: 'BreadSessoes',
  props: {
    indexEtapaAtual: { type: Number, required: true },
    setSessaoAtual: {
      type: Function,
      default: null
    }
  },
  methods: {
    abrirSessao(sessao) {
      this.$emit('set-sessao-atual', sessao)
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
