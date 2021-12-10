<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-10 offset-1 col-lg-8 offset-lg-2">
        <div class="box-branco">
          <main>
            <button
              class="btn-light-blue importar"
              :disabled="importandoTarefas"
              :class="{ 'btn-desativado': importandoTarefas }"
              @click="getTarefasExistentes()"
            >
              Importar
            </button>
            <button
              class="btn-light-blue novo-item"
              :disabled="importandoTarefas"
              :class="{ 'btn-desativado': importandoTarefas }"
              @click.prevent="novaTarefa()"
            >
              Novo item
            </button>
            <div v-if="importandoTarefas" class="row place-search">
              <div class="col-12 p-0">
                <div class="buscar-empresa">
                  <button class="btn-lupa" />
                  <input
                    id="buscar-empresa"
                    v-model="searchInput"
                    type="text"
                    name="buscar-firma"
                    placeholder="Busque aqui"
                  />
                </div>
              </div>
            </div>

            <div v-if="tarefas.length > 0" class="row legendas gbl">
              <div class="col-6 item">
                Item
              </div>
              <div v-if="!importandoTarefas" class="col-3 valor">
                Valor
              </div>
            </div>
            <form v-if="!importandoTarefas" action="submit">
              <div class="row overflow-tarefas">
                <div class="col-12">
                  <div
                    v-for="(tarefa, index) in tarefas"
                    :key="index"
                    class="row row-azul-claro m-gbl"
                  >
                    <div class="col-6">
                      <input
                        id="nome-tarefa"
                        v-model="tarefa.nome"
                        type="text"
                        name="nome-tarefa"
                        placeholder="Digite a tarefa aqui..."
                      />
                    </div>
                    <div class="col-5">
                      <div class="box-input">
                        <button @click.prevent="decrementarPercentual(index)">
                          <img class="button-input-img" src="/assets/arrow-left-blue.svg" />
                        </button>
                        <input
                          id="percentual-tarefa"
                          v-model="tarefa.percentual"
                          type="number"
                          name="percentual-tarefa"
                          min="0"
                          max="100"
                          placeholder="0"
                        />
                        <label class="m-0" for="percentual-tarefa">%</label>
                        <button @click.prevent="incrementarPercentual(index)">
                          <img class="button-input-img" src="/assets/arrow-right-blue.svg" />
                        </button>
                      </div>
                    </div>
                    <div class="col-1 container-lixeira">
                      <button
                        class="deleta-tarefa"
                        @click.prevent="deletaTarefa(index)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <section v-else id="container-importar-tarefas">
              <div class="row overflow-tarefas">
                <div class="col-12">
                  <div
                    v-for="tarefa in tarefasFiltro"
                    :id="'selectable-row' + tarefa.tarefaId"
                    :key="tarefa.tarefaId"
                    class="row row-azul-claro m-gbl tarefa-selecionavel"
                    :class="{'selected-row': tarefa.selected}"
                    @click.prevent="selectTarefa(tarefa.tarefaId, tarefa.tarefa)"
                  >
                    <div class="col-12">
                      {{ tarefa.tarefa }}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div v-if="!importandoTarefas" class="row">
              <div class="col-5 gbl itens">
                {{ qntdTarefasCriadas }}
              </div>
              <div class="col-5 gbl d-flex">
                TOTAL:
                <div class="s-gbl pl-2">
                  {{ percentualTotal }}%
                </div>
              </div>
            </div>
            <div v-else>
              <div class="col-12 s-gbl text-center mt-4">
                {{ qntdTarefasSelecionadas }}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
    <ModalAlertaCadastro @cadastro-confirmado="cadastraTarefaDeAcao()" @cadastro-cancelado="$emit('tarefas-cadastradas')" />
    <b-modal
      id="modal-confirma-salvar"
      centered
      title="BootstrapVue"
      @ok="cadastraTarefaDeAcao()"
      @hide="$emit('tarefas-cadastradas')"
      @cancel="$emit('tarefas-cadastradas')"
      @close="$emit('tarefas-cadastradas')"
    >
      <p class="my-4">
        Vertically centered modal!
      </p>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ModalAlertaCadastro from './ModalAlertaCadastro.vue'
