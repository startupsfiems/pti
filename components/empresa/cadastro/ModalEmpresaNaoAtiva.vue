<template>
  <b-modal id="modal-alerta-empresa-nao-ativa" class="modal" busy centered>
    <template #modal-header>
      <div class="header w-100">
        <h3 class="s-gbl">
          Empresa não ativa
        </h3>
      </div>
    </template>
    <p class="gbl text-center">
      Esta empresa não está ativa. Tem certeza que deseja continuar com o cadastro?
    </p>
    <template #modal-footer>
      <div class="footer w-100">
        <button class="btn-light-blue cancelar" @click.prevent="fecharModal()">
          Cancelar
        </button>
        <button class="btn-light-blue continuar" @click.prevent="fecharModal()">
          Continuar
        </button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalEmpresaNaoAtiva',
  methods: {
    fecharModal() {
      this.$bvModal.hide('modal-alerta-empresa-nao-ativa')
    }
  }
}
</script>

<style scoped>
    .modal {
        border-radius: 10px;
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
    .cancelar, .continuar {
        margin: 0 10px;
        padding: 0 20px;
    }
    .cancelar {
        background-color: gray;
    }
    .s-gbl {
        font-size: 24px;
    }
    .gbl {
        font-size: 20px;
    }
</style>
