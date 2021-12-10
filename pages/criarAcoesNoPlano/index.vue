<template>
  <div>
    <div v-if="pegandoDados">
      <div />
    </div>

    <div v-else>
      <Header :title="`ETAPA 1`" />

      <div class="container">
        <div class="row justify-content-md-center pt-4 pb-3">
          <div class="head-title">
            <bread-acoes
              :index-etapa-atual="indexSelecionado"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <!-- form -->
            <div v-if="indexSelecionado === 0" class="container-fluid card-acao">
              <b-form>
                <div class="row">
                  <b-form-group
                    id="input-group-acao"
                    class="col-6"
                    label="Ação"
                    label-for="input-acao"
                  >
                    <b-form-select
                      id="input-acao"
                      v-model="selected"
                      class="input-style"
                      :options="tiposDeAcao"
                      required
                    />
                  </b-form-group>
                  <b-form-group id="input-group-objetivo" class="col-6" label="Objetivo" label-for="input-objetivo">
                    <b-form-input
                      id="input-objetivo"
                      v-model="forms[indexSelecionado].objetivo"
                      class="input-style"
                      placeholder="Objetivo da ação"
                      readonly
                      required
                    />
                  </b-form-group>
                </div>
                <div class="row">
                  <b-form-group id="input-group-responsavel" class="col-6" label="Responsável" label-for="input-responsavel">
                    <b-form-input
                      id="input-responsavel"
                      v-model="forms[indexSelecionado].responsavel"
                      class="input-style"
                      placeholder="Nome do Responsável"
                      required
                    />
                  </b-form-group>
                  <b-form-group id="input-group-local" class="col-6" label="Local" label-for="input-local">
                    <b-form-input
                      id="input-local"
                      v-model="forms[indexSelecionado].local"
                      class="input-style"
                      placeholder="Local"
                      required
                    />
                  </b-form-group>
                </div>
                <div class="row">
                  <b-form-group id="input-group-inicio" class="col-3" label="Início" label-for="input-inicio">
                    <b-form-datepicker id="input-inicio" v-model="forms[indexSelecionado].inicio" class="mb-2" required />
                  </b-form-group>
                  <b-form-group id="input-group-conclusao" class="col-3" label="Conclusão" label-for="input-conclusao">
                    <b-form-datepicker id="input-conclusao" v-model="forms[indexSelecionado].conclusao" class="mb-2" required />
                  </b-form-group>
                  <b-form-group id="input-group-orcamento" class="col-6" label="Orçamento" label-for="input-orcamento">
                    <b-form-input
                      id="input-orcamento"
                      v-model="forms[indexSelecionado].orcamento"
                      class="input-style"
                      placeholder="R$"
                      readonly
                      required
                    />
                  </b-form-group>
                </div>
                <div class="row">
                  <b-form-group id="input-group-descricao" class="col-12" label="Descrição de como será realizado" label-for="input-descricao">
                    <b-form-textarea
                      id="input-descricao"
                      v-model="forms[indexSelecionado].descricao"
                      class="input-style"
                      rows="3"
                      max-rows="6"
                      readonly
                      required
                    />
                  </b-form-group>
                </div>
              </b-form>
            </div>

            <div v-if="indexSelecionado === 1" class="container-fluid card-acao">
              <b-form>
                <div class="row">
                  <b-form-group
                    id="input-group-acao"
                    class="col-6"
                    label="Ação"
                    label-for="input-acao"
                  >
                    <b-form-select
                      id="input-acao"
                      v-model="selected"
                      class="input-style"
                      :options="tiposDeAcao"
                      required
                    />
                  </b-form-group>
                  <b-form-group id="input-group-objetivo" class="col-6" label="Objetivo" label-for="input-objetivo">
                    <b-form-input
                      id="input-objetivo"
                      v-model="forms[indexSelecionado].objetivo"
                      class="input-style"
                      placeholder="Objetivo da ação"
                      readonly
                      required
                    />
                  </b-form-group>
                </div>
                <div class="row">
                  <b-form-group id="input-group-responsavel" class="col-6" label="Responsável" label-for="input-responsavel">
                    <b-form-input
                      id="input-responsavel"
                      v-model="forms[indexSelecionado].responsavel"
                      class="input-style"
                      placeholder="Nome do Responsável"
                      required
                    />
                  </b-form-group>
                  <b-form-group id="input-group-local" class="col-6" label="Local" label-for="input-local">
                    <b-form-input
                      id="input-local"
                      v-model="forms[indexSelecionado].local"
                      class="input-style"
                      placeholder="Local"
                      required
                    />
                  </b-form-group>
                </div>
                <div class="row">
                  <b-form-group id="input-group-inicio" class="col-3" label="Início" label-for="input-inicio">
                    <b-form-datepicker id="input-inicio" v-model="forms[indexSelecionado].inicio" class="mb-2" required />
                  </b-form-group>
                  <b-form-group id="input-group-conclusao" class="col-3" label="Conclusão" label-for="input-conclusao">
                    <b-form-datepicker id="input-conclusao" v-model="forms[indexSelecionado].conclusao" class="mb-2" required />
                  </b-form-group>
                  <b-form-group id="input-group-orcamento" class="col-6" label="Orçamento" label-for="input-orcamento">
                    <b-form-input
                      id="input-orcamento"
                      v-model="forms[indexSelecionado].orcamento"
                      class="input-style"
                      placeholder="R$"
                      readonly
                      required
                    />
                  </b-form-group>
                </div>
                <div class="row">
                  <b-form-group id="input-group-descricao" class="col-12" label="Descrição de como será realizado" label-for="input-descricao">
                    <b-form-textarea
                      id="input-descricao"
                      v-model="forms[indexSelecionado].descricao"
                      class="input-style"
                      rows="3"
                      max-rows="6"
                      readonly
                      required
                    />
                  </b-form-group>
                </div>
              </b-form>
            </div>

            <div v-if="indexSelecionado === 2" class="container-fluid card-acao">
              <b-form>
                <div class="row">
                  <b-form-group
                    id="input-group-acao"
                    class="col-6"
                    label="Ação"
                    label-for="input-acao"
                  >
                    <b-form-select
                      id="input-acao"
                      v-model="selected"
                      class="input-style"
                      :options="tiposDeAcao"
                      required
                    />
                  </b-form-group>
                  <b-form-group id="input-group-objetivo" class="col-6" label="Objetivo" label-for="input-objetivo">
                    <b-form-input
                      id="input-objetivo"
                      v-model="forms[indexSelecionado].objetivo"
                      class="input-style"
                      placeholder="Objetivo da ação"
                      readonly
                      required
                    />
                  </b-form-group>
                </div>
                <div class="row">
                  <b-form-group id="input-group-responsavel" class="col-6" label="Responsável" label-for="input-responsavel">
                    <b-form-input
                      id="input-responsavel"
                      v-model="forms[indexSelecionado].responsavel"
                      class="input-style"
                      placeholder="Nome do Responsável"
                      required
                    />
                  </b-form-group>
                  <b-form-group id="input-group-local" class="col-6" label="Local" label-for="input-local">
                    <b-form-input
                      id="input-local"
                      v-model="forms[indexSelecionado].local"
                      class="input-style"
                      placeholder="Local"
                      required
                    />
                  </b-form-group>
                </div>
                <div class="row">
                  <b-form-group id="input-group-inicio" class="col-3" label="Início" label-for="input-inicio">
                    <b-form-datepicker id="input-inicio" v-model="forms[indexSelecionado].inicio" class="mb-2" required />
                  </b-form-group>
                  <b-form-group id="input-group-conclusao" class="col-3" label="Conclusão" label-for="input-conclusao">
                    <b-form-datepicker id="input-conclusao" v-model="forms[indexSelecionado].conclusao" class="mb-2" required />
                  </b-form-group>
                  <b-form-group id="input-group-orcamento" class="col-6" label="Orçamento" label-for="input-orcamento">
                    <b-form-input
                      id="input-orcamento"
                      v-model="forms[indexSelecionado].orcamento"
                      class="input-style"
                      placeholder="R$"
                      readonly
                      required
                    />
                  </b-form-group>
                </div>
                <div class="row">
                  <b-form-group id="input-group-descricao" class="col-12" label="Descrição de como será realizado" label-for="input-descricao">
                    <b-form-textarea
                      id="input-descricao"
                      v-model="forms[indexSelecionado].descricao"
                      class="input-style"
                      rows="3"
                      max-rows="6"
                      readonly
                      required
                    />
                  </b-form-group>
                </div>
              </b-form>
            </div>
          <!-- /form -->
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { Constantes } from '../../utils/constantes'
import header from '../../utils/headers'

