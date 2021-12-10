<template>
  <div class="visualizar-acompanhamentos text-center">
    <Header :is-home="false" :title="`ACOMPANHAMENTOS`" />
    <div class="mt-5" />
    <NuxtLink to="" class="voltar" @click.prevent.native="$router.back()">
      <img src="~/static/assets/arrow-left.svg" alt="back" /> voltar
    </NuxtLink>
    <b-form-select v-model="selected" :options="options" @change="getAcompanhamento($route.params.empresa, selected)" />
    <h1 class="gbl titulo mb-5 mt-5">
      Relatórios de Atendimento
    </h1>
    <main v-if="acompanhamentoVisualizado !== null && acompanhamentoVisualizado != 'Erro'">
      <div class="container-fluid">
        <div class="row mb-5">
          <div class="col-md-4 col-10 offset-md-0 offset-1 bottom-border">
            <section class="card-container">
              <CardAcompanhamento
                :data-e-canal-de-atendimento="{data: new Date(acompanhamentoVisualizado.dataCadastro).toLocaleDateString('pt-br'), canalDeAtendimento: acompanhamentoVisualizado.canalDeAtendimento}"
                :counter="1"
                :acao="acompanhamentoVisualizado.acoesInfo[0]"
              />
              <div class="flexible-margin" />
              <h1 class="m-gbl">
                Checklist de atividades
              </h1>
              <ChecklistOnlyView
                :tarefas="acompanhamentoVisualizado.acoesInfo[0].tarefasInfo"
              />
            </section>
          </div>
          <div class="col-md-4 col-10 offset-md-0 offset-1 bottom-border side-borders">
            <section class="card-container">
              <CardAcompanhamento
                :data-e-canal-de-atendimento="{data: new Date(acompanhamentoVisualizado.dataCadastro).toLocaleDateString('pt-br'), canalDeAtendimento: acompanhamentoVisualizado.canalDeAtendimento}"
                :counter="2"
                :acao="acompanhamentoVisualizado.acoesInfo[1]"
              />
              <div>
                <div class="flexible-margin" />
                <h1 class="m-gbl in-768">
                  Checklist de atividades
                </h1>
                <ChecklistOnlyView
                  :tarefas="acompanhamentoVisualizado.acoesInfo[1].tarefasInfo"
                />
              </div>
            </section>
          </div>
          <div class="col-md-4 col-10 offset-md-0 offset-1 bottom-border">
            <section class="card-container">
              <CardAcompanhamento
                :data-e-canal-de-atendimento="{data: new Date(acompanhamentoVisualizado.dataCadastro).toLocaleDateString('pt-br'), canalDeAtendimento: acompanhamentoVisualizado.canalDeAtendimento}"
                :counter="3"
                :acao="acompanhamentoVisualizado.acoesInfo[2]"
              />
              <div class="flexible-margin" />
              <h1 class="m-gbl in-768">
                Checklist de atividades
              </h1>
              <ChecklistOnlyView
                :tarefas="acompanhamentoVisualizado.acoesInfo[2].tarefasInfo"
              />
            </section>
          </div>
        </div>
      </div>
    </main>
    <b-spinner v-else variant="primary" label="Text Centered" />
    <div v-if="acompanhamentoVisualizado === 'Erro'">
      <h3>{{ uiEmpresa.error }}</h3>
    </div>
    <div v-else-if="acompanhamentoVisualizado === 'PromiseNotFullfiled'">
      <h3>Desculpe, ocorreu um erro desconhecido.</h3>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ChecklistOnlyView from '~/components/acompanhamento/ChecklistOnlyView.vue'
import CardAcompanhamento from '~/components/acompanhamento/CardAcompanhamento.vue'
import Header from '~/components/Header.vue'

export default {
  name: 'VisualizarAcompanhamentos',
  components: { CardAcompanhamento, ChecklistOnlyView, Header },

  data() {
    return {
      selected: null,
      options: [
        // { value: null, text: 'Please select an option' },
        // { value: 'a', text: '00/00/0000 | Telefone' },
        // { value: 'b', text: 'Selected Option' },
        // { value: { C: '3PO' }, text: 'This is an option with object value' },
        // { value: 'd', text: 'This one is disabled', disabled: true }
      ],
      gettandoAcompanhamento: false
    }
  },
  computed: {
    ...mapState({
      uiEmpresa: state => state.empresa.ui,
      acompanhamentosToSelect: state => state.empresa.acompanhamentosToSelect,
      acompanhamentoVisualizado: state => state.empresa.acompanhamentoVisualizado
    })
  },
  mounted() {
    this.getAcompanhamento(this.$route.params.empresa, this.$route.params.acompanhamentoId)
    this.injetarSelectAcompanhamentos()
  },
  methods: {
    async getAcompanhamento(empresa, acompanhamento) {
      this.gettandoAcompanhamento = true
      const params = {
        empresaId: empresa,
        acompanhamentoId: acompanhamento
      }
      await this.$store.dispatch({
        type: 'empresa/getAcompanhamentoVisualizado',
        params
      })
      if (this.uiEmpresa.codigo !== 200) {
        console.error(this.uiEmpresa.error)
      } else {
        // TODO mudar params da query quando buscar acompanhamento pelo select
      }
      this.gettandoAcompanhamento = false
    },
    injetarSelectAcompanhamentos() {
      this.selected = this.$route.params.acompanhamentoId
      this.acompanhamentosToSelect.forEach((acompanhamento) => {
        this.options.push({
          value: acompanhamento.acompanhamentoId,
          text: new Date(acompanhamento.data).toLocaleDateString('pt-br') +
          ' | ' +
          acompanhamento.canalDeAtendimento
        })
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
    }
    .titulo {
        font-size: 22px;
        text-align: center;
    }
    .card-container {
        position: relative;
        text-align: center;
    }
    .side-borders {
        border-right: 1px solid #497AAA;
        border-left: 1px solid #497AAA;
    }
    .bottom-border {
        border-bottom: 1px solid #497AAA;
    }
    .aditional-border {
        margin-top: 17.78px;
    }
    .card-container h1 {
        margin: 0;
        position: absolute;
        width: 100%;
        font-size: 20px;
    }
    .line {
        height: 1px;
        width: 100%;
        background-color: #497AAA;
    }
    .left-line {
        position: absolute;
        right: -50px;
    }
    .right-line {
        position: absolute;
        left: -50px;
    }
    .btn-light-blue {
        width: 170px;
        margin-top: 3rem;
    }
    .flexible-margin {
      margin-top: 3rem;
    }
    .in-768 {
      display: none;
    }
    @media (max-width: 918px) {
        .card-container h1 {
            font-size: 18px;
        }
        .voltar {
            left: 40px;
        }
    }
    @media (max-width: 768px) {
        .line {
            display: none;
        }
        .side-borders, .bottom-border {
            border: 0;
        }
        .flexible-margin, .btn-light-blue {
          margin-top: 1rem;
        }
        .card-container h1 {
          text-align: left;
        }
        .in-768 {
          display: block;
        }
    }
    @media (max-width: 400px) {
      .card-container h1 {
        font-size: 14px;
      }
      .titulo {
        font-size: 16px;
      }
    }
</style>
