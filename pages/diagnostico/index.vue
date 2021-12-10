<template>
  <div>
    <Header :title="`DIAGNÓSTICO - QUESTIONÁRIO`" />
    <div class="container">
      <div class="row justify-content-md-center pt-4 pb-3">
        <div class="head-title">
          <bread-sessoes
            :index-etapa-atual="sessaoIndex"
            @set-sessao-atual="setSessaoAtual($event)"
          />
          <div style="display: none;">
            {{ $route.query }}{{ sessaoIndex }}
          </div>
        </div>
      </div>
      <div class="row">
        <div v-if="sessaoAtual == null" />
        <div
          v-for="(questao, index) in sessaoAtual.questoes"
          v-else
          :key="questao.id"
          class="col-12 pb-4"
        >
          <modal-questao
            :key="questao.id"
            :questao="questao"
            :atividade-id="sessaoAtual.atividadeId"
            :resposta="respostasDaSessaoAtual.respostas[index]"
            :mostrando-respostas="mostrandoRespostas"
          />
        </div>
      </div>
      <div class="row justify-content-md-center mb-5">
        <button
          v-if="sessaoIndex > 0"
          class="btn-light-blue mr-3"
          @click="trocaSessaoAtual(-1)"
        >
          Voltar
        </button>
        <button
          v-if="sessaoIndex < 3"
          class="btn-light-blue mr-3"
          @click="trocaSessaoAtual(1)"
        >
          Próximo
        </button>
        <div v-else>
          <div v-if="enviandoRespostas" class="text-center">
            <b-spinner variant="primary" label="Text Centered" />
          </div>
          <button v-else class="btn-light-blue" @click="trocaSessaoAtual(0)">
            Finalizar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import BreadSessoes from '../../components/diagnostico/BreadSessoes.vue'
import ModalQuestao from '../../components/diagnostico/ModalQuestao.vue'
import Header from '~/components/Header.vue'

export default {
  title: 'Cadastrar Empresa',
  components: { ModalQuestao, BreadSessoes, Header },
  props: {
    sessoes: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      nomeSessaoAtual: '',
      sessaoAtual: null,
      respostasDaSessaoAtual: null,
      sessaoIndex: 0,
      pegouAtividades: false,
      enviandoRespostas: false,
      mostrandoRespostas: false
    }
  },
  computed: {
    ...mapState({
      ui: state => state.diagnostico.ui,
      atividades: state => state.diagnostico.dadosDeAtividades,
      dadosDeResposta: state => state.diagnostico.dadosDeResposta,
      empresaInfos: state => state.empresa.infos
    })
  },
  mounted() {
    this.sessaoIndex = 0
    if (this.atividades.length === 0) {
      this.buscaAtividades()
    } else {
      this.setSessaoAtual()
    }
  },
  methods: {
    async buscaAtividades() {
      this.pegouAtividades = false
      const params = {
        etapaId: this.empresaInfos.etapaDiagnosticoId,
        usuarioId: this.empresaInfos.representanteId
      }
      await this.$store
        .dispatch({
          type: 'diagnostico/getAtividadesDoDiagnostico',
          params
        })
        .then(() => {
          this.pegouAtividades = true
          this.setSessaoAtual(0)
        })
    },
    setSessaoAtual(index = 0) {
      this.sessaoIndex = index
      if (this.atividades[0].dataEntrega !== undefined) {
        this.mostrandoRespostas = true
      }
      this.sessaoAtual = this.atividades[this.sessaoIndex]
      this.respostasDaSessaoAtual = this.dadosDeResposta.respostas[
        this.sessaoIndex
      ]
      this.scrollToTop()
    },
    trocaSessaoAtual(x) {
      if (x === 0) {
        if (this.mostrandoRespostas) {
          this.$router.back()
        } else {
          this.enviaRespostasDoDiagnostico()
        }
      } else {
        this.sessaoIndex += x
        this.setSessaoAtual(this.sessaoIndex)
      }
    },
    async enviaRespostasDoDiagnostico() {
      if (this.checaSeRespondeuTudo()) {
        this.enviandoRespostas = true
        const params = {
          respostas: { ...this.dadosDeResposta },
          empresaId: this.empresaInfos.empresaId,
          representanteId: this.empresaInfos.representanteId,
          etapaId: this.empresaInfos.etapaDiagnosticoId
        }

        await this.$store
          .dispatch({
            type: 'diagnostico/enviarRespostasDoDiagnostico',
            params
          })
          .then(() => {
            if (this.ui.codigo === 200) {
              this.showToast(
                'Sucesso',
                'success',
                'Diagnóstico preenchido com sucesso!',
                'b-toaster-top-left',
                3000
              )
              this.$router.replace({
                path: '/empresa/' + this.empresaInfos.empresaId
              })
            } else {
              this.enviandoRespostas = false
              this.showToast(
                'Erro ao salvar respostas',
                'danger',
                this.ui.error,
                'b-toaster-top-left',
                3000
              )
            }
          })
      } else {
        this.enviandoRespostas = false
        this.showToast(
          'Respostas',
          'warning',
          'Você deve preencher todas as questões',
          'b-toaster-top-left',
          3000
        )
      }
    },
    checaSeRespondeuTudo() {
      let pode = true
      for (let i = 0; i < this.dadosDeResposta.respostas.length && pode; ++i) {
        for (
          let j = 0;
          j < this.dadosDeResposta.respostas[i].respostas.length && pode;
          ++j
        ) {
          if (
            this.dadosDeResposta.respostas[i].respostas[j].jsonResposta === ''
          ) {
            pode = false
          }
        }
      }
      return pode
    },
    scrollToTop() {
      window.scrollTo(0, 0)
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
.head-title {
  width: 100%;
  display: flex;
  height: 1.18rem;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: center;
}
.questionario-botao {
  background: #58aadb;
  box-shadow: 0px 2px 3px rgba(255, 255, 255, 0.25);
  border-radius: 12px;
}
.btn-light-blue {
  padding: 0 1.1rem 0 1.1rem;
  font-family: 'Gotham-light';
  font-size: 16px;
}
</style>
