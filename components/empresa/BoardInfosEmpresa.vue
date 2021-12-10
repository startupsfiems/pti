<template>
  <div class="col-lg-8 offset-lg-2 col-12 box-branco mt-5">
    <div class="row">
      <div class="col-7">
        <section class="dados-empresa">
          <h5>Dados da Empresa</h5>
          <div class="cnpj">
            <strong>CNPJ:</strong> {{ dadosEmpresa.cnpjFormatado }}
          </div>
          <div class="razao-social">
            <strong>Razão social:</strong> {{ dadosEmpresa.razaoSocial }}
          </div>
          <div class="cnae-grau-risco">
            <strong>CNAE Principal:</strong> {{ dadosEmpresa.cnaePrincipalFormatado }} <strong>Grau de risco:</strong> {{ dadosEmpresa.grauDeRisco }}
          </div>
          <div class="simples-nacional">
            <strong>Optante pelo simples nacional:</strong> {{ dadosEmpresa.optanteSimples }}
          </div>
        </section>
      </div>
      <div class="col-1">
        <div class="the-line" />
      </div>
      <div class="col-4">
        <section class="dados-representante">
          <h5>Dados do representante</h5>
          <div class="cpf">
            <strong>CPF:</strong> {{ representante.cpfFormatado }}
          </div>
          <div class="nome">
            <strong>Nome:</strong> {{ representante.nome }}
          </div>
          <div class="e-mail">
            <strong>E-mail:</strong> {{ representante.email }}
          </div>
          <div class="whatsapp">
            <strong>Whatsapp:</strong> {{ telefoneFormatado(representante.whatsApp) }}
          </div>
          <div class="cargo">
            <strong>Cargo:</strong> {{ representante.cargo }}
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BoardInfosEmpresa',
  computed: {
    ...mapState({
      uiDiagnostico: state => state.diagnostico.ui,
      representante: state => state.diagnostico.representanteResponsavel,
      dadosEmpresa: state => state.diagnostico.dadosEmpresaResultadosIniciais
    })
  },
  methods: {
    telefoneFormatado(telefone) {
      if (telefone !== undefined) {
        let ddd = telefone.slice(0, 2)
        ddd = '(' + ddd + ') '
        let cincoPrimeiros = telefone.slice(2, 7)
        cincoPrimeiros = cincoPrimeiros + '-'
        // eslint-disable-next-line prefer-const
        let quatroUltimos = telefone.slice(7, 11)
        return ddd + cincoPrimeiros + quatroUltimos
      }
    }
  }
}
</script>

<style scoped>
  .box-branco {
    overflow: hidden;
  }
  .dados-empresa h5, .dados-representante h5 {
    color: #58AADB;
    font-size: 18px;
    font-family: 'Gotham-medium';
  }
  .dados-empresa strong, .dados-representante strong {
    font-family: 'Gotham-medium';
    color: #053F5C;
  }
  .the-line {
    border-right: 0.75px solid #053f5c;
    width: 1px;
    height: 155%;
    top: -40px;
    position: absolute;
  }
</style>
