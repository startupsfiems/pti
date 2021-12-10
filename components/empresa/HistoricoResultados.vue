<template>
  <div class="historico-resultados">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-10 offset-xl-1 col-12">
          <div class="box-branco">
            <div v-if="aguardandoBuscaDeDados" class="text-center">
              <b-spinner variant="primary" label="Text Centered" />
            </div>
            <div v-else>
              <div v-if="dadosParaGraficos !== null" class="row">
                <div class="col-12">
                  <div class="titulo-azul-boxes">
                    Histórico de resultados
                  </div>
                </div>
                <div id="to-resize" class="col-xl-8 col-12 mt-5">
                  <div class="row">
                    <div class="col-10 offset-2">
                      <div class="row legendas gbl">
                        <div class="col-2">
                          Etapa inicial
                        </div>
                        <div class="col-2">
                          Etapa 2
                        </div>
                        <div class="col-2">
                          Etapa 3
                        </div>
                        <div class="col-2">
                          Etapa 4
                        </div>
                        <div class="col-2">
                          Etapa Final
                        </div>
                        <div class="col-2">
                          Meta Anual
                        </div>
                      </div>
                    </div>
                    <div class="col-2 produtividade-absenteismo gbl mt-3">
                      Produtividade por funcionário
                    </div>
                    <div class="col-10 mt-3">
                      <ProdutividadeFuncionario />
                    </div>
                    <div class="col-2 produtividade-absenteismo gbl mt-3">
                      Taxa de absenteísmo
                    </div>
                    <div class="col-10 mt-3">
                      <TaxaAbsenteismo />
                    </div>
                  </div>
                </div>
                <StatusHistoricoResultado />
                <div class="col-12">
                  <section class="row graficos">
                    <div class="col-xl-6 col-12 text-center">
                      <Grafico
                        :data-set="dataSetProdutividadeFuncionario"
                        :chart-options="chartOptionsProdutividade"
                      />
                    </div>
                    <div class="col-xl-6 col-12 text-center">
                      <Grafico
                        :data-set="dataSetTaxaAbsenteismo"
                        :chart-options="chartOptionsAbsenteismo"
                      />
                    </div>
                  </section>
                </div>
              </div>
              <div v-else class="row">
                <div class="col-12 mt-3 text-center">
                  Sem dados cadastrados, inicie uma nova Etapa
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Grafico from '../graficos/Grafico.vue'
import ProdutividadeFuncionario from './ProdutividadeFuncionario.vue'
import TaxaAbsenteismo from './TaxaAbsenteismo.vue'
import StatusHistoricoResultado from './StatusHistoricoResultado.vue'

export default {
  name: 'HistoricoResultados',
  components: {
    ProdutividadeFuncionario,
    TaxaAbsenteismo,
    StatusHistoricoResultado,
    Grafico
  },
  props: {
    aguardandoBuscaDeDados: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // Os dados de meta para produtividade e absenteísmo estão vindo como um único número (fora de array)
      // e isso parece quebrar a renderização do gráfico. É necessário tratar quando os dados vierem fora de arrays
      // ou garantir que sempre sejam recebidas arrays para passar aos componentes Gráficos
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
          text: 'Taxa de absenteismo',
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
      }
    }
  },
  computed: {
    ...mapState({
      dadosParaGraficos: state => state.empresa.dados.historico
    })
  },
  watch: {
    aguardandoBuscaDeDados() {
      if (this.aguardandoBuscaDeDados === false && this.dadosParaGraficos !== null) {
        this.dataSetProdutividadeFuncionario[0].data = [
          ...this.dadosParaGraficos.produtividadeFuncionarioEmpresa
        ]
        for (let i = 0; i < 5; i++) {
          this.dataSetProdutividadeFuncionario[1].data = [
            ...this.dadosParaGraficos.produtividadeFuncionarioMeta
          ]
        }
        this.dataSetTaxaAbsenteismo[0].data = [
          ...this.dadosParaGraficos.taxaAbsenteismoEmpresa
        ]
        for (let i = 0; i < 5; i++) {
          this.dataSetTaxaAbsenteismo[1].data = [
            ...this.dadosParaGraficos.taxaAbsenteismoMeta
          ]
        }
      }
    }
  },
  created() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('resize', this.layoutResizer)
  },
  destroyed() {
    window.removeEventListener('resize', this.layoutResizer)
  },
  methods: {
    layoutResizer(e) {
      const resizeRow = document.querySelector('.bottom-orange-box')
      const resizeAnotherRow = document.querySelector('#to-resize')

      if (window.innerWidth <= 1600) {
        resizeRow.classList.remove('col-xl-4')
        resizeAnotherRow.classList.remove('col-xl-8')
      } else {
        resizeRow.classList.add('col-xl-4')
        resizeAnotherRow.classList.add('col-xl-8')
      }
    }
  }
}
</script>

<style scoped>
.historico-resultados .graficos {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 50px 0 0 0;
}
.produtividade-absenteismo {
  text-align: right;
  font-size: 12px;
}

.legendas div {
  font-size: 12px;
}

@media (max-width: 991px) {
  .produtividade-absenteismo {
    font-size: 13px;
  }
}
</style>
