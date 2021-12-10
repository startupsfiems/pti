<template>
  <div>
    <Header :title="`EDITAR EMPRESA`" />

    <div v-if="carregando" class="spinner">
      <b-spinner variant="primary" label="Text Centered" />
    </div>

    <div v-else class="container">
      <form class="container-box" @submit.prevent="signInButtonPressed">
        <p class="section-title">
          Dados da empresa
        </p>

        <div class="content-box">
          <div class="content-input">
            <p class="input-title">
              CNPJ
            </p>
            <TheMask
              v-model="dados.cadastroEmpresa.cnpj"
              class="input"
              type="text"
              placeholder="99.999.999/9999-99"
              mask="##.###.###/####-##"
              required
            />
          </div>

          <div class="content-input">
            <p class="input-title">
              Razão Social
            </p>
            <input
              v-model="dados.cadastroEmpresa.razaoSocial"
              class="input"
              type="text"
              placeholder="Razão social da empresa"
              required
            />
          </div>

          <div class="content-input">
            <p class="input-title">
              CNAE Principal
            </p>
            <input
              v-model="dados.cadastroEmpresa.cnaePrincipal"
              class="input"
              type="text"
              placeholder="ex: 13.013-00 Cultivo de ..."
              required
            />
          </div>

          <div class="content-input">
            <p class="input-title">
              Grau de risco
            </p>
            <input
              v-model="dados.cadastroEmpresa.grauDeRisco"
              class="input"
              type="text"
              placeholder="ex: 3"
              required
            />
          </div>

          <div class="content-input">
            <p class="input-title">
              Região
            </p>
            <div class="select-box">
              <select
                v-model="dados.cadastroEmpresa.regiaoId"
                name="select"
                required
              >
                <option value="Região 1">
                  Região 1
                </option>
              </select>
            </div>
          </div>

          <div class="content-input">
            <p class="input-title">
              Divisão
            </p>
            <div class="select-box">
              <select v-model="dados.cadastroEmpresa.divisaoCNAEId" name="select">
                <option
                  v-for="divisao in dropDivisoes"
                  :key="divisao.value"
                  :value="divisao.value"
                >
                  {{ divisao.text }}
                </option>
              </select>
            </div>
          </div>

          <div class="content-input">
            <p class="input-title">
              Grupo
            </p>
            <div class="select-box">
              <select v-model="dados.cadastroEmpresa.grupoCNAEId" name="select">
                <option
                  v-for="grupo in dropGrupos"
                  :key="grupo.value"
                  :value="grupo.value"
                  :selected="grupo.value === dados.cadastroEmpresa.grupoCNAEId"
                >
                  {{ grupo.text }}
                </option>
              </select>
            </div>
          </div>

          <div class="content-input">
            <p class="input-title">
              Porte
            </p>
            <div class="select-box">
              <select v-model="dados.cadastroEmpresa.porteId" name="select">
                <option
                  v-for="porte in dropPortes"
                  :key="porte.id"
                  :value="porte.id"
                  :selected="porte.id === dados.cadastroEmpresa.porteId"
                >
                  {{ porte.nome }}
                </option>
              </select>
            </div>
          </div>

          <div class="content-checkbox">
            <input
              id="simplesNacional"
              v-model="dados.cadastroEmpresa.optanteSimplesNacional"
              type="checkbox"
            />
            <label for="simplesNacional">
              Optante pelo simples nacional
            </label>
          </div>
        </div>

        <div class="separator" />

        <p class="section-title">
          Dados do representante
        </p>

        <div class="content-box">
          <div class="content-input">
            <p class="input-title">
              CPF
            </p>
            <TheMask
              v-model="dados.cadastroRepresentante.cpf"
              class="input"
              type="text"
              placeholder="999.999.999-99"
              mask="###.###.###-##"
              required
            />
          </div>

          <div class="content-input">
            <p class="input-title">
              Nome
            </p>
            <input
              v-model="dados.cadastroRepresentante.nome"
              class="input"
              type="text"
              placeholder="ex: João Carlos Nogueira"
              required
            />
          </div>

          <div class="content-input">
            <p class="input-title">
              Email
            </p>
            <input
              v-model="dados.cadastroRepresentante.email"
              class="input"
              type="text"
              placeholder="ex: joao@email.com"
              required
            />
          </div>

          <div class="content-input">
            <p class="input-title">
              WhatsApp
            </p>
            <TheMask
              v-model="dados.cadastroRepresentante.whatsApp"
              class="input"
              type="text"
              placeholder="ex: (99) 999999-9999"
              mask="(##) #####-####"
              required
            />
          </div>

          <div class="content-input">
            <p class="input-title">
              Cargo
            </p>
            <input
              v-model="dados.cadastroRepresentante.cargo"
              class="input"
              type="text"
              placeholder="ex: Atendente de PTI"
              required
            />
          </div>
        </div>

        <div class="button-container">
          <b-spinner
            v-if="enviandoDados"
            variant="primary"
            label="Text Centered"
          />
          <button v-else type="submit" @click="salvarAlteracoes(dados)">
            Salvar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import axios from 'axios'
