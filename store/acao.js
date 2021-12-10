/* eslint-disable prefer-const */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
import axios from 'axios'
import header from '../utils/headers'
import { Constantes } from '../utils/constantes'

const baseURL = Constantes.URL_API_INTEGRADORA

var headers = header.headers

export const state = () => ({
  planoDeAcaoId: 0,
  planoDeAcaoAtual: null,
  acoesAcompanhadas: null,
  dropDownAcoes: [],
  // Esta array abriga os status possíveis de um plano de ação, e não os status ativos de um plano específico
  statusPlanoDeAcao: [],
  recebeuResposta: null,
  ui: {
    codigo: 0,
    error: '',
    success: ''
  }
})

export const actions = {
  getDropDownAcoes({ commit }, data) {
    return axios.get(baseURL + 'pti/PlanoDeAcao/dropdown/tiposDeAcao', {
      headers: header.headers()
    })
      .then((response) => {
        if (response.data.codigo === 200) {
          commit('SET_DROPDOWN_ACOES', {
            acoes: response.data.dado
          })
          commit('SET_SUCCESS', {
            code: response.data.codigo,
            message: response.data.resposta
          })
        } else {
          commit('SET_ERROR', {
            code: response.data.codigo,
            message: response.data.resposta
          })
        }
      }).catch((error) => {
        commit('SET_ERROR', {
          code: 111,
          message: error
        })
      })
  },
  // Esta função busca uma ARRAY de status que um plano de ação PODE TER. Ela NÃO busca o status atual do plano de ação
  getStatusPlanoDeAcao({ commit }) {
    return axios.get(baseURL + 'pti/PlanoDeAcao/dropdownStatusPlanoAcao', {
      headers: header.headers()
    })
      .then((response) => {
        if (response.data.codigo === 200) {
          commit('SET_STATUS_PLANO_DE_ACAO', {
            statusPlanoDeAcao: response.data.dado
          })
          commit('SET_SUCCESS', {
            code: response.data.codigo,
            message: response.data.resposta
          })
        } else {
          commit('SET_ERROR', {
            code: response.data.codigo,
            message: response.data.resposta
          })
        }
      }).catch((error) => {
        console.log(error)
      })
  },
  adicionarPlanoDeAcao({ commit }, data) {
    const etapaDiagnosticoId = data.params.etapaDiagnosticoId
    return axios.post(baseURL + 'pti/PlanoDeAcao/novoPlano?etapaDiagnosticoId=' + etapaDiagnosticoId, null, { headers: header.headers() })
      .then((response) => {
        if (response.data.codigo === 200) {
          commit('SET_PLANO_DE_ACAO_ID_ATUAL',
            response.data.dado
          )
          commit('SET_SUCCESS', {
            code: response.data.codigo,
            message: response.data.resposta
          })
        } else {
          commit('SET_ERROR', {
            code: response.data.codigo,
            message: response.data.resposta
          })
        }
      }).catch((error) => {
        console.log(error)
      })
  },
  getPlanoDeAcaoAtual({ commit }, data) {
    const etapaDiagnosticoId = data.params.etapaDiagnosticoId
    const planoDeAcaoId = data.params.planoDeAcaoId
    return axios.get(baseURL + 'pti/PlanoDeAcao?etapaDiagnosticoId=' + etapaDiagnosticoId + '&planoDeAcaoId=' + planoDeAcaoId,
      {
        headers: header.headers()
      })
      .then((response) => {
        if (response.data.codigo === 200) {
          commit('SET_PLANO_DE_ACAO_ATUAL', {
            planoDeAcao: response.data.dado
          })
          commit('SET_SUCCESS', {
            code: response.data.codigo,
            message: response.data.resposta
          })
        } else {
          commit('SET_ERROR', {
            code: response.data.codigo,
            message: response.data.resposta
          })
        }
      }).catch((error) => {
        console.log(error)
      })
  },
  atualizaAcaoNoPlano({ commit }, data) {
    commit('UPDATE_ACAO_NO_PLANO',
      data
    )
  },
  adicionarAcoesNoPlano({ commit }, data) {
    let dado = data.params
    const payload = JSON.stringify(dado)
    return axios.post(baseURL + 'pti/PlanoDeAcao/adicionarAcoes', payload, { headers: header.headers() })
      .then((response) => {
        if (response.data.codigo === 200) {
          commit('SET_SUCCESS', {
            code: response.data.codigo,
            message: response.data.resposta
          })
        } else {
          commit('SET_ERROR', {
            code: response.data.codigo,
            message: response.data.resposta
          })
        }
      }).catch((error) => {
        console.log(error)
      })
  },
  async getAcoesAcompanhadas({ commit }, data) {
    commit('SET_SEMAPHORE', false)
    try {
      const response = await axios.get(baseURL + 'pti/Acompanhamento/historicoAcao?planoDeAcaoId=' + data.params.planoDeAcaoId + '&acaoId=' + data.params.acaoId,
        {
          headers: header.headers()
        })
      if (response.data.codigo === 200) {
        commit('SET_SUCCESS', {
          code: response.data.codigo,
          message: response.data.resposta
        })
        commit('SET_ACOES_ACOMPANHADAS', {
          dado: response.data.dado
        })
      } else {
        commit('SET_ERROR', {
          code: response.data.codigo,
          message: response.data.resposta
        })
      }
      commit('SET_SEMAPHORE', true)
    } catch (error) {
      console.log(error)
      commit('SET_SEMAPHORE', true)
    }
    commit('SET_SEMAPHORE', true)
  },
  resetState({ commit }) {
    commit('RESET_STATE')
  }
}

