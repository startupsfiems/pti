<template>
  <form class="filters">
    <div v-for="(filtro) in filtersAmount" :key="filtro" class="block">
      <label class="gbl" :for="filtersLabels[filtro - 1]">{{ filtersLabels[filtro - 1] }}</label>
      <b-form-select
        :id="filtersLabels[filtro - 1]"
        v-model="selectedFilters[filtro - 1]"
        class="m-gbl"
        :options="filtersOptions[filtro - 1]"
        :disabled="gettingData"
        @change="getDados()"
      />
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PainelFiltros',
  props: {
    filtersAmount: {
      type: Number,
      default: 0
    },
    filtersLabels: {
      type: Array,
      default() {
        return []
      }
    },
    filtersOptions: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      gettingData: false,
      selectedFilters: [],
      filtros: {
        etapaId: 1,
        regiaoId: 1,
        divisaoCnaeId: '1', // Precisa ir como string
        grupoCnaeId: '1', // Precisa ir como string
        porteId: 1,
        setorId: 1,
        dataInicial: null,
        dataFinal: null
      }
    }
  },
  computed: {
    ...mapState({
      uiPainel: state => state.painelResultados.ui
    })
  },
  created() {
    for (const opt of this.filtersOptions) {
      this.selectedFilters.push(opt[0].value)
    }
    this.getDados()
  },
  methods: {
    async getDados() {
      this.gettingData = true
      this.filtros.etapaId = this.selectedFilters[0]
      this.filtros.regiaoId = this.selectedFilters[1]
      this.filtros.divisaoCnaeId = this.selectedFilters[2]
      this.filtros.grupoCnaeId = this.selectedFilters[3]
      this.filtros.porteId = this.selectedFilters[4]
      this.filtros.setorId = this.selectedFilters[5]
      // data not getting setted at this point. Next change will set previous one
      const params = this.filtros
      try {
        await this.$store.dispatch({
          type: 'painelResultados/getDataPanel',
          params
        })
        if (this.uiPainel.codigo === 200) {
          this.$emit('dados-recebidos')
        } else {
          this.$emit('erro')
        }
      } catch (error) {
        console.error(error)
      }
      this.gettingData = false
    }
  }
}
</script>

<style scoped>
  .filters {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .filters select {
    border: 1px solid var(--text-title) ;
    border-radius: 25px;
    background: url('~/static/assets/arrow-down.svg') no-repeat 90% center;
    background-color: white;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .block {
    width: 144px;
    padding: 5px;
  }
  .block label {
    padding-left: 15px;
  }
</style>
