<template>
  <div v-if="userAllowed">
    <div class="container">
      <PainelFiltros
        v-if="!loadingFilters"
        :filters-amount="5"
        :filters-labels="filtersLabels"
        :filters-options="filtersOptions"
        @dados-recebidos="dadosDisponiveis = true"
        @buscando-dados="dadosDisponiveis = false"
      />
      <div v-else class="row text-center">
        <b-spinner variant="primary" label="Text Centered" />
      </div>
      <div v-if="dadosDisponiveis" class="row">
        <div class="col-12 col-lg-6">
          <section class="box-branco">
            <body>
              <Grafico
                :data-set="mediaAbsenteismoEProdutividade[0]"
                :chart-options="chartOptionsAbsenteismo"
              />
            </body>
          </section>
        </div>
        <div class="col-12 col-lg-6">
          <section class="box-branco">
            <body>
              <Grafico
                :data-set="mediaAbsenteismoEProdutividade[1]"
                :chart-options="chartOptionsProdutividade"
              />
            </body>
          </section>
        </div>
        <section class="simple-display-container col-12 text-center mt-3 mb-5">
          <SimpleDisplay
            v-for="(data, index) in dadosSimples"
            :key="index"
            :data-to-display="data.data"
            :description="data.description"
            :is-percentage="data.isPercentage"
          />
        </section>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="container">
      <h1 class="s-gbl text-center">
        Você não tem permissão para acessar o conteúdo.
      </h1>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Grafico from '../graficos/Grafico.vue'
import SimpleDisplay from './SimpleDisplay.vue'
// import popularFiltros from '~/utils/functions.js'
export default {
  name: 'PainelAgente',
  components: { Grafico, SimpleDisplay },
  props: {
    filtersOptions: {
      type: Array,
      default: () => []
    },
    loadingFilters: {
      type: Boolean,
      default: true
    },
    permissionId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      userAllowed: null,
      dadosDisponiveis: false,
      filtersLabels: ['Etapa', 'Região', 'Divisão', 'Grupo', 'Porte'],
      datasetAbsenteismo: [
        {
          name: 'Absenteísmo',
          data: []
        }
      ],
      datasetProdutividade: [
        {
          name: 'Produtividade',
          data: []
        }
      ],
      simpleData: [
        {
          data: 25,
          description: 'Quantidade de Empresas'
        },
        {
          data: 4000,
          description: 'Somatório de funcionários das empresas atendidas'
        },
        {
          data: 900,
          description: 'Média global de produtividade'
        },
        {
          data: 350,
          description: 'Média de funcionários por empresa'
        },
        {
          data: 220,
          description: 'Média global de absenteísmo'
        }
      ],
      chartOptionsAbsenteismo: {
        chart: {
          zoom: {
            enabled: false
          }
        },
        title: {
          text: 'Evolução da média global de absenteísmo',
          style: {
            fontFamily: 'Gotham-bold',
            fontWeight: 1000,
            fontSize: '16px',
            color: '#053F5C'
          }
        },
        xaxis: {
          categories: ['Etapa Inicial', 'Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa Final']
        }
      },
      chartOptionsProdutividade: {
        chart: {
          zoom: {
            enabled: false
          }
        },
        title: {
          text: 'Evolução da média global de produtividade',
          style: {
            fontFamily: 'Gotham-bold',
            fontWeight: 1000,
            fontSize: '16px',
            color: '#053F5C'
          }
        },
        xaxis: {
          categories: ['Etapa Inicial', 'Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa Final']
        }
      }
    }
  },
  computed: {
    ...mapState({
      dadosPainel: state => state.painelResultados.dadosPainel
    }),
    mediaAbsenteismoEProdutividade() {
      const medias = [
        [
          {
            name: 'Absenteísmo',
            data: []
          }
        ],
        [
          {
            name: 'Produtividade',
            data: []
          }
        ]
      ]
      this.dadosPainel.resultadoEmpresas.evolucaoMediaGlobalAbsenteismo.forEach((etapa) => {
        medias[0][0].data.push(etapa.valor)
      })
      this.dadosPainel.resultadoEmpresas.evolucaoMediaGlobalProdutividade.forEach((etapa) => {
        medias[1][0].data.push(etapa.valor)
      })
      return medias
    },
    dadosSimples() {
      const dadosSimples = [
        {
          data: 0,
          description: 'Quantidade de Empresas',
          isPercentage: false
        },
        {
          data: 0,
          description: 'Somatório de funcionários das empresas atendidas',
          isPercentage: false
        },
        {
          data: 0,
          description: 'Média global de produtividade',
          isPercentage: false
        },
        {
          data: 0,
          description: 'Média de funcionários por empresa',
          isPercentage: false
        },
        {
          data: 0,
          description: 'Média global de absenteísmo',
          isPercentage: true
        }
      ]
      dadosSimples[0].data = this.dadosPainel.perfilEmpresas.quantidadeDeEmpresas
      dadosSimples[1].data = this.dadosPainel.perfilEmpresas.quantidadeDeFuncionariosTotal
      dadosSimples[2].data = this.dadosPainel.resultadoEmpresas.mediaGlobalDeProdutividade
      dadosSimples[3].data = this.dadosPainel.perfilEmpresas.mediaDeFuncionariosPorEmpresa
      dadosSimples[4].data = this.dadosPainel.resultadoEmpresas.mediaGlobalDeAbsenteismo
      return dadosSimples
    }
  },
  created() {
    this.permissionId === 74 ? this.userAllowed = true : this.userAllowed = false
  },
  methods: {
    updateViewEvolucaoMediaGlobal(mediaGlobalState, dataSet) {
      mediaGlobalState.forEach((media) => {
        dataSet.data.push(media.valor)
      })
    }
  }
}
</script>

<style scoped>
  .box-branco {
    padding: 28px 35px;
  }
  .container {
    margin-top: 49px;
  }
  .row {
    margin-top: 50px;
  }
  .simple-display-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (max-width: 991px) {
    section[class='box-branco'] {
      margin-bottom: 10px;
    }
  }
</style>
