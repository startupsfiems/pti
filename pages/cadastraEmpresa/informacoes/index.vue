<template>
  <div>
    <Header :title="`DIAGNÓSTICO`" />

    <div class="container">
      <div class="head-title">
        <p>Cadastro</p>
        <img src="~/static/assets/arrow-right.svg" alt="arrow-left" />
        <span>Etapa Inicial</span>
      </div>

      <form class="content-form" @submit.prevent="signInButtonPressed">
        <div class="container-box">
          <p class="section-title">
            Relatório de resultados dos funcionários e SST
          </p>

          <div class="content-box">
            <div class="content-input">
              <p>Nº médio de funcionários nos ultimos 12 meses.</p>
              <input v-model="funcionarios" type="number" required />
            </div>

            <div class="content-input">
              <p>Faturamento bruto nos últimos 12 meses.</p>
              <CurrencyInput v-model="faturamentoMensal" :options="{ currency: 'BRL' }" required />
            </div>

            <div class="content-input">
              <p>
                Desperdício/perda de produtos/ MP por inefi- ciência de pessoas
                ou processos (cálculo pelo percentual de faturamento).
              </p>
              <CurrencyInput v-model="desperdicio" :options="{ currency: 'BRL' }" required />
            </div>

            <div class="content-input">
              <p>Nº de faltas registradas nos últimos 12 meses.</p>
              <input v-model="faltasRegistradas" type="number" required />
            </div>

            <div class="content-input">
              <p>
                Total (R$) de indenizações trabalhistas pagas nos últimos 12
                meses.
              </p>
              <CurrencyInput v-model="indenizacoes" :options="{ currency: 'BRL' }" required />
            </div>

            <div class="content-input">
              <p>
                Nº de dias de afastamento, por motivos de acidente no trabalho e
                tratamento de saúde nos últimos 12 meses (somatório
                funcinários).
              </p>
              <input v-model="afastamentos" type="number" required />
            </div>

            <div class="button-container">
              <button>
                Voltar
              </button>

              <button type="submit" @click.prevent="enviarInformacoes">
                Próximo
              </button>
            </div>
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
                produtividadeMensalFinalPTI.toLocaleString('pt-BR', {
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
              Expectativa da taxa de absenteísmo ao final da PTI.
            </p>
            <p class="info-value">
              {{ taxaDeAbsenteismoFinalPTI.toFixed(2) + '%' }}
            </p>
          </div>

          <div class="content-info">
            <p class="info-title">
              Impacto horas produtivas anual.
            </p>
            <p class="info-value">
              {{ horasProdutivas.toFixed(0) }}
            </p>
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

import header from '../../../utils/headers'
import { Constantes } from '../../../utils/constantes'
import Header from '~/components/Header'
import CurrencyInput from '~/components/CurrencyInput'

export default Vue.extend({
  components: { Header, CurrencyInput },
  data() {
    return {
      // dados do formulario
      funcionarios: null,
      faturamentoMensal: null,
      desperdicio: null,
      faltasRegistradas: null,
      indenizacoes: null,
      afastamentos: null,

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
      title: 'Diagnóstico'
    }
  },

  computed: {
    ...mapState({
      usuarioLogado: state => state.user.usuarioLogado
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
          ((253 *
          8) *
          this.funcionarios) *
          (this.taxaDeAbsenteismo - this.taxaDeAbsenteismoFinalPTI)
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

    async enviarInformacoes() {
      if (
        !this.funcionarios ||
        !this.faturamentoMensal ||
        !this.desperdicio ||
        !this.faltasRegistradas ||
        !this.indenizacoes ||
        !this.afastamentos
      ) {
        this.showToast(
          'Atenção',
          'info',
          'Preencha todos os dados antes de continuar',
          'b-toaster-top-left',
          3000
        )
      } else {
        const dados = {
          numeroMedioFuncionariosDozeMeses: this.funcionarios,
          faturamentoBrutoDozeMeses: this.faturamentoMensal,
          desperdicioPerdas: this.desperdicio,
          faltasRegistradasDozeMeses: this.faltasRegistradas,
          totalIndenizacaoDozeMeses: this.indenizacoes,
          somaDiasAfastamentoDozeMeses: this.afastamentos,
          empresaId: this.$route.query.idEmpresa,
          representanteId: this.$route.query.idRepresentante,
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
            type: 'diagnostico/getAtividadesDoDiagnostico',
            params: {
              etapaId: etapaDiagnosticoId,
              usuarioId: this.usuarioLogado.id
            }
          })

          const params = {
            etapaDiagnosticoId
          }

          await this.$store.dispatch({
            type: 'empresa/setInfos',
            params
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
      }
    }
  }
})
</script>

<style scoped>
.container {
  max-width: 1080px;
  width: 100%;
  padding: 2.25rem 4% 1.875rem 4%;
  margin: 0 auto;
}

.head-title {
  width: 100%;
  display: flex;
  height: 1.18rem;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: center;
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

/* parte laranja do form */
.container-info {
  flex: 1;
  min-height: 30rem;
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

@media (max-width: 980px) {
  .content-form {
    flex-direction: column;
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
