<template>
  <div class="root-div">
    <div v-if="isShowModal" class="modal-container">
      <ModalConfirmacao
        :title="'Atenção!'"
        :description="'O valor negociado foi de '"
        :valor="valoresNegocioados[indexAcaoAtual]"
        @confirmar="confirmarValorNegociado"
        @cancelar="cancelarValorNegociado"
      />
    </div>

    <Header :title="`NOVO ACOMPANHAMENTO`" />

    <div v-if="carregando" class="loading-container">
      <b-spinner variant="primary" label="Text Centered" />
    </div>

    <div v-else class="acompanhamento-content">
      <BreadAcompanhamento :index-etapa-atual="indexAcaoAtual" />

      <div class="acompanhamento-form">
        <div v-if="indexAcaoAtual === 0">
          <div class="section-etapa">
            <p>Etapa 1 - </p>
            <div class="input-date-content">
              <label for="input-date">Data</label>
              <b-form-datepicker
                id="input-date"
                v-model="formulario.dataAcompanhamento"
                class="input-date"
                placeholder="01/01/2021"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                :max="new Date()"
                required
              />
            </div>

            <div>
              <label for="input-canal">Canal de Atendimento</label>
              <div class="select-box">
                <select v-model="formulario.canalDeAtendimentoId" name="select">
                  <option
                    v-for="canal in canaisDeAtendimento"
                    :key="canal.id"
                    :value="canal.id"
                    :selected="canal.id === formulario.canalDeAtendimentoId"
                  >
                    {{ canal.nome }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="section-acao">
            <p class="acao-titulo">
              Ação 1
            </p>

            <p class="acao-relatorio">
              Relatório
            </p>

            <div class="text-area-content">
              <textarea v-model="formulario.acompanhamentoAcoes[0].observacao" />

              <div>
                <p>Valor negociado</p>
                <TheMask
                  v-model="valoresNegocioados[0]"
                  class="money-input"
                  type="text"
                  placeholder="R$ 0,00"
                  mask="R$ ############"
                />
              </div>
            </div>
          </div>

          <div class="section-checklist">
            <p>Checklist de atividades</p>

            <div class="checklist-content">
              <b-form-group>
                <b-form-checkbox-group
                  v-model="checklistForm[0]"
                  class="content-questions"
                  :style="{ postion: 'relative' }"
                >
                  <b-form-checkbox
                    class="radio-item checkbox-date"
                    :value="true"
                  >
                    <div>
                      Data de inicio Efetivo
                      <TheMask
                        v-model="datasDeInicio[0]"
                        type="text"
                        placeholder="01/01/2022"
                        mask="##/##/####"
                      />
                    </div>
                  </b-form-checkbox>

                  <b-form-checkbox
                    v-for="(alternativa) in alternativasCheckbox[0].listaTarefas"
                    :id="String(alternativa.tipoTarefaId)"
                    :key="alternativa.tipoTarefaId"
                    class="radio-item"
                    :value="alternativa.tipoTarefaId"
                  >
                    {{ alternativa.nomeTarefa }}
                  </b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </div>
          </div>
        </div>

        <div v-if="indexAcaoAtual === 1">
          <div class="section-etapa">
            <p>Etapa 1 - </p>
            <div class="input-date-content">
              <label for="input-date">Data</label>
              <b-form-datepicker
                id="input-date"
                v-model="formulario.dataAcompanhamento"
                class="input-date"
                placeholder="01/01/2021"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                required
              />
            </div>

            <div>
              <label for="input-canal">Canal de Atendimento</label>
              <div class="select-box">
                <select name="select">
                  <option>
                    Telefone
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="section-acao">
            <p class="acao-titulo">
              Ação 2
            </p>

            <p class="acao-relatorio">
              Relatório
            </p>

            <div class="text-area-content">
              <textarea v-model="formulario.acompanhamentoAcoes[1].observacao" />

              <div>
                <p>Valor negociado</p>
                <TheMask
                  v-model="valoresNegocioados[1]"
                  class="money-input"
                  type="text"
                  placeholder="R$ 0,00"
                  mask="R$ ############"
                />
              </div>
            </div>
          </div>

          <div class="section-checklist">
            <p>Checklist de atividades</p>

            <div class="checklist-content">
              <b-form-group>
                <b-form-checkbox-group
                  v-model="checklistForm[1]"
                  class="content-questions"
                  :style="{ postion: 'relative' }"
                >
                  <b-form-checkbox
                    class="radio-item checkbox-date"
                    :value="true"
                  >
                    <div>
                      Data de inicio Efetivo
                      <TheMask
                        v-model="datasDeInicio[1]"
                        type="text"
                        placeholder="01/01/2022"
                        mask="##/##/####"
                        required
                      />
                    </div>
                  </b-form-checkbox>

                  <b-form-checkbox
                    v-for="(alternativa) in alternativasCheckbox[1].listaTarefas"
                    :id="String(alternativa.tipoTarefaId)"
                    :key="alternativa.tipoTarefaId"
                    class="radio-item"
                    :value="alternativa.tipoTarefaId"
                  >
                    {{ alternativa.nomeTarefa }}
                  </b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </div>
          </div>
        </div>

        <div v-if="indexAcaoAtual === 2">
          <div class="section-etapa">
            <p>Etapa 1 - </p>
            <div class="input-date-content">
              <label for="input-date">Data</label>
              <b-form-datepicker
                id="input-date"
                v-model="formulario.dataAcompanhamento"
                class="input-date"
                placeholder="01/01/2021"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                required
              />
            </div>

            <div>
              <label for="input-canal">Canal de Atendimento</label>
              <div class="select-box">
                <select name="select">
                  <option>
                    Telefone
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="section-acao">
            <p class="acao-titulo">
              Ação 3
            </p>

            <p class="acao-relatorio">
              Relatório
            </p>

            <div class="text-area-content">
              <textarea v-model="formulario.acompanhamentoAcoes[2].observacao" />

              <div>
                <p>Valor negociado</p>
                <TheMask
                  v-model="valoresNegocioados[2]"
                  class="money-input"
                  type="text"
                  placeholder="R$ 0,00"
                  mask="R$ ############"
                />
              </div>
            </div>
          </div>

          <div class="section-checklist">
            <p>Checklist de atividades</p>

            <div class="checklist-content">
              <b-form-group>
                <b-form-checkbox-group
                  v-model="checklistForm[2]"
                  class="content-questions"
                  :style="{ postion: 'relative' }"
                >
                  <b-form-checkbox
                    class="radio-item checkbox-date"
                    :value="true"
                  >
                    <div>
                      Data de inicio Efetivo
                      <TheMask
                        v-model="datasDeInicio[2]"
                        type="text"
                        placeholder="01/01/2022"
                        mask="##/##/####"
                        required
                      />
                    </div>
                  </b-form-checkbox>

                  <b-form-checkbox
                    v-for="(alternativa) in alternativasCheckbox[2].listaTarefas"
                    :id="String(alternativa.tipoTarefaId)"
                    :key="alternativa.tipoTarefaId"

                    class="radio-item"
                    :value="alternativa.tipoTarefaId"
                  >
                    {{ alternativa.nomeTarefa }}
                  </b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </div>
          </div>
        </div>

        <div v-if="!cadastrandoAcompanhamento" class="button-container">
          <button v-if="indexAcaoAtual === 0" @click="cancelarAcompanhamento">
            Cancelar
          </button>

          <button v-if="indexAcaoAtual > 0" @click="acaoAnterior">
            Anterior
          </button>

          <button
            v-if="indexAcaoAtual === 0 || indexAcaoAtual < 2"
            @click="proximaAcao"
          >
            Próximo
          </button>

          <button v-if="indexAcaoAtual === 2" @click="finalizarAcompanhamento">
            Finalizar
          </button>
        </div>

        <div v-else class="button-container">
          <b-spinner variant="primary" label="Text Centered" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import axios from 'axios'
import { TheMask } from 'vue-the-mask'

import header from '../../../../utils/headers'
import { Constantes } from '../../../../utils/constantes'
// import CurrencyInput from '~/components/CurrencyInput'
import ModalConfirmacao from '~/components/acompanhamento/ModalConfirmacao'

import Header from '~/components/Header'
import BreadAcompanhamento from '~/components/acompanhamento/BreadAcompanhamento'

export default Vue.extend({
  components: { Header, BreadAcompanhamento, TheMask, ModalConfirmacao },

  data() {
    return {
      acompanhamentos: [],
      gettandoAcompanhamento: true,
      carregando: true,
      isShowModal: false,
      arrayAcoes: [],
      indexAcaoAtual: 0,
      planoDeAcaoId: null,
      canaisDeAtendimento: [],
      alternativasCheckbox: [],

      // valores negocioados
      valoresNegocioados: [null, null, null],

      // datasDeInicio
      datasDeInicio: [null, null, null],

      // checklist
      checklistForm: [
        [],
        [],
        []
      ],

      // form
      formulario: {
        dataAcompanhamento: '',
        canalDeAtendimentoId: 1,
        planoDeAcaoId: null,
        acompanhamentoAcoes: [
          {
            valorNegociado: 0,
            dataInicioEfetivo: null,
            observacao: '',
            percentualAtingido: 0,
            acaoId: null,
            acompanhamentoTarefas: []
          },
          {
            valorNegocioado: 0,
            dataInicioEfetivo: null,
            observacao: '',
            percentualAtingido: 0,
            acaoId: null,
            acompanhamentoTarefas: []
          },
          {
            valorNegocioado: 0,
            dataInicioEfetivo: null,
            observacao: '',
            percentualAtingido: 0,
            acaoId: null,
            acompanhamentoTarefas: []
          }
        ]
      },

      cadastrandoAcompanhamento: false
    }
  },

  head() {
    return {
      title: 'Novo acompanhamento'
    }
  },

  computed: {
    ...mapState({
      etapasDaEmpresa: state => state.empresa.dados.etapas,
      uiEmpresa: state => state.empresa.ui,

      acompanhamentoVisualizado: state => state.empresa.acompanhamentoVisualizado
    })
  },

  watch: {
    // valoresNegocioados(newValue) {
    //   console.log(newValue)

    //   this.valoresNegocioados[this.indexAcaoAtual] =
    //     Number(newValue[this.indexAcaoAtual]).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    // },

    checklistForm(newValue) {
      const arrayChecklistAtual = newValue[this.indexAcaoAtual]
      let percentualAtingidoAtual = 0

      // gambiarra (não mexer kkkk)
      for (let i = 0; i < arrayChecklistAtual.length; i++) {
        for (let j = 0; j < this.formulario.acompanhamentoAcoes[this.indexAcaoAtual].acompanhamentoTarefas.length; j++) {
          if (arrayChecklistAtual[i] === this.formulario.acompanhamentoAcoes[this.indexAcaoAtual].acompanhamentoTarefas[j].tipoTarefaId) {
            percentualAtingidoAtual += this.alternativasCheckbox[this.indexAcaoAtual].listaTarefas[j].percentual
            this.formulario.acompanhamentoAcoes[this.indexAcaoAtual].acompanhamentoTarefas[j].realizado = true
          }
        }
      }

      this.formulario.acompanhamentoAcoes[this.indexAcaoAtual].percentualAtingido = percentualAtingidoAtual
    }
  },

  mounted() {
    const etapaIndex = this.$route.query.etapa

    const arrayPlanosDeAcao = this.etapasDaEmpresa[etapaIndex].planosDeAcao
    this.acompanhamentos = arrayPlanosDeAcao[arrayPlanosDeAcao.length - 1].acompanhamentos

    this.arrayAcoes = arrayPlanosDeAcao[arrayPlanosDeAcao.length - 1].acoes

    this.planoDeAcaoId = arrayPlanosDeAcao[arrayPlanosDeAcao.length - 1].planoDeAcaoId

    this.getDadosGerais(this.planoDeAcaoId)
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

    showModal() {
      this.isShowModal = true
    },

    confirmarValorNegociado() {
      this.isShowModal = false

      this.indexAcaoAtual += 1
      scroll(0, 0)
    },

    cancelarValorNegociado() {
      this.isShowModal = false
    },

    async getDadosGerais(planoDeAcaoId) {
      const result = await axios.get(
        `${Constantes.URL_API_INTEGRADORA}pti/Acompanhamento/NovoAcompanhamento?planoDeAcaoId=${planoDeAcaoId}`,
        { headers: header.headers() })

      this.canaisDeAtendimento = result.data.dado.canaisDeAtendimento

      this.alternativasCheckbox = result.data.dado.checklists

      console.log(result.data.dado)

      for (let i = 0; i < 3; i++) {
        this.valoresNegocioados[i] = result.data.dado.checklists[i].valorNegociado

        const dataFormatada = result.data.dado.checklists[i].dataInicioEfetivo
        if (dataFormatada) {
          this.datasDeInicio[i] = dataFormatada.slice(0, -9).split('-').reverse().join('')
        }

        for (let j = 0; j < this.alternativasCheckbox[i].listaTarefas.length; j++) {
          this.formulario.acompanhamentoAcoes[i].acompanhamentoTarefas.push(
            {
              realizado: false,
              tipoTarefaId: this.alternativasCheckbox[i].listaTarefas[j].tipoTarefaId
            }
          )
        }
      }

      console.log(this.datasDeInicio)

      if (this.acompanhamentos.length > 0) {
        await this.getAcompanhamento(this.$route.params.empresa, this.acompanhamentos[this.acompanhamentos.length - 1].acompanhamentoId)

        this.formulario.dataAcompanhamento = this.acompanhamentoVisualizado.dataCadastro
        this.formulario.canalDeAtendimentoId = this.acompanhamentoVisualizado.canalDeAtendimentoId

        for (let i = 0; i < 3; i++) {
          this.formulario.acompanhamentoAcoes[i].observacao = this.acompanhamentoVisualizado.acoesInfo[i].observacao
          this.formulario.acompanhamentoAcoes[i].percentualAtingido = this.acompanhamentoVisualizado.acoesInfo[i].percentualAtingido

          for (let j = 0; j < this.formulario.acompanhamentoAcoes[i].acompanhamentoTarefas.length; j++) {
            if (this.acompanhamentoVisualizado.acoesInfo[i].tarefasInfo[j].realizada) {
              this.alternativasCheckbox[i].listaTarefas[j].realizado = true

              this.formulario.acompanhamentoAcoes[i].acompanhamentoTarefas[j].realizado = true

              this.checklistForm[i][j] = this.acompanhamentoVisualizado.acoesInfo[i].tarefasInfo[j].tarefaId
            }
          }
        }
      }

      this.carregando = false
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
    },

    cancelarAcompanhamento() {
      this.$router.push({ path: '/Empresa/' + this.$route.params.empresa })
    },

    validarForm() {
      if (!this.formulario.dataAcompanhamento || !this.formulario.canalDeAtendimentoId) {
        this.showToast(
          'Atenção!',
          'info',
          'Preencha todos os dados antes de continuar',
          'b-toaster-top-left',
          2000
        )

        return false
      } else if (!this.formulario.acompanhamentoAcoes[this.indexAcaoAtual].observacao) {
        this.showToast(
          'Atenção!',
          'info',
          'Preencha o campo de Relatório antes de continuar',
          'b-toaster-top-left',
          2000
        )

        return false
      } else {
        return true
      }
    },

    converterDatas() {
      for (let i = 0; i < 3; i++) {
        if (this.formulario.acompanhamentoAcoes[i].dataInicioEfetivo) {
          const ano = this.formulario.acompanhamentoAcoes[i].dataInicioEfetivo.slice(-4)
          const mes = this.formulario.acompanhamentoAcoes[i].dataInicioEfetivo.slice(2, -4)
          const dia = this.formulario.acompanhamentoAcoes[i].dataInicioEfetivo.slice(0, -6)

          this.formulario.acompanhamentoAcoes[i].dataInicioEfetivo = `${ano}-${mes}-${dia}T00:00:00`
        }
      }
    },

    proximaAcao() {
      const validado = this.validarForm()

      // validação de checklist
      const checklistAtual = this.checklistForm[this.indexAcaoAtual].filter(item => item !== true)

      if (
        validado &&
        checklistAtual.length >= this.alternativasCheckbox[this.indexAcaoAtual].listaTarefas.length
      ) {
        this.showModal()
      } else if (validado) {
        this.indexAcaoAtual += 1
        scroll(0, 0)
      }
    },

    acaoAnterior() {
      this.indexAcaoAtual -= 1
      scroll(0, 0)
    },

    async finalizarAcompanhamento() {
      if (!this.formulario.acompanhamentoAcoes[2].observacao) {
        this.showToast(
          'Atenção!',
          'info',
          'Preencha o campo de Relatório antes de continuar',
          'b-toaster-top-left',
          2000
        )
      } else {
        this.cadastrandoAcompanhamento = true
        this.formulario.planoDeAcaoId = this.planoDeAcaoId

        for (let i = 0; i < 3; i++) {
          this.formulario.acompanhamentoAcoes[i].acaoId = this.arrayAcoes[i].acaoId

          this.formulario.acompanhamentoAcoes[i].valorNegociado = Number(this.valoresNegocioados[i])

          this.formulario.acompanhamentoAcoes[i].dataInicioEfetivo = this.datasDeInicio[i]
        }

        this.converterDatas()

        console.log(this.formulario)

        await axios.post(
        `${Constantes.URL_API_INTEGRADORA}pti/Acompanhamento/adicionarAcompanhamento`,
        this.formulario,
        { headers: header.headers() }
        ).then((res) => {
          if (res.data.codigo === 200) {
            this.$router.push({ path: '/Empresa/' + this.$route.params.empresa })

            this.showToast(
              'Sucesso',
              'success',
              'Novo acompanhamento criado',
              'b-toaster-top-left',
              2000
            )
          } else {
            this.showToast(
              'Erro',
              'warning',
              res.data.resposta,
              'b-toaster-top-left',
              3000
            )
            this.cadastrandoAcompanhamento = false
          }
        }).catch(() => {
          this.showToast(
            'Erro',
            'danger',
            'Houve um erro inesperado',
            'b-toaster-top-left',
            3000
          )
          this.cadastrandoAcompanhamento = false
        })
      }
    }
  }
})
</script>

<style scoped>
p {
  margin: 0;
}

.root-div {
  position: relative;
}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);

  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-container {
  display: flex;
  flex: 1;
  height: 500px;
  align-items: center;
  justify-content: center;
}

