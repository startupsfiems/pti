<template>
  <div class="cadastro-tarefas">
    <Header :title="tituloPagina" :is-home="false" />
    <div v-if="emNovoTipo">
      <SelectTipoAcao
        :set-tipo-acao="setTipoAcao"
        @tipo-escolhido="emNovoTipo = false, setTipoAcao = false"
      />
    </div>
    <div v-else>
      <ContainerTarefas
        :importando-tarefas="importandoTarefas"
        :injetar-tarefas-escolhidas="injetarTarefasEscolhidas"
        :put-tarefas="putTarefas"
        @importando-tarefas="importandoTarefas = true"
        @injetar-tarefas-escolhidas="injetarTarefasEscolhidas = false"
        @tarefas-cadastradas="putTarefas = false"
        @cadastrou-com-sucesso="mostrarConfirmacaoCadastro()"
      />
    </div>
    <footer class="col-12 text-center mt-4">
      <button class="btn-light-blue cancelar" @click="cancelarComportamento()">
        Cancelar
      </button>
      <button v-if="emNovoTipo" class="btn-light-blue proximo" @click.prevent="setTipoDeAcao()">
        Próximo
      </button>
      <button v-else class="btn-light-blue proximo" @click="salvarComportamento()">
        Salvar
      </button>
    </footer>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import SelectTipoAcao from '~/components/tarefa/SelectTipoAcao.vue'
import ContainerTarefas from '~/components/tarefa/ContainerTarefas.vue'
export default {
  name: 'CadastrarTarefas',
  components: { Header, SelectTipoAcao, ContainerTarefas },

  data() {
    return {
      emNovoTipo: true,
      setTipoAcao: false,
      importandoTarefas: false,
      injetarTarefasEscolhidas: false,
      putTarefas: false
    }
  },

  computed: {
    tituloPagina() {
      return this.emNovoTipo ? 'NOVO TIPO DE AÇÃO' : 'NOVO CHECKLIST'
    }
  },
  methods: {
    salvarComportamento() {
      if (this.importandoTarefas) {
        this.importarTarefas()
      } else {
        this.putTarefas = true
      }
    },
    cancelarComportamento() {
      if (this.importandoTarefas) {
        this.$store.dispatch('tipoDeAcao/resetTarefasEscolhidas')
        this.$store.dispatch('tipoDeAcao/resetTarefasExistentes')

        this.importandoTarefas = false
      } else {
        this.emNovoTipo = true
      }
    },
    importarTarefas() {
      this.injetarTarefasEscolhidas = true
      // importandoTarefas serve para trocar a view
      this.importandoTarefas = false
      // const selectedRows = document.querySelectorAll('.selected-row')
      // for (const row of selectedRows) {
      //   row.classList.remove('selected-row')
      // }
    },
    setTipoDeAcao() {
      this.setTipoAcao = true
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
    },
    mostrarConfirmacaoCadastro() {
      this.emNovoTipo = true
      this.showToast('Tarefas cadastradas com sucesso!', 'success', ' ', 'b-toaster-top-left', 3000)
    }
  }
}
</script>

<style scoped>
  .cancelar,
  .proximo {
    width: 170px;
    height: 41px;
    margin: 5px;
  }
  .cancelar {
    background-color: #72afd8;
  }
</style>
