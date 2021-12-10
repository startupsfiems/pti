<template>
  <div>
    <div v-if="carregandoDados" class="loading-container">
      <b-spinner variant="dark" label="Text Centered" />
    </div>
    <div v-else class="diagnostico-inicial mb-5">
      <Header :title="'nomeEmpresa'" />
      <div class="container-fluid">
        <div class="row">
          <BoardInfosEmpresa />
          <article class="col-lg-8 offset-lg-2 col-12 infos-pti mt-5">
            <h4>
              O Programa de Transformação da Indústria
            </h4>
            <p>
              É uma iniciativa para alavancar micro e pequenas indústrias do Mato Grosso do Sul.
              Incorpora uma proposta arrojada com <strong>foco na produtividade, na garantia da integridade organizacional,
                inovação e no bem-estar dos funcionários.</strong> Um dos pilares do programa é visualizar a segurança e a saúde como área e processo estratégico
              <strong> rumo ao desenvolvimento de uma Cultura da Segurança.</strong>
            </p>
          </article>
          <TableMetodologiaDiagnostico />
          <TableResultadosObtidos
            :resultados="resultados"
          />
          <div class="col-lg-8 offset-lg-2 col-12 text-center mt-4">
            <div class="blue-line" />
            <button class="btn-light-blue">
              Score geral do PTI: <strong>{{ scoreGeral * 100 }}%</strong>
            </button>
          </div>
          <TableEtapas v-if="etapas" :dados-etapas="etapas" />
          <TableEtapas v-else :dados-etapas="resultadosDimensoes.dadosHistorico" />
          <div class="col-lg-4 offset-lg-2 col-6 mt-4 linhas">
            <div id="group-graphics">
              <div id="grafico-produtividade" class="box-branco">
                <Grafico
                  :data-set="dataSetProdutividadeFuncionario"
                  :chart-options="chartOptionsProdutividade"
                  :altura="220"
                />
              </div>
              <div id="grafico-absenteismo" class="box-branco mt-4">
                <Grafico
                  :data-set="dataSetTaxaAbsenteismo"
                  :chart-options="chartOptionsAbsenteismo"
                  :altura="220"
                />
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-6 mt-4 radar">
            <div v-if="podeAcessar" id="grafico-radar" class="box-branco text-center">
              <h4 class="s-gbl">
                Maturidade da Empresa
              </h4>
              <Grafico
                :chart-options="radarChartOptions"
                :data-set="radarData"
                :altura="350"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="$route.query.planoDeAcaoId !== null" class="box-container container">
        <div v-if="acoes.length > 0 && acoes[0].id > 0" class="box-header row">
          <p>Plano de Ação</p>
        </div>
        <div v-else class="box-header row">
          <p>Ainda não existem ações cadastradas neste plano.</p>
        </div>

        <div
          v-for="(acao, index) in acoes"
          :key="index"
          class="row"
        >
          <box-lista-acao
            v-if="acao.id !== 0"
            :titulo="`Ação ` + parseInt(index+1)"
            :nome-acao="acao.tipoDeAcao.nomeDaAcao"
            :responsavel="acao.responsavel"
            :local="acao.local"
            :inicio="new Date(acao.dataInicial).toLocaleDateString('pt-br')"
            :conclusao="new Date(acao.dataConclusao).toLocaleDateString('pt-br')"
            :orcamento="acao.tipoDeAcao.orcamento"
            :objetivo="acao.tipoDeAcao.objetivo"
            :descricao="
              acao.tipoDeAcao.descricao
            "
          />
        </div>
      </div>
      <div v-else class="box-container container">
        <div class="box-header row">
          <p>Ainda não existem planos de ação :)</p>
        </div>
      </div>
      <footer class="button-container">
        <button @click="redirecionarParaTelaDeEmpresa()">
          Voltar
        </button>

      <!-- <button @click="baixarPdf">
        download pdf teste
      </button> -->
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Grafico from '../../../components/graficos/Grafico.vue'
import BoardInfosEmpresa from '../../../components/empresa/BoardInfosEmpresa.vue'
import TableMetodologiaDiagnostico from '../../../components/empresa/TableMetodologiaDiagnostico.vue'
import TableResultadosObtidos from '../../../components/empresa/TableResultadosObtidos.vue'
import TableEtapas from '../../../components/empresa/TableEtapas.vue'
import BoxListaAcao from '../../../components/acao/BoxListaAcao.vue'

import imagem from '../../../static/logo_relatorio.json'
// eslint-disable-next-line import/named
import gerarPDF from '../../../utils/gerarPDF.js'

