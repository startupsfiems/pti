<template>
  <div class="container-fluid">
    <div class="row">
      <section class="col-xl-10 offset-xl-1 col-12 mt-5">
        <div class="box-branco empresas-do-agente">
          <NuxtLink to="/cadastraEmpresa">
            <button class="btn-light-blue">
              Cadastrar empresa
            </button>
          </NuxtLink>
          <div v-if="empresas.length > 0">
            <div class="col-12">
              <div class="buscar-empresa">
                <button class="btn-lupa" />
                <input id="buscar-empresa" v-model="searchInput" type="text" name="buscar-firma" placeholder="Busque aqui" />
              </div>
            </div>
            <div v-if="empresasData.length > 0">
              <div class="row mt-69">
                <div class="col-12 col-xl-6">
                  <div class="row legendas">
                    <div class="col-3">
                      Nome
                    </div>
                    <div class="col-2">
                      Status
                    </div>
                    <div class="col-2 text-center">
                      Conclusão
                    </div>
                    <div class="col-3">
                      Última visita
                    </div>
                    <div class="col-2 r-25">
                      Resultados
                    </div>
                  </div>
                </div>
                <div v-if="empresasData.length > 1" class="col-xl-6 d-none d-xl-block">
                  <div class="row legendas">
                    <div class="col-3">
                      Nome
                    </div>
                    <div class="col-2">
                      Status
                    </div>
                    <div class="col-2 text-center">
                      Conclusão
                    </div>
                    <div class="col-3">
                      Última visita
                    </div>
                    <div class="col-2 r-25">
                      Resultados
                    </div>
                  </div>
                </div>
              </div>

              <div class="overflow-empresas mb-69">
                <div class="row">
                  <div
                    v-for="empresa in empresasData"
                    :key="empresa.idEmpresa"
                    class="col-12 col-xl-6"
                  >
                    <Empresa
                      :nome-empresa="empresa.nomeEmpresa"
                      :etapa="empresa.status"
                      :conclusao="empresa.conclusao"
                      :ultima-visita="new Date(empresa.ultimaVisita).toLocaleDateString('pt-br')"
                      :empresa-id="empresa.empresaId"
                      :etapa-diagnostico-id="empresa.etapaDiagnosticoId"
                      :plano-de-acao-id="empresa.planoDeAcaoId"
                      :atrasado="false"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="message-info">
              <strong>Nenhuma empresa encontrada :(</strong>
            </div>
          </div>
          <div v-else class="text-center">
            <strong>Não existem empresas cadastradas ainda :)</strong>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListaEmpresas',
  props: {
    empresas: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      empresasFicticiasAtrasadas: [
        {
          nome: 'Pescados do seu Zé',
          status: 'Etapa 2',
          conclusao: 25,
          ultimaVisita: '15/06/2021'
        },
        {
          nome: 'Saul Goodman',
          status: 'Etapa 1',
          conclusao: 50,
          ultimaVisita: '15/06/2021'
        },
        {
          nome: 'Da ponte pra cá',
          status: 'Etapa 2',
          conclusao: 25,
          ultimaVisita: '15/06/2021'
        },
        {
          nome: 'Nome grande, muito grande, grande mesmoooooooooooooooooooooooooooooooooooo',
          status: 'Etapa 2',
          conclusao: 25,
          ultimaVisita: '15/06/2021'
        },
        {
          nome: 'Pescados do seu Zé',
          status: 'Etapa 2',
          conclusao: 25,
          ultimaVisita: '15/06/2021'
        },
        {
          nome: 'Pescados do seu Zé',
          status: 'Etapa 2',
          conclusao: 25,
          ultimaVisita: '15/06/2021'
        },
        {
          nome: 'Pescados do seu Zé',
          status: 'Etapa 2',
          conclusao: 25,
          ultimaVisita: '15/06/2021'
        },
        {
          nome: 'Pescados do seu Zé',
          status: 'Etapa 2',
          conclusao: 25,
          ultimaVisita: '15/06/2021'
        },
        {
          nome: 'Pescados do seu Zé',
          status: 'Etapa 2',
          conclusao: 25,
          ultimaVisita: '15/06/2021'
        },
        {
          nome: 'Pescados do seu Zé',
          status: 'Etapa 2',
          conclusao: 25,
          ultimaVisita: '15/06/2021'
        },
        {
          nome: 'Pescados do seu Zé',
          status: 'Etapa 2',
          conclusao: 25,
          ultimaVisita: '15/06/2021'
        },
        {
          nome: 'Pescados do seu Zé',
          status: 'Etapa 2',
          conclusao: 25,
          ultimaVisita: '15/06/2021'
        },
        {
          nome: 'Pescados do seu Zé',
          status: 'Etapa 2',
          conclusao: 25,
          ultimaVisita: '15/06/2021'
        }
      ],

      empresasData: this.empresas,

      searchInput: ''
    }
  },
  watch: {
    searchInput(newValue) {
      if (!this.searchInput) {
        this.empresasData = this.empresas
      } else {
        // eslint-disable-next-line array-callback-return
        const empresasFiltradas = this.empresas.filter((item) => {
          // item.nomeEmpresa.includes(newValue)
          const inputMinuscula = newValue.toLowerCase()
          const nomeDaEmpresaMinusculo = item.nomeEmpresa.toLowerCase()

          if (nomeDaEmpresaMinusculo.includes(inputMinuscula)) {
            return true
          }
        })

        this.empresasData = empresasFiltradas
      }
    }
  }
}
</script>

<style scoped>
    .overflow-empresas {
      max-height: 300px;
      overflow-x: hidden;
      overflow-y: auto;
      padding-right: 12px;
    }
    .empresas-do-agente {
        max-height: 500px;
        padding: 36px 12px 36px 24px;
    }
    .btn-lupa {
        background-color: unset;
        background-image: url('~/static/assets/lupa.svg');
        border: 0;
        height: 16px;
        width: 16px;
        position: absolute;
        right: 15px;
        z-index: 999;
        top: 8px;
    }
    .buscar-empresa {
        width: fit-content;
        position: relative;
    }
    .buscar-empresa input {
        padding: 0 30px;
        width: 178px;
        height: 30px;
        line-height: 30px;
        border-radius: 40px;
        border: 0;
        background-color: #DAE2E7;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        font-family: 'Gotham-light';
        font-size: 13px;
        outline: none;
    }
    .btn-light-blue {
        width: 250px;
        font-family: 'Gotham-light';
        font-size: 16px;
        position: absolute;
        top: -20px;
        right: 30px;
    }
    .legendas {
        font-family: 'Gotham-light';
        font-size: 12px;
        color: #053F5C;
        font-weight: bolder;
        padding: 0 15px;
    }

    .message-info {
      height: 80px;
      display: flex;
      align-items: center;
    }
</style>
