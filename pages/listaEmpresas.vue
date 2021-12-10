<template>
  <div class="lista-empresas">
    <Header :is-home="true" :title="`MINHAS EMPRESAS`" />

    <div v-if="!gettandoEmpresas">
      <!-- <ContainerEmpresasAtrasadas /> -->
      <ContainerEmpresasDoAgente :empresas="empresasAgente" />
    </div>
    <div v-else class="spinner">
      <b-spinner variant="primary" label="Text Centered" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Header from '~/components/Header.vue'

export default {
  name: 'ListaEmpresas',
  components: { Header },
  layout: 'deafult',
  props: {
    empresas: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      gettandoEmpresas: false,
      empresasFicticiasAtrasadas: [
        {
          nome: 'Pescados do seu Zé',
          status: 'Etapa 2',
          conclusao: 25,
          ultimaVisita: '15/06/2021'
        },
        {
          nome: 'Saul Goodman',
          status: 'Etapa 1',
          conclusao: 50,
          ultimaVisita: '15/06/2021'
        },
        {
          nome: 'Da ponte pra cá',
          status: 'Etapa 2',
          conclusao: 25,
          ultimaVisita: '15/06/2021'
        },
        {
          nome:
            'Nome grande, muito grande, grande mesmoooooooooooooooooooooooooooooooooooo',
          status: 'Etapa 2',
          conclusao: 25,
          ultimaVisita: '15/06/2021'
        }
      ]
    }
  },

  head() {
    return {
      title: 'Minhas empresas'
    }
  },
  computed: {
    ...mapState({
      uiUser: state => state.user.ui,
      idAgente: state => state.user.usuarioLogado.id,
      empresasAgente: state => state.user.empresasDoAgente
    })
  },
  mounted() {
    this.resetState('empresa', 'diagnostico')
    this.getEmpresas(this.idAgente)
  },
  methods: {
    async getEmpresas(idAgente) {
      this.gettandoEmpresas = true
      await this.$store
        .dispatch({
          type: 'user/getEmpresasDoAgente',
          idAgente
        })
        .then(() => {
          if (this.uiUser.codigo === 200) {
            this.gettandoEmpresas = false
          } else {
            this.gettandoEmpresas = false
            this.showToast(
              this.uiUser.error,
              'danger',
              ' ',
              'b-toaster-top-left',
              3000
            )
          }
        })
      this.gettandoEmpresas = false
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
    resetState(state1, state2, state3, state4) {
      switch (arguments.length) {
        case 4:
          this.$store.dispatch(state1 + '/resetState')
          this.$store.dispatch(state2 + '/resetState')
          this.$store.dispatch(state3 + '/resetState')
          this.$store.dispatch(state4 + '/resetState')
          break
        case 3:
          this.$store.dispatch(state1 + '/resetState')
          this.$store.dispatch(state2 + '/resetState')
          this.$store.dispatch(state3 + '/resetState')
          break
        case 2:
          this.$store.dispatch(state1 + '/resetState')
          this.$store.dispatch(state2 + '/resetState')
          break
        case 1:
          this.$store.dispatch(state1 + '/resetState')
          break
        default:
          console.log('a função precisa de 1 até 4 parâmetros')
          break
      }
    }
  }
}
</script>

<style scoped>
.visita-atrasada label {
  font-family: 'Gotham-bold';
  color: #053f5c;
  font-size: 15px;
}
.spinner {
  text-align: center;
  position: relative;
  top: 200px;
}
.spinner-border {
  width: 4rem;
  height: 4rem;
}
</style>
