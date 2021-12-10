<template>
  <div class="empresa">
    <Header :title="nomeEmpresa" />
    <div class="mt-5" />
    <!-- <div v-if="gettandoResultados" class="spinner text-center">
      <b-spinner variant="primary" label="Text Centered" />
    </div>
    <div v-else> -->
    <HistoricoResultados :aguardando-busca-de-dados="gettandoResultados" />
    <div v-for="etapa in empresaDados.etapas" :key="etapa.etapaId">
      <Etapa :etapa="etapa" />
    </div>
    <div class="container-fluid mb-5">
      <div class="row">
        <button
          class="btn-light-blue nova-etapa mt-5"
          @click="iniciarNovaEtapa()"
        >
          Iniciar Etapa
          {{
            empresaDados.etapas !== null
              ? empresaDados.etapas.length
              : 'Inicial'
          }}
        </button>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import HistoricoResultados from '~/components/empresa/HistoricoResultados.vue'
import Etapa from '~/components/empresa/Etapa.vue'
import Header from '~/components/Header.vue'

export default {
  name: 'Empresa',
  components: { HistoricoResultados, Etapa, Header },
  data() {
    return {
      nomeEmpresa: 'DADOS DA EMPRESA',
      // Os dados abaixo são exatamente iguais pelo seguinte motivo: gettandoResultados é utilizado para condicionar a renderização da DOM
      // e aguardandoRespostaAPI é utilizado como prop no componente HistoricoResultados para acessar os dados quando a resposta da API retornar.
      // Por que não usar a mesma variável? Por que quando a DOM, o componente deixa de existir, e assim o prop a ele passado, e o watcher relacionado a ele,
      // o que provoca o não acesso aos dados no state quando a resposta da API chega.
      gettandoResultados: false
      // aguardandoRespostaAPI: false
    }
  },
  computed: {
    ...mapState({
      uiEmpresa: state => state.empresa.ui,
      empresaInfos: state => state.empresa.infos,
      empresaDados: state => state.empresa.dados,
      empresasDoAgente: state => state.user.empresasDoAgente
    }),
    ...mapGetters({
      agenteId: 'user/getIdUsuarioLogado'
    })
  },
  mounted() {
    this.getNomeDaEmpresaAtual()

    this.getResultadosEmpresas(
      this.agenteId,
      parseInt(this.$route.params.empresa)
    )
  },
  methods: {
    getNomeDaEmpresaAtual() {
      const empresaIdNumber = Number(this.$route.params.empresa)
      const empresaFiltrada = this.empresasDoAgente.filter(item => item.empresaId === empresaIdNumber)

      if (empresaFiltrada.length !== 0) {
        this.nomeEmpresa = empresaFiltrada[0].nomeEmpresa
      }
    },

    async getResultadosEmpresas(agenteId, empresaId) {
      await this.$store.dispatch({
        type: 'diagnostico/resetState'
      })

      await this.$store.dispatch({
        type: 'empresa/setInfos',
        params: {
          empresaId
        }
      })

      this.$store.dispatch('acao/resetState')

      this.gettandoResultados = true
      const params = {
        agenteId,
        empresaId
      }
      await this.$store
        .dispatch({
          type: 'empresa/getResultadosEmpresa',
          params
        })
        .then(() => {
          this.gettandoResultados = false
          if (this.uiEmpresa.codigo === 200) {
            this.setRepresentanteId()
          }
        })
    },
    async setRepresentanteId() {
      await this.$store.dispatch({
        type: 'empresa/setInfos',
        params: {
          representanteId: this.empresaDados.representanteId
        }
      })
    },
    iniciarNovaEtapa() {
      if (this.empresaDados.etapas === null) {
        const idRepresentante = this.empresaInfos.representanteId
        const idEmpresa = this.empresaInfos.empresaId
        this.$store
          .dispatch({
            type: 'empresa/setInfos',
            params: {
              representanteId: idRepresentante,
              empresaId: idEmpresa
            }
          })
          .then(() => {
            this.$router.push({
              path: '/cadastraEmpresa/informacoes',
              query: {
                idRepresentante,
                idEmpresa
              }
            })
          })
      } else {
        const params = {
          empresaId: this.$route.params.empresa
        }
        this.$store
          .dispatch({
            type: 'empresa/getMetaAnual',
            params
          })
          .then(() => {
            if (this.uiEmpresa.codigo === 200) {
              this.$router.push({
                path: '/novaEtapa/etapa'
              })
            } else {
              this.showToast(
                'Erro ao iniciar etapa',
                'danger',
                this.uiEmpresa.error,
                'b-toaster-top-left',
                3000
              )
            }
          })
      }
    },
    showToast(titulo, tipoToast, mensagem, posicao, delay) {
      this.$bvToast.toast(mensagem, {
        title: titulo,
        variant: tipoToast,
        toaster: posicao,
        autoHideDelay: delay,
        appendToast: true,
        solid: true,
        static: true
      })
    }
  }
}
</script>

<style scoped>
.empresa .nome {
  text-align: center;
  font-family: 'Gotham-bold';
  font-size: 20px;
  color: #f27f0c;
  margin: 42px 0;
}
.nova-etapa {
  margin: auto;
  width: 250px;
  height: 41px;
}
</style>