.acompanhamento-content {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 38px;
}

.acompanhamento-form {
  background: url('~static/assets/logo-azul.svg') no-repeat 95% 28px;

  margin-top: 40px;
  background-color: var(--shape);
  border-radius: 10px;
  border: 1px solid var(--text-title);
  padding: 40px 64px;
  width: 835px;
}

.section-etapa {
  display: flex;
  align-items: flex-end;
  margin-bottom: 46px;
}

.section-etapa p {
  margin: 0 11px 6px 27px;
  font-size: 16px;
  color: var(--text-title);
  font-family: GothamBook;
}

.section-etapa .input-date {
  border-radius: 20px;
  border: 1px solid var(--text-title);
}

.section-etapa label {
  margin-left: 28px;
  margin-bottom: 6px;
  font-size: 12px;
  color: var(--text-title);
  font-family: GothamBook;
}

.input-date-content {
  margin-right: 18px;
}

.select-box {
  width: 200px;
  height: 38px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--text-title);
  background: url('~static/assets/arrow-down.svg') no-repeat 90%;
}

.select-box select {
  cursor: pointer;
  width: 106%;
  height: 36px;
  border: 1px solid var(--text-title);
  background: transparent;
  border: 0;
  outline: 0;
  padding: 0 1.875rem;
  color: var(--text-title);
  font-size: 13px;
  font-family: 'Gotham-bold';
}

