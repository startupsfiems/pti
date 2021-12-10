<template>
  <div>
    <Header :title="`CADASTRAR EMPRESA`" />

    <div class="container">
      <div class="head-title">
        <span>Cadastro</span>
        <img src="assets/arrow-right.svg" alt="arrow-left" />
        <p>Etapa Inicial</p>
      </div>

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
              @change.native="getInfosEmpresa(dados.cadastroEmpresa.cnpj)"
            />
          </div>

          <div class="content-input">
            <p class="input-title">
              Razão Social
            </p>
            <input
              id="razao-social"
              v-model="dados.cadastroEmpresa.razaoSocial"
              class="input"
              type="text"
              placeholder="Razão social da empresa"
              required
              :disabled="buscandoCnpj"
            />
          </div>

          <div class="content-input">
            <p class="input-title">
              CNAE Principal
            </p>
            <input
              id="cnae-principal"
              v-model="dados.cadastroEmpresa.cnaePrincipal"
              class="input"
              type="text"
              placeholder="ex: 13.013-00 Cultivo de ..."
              required
              :disabled="buscandoCnpj"
              @focusout="getDivisaoEGrupo(dados.cadastroEmpresa.cnaePrincipal)"
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
                v-model="dados.cadastroEmpresa.regiao"
                name="select"
                required
              >
                <option
                  v-for="regiao in dropRegioes"
                  :key="regiao.id"
                  :value="regiao.id"
                >
                  {{ regiao.nome }}
                </option>
              </select>
            </div>
          </div>

          <div class="content-input">
            <p class="input-title">
              Divisão
            </p>
            <div class="select-box">
              <select v-model="dados.cadastroEmpresa.divisaoCnae" name="select" :disabled="buscandoCnpj">
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
              <select v-model="dados.cadastroEmpresa.grupoCnae" name="select" :disabled="buscandoCnpj">
                <option
                  v-for="grupo in dropGrupos"
                  :key="grupo.value"
                  :value="grupo.value"
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
              <select v-model="dados.cadastroEmpresa.porte" name="select" :disabled="buscandoCnpj">
                <option
                  v-for="porte in dropPortes"
                  :key="porte.id"
                  :value="porte.id"
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
              :disabled="buscandoCnpj"
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
              v-model="dados.cadastroRepresentante.telefone"
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
          <button v-if="!cadastrandoEmpresa" type="submit" @click="cadastrarEmpresa(dados)">
            Próximo
          </button>
          <b-spinner v-else variant="primary" label="Text Centered" />
        </div>
      </form>
      <ModalEmpresaNaoAtiva />
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
import ModalEmpresaNaoAtiva from '~/components/empresa/cadastro/ModalEmpresaNaoAtiva.vue'