import BreadAcoes from '../../components/acao/BreadAcoes.vue'
import Header from '~/components/Header.vue'

export default {
  title: 'Plano de Ação',
  components: { BreadAcoes, Header },
  data() {
    return {
      salvandoPlanoDeAcao: false,
      indexSelecionado: 0,
      forms: [
        {
          acao: null,
          tipoDeAcaoId: 0,
          objetivo: '',
          responsavel: '',
          local: '',
          inicio: '',
          conclusao: '',
          orcamento: '',
          descricao: ''
        },
        {
          acao: null,
          tipoDeAcaoId: 0,
          objetivo: '',
          responsavel: '',
          local: '',
          inicio: '',
          conclusao: '',
          orcamento: '',
          descricao: ''
        },
        {
          acao: null,
          tipoDeAcaoId: 0,
          objetivo: '',
          responsavel: '',
          local: '',
          inicio: '',
          conclusao: '',
          orcamento: '',
          descricao: ''
        }
      ],
      pegandoDados: true,
      tiposDeAcao: [{ text: 'Selecione uma ação', value: null }],
      selected: null
    }
  },
  computed: {
    ...mapState({
      ui: state => state.acao.ui,
      acoes: state => state.acao.dropDownAcoes
    })
  },

  watch: {
    selected(index) {
      if (index !== null) {
        this.forms[this.indexSelecionado].acao = this.acoes[index].nomeDaAcao
        this.forms[this.indexSelecionado].tipoDeAcaoId = this.acoes[index].id
        this.forms[this.indexSelecionado].objetivo = this.acoes[index].objetivo
        this.forms[this.indexSelecionado].orcamento = this.acoes[index].orcamento
        this.forms[this.indexSelecionado].descricao = this.acoes[index].descricao
      }
    }
  },
  mounted() {
    this.getAllData()
  },

  methods: {
    async getAllData() {
      await this.buscaTiposDeAcao()

      this.pegandoDados = false
    },
    validaTrocaDeAcao(index) {
      const actualForm = this.forms[index]
      let validated = true
      if (
        actualForm.acao === null ||
        actualForm.tipoDeAcaoId === 0 ||
        actualForm.objetivo === '' ||
        actualForm.responsavel === '' ||
        actualForm.local === '' ||
        actualForm.inicio === '' ||
        actualForm.conclusao === '' ||
        actualForm.orcamento === '' ||
        actualForm.descricao === ''
      ) {
        validated = false
      }
      return validated
    },
    trocaAcao(index) {
      this.selected = null
      if (index === 0) {
        this.$router.back()
      } else if (index === 1) {
        if (this.validaTrocaDeAcao(this.indexSelecionado)) {
          this.indexSelecionado += index
        } else {
          this.showToast('Erro', 'warning', 'Preencha todos os campos', 'b-toaster-top-left', 3000)
        }
      } else {
        this.indexSelecionado += index
      }
    },

    async finalizarPlanoDeAcao() {
      this.salvandoPlanoDeAcao = true

      const planoDeAcaoId = this.$route.query.planoDeAcao
      const payload = {
        id: Number(planoDeAcaoId),
        acao: [
          { ...this.forms[0], planoDeAcaoId: Number(planoDeAcaoId) },
          { ...this.forms[1], planoDeAcaoId: Number(planoDeAcaoId) },
          { ...this.forms[2], planoDeAcaoId: Number(planoDeAcaoId) }
        ]
      }
      await axios.post(
        Constantes.URL_API_INTEGRADORA + 'pti/PlanoDeAcao/adicionarAcoes',
        payload,
        { headers: header.headers() }
      ).then(() => {
        this.showToast(
          'Ações cadastradas com sucesso',
          'info',
          '',
          'b-toaster-top-left',
          3000
        )
        this.$router.back()
      })
    },

    async buscaTiposDeAcao() {
      await this.$store.dispatch({
        type: 'acao/getDropDownAcoes'
      }).then(() => {
        for (let i = 0; i < this.acoes.length; ++i) {
          this.tiposDeAcao.push({ text: this.acoes[i].nomeDaAcao, value: i })
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
/* parte do form */
 .card-acao {
    background: #FFFFFF;
    border: 1px solid #053F5C;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 2em 6em 2em 4em;
  }
  #enunciado {
    font-family: Gotham;
    font-style: normal;
    font-weight: normal;
    font-size: 1.2rem;
    line-height: 1.2rem;
    color: #053F5C;
  }
  #explicacao {
    font-family: Gotham;
    font-style: italic;
    font-weight: normal;
    font-size: 1.1rem;
    line-height: 1.2rem;
    color: #429EBD;
    padding-left: 1em;
    padding-right: 10em;
  }
  input[type=radio] {
    border: 0px;
    width: 100%;
    height: 2em;
  }
  .btn-light-blue{
    width: 150px;
  }
  .input-style {
    background: #FFFFFF;
    border: 1px solid #053F5C;
    box-sizing: border-box;
    border-radius: 10px;
  }
  /* ================== */
</style>
