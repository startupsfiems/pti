<template>
  <div>
    <Header :title="`ETAPA 1`" />

    <div class="container">
      <div class="row justify-content-md-center pt-4 pb-3">
        <div class="head-title">
          <bread-acoes
            :index-etapa-atual="indexSelecionado"
            @set-acao-atual="setAcaoAtual($event)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <modal-acao :acao="acaoAtual" :index="indexSelecionado" />
        </div>
      </div>
      <div class="row justify-content-md-center mt-4 mb-5">
        <button
          v-if="indexSelecionado === 0"
          class="btn-light-blue mr-3"
          @click="$router.back()"
        >
          Cancelar
        </button>
        <button
          v-if="indexSelecionado !== 0"
          class="btn-light-blue mr-3"
          @click="trocaAcao(-1)"
        >
          Voltar
        </button>
        <button
          v-if="indexSelecionado < 2"
          class="btn-light-blue mr-3"
          @click="trocaAcao(1)"
        >
          Próximo
        </button>
        <div v-if="indexSelecionado === 2">
          <button
            v-if="!salvandoPlanoDeAcao"
            class="btn-light-blue mr-3"
            @click="finalizarPlanoDeAcao()"
          >
            Finalizar
          </button>
          <div v-else>
            <b-spinner variant="light" label="Text Centered" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import BreadAcoes from '../../components/acao/BreadAcoes.vue'
import ModalAcao from '../../components/acao/ModalAcao.vue'
import Header from '~/components/Header.vue'

export default {
  title: 'Plano de Ação',
  components: { BreadAcoes, Header, ModalAcao },
  data() {
    return {
      salvandoPlanoDeAcao: false,
      planoDeAcaoCarregado: false,
      acaoAtual: null,
      acaoSelecionada: '',
      indexSelecionado: 0
    }
  },
  computed: {
    ...mapState({
      acaoUi: state => state.acao.ui,
      empresaInfos: state => state.empresa.infos,
      planoDeAcaoAtual: state => state.acao.planoDeAcaoAtual
    })
  },
  mounted() {
    if (this.planoDeAcaoAtual === null) {
      this.buscaPlanoDeAcao()
    } else {
      this.setAcaoAtual()
    }
  },
  methods: {
    trocaAcao(index) {
      if (index === 0) {
        this.$router.back()
      } else {
        this.indexSelecionado += index
        this.setAcaoAtual(this.indexSelecionado)
      }
    },
    setAcaoAtual(index = 0) {
      this.indexSelecionado = index
      if (
        this.planoDeAcaoAtual !== null &&
        this.planoDeAcaoAtual.acao.length !== 0
      ) {
        this.acaoAtual = this.planoDeAcaoAtual.acao[this.indexSelecionado]
      }
      this.planoDeAcaoCarregado = true
    },
    async buscaPlanoDeAcao() {
      this.planoDeAcaoCarregado = false
      const params = {
        etapaDiagnosticoId: this.empresaInfos.etapaDiagnosticoId,
        planoDeAcaoId: this.empresaInfos.planoDeAcaoId
      }
      await this.$store
        .dispatch({
          type: 'acao/getPlanoDeAcaoAtual',
          params
        })
        .then(() => {
          this.setAcaoAtual()
        })
    },
    campoDeAcaoVazio(acao) {
      if (
        acao.tipoDeAcaoId === 0 ||
        acao.responsavel === '' ||
        acao.local === '' ||
        acao.dataInicial === '' ||
        acao.dataConclusao === '' ||
        acao.descricao === ''
      ) {
        return true
      }
      return false
    },
    async finalizarPlanoDeAcao() {
      // verifica se tem route params
      // if (this.$route.query.planoDeAcao) {}

      // Valida se todas ações estão preenchidas
      for (let i = 0; i < this.planoDeAcaoAtual.acao.length; ++i) {
        if (this.campoDeAcaoVazio(this.planoDeAcaoAtual.acao[i])) {
          this.showToast(
            'Erro ao salvar ações',
            'danger',
            'Você deve preencher todos os dados da Ação ' + parseInt(i + 1),
            'b-toaster-top-left',
            3000
          )
          return null
        }
      }
      this.salvandoPlanoDeAcao = true
      const params = {
        id: this.empresaInfos.planoDeAcaoId,
        acao: []
      }
      this.planoDeAcaoAtual.acao.forEach((acao) => {
        const acaoParaSalvar = {
          tipoDeAcaoId: acao.tipoDeAcaoId,
          responsavel: acao.responsavel,
          local: acao.local,
          dataInicial: acao.dataInicial,
          dataConclusao: acao.dataConclusao,
          descricao: acao.descricao,
          planoDeAcaoId: acao.planoDeAcaoId
        }
        params.acao.push(acaoParaSalvar)
      })

      await this.$store
        .dispatch({
          type: 'acao/adicionarAcoesNoPlano',
          params
        })
        .then(() => {
          this.salvandoPlanoDeAcao = false
          if (this.acaoUi.codigo === 200) {
            this.showToast(
              'Sucesso',
              'success',
              this.acaoUi.success,
              'b-toaster-top-left',
              3000
            )
            this.$router.replace({
              path: '/planoDeAcao/listaAcoes'
            })
          } else {
            this.showToast(
              'Erro ao salvar plano de ação',
              'danger',
              this.acaoUi.error,
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

<style></style>