export default Vue.extend({
  components: { TheMask, Header, ModalEmpresaNaoAtiva },

  data() {
    return {
      dados: {
        cadastroEmpresa: {
          razaoSocial: '',
          optanteSimplesNacional: false,
          cnaePrincipal: '',
          cnpj: null,
          divisaoCnae: '',
          grupoCnae: '',
          porte: null
        },
        cadastroRepresentante: {}
      },
      dropRegioes: [{ text: 'Selecione uma região', value: null }, { text: 'Região 1', value: 1 }, { text: 'Região 2', value: 2 }],
      dropDivisoes: [{ text: 'Selecione uma divisão', value: null }, { text: 'Divisão 1', value: 1 }, { text: 'Divisão 2', value: 2 }],
      dropGrupos: [{ text: 'Selecione um grupo', value: null }, { text: 'Grupo 1', value: 1 }, { text: 'Grupo 2', value: 2 }],
      dropPortes: [],
      buscandoCnpj: false,
      cadastrandoEmpresa: false
    }
  },

  head() {
    return {
      title: 'Cadastrar empresas'
    }
  },

  computed: {
    ...mapState({
      usuarioLogado: state => state.user.usuarioLogado
    })
  },

  mounted() {
    // this.getDivisoes()
    // this.getGrupos()
    this.getRegioes()
    this.getPortes()
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

    async getGrupos() {
      const response = await axios.get(
        `${Constantes.URL_API_INTEGRADORA}pti/instituicao/dropGrupos`,
        { headers: header.headers() }
      )

      if (response.data.codigo === 200) {
        this.dropGrupos = response.data.dado
      } else {
        this.dropGrupos = []
      }
    },

    async getPortes() {
      const response = await axios.get(
        `${Constantes.URL_API_INTEGRADORA}pti/instituicao/dropPortes`,
        { headers: header.headers() }
      )

      if (response.data.codigo === 200) {
        this.dropPortes = response.data.dado
      } else {
        this.dropPortes = []
      }
    },

    async getRegioes() {
      const response = await axios.get(
        `${Constantes.URL_API_INTEGRADORA}pti/instituicao/dropRegioes`,
        { headers: header.headers() }
      )
      if (response.data.codigo === 200) {
        this.dropRegioes = response.data.dado
      } else {
        this.dropRegioes = []
      }
    },

    async cadastrarEmpresa({ cadastroEmpresa, cadastroRepresentante }) {
      if (
        !cadastroEmpresa.cnpj ||
        !cadastroEmpresa.razaoSocial ||
        !cadastroEmpresa.cnaePrincipal ||
        !cadastroEmpresa.grauDeRisco ||
        !cadastroEmpresa.divisaoCnae ||
        !cadastroEmpresa.grupoCnae ||
        !cadastroEmpresa.porte ||
        !cadastroRepresentante.cpf ||
        !cadastroRepresentante.nome ||
        !cadastroRepresentante.email ||
        !cadastroRepresentante.telefone ||
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
      this.cadastrandoEmpresa = true
      const res = await axios.post(
        `${Constantes.URL_API_INTEGRADORA}pti/Instituicao/cadastroInicial`,
        {
          // Região e nome estão chumbados por enquanto
          agenteId: this.usuarioLogado.id,
          cadastroEmpresa: {
            nome: cadastroEmpresa.razaoSocial,
            cnpj: cadastroEmpresa.cnpj,
            razaoSocial: cadastroEmpresa.razaoSocial,
            cnaePrincipal: cadastroEmpresa.cnaePrincipal,
            grauDeRisco: cadastroEmpresa.grauDeRisco,
            regiao: 2,
            divisaoCnae: cadastroEmpresa.divisaoCnae,
            grupoCnae: cadastroEmpresa.grupoCnae,
            porte: cadastroEmpresa.porte,
            optanteSimplesNacional:
              cadastroEmpresa.optanteSimplesNacional || false
          },
          cadastroRepresentante: {
            cpf: cadastroRepresentante.cpf,
            nome: cadastroRepresentante.nome,
            email: cadastroRepresentante.email,
            telefone: cadastroRepresentante.telefone,
            cargo: cadastroRepresentante.cargo
          }
        },
        { headers: header.headers() }
      )
      this.cadastrandoEmpresa = false

      if (res.data.codigo === 200) {
        const { idRepresentante, idEmpresa } = res.data.dado
        await this.$store.dispatch({
          type: 'empresa/setInfos',
          params: {
            empresaId: idEmpresa,
            representanteId: idRepresentante
          }
        })
        await this.$store.dispatch({
          type: 'diagnostico/setRepresentanteResponsavel',
          params: { ...cadastroRepresentante, representanteId: idRepresentante }
        })

        await this.$store.dispatch({
          type: 'user/setEmpresaCadastrada',
          params: {
            atrasado: false,
            conclusao: 0,
            empresaId: idEmpresa,
            nomeEmpresa: cadastroEmpresa.razaoSocial,
            status: 'Etapa 1',
            ultimaVisita: new Date()
          }
        })

        this.showToast(
          'Sucesso',
          'success',
          'Empresa e representante adicionados com sucesso!',
          'b-toaster-top-left',
          3000
        )

        this.$router.replace({
          path: 'cadastraEmpresa/informacoes',
          query: {
            idRepresentante,
            idEmpresa
          }
        })
      } else {
        return this.showToast(
          'Erro',
          'info',
          res.data.resposta,
          'b-toaster-top-left',
          3000
        )
      }
    },

    async getInfosEmpresa(cnpj) {
      this.buscandoCnpj = true
      if (cnpj.length === 14) {
        try {
          const res = await axios.get(Constantes.URL_BRASIL_API + 'cnpj/v1/' + cnpj)
          if (res.status === 200) {
            const cnaeFromServer = res.data.cnae_fiscal.toString()

            // Corrige o cnae da API Brasil caso comece com 0 (valor de retorno omite o 0 por ser um number)
            if (cnaeFromServer.length < 7) {
              const fixedCnae = '0' + cnaeFromServer
              this.dados.cadastroEmpresa.cnaePrincipal = fixedCnae
              await this.getDivisaoEGrupo(fixedCnae)
            } else {
              this.dados.cadastroEmpresa.cnaePrincipal = cnaeFromServer
              await this.getDivisaoEGrupo(cnaeFromServer)
            }
            this.dados.cadastroEmpresa.razaoSocial = res.data.razao_social
            this.dados.cadastroEmpresa.optanteSimplesNacional = res.data.opcao_pelo_simples
            if (res.data.descricao_situacao_cadastral !== 'Ativa') {
              this.alertarUsuarioEmpresaNaoAtiva()
            }
          } else {
            this.dados.cadastroEmpresa.razaoSocial = null
            this.dados.cadastroEmpresa.cnaePrincipal = null
            this.dados.cadastroEmpresa.optanteSimplesNacional = false
          }
        } catch (error) {
          this.dados.cadastroEmpresa.razaoSocial = null
          this.dados.cadastroEmpresa.cnaePrincipal = null
          this.dados.cadastroEmpresa.optanteSimplesNacional = false
        }
      } else {
        this.dados.cadastroEmpresa.razaoSocial = null
        this.dados.cadastroEmpresa.cnaePrincipal = null
        this.dados.cadastroEmpresa.optanteSimplesNacional = false
      }
      this.buscandoCnpj = false
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
              this.dropGrupos = []
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
            } else {
              this.dropDivisoes = []
              this.dropGrupos = []
              this.dados.cadastroEmpresa.grupoCnae = ''
              this.dados.cadastroEmpresa.divisaoCnae = ''
            }
          }
        } catch (error) {
          console.error(error)
        }
      }
    },
    alertarUsuarioEmpresaNaoAtiva() {
      this.$bvModal.show('modal-alerta-empresa-nao-ativa')
    }
  }
})
</script>

<style scoped>
.container {
  max-width: 720px;
  width: 100%;
  padding: 2.25rem 4% 1.875rem 4%;
  margin: 0 auto;
}

.head-title {
  width: 100%;
  display: flex;
  height: 1.18rem;
  margin-bottom: 2.25rem;
  align-items: center;
  justify-content: center;
}

.head-title p {
  font-family: 'GothamBook';
  color: var(--main-light);
  font-size: 1.125rem;
  margin: 0;
}

.head-title img {
  margin: 0 1.25rem;
  height: 1rem;
}

.head-title span {
  color: var(--main-light);
  font-family: 'Gotham-bold';
  font-size: 1.125rem;
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
  padding-right: 2.5rem !important;
  white-space: nowrap;
  text-overflow: ellipsis;
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
