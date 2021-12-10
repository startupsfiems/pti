<template>
  <div class="row row-amarelo-claro m-gbl">
    <div class="col-2 centraliza-icon-row">
      <button v-if="!buscandoRespostas" class="link" @click="carregarRespostasDeQuestionario()" />
      <div v-else class="spinner">
        <b-spinner variant="primary" label="Text Centered" />
      </div>
    </div>
    <div class="col-3 overflow-in-row">
      {{ diagnostico.nomeRepresentante }}
    </div>
    <div class="col-3">
      {{ new Date(diagnostico.data).toLocaleDateString('pt-br') }}
    </div>
    <div class="col-2">
      {{ diagnostico.scorePti }}%
    </div>
    <div class="col-2 centraliza-icon-row">
      <button
        class="resultados"
        @click.prevent="$router.push(
          {
            path: '../../diagnostico/resultados',
            query: {
              empresaId: $route.params.empresa,
              etapaDiagnosticoId: diagnostico.etapaDiagnosticoId,
              planoDeAcaoId: planoDeAcaoId(),
              gerarPDF: false
            }
          }
        )"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DiagnosticoDaEtapa',
  props: {
    diagnostico: {
      type: Object,
      default: null
    },
    etapaDiagnosticoId: {
      type: Number,
      default: 0
    },
    planoDeAcao: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      buscandoRespostas: false
    }
  },
  computed: {
    ...mapState({
      ui: state => state.diagnostico.ui
    })
  },
  methods: {
    planoDeAcaoId() {
      let retorno
      if (this.planoDeAcao === null) {
        retorno = null
      } else {
        retorno = this.planoDeAcao.planoDeAcaoId
      }
      return retorno
    },
    async carregarRespostasDeQuestionario() {
      const params = {
        etapaId: this.etapaDiagnosticoId
      }
      this.buscandoRespostas = true
      await this.$store.dispatch({
        type: 'diagnostico/getRespostasDeDiagnostico',
        params
      }).then(() => {
        this.buscandoRespostas = false
        if (this.ui.codigo === 200) {
          this.$router.push({
            path: '/diagnostico?sessao=pessoas'
          })
        } else {
          this.showToast(
            'Erro ao buscar respostas',
            'danger',
            this.ui.error,
            'b-toaster-top-left',
            3000
          )
        }
      })
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
    .row-amarelo-claro {
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .resultados {
      background: url('~/static/assets/resultados.svg') no-repeat;
      border: 0;
      height: 20px;
      width: 17px;
    }
    .link {
      background: url('~/static/assets/icon-questionario.svg') no-repeat;
      border: 0;
      height: 20px;
      width: 20px;
    }
</style>
