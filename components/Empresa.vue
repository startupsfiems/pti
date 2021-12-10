<template>
  <NuxtLink
    :to="'empresa/' + empresaId"
    class="empresa"
    :class="{ 'bg-not-cool': atrasado, 'bg-cool': !atrasado }"
  >
    <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <div class="nome-empresa">
            {{ nomeEmpresa }}
          </div>
        </div>
        <div class="col-2">
          <div class="etapa">
            {{ etapa }}
          </div>
        </div>
        <div class="col-2">
          <div class="conclusao text-center">
            {{ conclusao }}
          </div>
        </div>
        <div class="col-3 wrapper-ultima-visita">
          <label v-if="atrasado" for="ultima-visita" class="warning-icon">
            <img src="~/static/assets/warning.svg" alt="" />
          </label>
          <div
            id="ultima-visita"
            class="ultima-visita"
            :class="{ 'warning-text': atrasado }"
          >
            {{ ultimaVisita }}
          </div>
        </div>
        <div class="col-2">
          <div class="resultados">
            <!-- <NuxtLink :to="'../diagnostico/resultados'">
              <img src="~/static/assets/resultados.svg" alt="results-icon" />
            </NuxtLink> -->
            <NuxtLink
              :to="{
                path: '../diagnostico/resultados', query: {
                  empresaId: empresaId,
                  etapaDiagnosticoId: etapaDiagnosticoId,
                  planoDeAcaoId: planoDeAcaoId,
                  gerarPDF: false
                }
              }"
            >
              <img src="~/static/assets/resultados.svg" alt="results-icon" />
            </NuxtLink>

            <NuxtLink :to="'/editarEmpresa/' + empresaId">
              <img src="~/static/assets/editar.svg" alt="edit-icon" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'Empresa',
  props: {
    nomeEmpresa: {
      type: String,
      default: 'Nome da Empresa'
    },
    etapa: {
      type: String,
      default: 'Etapa 0'
    },
    conclusao: {
      type: Number,
      default: 0
    },
    ultimaVisita: {
      type: String,
      default: '00/00/0000'
    },
    atrasado: {
      type: Boolean,
      default: false
    },
    empresaId: {
      type: Number,
      default: 0
    },
    etapaDiagnosticoId: {
      type: Number,
      default: 0
    },
    planoDeAcaoId: {
      type: Number,
      default: null
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.etapa {
  white-space: nowrap;
}
.bg-not-cool {
  background-color: #ffd6d6;
}
.bg-cool {
  background-color: #d9ecf2;
}
.wrapper-ultima-visita {
  display: flex;
  flex-direction: row;
}
.empresa {
  border: 0;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: space-around;
  margin: 10px 0;
  height: 41px;
  cursor: pointer;
}
.empresa:hover {
  border: 1px solid blue;
}
.nome-empresa {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.resultados {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.nome-empresa,
.etapa,
.conclusao,
.ultima-visita {
  font-family: 'Gotham-bold';
  font-size: 15px;
  color: #053f5c;
}
.warning-icon {
  background-repeat: no-repeat;
  text-align: center;
  background-size: contain;
  height: 24px;
  width: 24px;
  margin: 0;
  right: 10px;
  bottom: 10%;
  position: relative;
}
.warning-text {
  color: #e30c0c;
}
</style>
