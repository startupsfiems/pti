<template>
  <div v-if="userAllowed" class="painel-container">
    <PainelFiltros
      v-if="!loadingFilters"
      :filters-amount="7"
      :filters-labels="filtersLabels"
      :filters-options="filtersOptions"
    />
    <b-spinner v-else variant="primary" label="Text Centered" />
    <section>
      <div class="box-data-section">
        <BoxList
          :title="'Ranking das Ações mais indicadas'"
          :lista-data="listDataFake"
          :limite="10"
        />
      </div>

      <div class="simples-displays-section">
        <SimpleDisplay
          v-for="(data, index) in simpleData"
          :key="index"
          :data-to-display="data.data"
          :description="data.description"
        />
      </div>
    </section>
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
import BoxList from './BoxList.vue'
import SimpleDisplay from './SimpleDisplay.vue'

export default {
  name: 'PainelGestor',

  components: { BoxList, SimpleDisplay },
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
      filtersLabels: ['Etapa', 'Data', 'Região', 'Região', 'Grupo', 'Porte', 'Dimensão PTI'],
      // Por enquanto, as opções são populadas manualmente para exemplificar o uso e enquanto aguardamos os métodos para popular

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
        },
        {
          data: 220,
          description: 'Média global de absenteísmo'
        }
      ]
    }
  },
  created() {
    this.permissionId === 73 ? this.userAllowed = true : this.userAllowed = false
  }
}
</script>

<style scoped>
.painel-container {
  width: 100%;
  max-width: 68rem;
  padding: 1.25rem;
  margin: 0 auto;
}

.painel-container section {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  padding-bottom: 1.4rem;
}

.simples-displays-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

</style>