export default {
  name: 'ContainerTarefas',
  components: { ModalAlertaCadastro },
  props: {
    importandoTarefas: {
      type: Boolean,
      default: false
    },
    injetarTarefasEscolhidas: {
      type: Boolean,
      default: false
    },
    putTarefas: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // Esta array comporta os dados usados para o post no banco.
      tarefas: [
        {
          nome: '',
          percentual: 0,
          ordem: 0,
          tipoDeAcaoId: 0
        }
      ],
      searchInput: '',
      tarefasFiltro: []
    }
  },
  computed: {
    ...mapState({
      tarefasExistentes: state => state.tipoDeAcao.tarefasExistentes,
      tarefasEscolhidas: state => state.tipoDeAcao.tarefasEscolhidas,
      tipoDeAcaoId: state => state.tipoDeAcao.tipoDeAcaoId,
      tipoAcaoUi: state => state.tipoDeAcao.ui
    }),
    qntdTarefasSelecionadas() {
      return this.tarefasEscolhidas.length > 0
        ? '0' + this.tarefasEscolhidas.length + ' ITENS'
        : '0 ITENS'
    },
    qntdTarefasCriadas() {
      return this.tarefas.length > 0 ? '0' + this.tarefas.length + ' ITENS' : '0 ITENS'
    },
    percentualTotal() {
      let percentual = 0
      this.tarefas.forEach((tarefa) => {
        if (tarefa.percentual[0] === '0') {
          tarefa.percentual = tarefa.percentual.replace('0', '')
        }
        if (parseInt(tarefa.percentual) > 100) {
          tarefa.percentual = 0
          this.showToast('Percentual não pode ultrapassar 100.', 'info', ' ', 'b-toaster-top-left', 5000)
        }
        // Verifica se o percentual inserido é uma fração
        if (tarefa.percentual % 1 !== 0) {
          this.showToast('Apenas números inteiros permitidos.', 'info', ' ', 'b-toaster-top-left', 5000)
          tarefa.percentual = 0
        }
        percentual += parseInt(tarefa.percentual)
      })
      return isNaN(percentual) ? 0 : percentual
    }
  },
  watch: {
    injetarTarefasEscolhidas() {
      if (this.injetarTarefasEscolhidas && this.tarefasEscolhidas.length > 0) {
        this.tarefasEscolhidas.forEach((tarefa) => {
          this.tarefas.push({ nome: tarefa, percentual: 0, ordem: 0, tipoDeAcaoId: 0 })
        })
        this.$emit('injetar-tarefas-escolhidas')
      }
    },
    searchInput() {
      if (!this.searchInput) {
        this.tarefasFiltro = [...this.tarefasExistentes]
      } else {
        const tarefasFiltradas = this.tarefasExistentes.filter(
          tarefa => this.normalizaStrings(tarefa.tarefa).includes(this.normalizaStrings(this.searchInput)))
        this.tarefasFiltro = tarefasFiltradas
      }
    },
    // filtrarUsuarios() {
    //   this.usuariosFiltrados = this.usuariosDaInstituicao.filter(
    //     x => this.normalizaStrings(x.nomeCompleto).includes(this.normalizaStrings(this.filtroUsuarios)))
    // },
    putTarefas() {
      if (this.putTarefas) {
        let ordem = 1
        this.tarefas.forEach((tarefa) => {
          tarefa.tipoDeAcaoId = this.tipoDeAcaoId
          tarefa.percentual = parseInt(tarefa.percentual)
          tarefa.ordem = ordem
          ordem++
        })
        const { tarefasValidas, mensagem } = this.validaTarefas(this.tarefas)
        if (tarefasValidas) {
          this.$bvModal.show('modal-alerta-cadastro')
        } else {
          this.showToast('Inconsistência', 'danger', mensagem, 'b-toaster-top-left', 3000)
          // Este evento garante que o botão de salvar tarefas não trave caso as tarefas não sejam válidas para cadastro.
          this.$emit('tarefas-cadastradas')
        }
        // this.$bvModal.show('modal-confirma-salvar')
        // this.cadastraTarefaDeAcao()
      }
    }
  },
  mounted() {
    this.tarefasFiltro = this.tarefasExistentes
  },
  methods: {
    novaTarefa() {
      this.tarefas.push({
        nome: '',
        percentual: 0,
        ordem: 0,
        tipoDeAcaoId: this.tipoDeAcaoId
      })
    },
    deletaTarefa(index) {
      this.tarefas.splice(index, 1)
    },
    getTarefasExistentes() {
      this.$emit('importando-tarefas')
      this.$store.dispatch('tipoDeAcao/resetTarefasEscolhidas')
      this.$store.dispatch('tipoDeAcao/getTarefasExistentes').then(() => {
        this.tarefasFiltro = this.tarefasExistentes
      })
    },
    selectTarefa(id, tarefa) {
      const selected = document.querySelector('#selectable-row' + id)
      if (!selected.classList.contains('selected-row')) {
        const params = {
          switcher: 'marcar',
          tarefaId: id
        }
        this.$store.dispatch({
          type: 'tipoDeAcao/patchTarefaSelecionada',
          params
        })
        this.$store.dispatch({
          type: 'tipoDeAcao/setTarefaEscolhida',
          tarefaEscolhida: tarefa
        })
        this.tarefasFiltro = [...this.tarefasExistentes]
        selected.classList.add('selected-row')
      } else {
        const params = {
          switcher: 'desmarcar',
          tarefaId: id
        }
        this.$store.dispatch({
          type: 'tipoDeAcao/patchTarefaSelecionada',
          params
        })
        this.$store.dispatch({
          type: 'tipoDeAcao/deleteTarefaEscolhida',
          tarefaEscolhida: tarefa
        })
        this.tarefasFiltro = [...this.tarefasExistentes]
        selected.classList.remove('selected-row')
      }
    },
    decrementarPercentual(index) {
      const numberPercentual = Number(this.tarefas[index].percentual)

      if (numberPercentual <= 5) {
        this.tarefas[index].percentual = 0
      } else {
        this.tarefas[index].percentual = numberPercentual - 5
      }
    },
    incrementarPercentual(index) {
      const numberPercentual = Number(this.tarefas[index].percentual)

      if (numberPercentual >= 95) {
        this.tarefas[index].percentual = 100
      } else {
        this.tarefas[index].percentual = numberPercentual + 5
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
    },
    validaTarefas(tarefas) {
      let tarefasValidas = true
      let mensagem = 'Tudo certo'
      // Primeiro verifica se existe pelo menos uma tarefa criada.
      if (tarefas.length > 0) {
        for (let tarefa = 0; tarefa < tarefas.length; tarefa++) {
          // Verifica o nome da tarefa
          if (!tarefas[tarefa].nome || tarefas[tarefa].nome === ' ') {
            tarefasValidas = false
            mensagem = `O nome da tarefa ${tarefa + 1} não é válido.`
            return { tarefasValidas, mensagem }
          }
          // Verifica o percentual da tarefa
          if (!tarefas[tarefa].percentual > 0) {
            tarefasValidas = false
            mensagem = 'As tarefas precisam ter percentual maior que 0.'
            return { tarefasValidas, mensagem }
          }
          // Verifica se foi selecionado um tipo de ação atrelado às tarefas criadas
          if (tarefas[tarefa].tipoDeAcaoId === 0) {
            tarefasValidas = false
            mensagem = 'Por favor, selecione um tipo de ação.'
            return { tarefasValidas, mensagem }
          }
        }
      } else {
        tarefasValidas = false
        mensagem = 'Por favor, crie uma tarefa para salvar.'
        return { tarefasValidas, mensagem }
      }

      return { tarefasValidas, mensagem }
    },
    normalizaStrings(texto) {
      return texto.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
    },
    cadastraTarefaDeAcao() {
      // let ordem = 1
      // this.tarefas.forEach((tarefa) => {
      //   tarefa.tipoDeAcaoId = this.tipoDeAcaoId
      //   tarefa.percentual = parseInt(tarefa.percentual)
      //   tarefa.ordem = ordem
      //   ordem++
      // })
      // const { tarefasValidas, mensagem } = this.validaTarefas(this.tarefas)
      // if (tarefasValidas) {
      const tarefas = [...this.tarefas]
      this.$store.dispatch({
        type: 'tipoDeAcao/putTarefas',
        tarefas
      }).then(() => {
        // Notifica o usuário de acordo com status recebido da operação de post
        if (this.tipoAcaoUi.codigo === 200) {
          this.$emit('cadastrou-com-sucesso')
        } else if (this.tipoAcaoUi.codigo === 400) {
          // Fracasso quando retorna uma array de erros
          this.showToast('Inconsistência', 'danger', this.tipoAcaoUi.error[0][0].errorMessage, 'b-toaster-top-left', 3000)
        } else {
          // Fracasso quando retorna apenas uma string específica de erro
          this.showToast('Inconsistência', 'danger', this.tipoAcaoUi.error, 'b-toaster-top-left', 3000)
        }
      })
      // } else {
      //   this.showToast('Inconsistência', 'danger', mensagem, 'b-toaster-top-left', 3000)
      //   // Este evento garante que o botão de salvar tarefas não trave caso as tarefas não sejam válidas para cadastro.
      //   this.$emit('tarefas-cadastradas')
      // }
      // Garante que o botão de salvar seja resetado
      this.$emit('tarefas-cadastradas')
    }
  }
}
</script>

