<template>
  <div class="grafico">
    <apexchart
      :width="432"
      :type="tipoGrafico"
      :options="chartOptions"
      :series="dataSet"
    />
  </div>
</template>

<script>
export default {
  props: {
    tituloGrafico: {
      type: String,
      default: 'Titulo do Gráfico'
    },
    dataSet: {
      type: Array,
      required: true
    },
    tipoGrafico: {
      type: String,
      default: 'line'
    },
    corAlcancado: {
      type: String,
      default: '#F9BD47'
    },
    corMeta: {
      type: String,
      default: '#E51919'
    }
  },
  data() {
    return {
      data: {
        name: '',
        dataPieces: []
      },
      chartOptions: {
        colors: [this.corAlcancado, this.corMeta],
        dataLabels: {
          enabled: false
        },
        stroke: {
          // show: true,
          width: 2,
          // colors: ["transparent"],
          curve: 'straight'
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
          categories: ['Inicial', '1', '2', '3', '4', 'Final']
        },
        yaxis: {
          axisBorder: {
            show: true
          }
        }
      }
    }
  },
  computed: {}
}
</script>

<style scoped>

</style>
