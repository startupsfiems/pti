<template>
  <b-modal
    id="modal-alerta-cadastro"
    hide-footer
    hide-header
    busy
    centered
    content-class="modal-class-one"
    @hide="cancelarCadastro()"
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
          <p class="gbl">
            Após salvo, o checklist não poderá ser alterado
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
  // data() {
  //   return {
  //     teste: 'padding: 0'
  //   }
  // },
  methods: {
    cancelarCadastro() {
      this.$emit('cadastro-cancelado')
      this.$bvModal.hide('modal-alerta-cadastro')
    },
    confirmarOperacao() {
      this.$emit('cadastro-confirmado')
      this.$bvModal.hide('modal-alerta-cadastro')
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
  .footer, .header {
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
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
  .s-gbl, .gbl {
    color: white;
  }
  @media (max-width: 446px) {
    .confirmar {
      margin-top: 10px;
    }
  }
</style>
