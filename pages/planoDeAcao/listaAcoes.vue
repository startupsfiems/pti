<template>
  <div>
    <Header :title="`AÇÕES`" />

    <div class="box-container container">
      <div class="box-header row">
        <p>Plano de Ação</p>
      </div>

      <div
        v-for="(acao, index) in acoes"
        :key="index"
        class="row"
      >
        <box-lista-acao
          :titulo="`Ação 1`"
          :nome-acao="acao.tipoDeAcao.nomeDaAcao"
          :responsavel="acao.responsavel"
          :local="acao.local"
          :inicio="acao.dataInicial"
          :conclusao="acao.dataConclusao"
          :orcamento="acao.tipoDeAcao.orcamento"
          :objetivo="acao.tipoDeAcao.objetivo"
          :descricao="
            acao.tipoDeAcao.descricao
          "
        />
      </div>
    </div>

    <footer class="button-container">
      <button @click="redirecionarParaTelaDeEmpresa()">Voltar</button>
    </footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Vue from 'vue'

import Header from '../../components/Header.vue'
import BoxListaAcao from '../../components/acao/BoxListaAcao.vue'

export default Vue.extend({
  components: { Header, BoxListaAcao },
  data() {
    return {
      acoes: []
    }
  },
  head() {
    return {
      title: 'Lista de Ações'
    }
  },
  computed: {
    ...mapState({
      empresaInfos: state => state.empresa.infos,
      planoDeAcaoAtual: state => state.acao.planoDeAcaoAtual
    }),
    ...mapGetters({
      empresaId: 'empresa/getEmpresaId'
    })
  },
  mounted() {
    this.buscaPlanoDeAcao()
  },
  methods: {
    async buscaPlanoDeAcao() {
      this.planoDeAcaoCarregado = false
      const params = {
        etapaDiagnosticoId: this.empresaInfos.etapaDiagnosticoId,
        planoDeAcaoId: this.empresaInfos.planoDeAcaoId
      }
      await this.$store.dispatch({
        type: 'acao/getPlanoDeAcaoAtual',
        params
      }).then(() => {
        this.acoes = this.planoDeAcaoAtual.acao
        this.planoDeAcaoCarregado = true
      })
    },
    redirecionarParaTelaDeEmpresa() {
      this.$router.replace({
        path: '/empresa/' + this.empresaId
      })
    }
  }
})
</script>

<style scoped>
.box-container {
  width: 96%;
  max-width: 56rem;
  margin: 24px auto;

  border: 1px solid var(--text-title);
  border-radius: 14px;
}

.box-header {
  width: 100%;
  height: 3.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-header p {
  font-family: Gotham-bold;
  font-size: 1.2rem;
  color: var(--text-title);
  margin: 0;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1.75rem 0;
}

.button-container button {
  border: 0;
  width: 10.625rem;
  height: 2.5rem;
  border-radius: 1.313rem;
  background-color: var(--main-light);
  font-size: 1rem;
  font-family: 'GothamBook';
  color: var(--shape);
}
</style>
