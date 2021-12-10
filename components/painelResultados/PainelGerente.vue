<template>
  <div v-if="userAllowed" class="container">
    <PainelFiltros
      v-if="!loadingFilters"
      :filters-amount="7"
      :filters-labels="filtersLabels"
      :filters-options="filtersOptions"
    />
    <b-spinner v-else variant="primary" label="Text Centered" />
    <div class="row">
      <div class="col-12">
        <h3 class="text-left s-gbl">
          RESULTADOS DAS EMPRESAS
        </h3>
      </div>
      <div class="col-12">
        <section class="simple-display-container">
          <SimpleDisplay
            v-for="(data, index) in resultadoEmpresaSimples"
            :key="index"
            :data-to-display="data.data"
            :description="data.description"
          />
        </section>
      </div>
      <div class="col-12 col-lg-6">
        <section class="box-branco">
          <body>
            <Grafico
              :data-set="datasetAbsenteismo"
              :chart-options="chartOptionsAbsenteismo"
            />
          </body>
        </section>
      </div>
      <div class="col-12 col-lg-6">
        <section class="box-branco">
          <body>
            <Grafico
              :data-set="datasetProdutividade"
              :chart-options="chartOptionsProdutividade"
            />
          </body>
        </section>
      </div>
    </div>
    <div class="row">
      <div class="col-12 d-flex">
        <h3 class="text-left s-gbl">
          RESULTADOS DAS AÇÕES
        </h3>
        <section class="simple-display-container-acoes w-80">
          <SimpleDisplay
            v-for="(data, index) in resultadoAcoesSimples"
            :key="index"
            :data-to-display="data.data"
            :description="data.description"
          />
        </section>
      </div>
      <div class="col-12">
        <BoxList
          :title="'Ranking das Ações mais Indicadas'"
          :lista-data="rankingAcoesMaisIndicadas"
          :type="'row-list'"
          :limite="10"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h3 class="text-left s-gbl mb-5">
          RESULTADOS FIEMS
        </h3>
      </div>
      <div class="col-12 col-xl-6">
        <section class="box-branco">
          <body>
            <Grafico
              :data-set="datasetProdutividade"
              :chart-options="chartOptionsBar"
              :altura="430"
            />
          </body>
        </section>
      </div>
      <div class="col-12 col-md-6 col-xl-3">
        <BoxList
          :title="'Faturamento por PTI'"
          :lista-data="listDataFakeFaturamentoPTI"
          :limite="10"
        />
      </div>
      <div class="col-12 col-md-6 col-xl-3">
        <SimpleDisplay
          :formatter="composedRectangle"
          :shape="'rectangle'"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <h3 class="text-left s-gbl mb-5">
          DADOS OPERACIONAIS
        </h3>
      </div>
      <div class="col-12 col-xl-3">
        <BoxList
          :title="'Mais de 30 dias sem receber acompanhamento'"
          :lista-data="listaDataFakeAtraso"
          :limite="10"
          :title-style="{fontSize: '1rem', color: 'red'}"
        />
      </div>
      <div class="col-12 col-md-6 col-xl-3 mt-2">
        <BoxList
          :title="'Quantidade de acompanhamentos por empresa'"
          :lista-data="listDataFakeQntAcompanhamentos"
          :limite="10"
          :title-style="{fontSize: '1rem'}"
        />
      </div>
      <div class="col-12 col-md-6 col-xl-3 mt-2">
        <BoxList
          :title="'Intervalo médio entre visitas de acompanhamento'"
          :lista-data="listaDataFakeIntervaloMedio"
          :limite="10"
          :title-style="{fontSize: '1rem'}"
        />
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
import Grafico from '../graficos/Grafico.vue'
import BoxList from './BoxList.vue'
import SimpleDisplay from './SimpleDisplay.vue'
export default {
  name: 'PainelGerente',
  components: { Grafico, SimpleDisplay, BoxList },
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
      filtersLabels: ['Etapa', 'Data', 'Região', 'Divisão', 'Grupo', 'Porte', 'Dimensão PTI'],
      resultadoEmpresaSimples: [
        {
          data: 25,
          description: 'Quantidade de Empresas',
          formatter: {
            hasFormatter: false,
            data: 25
          }
        },
        {
          data: 4000,
          description: 'Somatório de funcionários das empresas atendidas',
          formatter: {
            hasFormatter: false,
            data: 4000
          }
        },
        {
          data: 900,
          description: 'Média global de produtividade',
          formatter: {
            hasFormatter: false,
            data: 900
          }
        },
        {
          data: 350,
          description: 'Média de funcionários por empresa',
          formatter: {
            hasFormatter: false,
            data: 350
          }
        },
        {
          data: 220,
          description: 'Média global de absenteísmo',
          formatter: {
            hasFormatter: false,
            data: 220
          }
        }
      ],
      resultadoAcoesSimples: [
        {
          data: 75,
          description: 'Quantidade de Ações executadas',
          formatter: {
            hasFormatter: false,
            data: 75
          }
        },
        {
          data: 70,
          description: 'Quantidade de ações executadas dentro do prazo',
          formatter: {
            hasFormatter: false,
            data: 70
          }
        },
        {
          data: 5,
          description: 'Quantidade de ações executadas fora do prazo',
          formatter: {
            hasFormatter: false,
            data: 5
          }
        }
      ],
      composedRectangle: {
        hasFormatter: true,
        data: [
          {
            nome: 'SLA Atendimento',
            valor: 20,
            type: 'DIAS',
            position: 'end'
          },
          {
            nome: 'Valor total das ações propostas',
            valor: 10000000,
            type: 'R$',
            position: 'start'
          },
          {
            nome: 'Valor das ações executadas',
            valor: 95000,
            type: 'R$',
            position: 'start'
          },
          {
            nome: 'Valor das ações propostas sem execução',
            valor: 50000,
            type: 'R$',
            position: 'start'
          }
        ]
      },
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
      },
      datasetAbsenteismo: [
        {
          name: 'Absenteísmo',
          data: [70, 65, 80, 90, 100]
        }
      ],
      datasetProdutividade: [
        {
          name: 'Produtividade',
          data: [60, 70, 80, 90, 100]
        }
      ],
      chartOptionsBar: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['Empresa A', 'Empresa B', 'Empresa C', 'Empresa D', 'Empresa E']
        }
      },
      listDataFake: [
        {
          id: 0,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 1,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 2,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 3,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 4,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 5,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 6,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 7,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 8,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 9,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 10,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 11,
          nome: 'Nome da ação',
          valor: '25.475'
        }
      ],
      listDataFakeFaturamentoPTI: [
        {
          id: 0,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 1,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 2,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 3,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 4,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 5,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 6,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 7,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 8,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 9,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 10,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 11,
          nome: 'Nome da ação',
          valor: '25.475'
        }
      ],
      listDataFakeQntAcompanhamentos: [
        {
          id: 0,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 1,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 2,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 3,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 4,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 5,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 6,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 7,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 8,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 9,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 10,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 11,
          nome: 'Nome da ação',
          valor: '25.475'
        }
      ],
      listaDataFakeIntervaloMedio: [
        {
          id: 0,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 1,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 2,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 3,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 4,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 5,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 6,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 7,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 8,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 9,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 10,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 11,
          nome: 'Nome da ação',
          valor: '25.475'
        }
      ],
      listaDataFakeAtraso: [
        {
          id: 0,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 1,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 2,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 3,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 4,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 5,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 6,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 7,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 8,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 9,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 10,
          nome: 'Nome da ação',
          valor: '25.475'
        },
        {
          id: 11,
          nome: 'Nome da ação',
          valor: '25.475'
        }
      ],
      rankingAcoesMaisIndicadas: [
        {
          nome: 'Qualificação profissional Controlador e Programador de Produção',
          valor: 25475
        },
        {
          nome: 'Qualificação profissional Controlador e Programador de Produção',
          valor: 25475
        },
        {
          nome: 'Qualificação profissional Controlador e Programador de Produção',
          valor: 25475
        },
        {
          nome: 'Qualificação profissional Controlador e Programador de Produção',
          valor: 25475
        },
        {
          nome: 'Qualificação profissional Controlador e Programador de Produção',
          valor: 25475
        },
        {
          nome: 'Qualificação profissional Controlador e Programador de Produção',
          valor: 25475
        },
        {
          nome: 'Qualificação profissional Controlador e Programador de Produção',
          valor: 25475
        },
        {
          nome: 'Qualificação profissional Controlador e Programador de Produção',
          valor: 25475
        },
        {
          nome: 'Qualificação profissional Controlador e Programador de Produção',
          valor: 25475
        },
        {
          nome: 'Qualificação profissional Controlador e Programador de Produção',
          valor: 25475
        },
        {
          nome: 'Qualificação profissional Controlador e Programador de Produção',
          valor: 25475
        },
        {
          nome: 'Qualificação profissional Controlador e Programador de Produção',
          valor: 25475
        },
        {
          nome: 'Qualificação profissional Controlador e Programador de Produção',
          valor: 25475
        },
        {
          nome: 'Qualificação profissional Controlador e Programador de Produção',
          valor: 25475
        }
      ]
    }
  },
  created() {
    this.permissionId === 72 ? this.userAllowed = true : this.userAllowed = false
  }
}
</script>

<style scoped>
  .simple-display-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0;
  }
  .simple-display-container-acoes {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0;
  }
  .w-80 {
    width: 65%
  }
  .row {
    margin-top: 50px;
  }
  .d-flex {
    align-items: center;
    justify-content: space-between;
  }
  @media (max-width: 991px) {
    section[class='box-branco'] {
      margin-bottom: 10px;
    }
    .d-flex {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  @media (max-width: 767px) {
    .simple-display-container-acoes {
      flex-wrap: wrap;
    }
  }
</style>
