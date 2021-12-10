<template>
  <div class="container-fluid">
    <div class="row">
      <section class="col-xl-10 offset-xl-1 col-12 visita-atrasada mt-5">
        <label for="prazo-ultrapassado">Atenção, prazo ultrapassado!</label>
        <div class="box-branco prazo-ultrapassado">
          <div class="row">
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
            <div class="col-xl-6 d-none d-xl-block">
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
          <div class="overflow-empresas">
            <div class="row">
              <div
                v-for="(empresa, index) in empresasFicticiasAtrasadas"
                :key="index"
                class="col-12 col-xl-6"
              >
                <Empresa
                  :nome-empresa="empresa.nome"
                  :etapa="empresa.etapa"
                  :conclusao="empresa.conclusao"
                  :ultima-visita="empresa.ultimaVisita"
                  :atrasado="true"
                />
              </div>
            </div>
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
      ]
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
  .visita-atrasada label {
    font-family: 'Gotham-bold';
    color: #053F5C;
    font-size: 15px;
    padding-left: 39px;
  }
  .legendas {
    font-family: 'Gotham-light';
    font-size: 12px;
    color: #053F5C;
    font-weight: bolder;
    padding: 0 15px;
  }
  .prazo-ultrapassado {
    max-height: 600px;
  }
</style>
