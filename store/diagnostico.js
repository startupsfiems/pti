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
  dadosDeAtividades: [], // Lista de atividades referentes ao diagnostico
  dadosDeResposta: {
    etapaId: 0,
    empresaId: 0,
    respostas: []
  },
  representanteResponsavel: {},
  resultadosIniciais: {},
  dadosEmpresaResultadosIniciais: {},
  scoreGeral: 0,
  podeAcessar: null,
  ui: {
    codigo: 0,
    error: '',
    success: ''
  }
})

export const getters = {
  getSessao(n) {
    if (n >= 0 && n < state.dadosDeAtividades.length) {
      return state.dadosDeAtividades[n]
    } else {
      return null
    }
  }
}

export const actions = {
  getAtividadesDoDiagnostico({ commit }, data) {
    const etapaId = data.params.etapaId
    const usuarioId = data.params.usuarioId

    return axios.get(baseURL + 'pti/Diagnostico?etapaId=' + etapaId,
      {
        headers: header.headers()
      })
      .then((response) => {
        if (response.data.codigo === 200) {
          commit('SET_ATIVIDADES_DO_DIAGNOSTICO', {
            dadosDeAtividades: response.data.dado.dadosDeAtividades
          })
          commit('SET_DADOS_GERAIS_DE_RESPOSTAS', {
            etapaId,
            usuarioId
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
  getRespostasDeDiagnostico({ commit }, data) {
    const etapaId = data.params.etapaId
    const usuarioId = data.params.usuarioId

    return axios.get(baseURL + 'pti/Diagnostico/respostas?etapaId=' + etapaId,
      {
        headers: header.headers()
      })
      .then((response) => {
        if (response.data.codigo === 200) {
          commit('SET_ATIVIDADES_DO_DIAGNOSTICO', {
            dadosDeAtividades: response.data.dado
          })
          commit('SET_DADOS_GERAIS_DE_RESPOSTAS', {
            etapaId,
            usuarioId
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
  getResultadosDiagnosticosInicial({ commit }, data) {
    commit('SET_SEMAPHORE', false)
    return axios.get(baseURL + 'pti/instituicao/relatorio?empresaId=' + data.params.empresaId + '&etapaDiagnosticoId=' + data.params.etapaDiagnosticoId,
      {
        headers: header.headers()
      })
      .then((response) => {
        if (response.data.codigo === 200) {
          commit('SET_REPRESENTANTE_RESPONSAVEL', response.data.dado.dadosRepresentante),
          commit('SET_RESULTADOS_INICIAIS', response.data.dado)
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
        commit('SET_SEMAPHORE', true)
      })
  },
  setRespostaQuestao({ commit }, data) {
    commit('SET_RESPOSTA_QUESTAO', {
      atividadeId: data.atividadeId,
      questaoId: data.questaoId,
      nota: data.nota,
      resposta: data.resposta
    })
  },
  enviarRespostasDoDiagnostico({ commit }, data) {
    let respostas = Object.assign(data.params.respostas)
    respostas.etapaId = data.params.etapaId
    respostas.empresaId = data.params.empresaId
    const payload = JSON.stringify(respostas)
    return axios.post(baseURL + 'pti/Diagnostico/responder', payload, { headers: header.headers() })
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
  setRepresentanteResponsavel({ commit }, data) {
    commit('SET_REPRESENTANTE_RESPONSAVEL', data.params)
  },
  resetState({ commit }) {
    commit('RESET_STATE')
  }
}

export const mutations = {
  SET_ATIVIDADES_DO_DIAGNOSTICO(state, data) {
    state.dadosDeAtividades = data.dadosDeAtividades
  },
  SET_DADOS_GERAIS_DE_RESPOSTAS(state, data) {
    state.dadosDeResposta.etapaId = data.etapaId
    for (let i = 0; i < state.dadosDeAtividades.length; i++) {
      let resposta = {
        nota: 0.0,
        atividadeId: state.dadosDeAtividades[i].atividadeId,
        usuarioId: data.usuarioId,
        respostas: []
      }
      if (state.dadosDeAtividades[i].dataEntrega !== undefined) {
        resposta.nota = state.dadosDeAtividades[i].nota
      }
      state.dadosDeAtividades[i].questoes.forEach((questao) => {
        let questaoResposta = {
          questaoId: questao.id,
          modoQuestao: questao.modoQuestaoId,
          nota: 0.0,
          jsonResposta: ''
        }
        if (questao.jsonResposta !== undefined) {
          questaoResposta.questaoId = questao.questaoId
          questaoResposta.nota = questao.nota
          questaoResposta.jsonResposta = questao.jsonResposta
        }
        resposta.respostas.push(questaoResposta)
      })
      state.dadosDeResposta.respostas.push(resposta)
    }
  },
  SET_RESPOSTA_QUESTAO(state, data) {
    for (var i = 0; i < state.dadosDeResposta.respostas.length; ++i) {
      if (state.dadosDeResposta.respostas[i].atividadeId === data.atividadeId) {
        state.dadosDeResposta.respostas[i].respostas.forEach((resposta, index) => {
          if (resposta.questaoId === data.questaoId) {
            state.dadosDeResposta.respostas[i].nota -= resposta.nota
            state.dadosDeResposta.respostas[i].respostas[index].nota = data.nota
            state.dadosDeResposta.respostas[i].respostas[index].jsonResposta = data.resposta
            state.dadosDeResposta.respostas[i].nota += resposta.nota
          }
        }, state.dadosDeResposta.respostas[i].respostas)
        break
      }
    }
  },
  RESET_DADOS_DE_DIAGNOSTICO(state) {
    state.dadosDeAtividades = []
    state.dadosDeResposta = {
      etapaId: 0,
      empresaId: 0,
      respostas: [
      ]
    }
  },
  SET_REPRESENTANTE_RESPONSAVEL(state, data) {
    state.representanteResponsavel = { ...data }
  },
  SET_RESULTADOS_INICIAIS(state, data) {
    state.resultadosIniciais.resultados = { ...data.resultadosDimensoes }
    state.resultadosIniciais.dadosHistorico = { ...data.dadosHistorico }
    state.resultadosIniciais.listaAcoes = { ...data.listaAcoes }
    state.dadosEmpresaResultadosIniciais = { ...data.dadosEmpresa }
    state.scoreGeral = data.scoreGeral
  },
  SET_SEMAPHORE(state, data) {
    state.podeAcessar = data
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
    state.dadosDeAtividades = [],
    state.dadosDeResposta = {
      etapaId: 0,
      empresaId: 0,
      respostas: []
    },
    state.representanteResponsavel = {},
    state.resultadosIniciais = {},
    state.dadosEmpresaResultadosIniciais = {},
    state.scoreGeral = 0,
    state.podeAcessar = null,
    state.ui = {
      codigo: 0,
      error: '',
      success: ''
    }
  }
}
