<template>
  <div>
    <div v-if="carregandoDados">
      <div />
    </div>

    <div
      v-else
      :id="'plano-acao-' + indexPlanoDeAcao + etapaDiagnosticoId"
      class="plano-de-acao mb-4"
    >
      <div class="row row-amarelo-claro m-gbl">
        <div class="col-3">
          {{ new Date(planoDeAcao.dataCriacao).toLocaleDateString('pt-br') }}
        </div>
        <div class="col-3">
          {{ conclusaoPA }}
        </div>
        <div class="col-3 centraliza-icon-row">
          <button
            class="enviar-proposta"
            @click.prevent="$router.push(
              {
                path: '../../diagnostico/resultados',
                query: {
                  empresaId: $route.params.empresa,
                  etapaDiagnosticoId: etapaDiagnosticoId,
                  planoDeAcaoId: planoDeAcaoId(),
                  gerarPDF: true
                }
              }
            )"
          />
        </div>
        <div class="col-3">
          <div v-if="!alterandoStatus" class="select-wrapper">
            <div
              class="status-icon"
              :style="{ backgroundColor: statusSelecionadoColor }"
            />
            <select
              :id="planoDeAcao.planoDeAcaoId"
              v-model="statusSelecionado"
              class="select-status"
              name="status"
              :disabled="statusSelecionado === 5 || statusSelecionado === 6"
              @change="changeStatus(statusSelecionado)"
            >
              <option
                v-for="(status, index) in statusPlanoDeAcao"
                :key="index"
                :value="status.id"
                :selected="status.id === planoDeAcao.idStatus"
                :disabled="statusSelecionado === 4 && (status.id === 5 || status.id === 3 || status.id === 2 || status.id === 1)"
              >
                {{ status.nome }}
              </option>
            </select>
          </div>
          <div v-else class="select-wrapper">
            <b-spinner variant="primary" label="Text Centered" />
          </div>
        </div>
      </div>
      <!-- <div class="row gbl text-center mt-3">
        <div class="col-2">
          Data efetiva de início
        </div>
        <div class="col-2">
          Valor negociado
        </div>
        <div class="col-2">
          Início
        </div>
        <div class="col-2">
          Conclusão
        </div>
        <div class="col-2">
          % de conclusão
        </div>
        <div class="col-2">
          Histórico
        </div>
      </div> -->

      <div v-if="planoDeAcao.acoes.length === 0">
        <NuxtLink :to="'/criarAcoesNoPlano?planoDeAcao=' + planoDeAcao.planoDeAcaoId">
          <button class="criar-acoes-botao">
            Criar ações
          </button>
        </NuxtLink>
      </div>

      <div
        v-for="(acao, index) in planoDeAcao.acoes"
        :key="acao.acaoId"
        class="position-relative"
      >
        <!-- <div class="acao-id s-gbl">
          Ação {{ index + 1 }}
        </div> -->
        <Acao
          :acao="acao"
          :acao-index="index + 1"
          :etapa-id="etapaDiagnosticoId"
          :plano-de-acao-id="planoDeAcao.planoDeAcaoId"
        />
      </div>
    </div>
    <ModalAlteraStatusPA
      :plano-de-acao="planoDeAcao"
      :new-status-id="statusSelecionado"
      :approved="approved"
      @mudanca-confirmada="approved = true"
      @modal-fechou="mudarParaStatusAnterior(approved)"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import header from '../../utils/headers'
import { Constantes } from '../../utils/constantes'
import ModalAlteraStatusPA from './ModalAlteraStatusPA.vue'

import Acao from './Acao.vue'

