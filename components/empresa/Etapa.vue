<template>
  <div class="etapa mt-3">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-10 offset-xl-1 col-12">
          <div class="box-branco">
            <div v-if="etapa !== null" class="row">
              <div class="col-xl-8 col-12">
                <div class="row">
                  <div class="col-11 offset-1">
                    <div class="titulo-azul-boxes">
                      {{ etapa.etapa.toUpperCase() }}
                    </div>
                    <h5 class="mt-5 titulo-azul-boxes">
                      Diagnóstico
                    </h5>
                  </div>
                  <div class="col-11 offset-1">
                    <div class="row legendas gbl">
                      <div class="col-2">
                        Questionário
                      </div>
                      <div class="col-3">
                        Respondente
                      </div>
                      <div class="col-3">
                        Data
                      </div>
                      <div class="col-2">
                        Score do PTI
                      </div>
                      <div class="col-2">
                        Resultados
                      </div>
                    </div>
                  </div>
                  <div class="col-11 offset-1">
                    <!-- TODO problema tá no prop :plano-de-acao -->
                    <DiagnosticoDaEtapa
                      :diagnostico="etapa.diagnostico"
                      :etapa-diagnostico-id="etapa.diagnostico.etapaDiagnosticoId"
                      :plano-de-acao="etapa.planosDeAcao[etapa.planosDeAcao.length - 1]"
                    />
                  </div>
                  <div class="col-11 offset-1 position-relative mt-5">
                    <h5 class="titulo-azul-boxes">
                      Plano de ação
                    </h5>
                    <button class="btn-light-blue" @click="criarNovoPlanoDeAcao()">
                      Novo Plano de Ação
                    </button>
                    <div class="col-12">
                      <div
                        v-for="(planoAcao, index) in etapa.planosDeAcao"
                        :key="planoAcao.planoDeAcaoId"
                        class="row text-center mt-3"
                      >
                        <div class="col-3 gbl">
                          Data criação
                        </div>
                        <div class="col-3 gbl">
                          % de conclusão
                        </div>
                        <div class="col-3 gbl">
                          Download proposta
                        </div>
                        <div class="col-3 gbl">
                          Status
                        </div>
                        <div class="col-12">
                          <PlanoDeAcao
                            :plano-de-acao="planoAcao"
                            :index-plano-de-acao="index"
                            :etapa-diagnostico-id="etapa.diagnostico.etapaDiagnosticoId"
                            @fully-loaded="removeUltimaLinha()"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="
                  col-12 col-xl-4 col-md-6
                  offset-md-3 offset-xl-0
                  titulo-azul-boxes
                  position-relative
                "
              >
                <ListaAcompanhamentos
                  :planos-de-acao="etapa.planosDeAcao"
                  :etapa-id="etapa.etapaId"
                />
              </div>
            </div>
            <div v-else class="row">
              <div class="col-10 mt-3">
                Sem dados cadastrados, inicie uma nova Etapa
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
import ListaAcompanhamentos from '../acompanhamento/ListaAcompanhamentos.vue'
import DiagnosticoDaEtapa from './DiagnosticoDaEtapa.vue'
import PlanoDeAcao from './PlanoDeAcao.vue'
// import Acao from './Acao.vue'

export default {
  name: 'EtapaEmpresa',
  components: { DiagnosticoDaEtapa, PlanoDeAcao, ListaAcompanhamentos },
  props: {
    etapa: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      criandoPlanoDeAcao: false
    }
  },
  computed: {
    ...mapState({
      planosDeAcao: state => state.empresa.dados.planosDeAcao,
      planoDeAcaoId: state => state.acao.planoDeAcaoId,
      ui: state => state.acao.ui
    })
  },
  methods: {
    async criarNovoPlanoDeAcao() {
      this.criandoPlanoDeAcao = true
      const params = {
        etapaDiagnosticoId: this.etapa.diagnostico.etapaDiagnosticoId
      }
      await this.$store.dispatch({
        type: 'empresa/setInfos',
        params
      })

      await this.$store.dispatch({
        type: 'acao/adicionarPlanoDeAcao',
        params
      }).then(() => {
        this.criandoPlanoDeAcao = false
        if (this.ui.codigo === 200) {
          this.showToast(
            'Sucesso',
            'success',
            'Diagnóstico preenchido com sucesso!',
            'b-toaster-top-left',
            3000
          )
          const params = {
            planoDeAcaoId: this.planoDeAcaoId
          }

          this.$store.dispatch({
            type: 'empresa/setInfos',
            params
          }).then(() => {
            this.$router.push({
              path: '/planoDeAcao'
            })
          })
        } else {
          this.showToast(
            'Erro ao salvar respostas',
            'danger',
            this.ui.error,
            'b-toaster-top-left',
            3000
          )
        }
      })
    },
    removeUltimaLinha() {
      // const lastPA = this.etapa.planosDeAcao.length - 1
      // const etapaDiagnosticoId = this.etapa.diagnostico.etapaDiagnosticoId
      // console.log('plano-acao-' + lastPA + etapaDiagnosticoId)
      // const ultimoPlanoDeAcao = document.querySelector('#plano-acao-' + lastPA + etapaDiagnosticoId)
      // console.log(ultimoPlanoDeAcao)
      // ultimoPlanoDeAcao.classList.remove('plano-de-acao')
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
    }
  }
}
</script>

<style scoped>
.plano-de-acoes-container {
  height: 270px;
  white-space: nowrap;
  overflow: auto;
  overflow-x: hidden;
  padding-right: 20px;
}
.btn-light-blue {
  width: 250px;
  position: absolute;
  top: -10px;
  right: 0;
}
.centro-legenda .gbl {
  text-align: center;
}
.legendas {
  text-align: center;
}
/* .acompanhamentos {
  border-left: 1px solid #33434c;
  margin-left: 10px;
  padding-left: 30px;
}
.sticky-acompanhamento {
  position: sticky;
  top: 5px;
}
.acompanhamentos-box {
  position: relative;
  border: 1px solid #33434c;
  border-radius: 10px;
  height: 468px;
} */
.acao-do-plano {
  font-size: 12px;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
/* .acompanhamentos-box .btn-light-blue {
  width: 250px;
  height: 41px;
  position: absolute;
  bottom: -18px;
  top: unset;
  right: 0px;
} */
@media (max-width: 1199px) {
  .acompanhamentos {
    border: 0;
  }
}
@media (max-width: 1572px) {
  .acao-do-plano h5 {
    font-size: 1rem;
  }
}
</style>
