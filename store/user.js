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
  usuarioLogado: {}, // Dados do usuário logado
  empresasDoAgente: [], // Lista de empresas vínculadas ao agente
  ui: {
    codigo: 0,
    error: '',
    success: ''
  }
})

export const actions = {
  login({ commit }, data) {
    const payload = JSON.stringify(data.params)
    return axios
      .post(baseURL + 'Usuario/logar', payload, { headers: header.headers() })
      .then((response) => {
        if (response.data.codigo === 200) {
          localStorage.setItem('token', response.data.dado.token)
          headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + response.data.dado.token
          }
          commit('SET_SUCCESS', {
            code: response.data.codigo,
            message: response.data.resposta
          })
          commit('SET_USUARIO_LOGADO', response.data)
          this.$router.push({ name: 'Eventos' })
        } else {
          commit('SET_ERROR', {
            code: response.data.codigo,
            message: response.data.resposta
          })
        }
      })
  },
  getEmpresasDoAgente({ commit }, data) {
    const agenteId = data.idAgente

    return axios.get(baseURL + 'pti/instituicao/empresas?agenteId=' + agenteId, {
      headers: header.headers()
    })
      .then((response) => {
        if (response.data.codigo === 200) {
          commit('SET_EMPRESAS_DO_AGENTE', {
            empresas: response.data.dado
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
  setEmpresaCadastrada({ commit }, data) {
    commit('SET_EMPRESA_CADASTRADA', {
      empresaCadastrada: data.params
    })
  },
  resetState({ commit }) {
    commit('RESET_STATE')
  }
}

export const mutations = {
  SET_USUARIO_LOGADO(state, data) {
    state.usuarioLogado = {}
    state.usuarioLogado.email = data.dado.email,
    state.usuarioLogado.id = data.dado.id,
    state.usuarioLogado.instituicaoId = data.dado.instituicaoId,
    state.usuarioLogado.nome = data.dado.nome,
    state.usuarioLogado.nomeInstituicao = data.dado.nomeInstituicao,
    state.usuarioLogado.origem = data.dado.origemId,
    state.usuarioLogado.permissaoId = data.dado.permissaoId,
    state.usuarioLogado.token = data.dado.token
  },
  SET_EMPRESAS_DO_AGENTE(state, data) {
    state.empresasDoAgente = data.empresas
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
    state.usuarioLogado = {}
    state.ui = {
      codigo: 0,
      error: '',
      success: ''
    }
    state.empresasDoAgente = []
  },
  SET_EMPRESA_CADASTRADA(state, data) {
    state.empresasDoAgente.push(data.empresaCadastrada)
  }
}

export const getters = {
  getIdUsuarioLogado: (state) => {
    return state.usuarioLogado.id
  }
}
