<template>
  <div class="container-fluid card-acao">
    <b-form @change="onChange">
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
            v-model="form.objetivo"
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
            v-model="form.responsavel"
            class="input-style"
            placeholder="Nome do Responsável"
            required
          />
        </b-form-group>
        <b-form-group id="input-group-local" class="col-6" label="Local" label-for="input-local">
          <b-form-input
            id="input-local"
            v-model="form.local"
            class="input-style"
            placeholder="Local"
            required
          />
        </b-form-group>
      </div>
      <div class="row">
        <b-form-group id="input-group-inicio" class="col-3" label="Início" label-for="input-inicio">
          <b-form-datepicker id="input-inicio" v-model="form.inicio" class="mb-2" required @input="onChange" />
        </b-form-group>
        <b-form-group id="input-group-conclusao" class="col-3" label="Conclusão" label-for="input-conclusao">
          <b-form-datepicker id="input-conclusao" v-model="form.conclusao" class="mb-2" required @input="onChange" />
        </b-form-group>
        <b-form-group id="input-group-orcamento" class="col-6" label="Orçamento" label-for="input-orcamento">
          <b-form-input
            id="input-orcamento"
            v-model="form.orcamento"
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
            v-model="form.descricao"
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
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ModalAcao',
  props: {
    acao: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      selected: null,
      form: {
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
      tiposDeAcao: [{ text: 'Selecione uma ação', value: null }],
      recebeuAcao: false
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
        this.form.acao = this.acoes[index].nomeDaAcao
        this.form.tipoDeAcaoId = this.acoes[index].id
        this.form.objetivo = this.acoes[index].objetivo
        this.form.orcamento = this.acoes[index].orcamento
        this.form.descricao = this.acoes[index].descricao
        this.atualizaDadosNoStore()
      }
    },
    acao() {
      this.setFormData()
    }
  },
  mounted() {
    if (this.acao !== null) {
      this.form.acao = this.acao.tipoDeAcao.nomeDaAcao
      this.form.objetivo = this.acao.tipoDeAcao.objetivo
      this.form.responsavel = this.acao.responsavel
      this.form.local = this.acao.local
      this.form.inicio = this.acao.dataInicial
      this.form.conclusao = this.acao.dataConclusao
      this.form.orcamento = this.acao.tipoDeAcao.orcamento

      this.form.acao = this.acao.tipoDeAcao.nomeDaAcao
      this.form.tipoDeAcaoId = this.acao.tipoDeAcao.id
      this.form.objetivo = this.acao.tipoDeAcao.objetivo
      this.form.orcamento = this.acao.tipoDeAcao.orcamento
      this.form.descricao = this.acao.tipoDeAcao.descricao
    }
    this.buscaTiposDeAcao()
  },
  methods: {
    setFormData() {
      this.form.responsavel = this.acao.responsavel
      this.form.local = this.acao.local
      this.form.inicio = this.acao.dataInicial
      this.form.conclusao = this.acao.dataConclusao
      this.form.descricao = this.acao.descricao
      if (this.acao.tipoDeAcao.id !== 0) {
        this.selected = this.acoes.findIndex((a) => { return a.id === this.acao.tipoDeAcao.id })
        this.form.tipoDeAcaoId = this.acao.tipoDeAcao.id
        this.form.acao = this.acao.tipoDeAcao.nomeDaAcao
        this.form.objetivo = this.acao.tipoDeAcao.objetivo
        this.form.orcamento = this.acao.tipoDeAcao.orcamento
      } else {
        this.selected = null
        this.form.tipoDeAcaoId = 0
        this.form.acao = null
        this.form.objetivo = ''
        this.form.orcamento = ''
      }
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
    onChange() {
      this.atualizaDadosNoStore()
    },
    atualizaDadosNoStore() {
      const dados = this.form
      this.$store.dispatch({
        type: 'acao/atualizaAcaoNoPlano',
        dados,
        index: this.index
      })
    }
  }
}
</script>

<style>
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
  .radio-item{
    font-family: Gotham;
    font-style: normal;
    font-weight: normal;
    font-size: 1.2rem;
    line-height: 1.3rem;

    color: #053F5C;
  }
  .input-style {
    background: #FFFFFF;
    border: 1px solid #053F5C;
    box-sizing: border-box;
    border-radius: 10px;
  }
</style>
