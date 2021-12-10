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
  dados: {
    etapas: null,
    historico: null,
    representantedId: 0
  }, // Este objeto abriga os dados de uma empresa específica
  infos: {
    empresaId: 0,
    representanteId: 0,
    etapaDiagnosticoId: 0,
    planoDeAcaoId: 0
  },
  metaAnual: null,
  acompanhamentoVisualizado: null,
  acompanhamentosToSelect: null,
  ui: {
    codigo: 0,
    error: '',
    success: ''
  }
})

export const getters = {
  getEmpresaId: (state) => {
    return state.infos.empresaId
  },
  getRepresentanteId: (state) => {
    return state.infos.representanteId
  },
  getEtapaDiagnosticoId: (state) => {
    return state.infos.etapaDiagnosticoId
  },
  getPlanoDeAcaoId: (state) => {
    return state.infos.planoDeAcaoId
  }
}

export const actions = {
  getResultadosEmpresa({ commit }, data) {
    return axios.get(baseURL + 'pti/instituicao/empresa?agenteId=' + data.params.agenteId + '&empresaId=' +
    data.params.empresaId, {
      headers: header.headers()
    })
      .then((response) => {
        if (response.data.codigo === 200) {
          commit('SET_DADOS', {
            empresa: response.data.dado
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
  getMetaAnual({ commit }, data) {
    return axios.get(baseURL + 'pti/Diagnostico/objetivos?empresaId=' +
    data.params.empresaId, {
      headers: header.headers()
    })
      .then((response) => {
        if (response.data.codigo === 200) {
          commit('SET_META_ANUAL', response.data.dado)
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
  setInfos({ commit }, data) {
    commit('SET_INFOS',
      data.params
    )
  },
  async getAcompanhamentoVisualizado({ commit }, data) {
    try {
      const response = await axios.get(baseURL + 'pti/Acompanhamento?empresaId=' + data.params.empresaId + '&acompanhamentoId=' + data.params.acompanhamentoId,
        {
          headers: header.headers()
        })
      if (response.data.codigo === 200) {
        commit('SET_ACOMPANHAMENTO_VISUALIZADO', {
          dado: response.data.dado
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
        commit('SET_ACOMPANHAMENTO_VISUALIZADO', {
          dado: 'Erro'
        })
      }
    } catch (error) {
      console.log(error)
      commit('SET_ACOMPANHAMENTO_VISUALIZADO', {
        dado: 'PromiseNotFullfiled'
      })
    }
  },
  setAcompanhamentosToSelect({ commit }, data) {
    commit('SET_ACOMPANHAMENTOS_TO_SELECT', {
      dadosParaSelecionarAcompanhamentoDoPlano: data.params
    })
  },
  patchStatusPA({ commit }, data) {
    commit('PATCH_STATUS_PA', {
      params: data.payload
    })
  },
  resetState({ commit }) {
    commit('RESET_STATE')
  }
}

export const mutations = {
  SET_DADOS(state, data) {
    state.dados = data.empresa
  },
  SET_META_ANUAL(state, data) {
    state.metaAnual = data
  },
  SET_INFOS(state, data) {
    if (data.empresaId !== undefined) {
      state.infos.empresaId = data.empresaId
    }
    if (data.representanteId !== undefined) {
      state.infos.representanteId = data.representanteId
    }
    if (data.etapaDiagnosticoId !== undefined) {
      state.infos.etapaDiagnosticoId = data.etapaDiagnosticoId
    }
    if (data.planoDeAcaoId !== undefined) {
      state.infos.planoDeAcaoId = data.planoDeAcaoId
    }
  },
  SET_ACOMPANHAMENTO_VISUALIZADO(state, data) {
    state.acompanhamentoVisualizado = data.dado
  },
  SET_ACOMPANHAMENTOS_TO_SELECT(state, data) {
    state.acompanhamentosToSelect = data.dadosParaSelecionarAcompanhamentoDoPlano
  },
  PATCH_STATUS_PA(state, data) {
    if (state.dados.etapas) {
      const etapa = state.dados.etapas.find(etapa => etapa.diagnostico.etapaDiagnosticoId === data.params.etapaDiagnosticoId)
      if (etapa.planosDeAcao) {
        const pa = etapa.planosDeAcao[data.params.paIndex]
        pa.idStatus = data.params.idStatus
      }
    }
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
    state.dados = {
      etapas: null,
      historico: null,
      representantedId: 0
    }
    state.infos = {
      empresaId: 0,
      representanteId: 0,
      etapaDiagnosticoId: 0,
      planoDeAcaoId: 0
    }
    state.metaAnual = null
    state.acompanhamentoVisualizado = null
    state.acompanhamentosToSelect = null
    state.ui = {
      codigo: 0,
      error: '',
      success: ''
    }
  }
}
