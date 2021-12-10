<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-10 offset-1 col-lg-6 offset-lg-3">
        <div class="box-branco mt-5">
          <main id="seletor-tipo-acao" class="gbl">
            <label for="input-tipo-acao">Tipo de Ação</label>
            <b-form-select
              id="input-tipo-acao"
              v-model="selected"
              class="input-style m-gbl"
              :options="tiposDeAcao"
              required
              @change="setTipoAcaoPlaceholder"
            />
            <label
              for="descricao"
              class="mt-5"
            >Descrição de como será realizado</label>
            <div id="descricao" class="box-branco">
              {{ descricao }}
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    setTipoAcao: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: 0,
      tiposDeAcao: [],
      descricao: ''
    }
  },

  computed: {
    ...mapState({
      dropDown: state => state.tipoDeAcao.tiposDeAcaoSemTarefa,
      uiTipoAcao: state => state.tipoDeAcao.ui
    })
  },
  watch: {
    setTipoAcao() {
      if (this.setTipoAcao) {
        this.$store.dispatch({
          type: 'tipoDeAcao/setTipoDeAcaoId',
          tipoAcaoId: this.selected
        }).then(() => {
          this.$emit('tipo-escolhido')
        })
      }
    }
  },

  mounted() {
    this.getTiposAcaoSemTarefa()
  },

  methods: {
    getTiposAcaoSemTarefa() {
      this.$store.dispatch('tipoDeAcao/getTipoDeAcaoSemTarefas').then(() => {
        if (this.uiTipoAcao.codigo !== 200) {
          console.log(this.uiTipoAcao)
        } else {
          this.dropDown.forEach((tipoAcao) => {
            this.tiposDeAcao.push({
              value: tipoAcao.id,
              text: tipoAcao.nomeDaAcao,
              description: tipoAcao.descricao
            })
          })
          this.selected = this.tiposDeAcao[0].value
          this.setTipoAcaoPlaceholder()
        }
      })
    },
    setTipoAcaoPlaceholder() {
      this.tiposDeAcao.forEach((tipo) => {
        if (tipo.value === this.selected) {
          this.descricao = tipo.description
        }
      })
    }
  }
}
</script>

<style scoped>
.input-style {
  border-radius: 25px;
  background: url('~/static/assets/arrow-down.svg') no-repeat 95% center;
}
#descricao {
  height: 200px;
}
label[for='input-tipo-acao'] {
  padding-left: 12px;
}
label[for='descricao'] {
  padding-left: 24px;
}
</style>
