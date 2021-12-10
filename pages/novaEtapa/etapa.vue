<template>
  <div>
    <Header :title="`DIAGNÓSTICO`" />

    <div class="container">
      <div class="head-title">
        <span>Etapa 1</span>
      </div>

      <form class="content-form" @submit.prevent="signInButtonPressed">
        <div class="container-box">
          <p class="section-title">
            Relatório de resultados dos funcionários e SST
          </p>

          <div class="content-box">
            <div class="content-input">
              <p>Nº médio de funcionários nos ultimos 12 meses.</p>
              <input v-model="funcionarios" type="number" />
            </div>

            <div class="content-input">
              <p>Faturamento bruto nos últimos 12 meses.</p>
              <input v-model="faturamentoMensal" type="number" />
            </div>

            <div class="content-input">
              <p>
                Desperdício/perda de produtos/ MP por inefi- ciência de pessoas
                ou processos (cálculo pelo percentual de faturamento).
              </p>
              <input v-model="desperdicio" type="number" />
            </div>

            <div class="content-input">
              <p>Nº de faltas registradas nos últimos 12 meses.</p>
              <input v-model="faltasRegistradas" type="number" />
            </div>

            <div class="content-input">
              <p>
                Total (R$) de indenizações trabalhistas pagas nos últimos 12
                meses.
              </p>
              <input v-model="indenizacoes" type="number" />
            </div>

            <div class="content-input">
              <p>
                Nº de dias de afastamento, por motivos de acidente no trabalho e
                tratamento de saúde nos últimos 12 meses (somatório
                funcinários).
              </p>
              <input v-model="afastamentos" type="number" />
            </div>

            <div class="button-container">
              <button @click="voltar()">
                Voltar
              </button>
              <button @click="enviarInformacoes()">
                Próximo
              </button>
            </div>
          </div>
        </div>

        <div class="container-info-boxes">
          <div class="container-info box-blue">
            <h1>Resultado Etapa 1</h1>

            <div class="content-info">
              <p class="info-title">
                Produtividade atual por funcionário por mês.
              </p>
              <p class="info-value">
                {{
                  produtividadeMensal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })
                }}
              </p>
            </div>

            <div class="content-info">
              <p class="info-title">
                Impacto financeiro anual com o ganho de produtividade.
              </p>
              <p class="info-value">
                {{
                  impactoAnual.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })
                }}
              </p>
            </div>

            <div class="content-info">
              <p class="info-title">
                Taxa de absenteísmo atual
              </p>
              <p class="info-value">
                {{ taxaDeAbsenteismoFinalPTI.toFixed(2) + '%' }}
              </p>
            </div>

            <div class="content-info">
              <p class="info-title">
                Impacto horas produtivas atual.
              </p>
              <p class="info-value">
                {{ horasProdutivas.toFixed(0) }}
              </p>
            </div>
          </div>

          <div class="container-info">
            <h1>Meta Anual</h1>
            <div class="content-info">
              <p class="info-title">
                Expectativa de produtividade mensal por funcionário ao final da
                PTI.
              </p>
              <p class="info-value">
                {{
                  metaAnual.expectativaProdutividadeFuncionarioMes.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })
                }}
              </p>
            </div>

            <div class="content-info">
              <p class="info-title">
                Impacto financeiro anual com o ganho de produtividade.
              </p>
              <p class="info-value">
                {{
                  metaAnual.impactoFinanceiroAnualComGanhoDeProdutividade.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })
                }}
              </p>
            </div>

            <div class="content-info">
              <p class="info-title">
                Expectativa da taxa de absenteísmo ao final da PTI.
              </p>
              <p class="info-value">
                {{ metaAnual.expectativaTaxaAbsenteismo.toFixed(2) + '%' }}
              </p>
            </div>

            <div class="content-info">
              <p class="info-title">
                Impacto horas produtivas anual.
              </p>
              <p class="info-value">
                {{ metaAnual.impactoHorasProdutivasAnual.toFixed(0) }}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import axios from 'axios'

import header from '../../utils/headers'
import { Constantes } from '../../utils/constantes'
import Header from '~/components/Header'