import { TheMask } from 'vue-the-mask'
import header from '../../utils/headers'

import { Constantes } from '../../utils/constantes'
import Header from '~/components/Header.vue'

export default Vue.extend({
  components: { TheMask, Header },

  data() {
    return {
      carregando: true,
      dados: {
        cadastroEmpresa: {},
        cadastroRepresentante: {}
      },
      // dropSetores: [],
      dropDivisoes: [],
      // dropSegmentos: [],
      dropGrupos: [],
      dropPortes: [],
      cpfRepresentanteSalvo: '',
      enviandoDados: false
    }
  },

  head() {
    return {
      title: 'Editar empresa'
    }
  },

  computed: {
    ...mapState({
      usuarioLogado: state => state.user.usuarioLogado
    })
  },

  mounted() {
    this.pegarTodosOsDados()
  },

  methods: {
    signInButtonPressed(e) {
      e.preventDefault()
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

    async getDivisoes() {
      const response = await axios.get(
        `${Constantes.URL_API_INTEGRADORA}pti/instituicao/dropDivisoes`,
        { headers: header.headers() }
      )
      if (response.data.codigo === 200) {
        this.dropDivisoes = response.data.dado
      } else {
        this.dropDivisoes = []
      }
    },

    /* async getSetores() {
      const response = await axios.get(
        `${Constantes.URL_API_INTEGRADORA}pti/instituicao/dropSetores`,
        { headers: header.headers() }
      )

      if (response.data.codigo === 200) {
        this.dropSetores = response.data.dado
      } else {
        this.dropSetores = []
      }
    },
    */

    async getPortes() {
      const response = await axios.get(
        `${Constantes.URL_API_INTEGRADORA}pti/instituicao/dropPortes`,
        { headers: header.headers() }
      )

      console.log(response.data)

      if (response.data.codigo === 200) {
        this.dropPortes = response.data.dado
      } else {
        this.dropPortes = []
      }
    },

    /*
    async getsegmentos() {
      const response = await axios.get(
        `${Constantes.URL_API_INTEGRADORA}pti/instituicao/dropSegmentos`,
        { headers: header.headers() }
      )

      if (response.data.codigo === 200) {
        this.dropSegmentos = response.data.dado
      } else {
        this.dropSegmentos = []
      }
    },
    */

    async getDadosEmpresaPorCNPJ() {
      const cnpj = this.dados.cadastroEmpresa.cnpj

      const res = await axios.get(Constantes.URL_BRASIL_API + 'cnpj/v1/' + cnpj)

      if (res.status === 200) {
        await this.getDivisaoEGrupo(res.data.cnae_fiscal)
      }
    },

    async getDivisaoEGrupo(cnae) {
      if (cnae) {
        const grupo = cnae.toString()
        try {
          const response = await axios.get(Constantes.URL_API_IBGE + 'grupos/' + grupo.slice(0, 3))
          if (response.status === 200) {
          // Primeiramente, é buscado o grupo principal do cnae fiscal (assumido como principal)
          // O grupo é settado como escolha e então o dropGrupos é populado com ele mesmo
            if (response.data.id) {
              const mainGrupoId = response.data.id
              const grupoDescricao = response.data.descricao
              const divisaoDescicao = response.data.divisao.descricao
              const divisaoId = response.data.divisao.id
              this.dropGrupos.push({ text: grupoDescricao, value: mainGrupoId })
              this.dados.cadastroEmpresa.grupoCnae = mainGrupoId

              // Em seguida, o dropDivisoes recebe a divisao que abriga o grupo principal (ou a divisao que abriga o grupo buscado pelo cnae inserido pelo usuário)
              this.dropDivisoes = []
              this.dropDivisoes.push({ text: divisaoDescicao, value: divisaoId })
              this.dados.cadastroEmpresa.divisaoCnae = divisaoId

              // Por fim, é feita uma busca de todos os grupos pertencentes à divisão para popular as opções de grupos daquela divisão
              try {
                const response = await axios.get(Constantes.URL_API_IBGE + 'divisoes/' + grupo.slice(0, 2) + '/grupos')
                if (response.status === 200) {
                  for (const grupo of response.data) {
                    if (grupo.id !== this.dados.cadastroEmpresa.grupoCnae) {
                      this.dropGrupos.push({ text: grupo.descricao, value: grupo.id })
                    }
                  }
                }
              } catch (error) {
                console.error(error)
              }
            }
          }
        } catch (error) {
          console.error(error)
        }
      }
    },

    async salvarAlteracoes({ cadastroEmpresa, cadastroRepresentante }) {
      if (
        !cadastroEmpresa.cnpj ||
        !cadastroEmpresa.razaoSocial ||
        !cadastroEmpresa.cnaePrincipal ||
        !cadastroEmpresa.grauDeRisco ||
        cadastroEmpresa.grauDeRisco === null ||
        !cadastroEmpresa.divisaoCNAEId ||
        !cadastroEmpresa.grupoCNAEId ||
        !cadastroEmpresa.porteId ||
        !cadastroRepresentante.cpf ||
        !cadastroRepresentante.nome ||
        !cadastroRepresentante.email ||
        !cadastroRepresentante.whatsApp ||
        !cadastroRepresentante.cargo
      ) {
        return this.showToast(
          'Aviso',
          'info',
          'Preencha todos os dados e tente novamente',
          'b-toaster-top-left',
          3000
        )
      }

      this.enviandoDados = true

      const res = await axios.put(
        `${Constantes.URL_API_INTEGRADORA}pti/instituicao/atualizarEmpresa`,
        {
          empresaId: cadastroEmpresa.empresaId,
          grauDerisco: cadastroEmpresa.grauDeRisco,
          divisaoCNAEId: cadastroEmpresa.divisaoCNAEId,
          grupoCNAEId: cadastroEmpresa.grupoCNAEId,
          porteId: cadastroEmpresa.porteId,
          // "regiaoId": 1,
          representante: {
            id:
              this.cpfRepresentanteSalvo === cadastroRepresentante.cpf
                ? cadastroRepresentante.id
                : 0,
            cpf: cadastroRepresentante.cpf,
            nome: cadastroRepresentante.nome,
            email: cadastroRepresentante.email,
            whatsApp: cadastroRepresentante.whatsApp,
            cargo: cadastroRepresentante.cargo
          }
        },
        { headers: header.headers() }
      )

      if (res.data.codigo === 200) {
        this.showToast(
          'Sucesso',
          'success',
          'Dados atualizados com sucesso!',
          'b-toaster-top-left',
          3000
        )

        this.enviandoDados = false

        // this.$router.push({ name: 'listaEmpresas' })
      } else {
        this.showToast(
          'Erro',
          'info',
          'Verifique se os dados inseridos e tente novamente',
          'b-toaster-top-left',
          3000
        )

        this.enviandoDados = false
      }
    },

    async pegarTodosOsDados() {
      const empresaId = this.$route.params.index
      const res = await axios.get(
        `${Constantes.URL_API_INTEGRADORA}pti/instituicao/empresaDados?empresaId=${empresaId}`,
        { headers: header.headers() }
      )

      console.log(res.data)

      const dadosEmpresa = res.data.dado
      const representante = dadosEmpresa.representante

      this.dados.cadastroEmpresa = dadosEmpresa
      this.dados.cadastroRepresentante = representante
      this.cpfRepresentanteSalvo = representante.cpf

      // await this.getDivisoes()
      // await this.getsegmentos()
      this.getDadosEmpresaPorCNPJ()
      await this.getPortes()

      this.carregando = false
    }
  }
})
</script>

<style scoped>
.spinner {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 720px;
  width: 100%;
  padding: 2.25rem 4% 1.875rem 4%;
  margin: 0 auto;
}

.container-box {
  width: 100%;
  padding: 1.875rem 1.875rem 38px 1.875rem;
  border: 1px solid var(--text-title);
  border-radius: 10px;
  background-color: var(--shape);

  margin-top: 20px;
}

.section-title {
  font-size: 1.25rem;
  font-family: 'Gotham-bold';
  margin-left: 1.875rem;
  color: var(--text-title);
  margin-bottom: 1.625rem;
}

.content-box {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.875rem 1.25rem;
}

.content-input {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.input-title {
  font-family: 'GothamBook';
  color: var(--text-title);
  font-size: 0.875rem;
  margin-left: 1.875rem;
  margin-bottom: 0.5rem;
  line-height: 0.75rem;
}

.input {
  border: 1px solid var(--text-title);
  height: 2.5rem;
  border-radius: 1.25rem;
  padding: 0 1.875rem;

  color: var(--text-title);
  font-size: 0.875rem;
  line-height: 0.8rem;
  font-family: 'Gotham-bold';
}

.select-box {
  width: 100%;
  height: 2.5rem;
  border-radius: 1.25rem;
  overflow: hidden;
  border: 1px solid var(--text-title);
  background: url('~/static/assets/arrow-down.svg') no-repeat 90%;
}

.select-box select {
  cursor: pointer;
  width: 106%;
  height: 2.5rem;
  border: 1px solid var(--text-title);
  background: transparent;
  border: 0;
  outline: 0;
  padding: 0 1.875rem;
  color: var(--text-title);
  font-size: 0.875rem;
  font-family: 'Gotham-bold';
}

.content-checkbox {
  width: 100%;
  padding-top: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
}

.content-checkbox input {
  margin-right: 0.75rem;
  width: 1.125rem;
  height: 1.125rem;
  cursor: pointer;
}

.content-checkbox label {
  line-height: 0.875rem;
  margin-bottom: 0;
  color: var(--text-title);
  font-size: 0.875rem;
  font-family: 'Gotham-Bold';
  cursor: pointer;
}

.separator {
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.5);
  margin: 2.6rem 0 2.5rem 0;
}

.button-container {
  width: 100%;
  height: 2.5rem;
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
}

@media (max-width: 536px) {
  .container {
    padding: 2.25rem 8% 1.875rem 8%;
  }
  .content-box {
    grid-template-columns: 1fr;
    gap: 0.875rem 1.25rem;
  }
}
</style>