export const mutations = {
  SET_DROPDOWN_ACOES(state, data) {
    state.dropDownAcoes = data.acoes
  },
  SET_PLANO_DE_ACAO_ID_ATUAL(state, data) {
    state.planoDeAcaoId = data.planoDeAcaoId
    state.planoDeAcaoAtual = null
  },
  SET_PLANO_DE_ACAO_ATUAL(state, data) {
    state.planoDeAcaoAtual = data.planoDeAcao
    if (data.planoDeAcao.acao.length === 0) {
      let acoes = []

      let acao1 = {
        id: 0,
        responsavel: '',
        local: '',
        dataInicial: '',
        dataConclusao: '',
        descricao: '',
        executada: false,
        dataExecucao: null,
        tipoDeAcaoId: 0,
        tipoDeAcao: {
          id: 0,
          nomeDaAcao: '',
          objetivo: '',
          orcamento: 0,
          acoes: []
        },
        planoDeAcaoId: data.planoDeAcao.id
      }

      let acao2 = {
        id: 0,
        responsavel: '',
        local: '',
        dataInicial: '',
        dataConclusao: '',
        descricao: '',
        executada: false,
        dataExecucao: null,
        tipoDeAcaoId: 0,
        tipoDeAcao: {
          id: 0,
          nomeDaAcao: '',
          objetivo: '',
          orcamento: 0,
          acoes: []
        },
        planoDeAcaoId: data.planoDeAcao.id
      }

      let acao3 = {
        id: 0,
        responsavel: '',
        local: '',
        dataInicial: '',
        dataConclusao: '',
        descricao: '',
        executada: false,
        dataExecucao: null,
        tipoDeAcaoId: 0,
        tipoDeAcao: {
          id: 0,
          nomeDaAcao: '',
          objetivo: '',
          orcamento: 0,
          acoes: []
        },
        planoDeAcaoId: data.planoDeAcao.id
      }
      acoes.push(acao1, acao2, acao3)
      state.planoDeAcaoAtual.acao = acoes
    }
  },
  UPDATE_ACAO_NO_PLANO(state, data) {
    state.planoDeAcaoAtual.acao[data.index].responsavel = data.dados.responsavel
    state.planoDeAcaoAtual.acao[data.index].local = data.dados.local
    state.planoDeAcaoAtual.acao[data.index].dataInicial = data.dados.inicio
    state.planoDeAcaoAtual.acao[data.index].dataConclusao = data.dados.conclusao
    state.planoDeAcaoAtual.acao[data.index].descricao = data.dados.descricao
    state.planoDeAcaoAtual.acao[data.index].tipoDeAcao = {}
    state.planoDeAcaoAtual.acao[data.index].tipoDeAcao.id = data.dados.tipoDeAcaoId
    state.planoDeAcaoAtual.acao[data.index].tipoDeAcaoId = data.dados.tipoDeAcaoId
    state.planoDeAcaoAtual.acao[data.index].tipoDeAcao.nomeDaAcao = data.dados.acao
    state.planoDeAcaoAtual.acao[data.index].tipoDeAcao.objetivo = data.dados.objetivo
    state.planoDeAcaoAtual.acao[data.index].tipoDeAcao.orcamento = data.dados.orcamento
    state.planoDeAcaoAtual.acao[data.index].tipoDeAcao.descricao = data.dados.descricao
  },
  SET_STATUS_PLANO_DE_ACAO(state, data) {
    state.statusPlanoDeAcao = data.statusPlanoDeAcao
  },
  SET_ACOES_ACOMPANHADAS(state, data) {
    state.acoesAcompanhadas = data.dado
  },
  SET_SEMAPHORE(state, data) {
    state.recebeuResposta = data
  },
  SET_SUCCESS(state, data) {
    state.ui.success = data.message
    state.ui.codigo = data.code
  },
  SET_ERROR(state, data) {
    state.ui.error = data.message
    state.ui.codigo = data.code
  },
  RESET_STATE(state) {
    state.planoDeAcaoId = 0
    state.planoDeAcaoAtual = null
    state.dropDownAcoes = []
    state.statusPlanoDeAcao = []
    state.ui = {
      codigo: 0,
      error: '',
      success: ''
    }
  }
}
