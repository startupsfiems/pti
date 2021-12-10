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
  tarefasExistentes: [],
  tarefasEscolhidas: [],
  tiposDeAcaoSemTarefa: [],
  tipoDeAcaoId: null,
  ui: {
    codigo: 0,
    error: '',
    success: ''
  }
})

export const actions = {
  async getTarefasExistentes({ commit }) {
    commit('RESET_TAREFAS_EXISTENTES')
    commit('RESET_TAREFAS_ESCOLHIDAS')
    try {
      const response = await axios.get(baseURL + 'pti/Tarefa/nomes', {
        headers: header.headers()
      })
      if (response.data.codigo === 200) {
        commit('SET_TAREFAS_EXISTENTES', {
          dado: response.data.dado
        })
        commit('SET_SUCCESS', {
          message: response.data.resposta,
          code: response.data.codigo
        })
      } else {
        commit('SET_ERROR', {
          code: response.data.codigo,
          message: response.data.resposta
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  async putTarefas({ commit }, data) {
    const payload = data.tarefas
    try {
      const response = await axios.post(baseURL + 'pti/Tarefa',
        payload,
        { headers: header.headers() }
      )
      if (response.data.codigo === 200) {
        commit('SET_SUCCESS', {
          message: response.data.resposta,
          code: response.data.codigo
        })
      } else if (response.data.codigo !== 400) {
        commit('SET_ERROR', {
          code: response.data.codigo,
          message: response.data.resposta
        })
      } else {
        commit('SET_ERROR', {
          code: response.data.codigo,
          message: response.data.dado
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  async getTipoDeAcaoSemTarefas({ commit }) {
    try {
      const response = await axios.get(baseURL + 'pti/Tarefa/tiposDeAcaoSemTarefas', {
        headers: header.headers()
      })
      if (response.data.codigo === 200) {
        commit('SET_TIPOS_ACAO_SEM_TAREFAS', {
          params: response.data.dado
        })
        commit('SET_SUCCESS', {
          message: response.data.resposta,
          code: response.data.codigo
        })
      } else {
        commit('SET_ERROR', {
          code: response.data.codigo,
          message: response.data.resposta
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  setTarefaEscolhida({ commit }, data) {
    commit('SET_TAREFA_ESCOLHIDA', {
      dado: data.tarefaEscolhida
    })
  },
  deleteTarefaEscolhida({ commit }, data) {
    commit('DELETE_TAREFA_ESCOLHIDA', {
      dado: data.tarefaEscolhida
    })
  },
  patchTarefaSelecionada({ commit }, data) {
    commit('SWITCH_TAREFA_SELECIONADA', {
      switcher: data.params.switcher,
      id: data.params.tarefaId
    })
  },
  setTipoDeAcaoId({ commit }, data) {
    commit('SET_TIPO_ACAO_ID', {
      tipoAcaoId: data.tipoAcaoId
    })
  },
  resetTarefasEscolhidas({ commit }) {
    commit('RESET_TAREFAS_ESCOLHIDAS')
  },
  resetTarefasExistentes({ commit }) {
    commit('RESET_TAREFAS_EXISTENTES')
  }
}

export const mutations = {
  SET_TAREFAS_EXISTENTES(state, data) {
    let id = 0
    for (const tarefaExistente of data.dado) {
      state.tarefasExistentes.push({ tarefa: tarefaExistente, selected: false, tarefaId: id })
      id++
    }
  },
  SWITCH_TAREFA_SELECIONADA(state, data) {
    switch (data.switcher) {
      case 'marcar':
        state.tarefasExistentes[data.id].selected = true
        break
      case 'desmarcar':
        state.tarefasExistentes[data.id].selected = false
        break
      default:
        break
    }
  },
  SET_TIPO_ACAO_ID(state, data) {
    state.tipoDeAcaoId = data.tipoAcaoId
  },
  SET_TAREFA_ESCOLHIDA(state, data) {
    state.tarefasEscolhidas.push(data.dado)
  },
  SET_TIPOS_ACAO_SEM_TAREFAS(state, data) {
    state.tiposDeAcaoSemTarefa = [...data.params]
  },
  DELETE_TAREFA_ESCOLHIDA(state, data) {
    state.tarefasEscolhidas = state.tarefasEscolhidas.filter(element => element !== data.dado)
  },
  SET_SUCCESS(state, data) {
    state.ui.success = data.message
    state.ui.codigo = data.code
  },
  SET_ERROR(state, data) {
    state.ui.error = data.message
    state.ui.codigo = data.code
  },
  RESET_TAREFAS_ESCOLHIDAS(state) {
    state.tarefasEscolhidas = []
  },
  RESET_TAREFAS_EXISTENTES(state) {
    state.tarefasExistentes = []
  },
  RESET_TIPO_ACAO(state) {
    state.tipoDeAcaoId = null
  }
}
