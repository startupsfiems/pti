<template>
  <main class="painel-resultados">
    <b-overlay :show="show" z-index="999">
      <Header :is-home="false" :title="`PAINEL DE RESULTADOS`" />
      <PainelAgente v-if="permissionId === 74" :permission-id="permissionId" :filters-options="filtersOptions" :loading-filters="loadingFilters" />
      <PainelGerente v-if="permissionId === 72" :permission-id="permissionId" :filters-options="filtersOptions" :loading-filters="loadingFilters" />
      <PainelGestor v-if="permissionId === 73" :permission-id="permissionId" :filters-options="filtersOptions" :loading-filters="loadingFilters" />
    </b-overlay>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import popularFiltros from '~/utils/functions.js'
export default {
  data() {
    return {
      filtersOptions: [],
      show: false,
      loadingFilters: true
    }
  },
  computed: {
    ...mapState({
      filtro: state => state.painelResultados.filtro,
      permissionId: state => state.user.usuarioLogado.permissaoId
    })
  },
  watch: {
    filtro() {
      if (this.filtro) {
        switch (this.permissionId) {
          case 74:
            for (let filtroOption = 0; filtroOption < 5; filtroOption++) {
              this.filtersOptions.push([])
            }
            this.filtersOptions = popularFiltros('PainelAgente', this.filtro, this.filtersOptions)
            this.loadingFilters = false
            break

          default:
            for (let filtroOption = 0; filtroOption < 7; filtroOption++) {
              this.filtersOptions.push([])
            }
            this.filtersOptions = popularFiltros('NotAgent', this.filtro, this.filtersOptions)
            this.loadingFilters = false
            break
        }
      }
    }
  },
  created() {
    this.$store.dispatch('painelResultados/getFiltros')
  }
}
</script>

<style scoped>
</style>
