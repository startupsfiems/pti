<template>
  <div class="historico-acompanhamentos text-center">
    <Header
      :title="'HISTÓRICO DE ACOMPANHAMENTOS'"
      :is-home="false"
    />
    <div class="mt-5" />
    <a class="voltar" @click.prevent="$router.back()">
      <img src="~/static/assets/arrow-left.svg" alt="back" /> voltar
    </a>
    <b-form-select v-model="selected" :options="options" @change="getAcoesAcompanhadas(selected, $route.query.planoDeAcaoId)" />
    <div class="container-fluid mt-5">
      <div class="row">
        <div class="col-6 offset-3">
          <div class="box-branco">
            <Grafico
              :data-set="[{name: 'Alcançado', data: acoesAcompanhadas.percentuais}]"
              :chart-options="chartOptions"
              :altura="300"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="respostaChegou" class="container-fluid mt-5 mb-5">
      <div class="row">
        <div
          v-for="(acao, index) in acoesAcompanhadas.dadosAcao"
          :key="acao.acompanhamentoId"
          class="col-md-4 col-10 offset-md-0 offset-1"
        >
          <section class="cards-container mb-5">
            <CardAcompanhamento
              :counter="index + 1"
              :data-e-canal-de-atendimento="{data: new Date(acao.data).toLocaleDateString('pt-br'), canalDeAtendimento: acao.canalDeAtendimento}"
              :acao="acao"
            />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '~/components/Header.vue'
import Grafico from '~/components/graficos/Grafico.vue'
import CardAcompanhamento from '~/components/acompanhamento/CardAcompanhamento.vue'

export default {
  name: 'HistoricoAcompanhamentos',
  components: { Header, Grafico, CardAcompanhamento },
  data() {
    return {
      selected: null,
      options: [],
      chartOptions: {
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
          text: 'Produtividade por funcionário',
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
      gettandoDados: true
    }
  },
  computed: {
    ...mapState({
      acoesAcompanhadas: state => state.acao.acoesAcompanhadas,
      respostaChegou: state => state.acao.recebeuResposta,
      etapasDaEmpresa: state => state.empresa.dados.etapas,
      acoesUi: state => state.acao.ui
    })
  },
  created() {
    this.getAcoesAcompanhadas(this.$route.params.acaoId, this.$route.query.planoDeAcaoId)
    this.getAcoesAcompanhadasToSelect()
  },
  methods: {
    getAcoesAcompanhadas(acao, planoDeAcao) {
      const params = {
        acaoId: parseInt(acao),
        planoDeAcaoId: parseInt(planoDeAcao)
      }
      this.$store.dispatch({
        type: 'acao/getAcoesAcompanhadas',
        params
      })
      if (this.acoesUi.codigo !== 200) {
        console.log(this.acoesUi)
      }
    },
    getAcoesAcompanhadasToSelect() {
      this.selected = this.$route.params.acaoId
      this.etapasDaEmpresa.forEach((etapa) => {
        if (etapa.diagnostico.etapaDiagnosticoId === parseInt(this.$route.query.etapaId)) {
          etapa.planosDeAcao.forEach((pa) => {
            if (pa.planoDeAcaoId === parseInt(this.$route.query.planoDeAcaoId)) {
              pa.acoes.forEach((acao) => {
                this.options.push({ value: acao.acaoId, text: acao.nome })
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
    select {
        border-radius: 20px;
        border: 1px solid #053F5C;
        max-width: 480px;
        width: 45%;
        text-align: center;
        font-family: 'Gotham-bold';
        color: #053F5C;
    }
    .voltar {
        position: absolute;
        left: 100px;
        cursor: pointer;
    }
    @media (max-width: 918px) {
        .card-container h1 {
            font-size: 18px;
        }
        .voltar {
            left: 40px;
        }
    }
</style>
