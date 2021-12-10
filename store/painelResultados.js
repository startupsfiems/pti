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
  filtro: null,
  dadosPainel: null,
  ui: {
    codigo: 0,
    error: '',
    success: ''
  }
})

export const actions = {
  async getFiltros({ commit }) {
    try {
      const response = await axios.get(baseURL + 'pti/Dashboard/dropdowns', {
        headers: header.headers()
      })
      if (response.data.codigo === 200) {
        commit('SET_FILTROS', {
          dado: response.data.dado
        })
      }
    } catch (error) {
      console.error(error)
    }
  },
  async getDataPanel({ commit }, data) {
    const payload = data.params
    console.log(payload)
    try {
      const response = await axios.post(baseURL + 'pti/Dashboard/dadosGraficos',
        payload,
        { headers: header.headers() }
      )
      if (response.data.codigo === 200) {
        // if (response.data.dado.dadosOperacionais !== null) {

        // }
        // if (response.data.dado.perfilAcoes !== null) {

        // }
        if (response.data.dado.perfilEmpresas !== null) {
          response.data.dado.perfilEmpresas.mediaDeFuncionariosPorEmpresa = Number(response.data.dado.perfilEmpresas.mediaDeFuncionariosPorEmpresa.toFixed(2))
          response.data.dado.perfilEmpresas.quantidadeDeEmpresas = Number(response.data.dado.perfilEmpresas.quantidadeDeEmpresas.toFixed(2))
          response.data.dado.perfilEmpresas.quantidadeDeFuncionariosTotal = Number(response.data.dado.perfilEmpresas.quantidadeDeFuncionariosTotal.toFixed(2))
        }
        if (response.data.dado.resultadoEmpresas !== null) {
          response.data.dado.resultadoEmpresas.evolucaoMediaGlobalAbsenteismo.forEach((absenteismo) => {
            absenteismo.valor = Number(absenteismo.valor.toFixed(2))
          })
          response.data.dado.resultadoEmpresas.evolucaoMediaGlobalProdutividade.forEach((produtividade) => {
            produtividade.valor = Number(produtividade.valor.toFixed(2))
          })
          if (!isNaN(response.data.dado.resultadoEmpresas.mediaGlobalDeAbsenteismo)) {
            response.data.dado.resultadoEmpresas.mediaGlobalDeAbsenteismo = Number(response.data.dado.resultadoEmpresas.mediaGlobalDeAbsenteismo.toFixed(2))
          } else {
            response.data.dado.resultadoEmpresas.mediaGlobalDeAbsenteismo = 0
          }
          if (!isNaN(response.data.dado.resultadoEmpresas.mediaGlobalDeProdutividade)) {
            response.data.dado.resultadoEmpresas.mediaGlobalDeProdutividade = Number(response.data.dado.resultadoEmpresas.mediaGlobalDeProdutividade.toFixed(2))
          } else {
            response.data.dado.resultadoEmpresas.mediaGlobalDeProdutividade = 0
          }
        }
        // if (response.data.dado.resultadosFiems !== null) {

        // }
        // response.data.dado.forEach((area) => {
        //   if (area !== null) {
        //     area.forEach((data) => {
        //       if (Array.isArray(data)) {
        //         data.forEach((innerData) => {
        //           innerData.valor = Number(innerData.valor.toFixed(2))
        //         })
        //       } else {
        //         data = Number(data.toFixed(2))
        //       }
        //     })
        //   }
        // })
        commit('SET_DADOS_PAINEL', {
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
      console.error(error)
      commit('SET_ERROR', {
        code: 999,
        message: 'Algo inesperado ocorreu'
      })
    }
  }
}

export const mutations = {
  SET_FILTROS(state, data) {
    state.filtro = data.dado
  },
  SET_DADOS_PAINEL(state, data) {
    state.dadosPainel = data.params
  },
  SET_SUCCESS(state, data) {
    state.ui.success = data.message
    state.ui.codigo = data.code
  },
  SET_ERROR(state, data) {
    state.ui.error = data.message
    state.ui.codigo = data.code
  }
}
