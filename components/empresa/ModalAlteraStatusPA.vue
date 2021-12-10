<template>
  <b-modal
    :id="'modal-confirmacao-alterar-status' + planoDeAcao.planoDeAcaoId"
    hide-footer
    hide-header
    busy
    centered
    content-class="modal-class-one"
    @hidden="closed()"
  >
    <template #default>
      <section class="modal-container">
        <header>
          <img src="~/static/assets/exclamacao.svg" alt="alert-icon" />
        </header>
        <body>
          <h3 class="s-gbl">
            Tem certeza?
          </h3>
          <p v-if="newStatusId === 4" class="gbl">
            Depois de <span>aprovado</span>, não poderá ser alterado.
          </p>
          <p v-else class="gbl">
            Ao continuar, você não poderá mais atualizar e nem criar acompanhamentos para este plano. Será necessário criar e aprovar outro.
          </p>
        </body>
        <footer class="buttons-container">
          <button class="btn-light-blue cancelar" @click.prevent="cancelarCadastro()">
            Cancelar
          </button>
          <button class="btn-light-blue confirmar" @click.prevent="confirmarOperacao()">
            Confirmar
          </button>
        </footer>
      </section>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalAlertaCadastro',
  props: {
    planoDeAcao: {
      type: Object,
      default() {
        return {}
      }
    },
    newStatusId: {
      type: Number,
      default: 0
    }
  },
  methods: {
    cancelarCadastro() {
      this.$bvModal.hide('modal-confirmacao-alterar-status' + this.planoDeAcao.planoDeAcaoId)
    },
    confirmarOperacao() {
      this.$emit('mudanca-confirmada')
    },
    closed() {
      this.$emit('modal-fechou')
    }
  }
}
</script>

<style scoped>
  body {
    margin: 0;
    background-color: #58AADB;
    text-align: center;
  }
  section > header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .buttons-container {
    margin: 0 0 20px 0;
    text-align: center;
  }
  .modal-container {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .btn-light-blue {
      cursor: pointer;
  }
  .cancelar, .confirmar {
      margin: 0 10px;
      padding: 0 20px;
  }
  .confirmar, .cancelar {
    background-color: #fff;
    color: #000;
    font-weight: bolder;
    height: 40px;
  }
  .cancelar {
    opacity: 0.75;
    width: 170px;
  }
  .confirmar {
    width: 187px;
  }
  .s-gbl {
      font-size: 24px;
  }
  .gbl {
      font-size: 18px;
      font-weight: 100;
  }
  .gbl span {
    font-weight: 1000;
  }
  .s-gbl, .gbl {
    color: white;
  }
  @media (max-width: 446px) {
    .confirmar {
      margin-top: 10px;
    }
  }
</style>
