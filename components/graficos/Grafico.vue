<template>
  <div class="grafico">
    <div v-if="altura === 0">
      <apexchart
        :width="'100%'"
        :options="chartOptions"
        :series="dataSet"
      />
    </div>
    <div v-else>
      <apexchart
        :width="'100%'"
        :options="chartOptions"
        :series="dataSet"
        :height="altura"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Grafico',
  props: {
    chartOptions: {
      type: Object,
      default: null
    },
    altura: {
      type: Number,
      default: 0
    },
    dataSet: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      data: {
        name: '',
        dataPieces: []
      },
      chartOptionsDefault: {
        colors: [this.corAlcancado, this.corMeta],
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
          text: this.tituloGrafico,
          align: 'left',
          margin: 20,
          offsetX: 10,
          offsetY: 0,
          style: {
            fontSize: '14px'
            // fontWeight: 0,
            // fontFamily: "Cambria, sans-serif",
            // color: "#263238",
          }
        },
        chart: {
          id: 'notas',
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
          categories: this.categorias
        },
        yaxis: {
          axisBorder: {
            show: true
          }
          // title: {
          //   text: "minutos/dia",
          //   style: {
          //     fontSize: "12px",
          //     fontWeight: 0,
          //   },
          // },
        }
      }
    }
  },
  computed: {
    // É necessário utilizar outro elemento para verificar a largura, já que (aparantemente)
    // a velocidade da conexão afeta a renderização do componente, então o método é executado
    // antes que o elemento com .grafico seja renderizado, quebrando o retorno de largura adequado
    graphicWidth() {
      let largura
      const graphicContainer = document.querySelector('.grafico')
      if (graphicContainer.clientWidth <= 575) {
        largura = graphicContainer.clientWidth * 0.7
      } else {
        largura = 600
      }
      return largura
    }
  }
}
</script>

<style scoped>
  .teste {
    left: 20px;
    width: 100%;
  }
</style>