export default {
  name: 'PlanoDeAcao',
  components: { Acao, ModalAlteraStatusPA },
  props: {
    indexPlanoDeAcao: {
      type: Number,
      default: 0
    },
    planoDeAcao: {
      type: Object,
      default() {
        return {}
      }
    },
    etapaDiagnosticoId: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      alterandoStatus: false,
      statusSelecionado: -1,
      statusSelecionadoColor: 'gray',
      carregandoDados: true,
      statusAntigo: -1,
      // usado para quando o usuario não confirmar a atualização
      approved: false
    }
  },

  computed: {
    ...mapState({
      statusPlanoDeAcao: state => state.acao.statusPlanoDeAcao,
      ui: state => state.acao.ui
    }),
    conclusaoPA() {
      let percentual = 0
      this.planoDeAcao.acoes.forEach((acao) => {
        percentual += acao.percentualAtingido
      })
      percentual = percentual / 3
      return percentual.toFixed() + '%'
    }
  },

  watch: {
    approved() {
      if (this.approved) {
        this.atualizarStatusAPI(this.statusSelecionado, true)
      }
    }
  },

  mounted() {
    this.load()
  },

  methods: {
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
    },
    planoDeAcaoId() {
      let retorno
      if (this.planoDeAcao === null) {
        retorno = null
      } else {
        retorno = this.planoDeAcao.planoDeAcaoId
      }
      return retorno
    },
    atualizarStatusAPI(newValue, modalOpen) {
      this.alterandoStatus = true
      axios.patch(
        Constantes.URL_API_INTEGRADORA +
        'pti/PlanoDeAcao/alterarStatusPlano?planoDeAcaoId=' + this.planoDeAcao.planoDeAcaoId +
        '&status=' + newValue,
        {},
        { headers: header.headers() }
      ).then((response) => {
        if (response.data.codigo === 200) {
          const payload = {
            etapaDiagnosticoId: this.etapaDiagnosticoId,
            paIndex: this.indexPlanoDeAcao,
            idStatus: newValue
          }
          this.$store.dispatch({
            type: 'empresa/patchStatusPA',
            payload
          })
          this.showToast(
            'Sucesso',
            'success',
            'Status atualizado com sucesso',
            'b-toaster-top-left',
            3000
          )
          this.convertStatusId()
          this.statusAntigo = this.statusSelecionado
        } else {
          this.showToast(
            'Erro',
            'danger',
            'Falha na atualização',
            'b-toaster-top-left',
            3000
          )
        }
      })
      if (modalOpen) {
        this.$bvModal.hide('modal-confirmacao-alterar-status' + this.planoDeAcao.planoDeAcaoId)
      }
      this.alterandoStatus = false
    },
    mudarParaStatusAnterior() {
      if (!this.approved) {
        this.statusSelecionado = this.statusAntigo
        this.changeStatusColor()
      } else if (this.statusSelecionado === 4) {
        this.approved = false
      }
    },
    async load() {
      await this.getStatusPlanoDeAcao().then(() => {
        this.convertStatusId()
        this.statusAntigo = this.statusSelecionado
        this.$emit('fully-loaded')
        this.carregandoDados = false
      })
    },
    changeStatusColor() {
      switch (this.statusSelecionado) {
        case 5: // Reprovado
          this.statusSelecionadoColor = '#D47474'
          break

        case 4: // Aprovado
          this.statusSelecionadoColor = 'lightgreen'
          break

        case 3: // Aguardando Análise
          this.statusSelecionadoColor = 'yellow'
          break

        case 2: // Aguardando envio
          this.statusSelecionadoColor = 'pink'
          break

        default: // Pendente
          this.statusSelecionadoColor = 'gray'
          break
      }
    },
    changeStatus(newStatus) {
      this.changeStatusColor()
      if (newStatus < 4) {
        this.atualizarStatusAPI(newStatus, false)
      } else {
        this.$bvModal.show('modal-confirmacao-alterar-status' + this.planoDeAcao.planoDeAcaoId)
      }
    },
    // esta função busca uma ARRAY de status que um plano de ação PODE TER. Ela NÃO busca o status atual do plano de ação
    async getStatusPlanoDeAcao() {
      await this.$store.dispatch('acao/getStatusPlanoDeAcao')
    },
    convertStatusId() {
      for (let i = 0; i < this.statusPlanoDeAcao.length; i++) {
        if (this.planoDeAcao.idStatus === this.statusPlanoDeAcao[i].id) {
          this.statusSelecionado = this.statusPlanoDeAcao[i].id
          this.changeStatusColor()
        }
      }
    }
  }
}
</script>

<style scoped>
.criar-acoes-botao {
  padding: 6px 30px;
  background-color: var(--tertiary);
  border: 0;
  border-radius: 17px;
  font-size: 16px;
  color: var(--shape);
  margin-top: 20px;
}

.select-wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
  position: relative;
  justify-content: center;
  width: fit-content;
  margin: auto;
}
.status-icon {
  height: 12px;
  width: 12px;
  position: absolute;
  border-radius: 20px;
  left: 5px;
}
.plano-de-acao {
  border-bottom: 1px solid black;
  padding-bottom: 3rem;
}
.acao-id {
  position: absolute;
  left: -90px;
  top: 7px;
  font-size: 16px;
}
.row-amarelo-claro {
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.select-status {
  background: unset;
  height: 22px;
  border-radius: 25px;
  text-align: center;
  padding: 0 5px 0 15px;
  line-height: 22px;
  border: 1px solid black;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.enviar-proposta {
  background: url('~/static/assets/enviar-proposta.svg') no-repeat;
  border: 0;
  height: 20px;
  width: 17px;
}
/* select#status-empresa option[value="reprovado"] {background-image: url('~/static/assets/status_reprovado.svg');} */
</style>