<style scoped>
.box-input button {
  background: none;
  border: 0;
}
.container-lixeira {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.box-input .button-input-img {
  width: 14px;
  height: 14px;
}

.box-input #percentual-tarefa {
  text-align: center;
  max-width: 32px;
}

.box-input label {
  margin-left: -4px;
}

.box-branco {
  padding: 104px 57px 56px 57px;
}
.row-azul-claro {
  background-color: #c7e5f6;
  height: 40px;
  align-content: center;
  margin-bottom: 20px;
}
.row-azul-claro input {
  background: none;
  border: none;
  width: 100%;
  padding: 0 15px;
}
.row-azul-claro input[type='number'] {
  width: fit-content;
  padding: 0;
  text-align: right;
}
.row-azul-claro input[type='number']:focus {
  outline: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  /* -moz-appearance: textfield; */
  text-align: left;
}
.tarefa-selecionavel {
  padding: 0 15px;
}
.item,
.itens {
  padding-left: 30px;
}
.deleta-tarefa {
  background: url('~/static/assets/trash-can.svg') no-repeat;
  width: 15px;
  height: 17px;
  border: none;
}
.btn-light-blue {
  width: 170px;
  height: 40px;
  position: absolute;
  top: -20px;
}
.importar {
  right: 220px;
}
.novo-item {
  right: 40px;
}
.btn-desativado {
  background-color: #c4c4c4;
}
.overflow-tarefas {
  max-height: 280px;
  overflow-y: auto;
  overflow-x: visible;
  padding-right: 10px;
}
.tarefa-selecionavel:hover,
.tarefa-selecionave:focus-within {
  cursor: pointer;
  border: 2px solid cornflowerblue;
}
.selected-row {
  border: 2px solid cornflowerblue;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.buscar-empresa {
  width: fit-content;
  position: relative;
}
.buscar-empresa input {
  padding: 0 30px;
  width: 178px;
  height: 30px;
  line-height: 30px;
  border-radius: 40px;
  border: 0;
  background-color: #dae2e7;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  font-family: 'Gotham-light';
  font-size: 13px;
  outline: none;
}
.btn-lupa {
    background-color: unset;
    background-image: url('~/static/assets/lupa.svg');
    border: 0;
    height: 16px;
    width: 16px;
    position: absolute;
    right: 15px;
    z-index: 999;
    top: 8px;
}
.place-search {
  position: absolute;
  top: 40px;
}
@media (max-width: 991px) {
  .container-lixeira {
    padding: 0;
  }
}
@media (max-width: 768px) {
  .box-input button {
    padding: 0;
  }
  .box-input #percentual-tarefa{
    max-width: 27px;
  }
}
@media (max-width: 560px) {
  .importar, .novo-item {
    width: 130px;
  }
  .importar, .novo-item {
    right: 0;
  }
  .novo-item {
    top: 30px;
  }
  .box-input button {
    display: none;
  }
  .box-branco {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
