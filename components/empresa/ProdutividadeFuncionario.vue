<template>
  <div class="row row-azul-claro h-40 m-gbl">
    <div id="etapa-inicial" class="col-2 etapa-overflow">
      {{ produtividadePorFuncionario[0] }}
    </div>
    <div id="etapa-2" class="col-2 etapa-overflow">
      {{ produtividadePorFuncionario[1] }}
    </div>
    <div id="etapa-3" class="col-2 etapa-overflow">
      {{ produtividadePorFuncionario[2] }}
    </div>
    <div id="etapa-4" class="col-2 etapa-overflow">
      {{ produtividadePorFuncionario[3] }}
    </div>
    <div id="etapa-final" class="col-2 etapa-overflow">
      {{ produtividadePorFuncionario[4] }}
    </div>
    <div id="meta" class="col-2 etapa-overflow">
      <!-- A meta é chumbada no index 4 mesmo -->
      {{ metaProdutividade[4] }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProdutividadeFuncionario',
  props: {
  },
  computed: {
    ...mapState({
      produtividadePorFuncionario: state => state.empresa.dados.historico.produtividadeFuncionarioEmpresaFormatado,
      metaProdutividade: state => state.empresa.dados.historico.produtividadeFuncionarioMetaFormatado,
      etapaAtual: state => state.empresa.dados.historico.etapa
    })
  },
  mounted() {
    this.setEnfaseEtapa(this.etapaAtual)
  },
  methods: {
    setEnfaseEtapa(etapa) {
      switch (etapa) {
        case 'Etapa 2': {
          const etapa = document.querySelector('#etapa-2')
          etapa.classList.add('box-middle')
          break
        }
        case 'Etapa 3': {
          const etapa = document.querySelector('#etapa-3')
          etapa.classList.add('box-middle')
          break
        }
        case 'Etapa 4': {
          const etapa = document.querySelector('#etapa-4')
          etapa.classList.add('box-middle')
          break
        }
        case 'Etapa Final': {
          const etapa = document.querySelector('#etapa-final')
          etapa.classList.add('box-middle')
          break
        }
        default: {
          const etapa = document.querySelector('#etapa-inicial')
          etapa.classList.add('box-middle')
          break
        }
      }
    }
  }
}
</script>

<style scoped>
.row-azul-claro {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
}
.box-middle {
  z-index: 999;
  height: 170px;
  line-height: 170px;
  border: 2px solid #F7AD19;
  border-radius: 10px;
}
.etapa-overflow {
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
