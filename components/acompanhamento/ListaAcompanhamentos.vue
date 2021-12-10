<template>
  <div class="acompanhamentos" :class="{'sticky-acompanhamento': planosDeAcao.length > 1}">
    <h5>Acompanhamentos</h5>
    <div v-if="planosDeAcao.length > 0" class="acompanhamentos-box">
      <div class="labels gbl">
        <div>Data</div>
        <div>Canal</div>
        <!-- NÃO REMOVER GAMBIARRA -->
        <div id="gambiarra" />
      </div>
      <div v-if="acompanhamentos.length > 0" class="vertical-overflow">
        <div v-for="acompanhamento in acompanhamentos" :key="acompanhamento.acompanhamentoId">
          <div class="row-amarelo-claro mb-3" :class="{'acompanhamento-cancelado': acompanhamento.cancelado === true}" @click.prevent="visualizarAcompanhamento($route.params.empresa, acompanhamento.acompanhamentoId)">
            <div class="data">
              {{ new Date(acompanhamento.data).toLocaleDateString('pt-br') }}
            </div>
            <div class="telefone">
              {{ acompanhamento.canalDeAtendimento }}
            </div>
            <NuxtLink tabindex="0" class="gbl" :to="'/empresa/' + $route.params.empresa + '/visualizarAcompanhamentos/' + acompanhamento.acompanhamentoId">
              detalhes
            </NuxtLink>
          </div>
        </div>
        <button class="btn-light-blue" @click="validarNovoAcompanhamento()">
          Novo acompanhamento
        </button>
      </div>
      <div v-else>
        <h5>Ainda não foi criado um acompanhamento!</h5>
        <NuxtLink
          v-if="planosDeAcao[planosDeAcao.length - 1].acoes.length > 0"
          :to="$route.params.empresa + '/novoAcompanhamento?etapa=' + etapaId"
        >
          <button class="btn-light-blue">
            Novo acompanhamento
          </button>
        </NuxtLink>
      </div>
    </div>
    <div v-else class="acompanhamentos-box">
      <h5>Aprove um plano de ação para fazer o acompanhamento.</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListaAcompanhamentos',
  props: {
    planosDeAcao: {
      type: Array,
      default() {
        return []
      }
    },
    etapaId: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  computed: {
    // Este dado computado busca todos os acompanhamentos possíveis em uma etapa, incluindo aqueles que estão em planos de ação distintos.
    // TODO verificar acompanhamentos cujo plano foi cancelado.
    acompanhamentos() {
      const acompanhamentos = []
      if (this.planosDeAcao.length > 0) {
        this.planosDeAcao.forEach((pa) => {
          if (pa.acompanhamentos.length > 0) {
            for (let acompanhamento = 0; acompanhamento < pa.acompanhamentos.length; acompanhamento++) {
              acompanhamentos.push({
                acompanhamentoId: pa.acompanhamentos[acompanhamento].acompanhamentoId,
                canalDeAtendimento: pa.acompanhamentos[acompanhamento].canalDeAtendimento,
                data: pa.acompanhamentos[acompanhamento].data,
                cancelado: pa.idStatus === 6
              })
            }
          }
        })
      }
      return acompanhamentos
    }
  },
  methods: {
    visualizarAcompanhamento(empresa, acompanhamento) {
      this.$store.dispatch({
        type: 'empresa/setAcompanhamentosToSelect',
        params: this.acompanhamentos
      })
      this.$router.push({ path: '/empresa/' + empresa + '/visualizarAcompanhamentos/' + acompanhamento })
    },
    validarNovoAcompanhamento() {
      if (this.planosDeAcao[this.planosDeAcao.length - 1].idStatus !== 4) {
        this.showToast('Aprovação', 'info', 'Aprove um plano de ação para iniciar o acompanhamento', 'b-toaster-top-left', 3000)
      } else {
        this.$router.push({ path: this.$route.params.empresa + '/novoAcompanhamento?etapa=' + this.etapaId })
      }
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
    }
  }
}
</script>

<style scoped>
.row-amarelo-claro {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-size: 13px ;
    height: 40px;
    cursor: pointer;
}
.vertical-overflow {
  max-height: 390px;
  height: 100%;
  overflow-y: auto;
}
.row-amarelo-claro:hover {
    border: 1px solid lightcoral
}
.row-amarelo-claro a {
    color: #053F5C;
    text-decoration: underline;
}
.labels {
    font-size: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
.acompanhamentos {
  border-left: 1px solid #33434c;
  margin-left: 10px;
  padding-left: 30px;
}
.sticky-acompanhamento {
  position: sticky;
  top: 5px;
}
.acompanhamentos-box {
  position: relative;
  border: 1px solid #33434c;
  border-radius: 10px;
  height: 468px;
  padding: 30px 29px;
}
.acompanhamentos-box .btn-light-blue {
  width: 250px;
  height: 41px;
  position: absolute;
  bottom: -18px;
  top: unset;
  right: 0px;
}
.acompanhamento-cancelado {
  background-color: lightgray !important;
}
.acompanhamento-cancelado:hover {
  border: 1px solid gray;
}
</style>