export default {
  name: 'ResultadosDiagnostico',
  components: { BoxListaAcao, Grafico, BoardInfosEmpresa, TableMetodologiaDiagnostico, TableResultadosObtidos, TableEtapas },
  data() {
    return {
      carregandoDados: true,
      acoes: [],
      radarData: [{
        data: []
      }],
      radarChartOptions: {
        chart: {
          type: 'radar'
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['#4472c4'],
          dashArray: 0
        },
        fill: {
          opacity: 0
        },
        markers: {
          size: 3,
          hover: {
            size: 6
          }
        },
        xaxis: {
          categories: [],
          labels: {
            show: true,
            style: {
              colors: ['#a8a8a8'],
              fontSize: '14px',
              fontFamily: 'Gotham-medium'
            }
          }
        }
      },
      chartOptionsProdutividade: {
        colors: ['#f41c1c', '#f7ad19'],
        plotOptions: {
          // bar: {
          //   columnWidth: "40%",
          //   borderRadius: 6,
          // },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          // show: true,
          width: 2,
          // colors: ["transparent"],
          curve: 'smooth'
        },
        markers: {
          size: 5
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          markers: { radius: 30 }
        },
        title: {
          text: '(A) Produtividade por funcionário',
          align: 'left',
          margin: 20,
          offsetX: 10,
          offsetY: 0,
          style: {
            fontFamily: 'Gotham-bold',
            fontWeight: 1000,
            fontSize: '16px',
            color: '#053F5C'
          }
        },
        chart: {
          id: 'produtividade',
          type: 'line',
          toolbar: {
            tools: {
              download: true,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false
            }
          }
        },
        xaxis: {
          categories: ['Etapa Inicial', 'Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa Final']
        },
        yaxis: {
          axisBorder: {
            show: true
          }
        }
      },
      chartOptionsAbsenteismo: {
        colors: ['#f41c1c', '#f7ad19'],
        plotOptions: {
          // bar: {
          //   columnWidth: "40%",
          //   borderRadius: 6,
          // },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          // show: true,
          width: 2,
          // colors: ["transparent"],
          curve: 'smooth'
        },
        markers: {
          size: 5
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          markers: { radius: 30 }
        },
        title: {
          text: '(B) Taxa de absenteísmo',
          align: 'left',
          margin: 20,
          offsetX: 10,
          offsetY: 0,
          style: {
            fontFamily: 'Gotham-bold',
            fontWeight: 1000,
            fontSize: '16px',
            color: '#053F5C'
          }
        },
        chart: {
          id: 'produtividade',
          type: 'line',
          toolbar: {
            tools: {
              download: true,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false
            }
          }
        },
        xaxis: {
          categories: ['Etapa Inicial', 'Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa Final']
        },
        yaxis: {
          axisBorder: {
            show: true
          }
        }
      },
      dataSetProdutividadeFuncionario: [
        {
          name: 'Alcançado',
          data: []
        },
        {
          name: 'Meta',
          data: []
        }
      ],
      dataSetTaxaAbsenteismo: [
        {
          name: 'Alcançado',
          data: []
        },
        {
          name: 'Meta',
          data: []
        }
      ],
      paginaCarregada: false
    }
  },
  computed: {
    ...mapState({
      resultados: state => state.diagnostico.resultadosIniciais.resultados,
      scoreGeral: state => state.diagnostico.scoreGeral,
      etapas: state => state.empresa.dados.historico,
      planoDeAcaoAtual: state => state.acao.planoDeAcaoAtual,
      dadosGeraisDiagnostico: state => state.diagnostico,
      dadosEmpresa: state => state.diagnostico.dadosEmpresaResultadosIniciais,
      dadosRepresentante: state => state.diagnostico.representanteResponsavel,
      resultadosDimensoes: state => state.diagnostico.resultadosIniciais,
      podeAcessar: state => state.diagnostico.podeAcessar
    })
  },
  mounted() {
    this.carregandoDados = true
    this.getInfosDiagnosticoInicial(this.$route.query.empresaId, this.$route.query.etapaDiagnosticoId).then(() => {
      if (this.$route.query.planoDeAcaoId !== null) {
        this.injetaDadosDePlanoDeAcao(parseInt(this.$route.query.etapaDiagnosticoId), parseInt(this.$route.query.planoDeAcaoId))
          .then(() => {
            this.popularRadarChart(this.radarChartOptions.xaxis.categories, this.radarData[0].data)
            if (this.$route.query.gerarPDF === 'true') {
              this.baixarPdf()
            }
          })
      } else {
        this.popularRadarChart(this.radarChartOptions.xaxis.categories, this.radarData[0].data)
      }
    })
  },
  methods: {
    baixarPdf() {
      if (!this.carregandoDados) {
        setTimeout(() => {
          const dado = {
            dadosEmpresa: this.dadosEmpresa,
            dadosRepresentante: this.dadosRepresentante,
            resultadosDimensoes: this.resultadosDimensoes,
            scoreGeral: this.scoreGeral,
            dadosHistorico: this.etapas,
            listaAcoes: this.planoDeAcaoAtual.acao
          }
          const lineGraphs = document.querySelector('#group-graphics')
          lineGraphs.addEventListener('animationend', gerarPDF(imagem, dado))
        }, 3000)
      } else {
        this.baixarPdf()
      }
    },
    async getInfosDiagnosticoInicial(empresa, etapaDiagnostico) {
      const params = {
        empresaId: parseInt(empresa),
        etapaDiagnosticoId: parseInt(etapaDiagnostico)
      }
      await this.$store.dispatch({
        type: 'diagnostico/getResultadosDiagnosticosInicial',
        params
      })

      if (this.etapas) {
        this.dataSetProdutividadeFuncionario[0].data = [
          ...this.etapas.produtividadeFuncionarioEmpresa
        ]
        for (let i = 0; i < 5; i++) {
          this.dataSetProdutividadeFuncionario[1].data = [
            ...this.etapas.produtividadeFuncionarioMeta
          ]
        }
        this.dataSetTaxaAbsenteismo[0].data = [
          ...this.etapas.taxaAbsenteismoEmpresa
        ]
        for (let i = 0; i < 5; i++) {
          this.dataSetTaxaAbsenteismo[1].data = [
            ...this.etapas.taxaAbsenteismoMeta
          ]
        }
      } else {
        //
        this.dataSetProdutividadeFuncionario[0].data = [
          ...this.resultadosDimensoes.dadosHistorico.produtividadeFuncionarioEmpresa
        ]
        for (let i = 0; i < 5; i++) {
          this.dataSetProdutividadeFuncionario[1].data = [
            ...this.resultadosDimensoes.dadosHistorico.produtividadeFuncionarioMeta
          ]
        }
        this.dataSetTaxaAbsenteismo[0].data = [
          ...this.resultadosDimensoes.dadosHistorico.taxaAbsenteismoEmpresa
        ]
        for (let i = 0; i < 5; i++) {
          this.dataSetTaxaAbsenteismo[1].data = [
            ...this.resultadosDimensoes.dadosHistorico.taxaAbsenteismoMeta
          ]
        }
      }

      this.carregandoDados = false
    },
    async injetaDadosDePlanoDeAcao(etapaDiagnosticoId, planoDeAcaoId) {
      this.planoDeAcaoCarregado = false
      const params = {
        etapaDiagnosticoId,
        planoDeAcaoId
      }
      await this.$store.dispatch({
        type: 'acao/getPlanoDeAcaoAtual',
        params
      }).then(() => {
        this.acoes = this.planoDeAcaoAtual.acao
        this.planoDeAcaoCarregado = true
      })
    },
    popularRadarChart(legendas, valores) {
      for (let i = 0; this.resultados[i] !== undefined; i++) {
        // legendas.push(this.resultados[i].nomeDimensao)
        valores.push(this.resultados[i].scoreEmpresa.toFixed(2) * 100)
      }
      // Fiz isso pra quebrar linha nas legendas do gráfico
      // https://apexcharts.com/docs/multiline-text-and-line-breaks-in-axes-labels/
      legendas.push('Pessoas')
      legendas.push('Gestão')
      legendas.push('SST')
      legendas.push(['Inovação e', 'Mercado'])
    },
    redirecionarParaTelaDeEmpresa() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .loading-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .infos-pti h4 {
    color: #58AADB;
    font-family: 'Gotham-bold';
    font-size: 20px;
  }
  .infos-pti p {
    color: #053F5C;
    font-size: 18px;
    font-family: 'Gotham-light';
  }
  .infos-pti {
    border-left: 7px solid #497AAA;
  }
  .btn-light-blue {
    width: 280px;
    background-color: #497AAA;
    cursor: unset;
  }
  .blue-line {
    height: 1px;
    width: 100%;
    background-color: #497AAA;
    position: relative;
    top: 20.5px;
  }
  .box-branco h4 {
    font-size: 20px;
  }

  .radar .box-branco {
    height: 500px;
  }
  .linhas .box-branco {
    height: 240px;
    padding: 10px;
  }

  /* Plano de Ação */
  .box-container {
    width: 96%;
    max-width: 56rem;
    margin: 24px auto;

    border: 1px solid var(--text-title);
    border-radius: 14px;
  }

  .box-header {
    width: 100%;
    height: 3.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .box-header p {
    font-family: Gotham-bold;
    font-size: 1.2rem;
    color: var(--text-title);
    margin: 0;
  }

  .button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 1.75rem 0;
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
  }
  @media (max-width: 767px) {
    .radar .box-branco {
      height: 400px;
    }
  }
</style>