.section-acao {
  margin-bottom: 36px;
}

.section-acao p {
  margin-left: 28px;
  color: var(--text-title);
}

.section-acao .acao-titulo {
  font-family: Gotham-Bold;
  font-size: 16px;
  margin-bottom: 16px;
}

.section-acao .acao-relatorio {
  font-family: GothamBook;
  font-size: 14px;
  margin-bottom: 8px;
}

.section-acao .text-area-content {
  position: relative;
}

.section-acao .text-area-content textarea {
  width: 100%;
  height: 190px;
  border: 1px solid var(--text-title);
  border-radius: 10px;
  resize: none;
  padding: 28px 24px 0 24px;
}

.section-acao .text-area-content div {
  position: absolute;
  bottom: -0.6rem;
  right: 1.25rem;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-acao .text-area-content div p {
  font-size: 0.95rem;
  color: var(--text-title);
  font-weight: 500;
  margin: 0;
  margin-bottom: 0.5rem;
}

.section-acao .text-area-content div .money-input {
  width: 9rem;
  height: 2.2rem;
  border-radius: 1.1rem;
  border:  1px solid var(--text-title);
  text-align: center;
}

.section-checklist p {
  font-size: 16;
  font-family: Gotham-Bold;
  margin-bottom: 36px;
}

.content-questions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 8px;
}

.radio {
  margin-top: 1px;
}

.checkbox-date div input {
  border: 0;
  border-bottom: 1px solid var(--text-title);
}

.radio-item {
  font-size: 14px;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 3.5rem 0 0 0;
}

.button-container button {
  border: 0;
  width: 10.625rem;
  height: 2.5rem;
  border-radius: 1.313rem;
  background-color: var(--main-light);
  font-size: 1rem;
  font-family: 'GothamBook';
  color: var(--shape);

  margin: 0 8px;
}

.button-container button:disabled {
  background-color: #87888a;
}

</style>