export default Vue.extend({
  components: { Header },
  data() {
    return {
      // dados do formulario
      funcionarios: 0,
      faturamentoMensal: 0,
      desperdicio: 0,
      faltasRegistradas: 0,
      indenizacoes: 0,
      afastamentos: 0,

      // dados para cálculo
      produtividadeMensal: 0,
      produtividadeMensalFinalPTI: 0,
      impactoAnual: 0,
      taxaDeAbsenteismo: 0,
      taxaDeAbsenteismoFinalPTI: 0,
      horasProdutivas: 0
    }
  },

  head() {
    return {
      title: 'Resultado | Etapa 1'
    }
  },

  computed: {
    ...mapState({
      usuarioLogado: state => state.user.usuarioLogado,
      empresaInfos: state => state.empresa.infos,
      metaAnual: state => state.empresa.metaAnual
    })
  },

  watch: {
    funcionarios(newValue) {
      if (this.faturamentoMensal > 0 && newValue > 0) {
        this.produtividadeMensal =
          this.faturamentoMensal / this.funcionarios / 12

        this.produtividadeMensalFinalPTI =
          this.produtividadeMensal + this.produtividadeMensal * 0.08

        this.impactoAnual =
          (this.produtividadeMensalFinalPTI - this.produtividadeMensal) *
          newValue *
          12

        const afastamentos = Number(this.afastamentos)
        this.taxaDeAbsenteismo =
          ((afastamentos + Number(newValue)) * 8) /
          (this.funcionarios * 253 * 8)

        this.taxaDeAbsenteismoFinalPTI = this.taxaDeAbsenteismo * 0.8 * 100
        this.horasProdutivas =
          253 *
          8 *
          this.funcionarios *
          (this.taxaDeAbsenteismo - this.taxaDeAbsenteismoFinalPTI / 100)
      } else {
        this.produtividadeMensalFinalPTI = 0
      }
    },

    faturamentoMensal(newValue) {
      if (newValue > 0 && this.funcionarios > 0) {
        this.produtividadeMensal = newValue / this.funcionarios / 12

        this.produtividadeMensalFinalPTI =
          this.produtividadeMensal + this.produtividadeMensal * 0.08

        this.impactoAnual =
          (this.produtividadeMensalFinalPTI - this.produtividadeMensal) *
          this.funcionarios *
          12
      } else {
        this.produtividadeMensalFinalPTI = 0
      }
    },

    faltasRegistradas(newValue) {
      const afastamentos = Number(this.afastamentos)
      this.taxaDeAbsenteismo =
        ((afastamentos + Number(newValue)) * 8) / (this.funcionarios * 253 * 8)

      this.taxaDeAbsenteismoFinalPTI = this.taxaDeAbsenteismo * 0.8 * 100
      this.horasProdutivas =
        253 *
        8 *
        this.funcionarios *
        (this.taxaDeAbsenteismo - this.taxaDeAbsenteismoFinalPTI / 100)
    },

    afastamentos(newValue) {
      const afastamentos = Number(newValue)
      this.taxaDeAbsenteismo =
        ((afastamentos + Number(this.faltasRegistradas)) * 8) /
        (this.funcionarios * 253 * 8)

      this.taxaDeAbsenteismoFinalPTI = this.taxaDeAbsenteismo * 0.8 * 100
      this.horasProdutivas =
        253 *
        8 *
        this.funcionarios *
        (this.taxaDeAbsenteismo - this.taxaDeAbsenteismoFinalPTI / 100)
    }
  },

  methods: {
    signInButtonPressed(e) {
      e.preventDefault()
    },

    voltar() {
      this.$router.back()
    },

    async enviarInformacoes() {
      const dados = {
        numeroMedioFuncionariosDozeMeses: this.funcionarios,
        faturamentoBrutoDozeMeses: this.faturamentoMensal,
        desperdicioPerdas: this.desperdicio,
        faltasRegistradasDozeMeses: this.faltasRegistradas,
        totalIndenizacaoDozeMeses: this.indenizacoes,
        somaDiasAfastamentoDozeMeses: this.afastamentos,
        empresaId: this.empresaInfos.empresaId,
        representanteId: this.empresaInfos.representanteId,
        agenteId: this.usuarioLogado.id
      }
      const response = await axios.post(
        `${Constantes.URL_API_INTEGRADORA}pti/Diagnostico/informacoes/empresa`,
        dados,
        { headers: header.headers() }
      )
      if (response.data.codigo === 200) {
        const { etapaDiagnosticoId } = response.data.dado
        await this.$store.dispatch({
          type: 'empresa/setInfos',
          params: {
            etapaDiagnosticoId
          }
        })

        this.showToast(
          'Sucesso',
          'success',
          'Informações salvas com sucesso!',
          'b-toaster-top-left',
          3000
        )

        this.$router.replace({
          path: '/diagnostico?sessao=pessoas'
        })
      } else {
        this.showToast(
          'Erro',
          'info',
          'Verifique os dados inseridos e tente novamente',
          'b-toaster-top-left',
          3000
        )
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
    }
  }
})
</script>

<style scoped>
.container {
  max-width: 1300px;
  width: 100%;
  padding: 2.25rem 3% 1.875rem 3%;
  margin: 0 auto;
}

.head-title {
  display: flex;
  height: 1.18rem;
  margin-bottom: 1rem;
  align-items: center;
  padding-left: 3rem;
}

.head-title p {
  font-family: 'GothamBook';
  color: var(--main-light);
  font-size: 1.125rem;
  margin: 0;
}

.head-title img {
  margin: 0 1.25rem;
  height: 1rem;
}

.head-title span {
  color: var(--main-light);
  font-family: 'Gotham-bold';
  font-size: 1.125rem;
}

.content-form {
  display: flex;

  align-items: center;
}

.container-box {
  max-width: 42rem;
  width: 100%;
  padding: 1.875rem 1.875rem 38px 1.875rem;
  border: 1px solid var(--text-title);
  border-radius: 10px;
  background-color: var(--shape);

  margin-top: 20px;
}

.section-title {
  font-size: 1.25rem;
  font-family: 'Gotham-bold';
  color: var(--text-title);
  margin-bottom: 2.8rem;
}

.content-box {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.content-input {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.8rem;
}

.content-input p {
  max-width: 20.6rem;
  font-family: 'GothamBook';
  color: var(--text-title);
  font-size: 0.875rem;
  line-height: 1.1rem;
  margin: 0;
}

.content-input input {
  width: 16rem;
  border: 1px solid var(--text-title);
  height: 2.5rem;
  border-radius: 1.25rem;
  padding: 0 1.875rem;

  color: var(--text-title);
  font-size: 0.875rem;
  font-family: 'Gotham-bold';
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2rem 0 1.2rem 0;
}

.button-container button {
  border: 0;
  width: 10.625rem;
  height: 2.5rem;
  border-radius: 1.313rem;
  background-color: var(--main-light);
  font-size: 1rem;
  font-family: 'GothamBook';
  color: var(--shape);
  margin: 0 10px;
}

.container-info-boxes {
  display: flex;
}

/* parte laranja do form */
.container-info {
  flex: 1;
  max-width: 19rem;
  min-height: 35rem;
  padding: 2.75rem 1rem 2.75rem 1.2rem;
  background-color: var(--secondary);
}

.container-info h1 {
  font-family: 'Gotham-bold';
  font-size: 1.25rem;
  margin-bottom: 2.6rem;
}

.content-info {
  margin-bottom: 1.8rem;
}

.content-info:last-child {
  margin-bottom: 0;
}

.content-info .info-title {
  font-family: 'GothamBook';
  font-size: 0.87rem;
  margin: 0;
  margin-bottom: 0.7rem;
}

.content-info .info-value {
  font-family: 'Gotham-Bold';
  font-size: 1.12rem;
  margin: 0;
}

.box-blue {
  background-color: var(--main-light);
  color: white;
  max-width: 16rem;
}

@media (max-width: 1024px) {
  .content-form {
    flex-direction: column;
  }

  .container-info-boxes {
    max-width: 42rem;
  }

  .container-info {
    max-width: initial;
  }
}

@media (max-width: 720px) {
  .content-input {
    flex-direction: column;
    align-items: flex-start;
  }

  .content-input p {
    max-width: 100%;
    margin-bottom: 0.8rem;
  }

  .content-input input {
    width: 100%;
  }
}

@media (max-width: 536px) {
  .container {
    padding: 2.25rem 8% 1.875rem 8%;
  }
  .content-box {
    grid-template-columns: 1fr;
    gap: 0.875rem 1.25rem;
  }
}
</style>
