<template>
  <div>
    <div class="row gbl text-center mt-5 legenda">
      <div class="col-12 text-left s-gbl mb-2">
        Ação {{ acaoIndex }}
      </div>
      <div class="col-2">
        Data efetiva de início
      </div>
      <div class="col-2">
        Valor negociado
      </div>
      <div class="col-2">
        Início
      </div>
      <div class="col-2">
        Conclusão
      </div>
      <div class="col-2">
        % de conclusão
      </div>
      <div class="col-2">
        Histórico
      </div>
    </div>
    <div tabindex="0" class="row row-amarelo-claro m-gbl mt-1" @click="maisDetalhesDePlanoDeAcao()">
      <div class="col-2">
        {{ new Date(acao.dataInicioEfetivo).toLocaleDateString('pt-br') || 'DD/MM/AA' }}
      </div>
      <div class="col-2">
        {{ 'R$' + acao.valorNegociado || 'R$' }}
      </div>
      <div class="col-2">
        {{ new Date(acao.dataInicio).toLocaleDateString('pt-br') }}
      </div>
      <div class="col-2">
        {{ new Date(acao.dataFim).toLocaleDateString('pt-br') }}
      </div>
      <div class="col-2">
        {{ acao.percentualAtingido }}%
      </div>
      <div class="col-2">
        <a tabindex="1" @click="hitoricoDaAcao(acao.acaoId, planoDeAcaoId, etapaId)">
          <img src="~/static/assets/clock-icon.svg" alt="history-icon" />
        </a>
      </div>
    </div>
  </div>
  <!-- <div tabindex="0" class="row row-amarelo-claro m-gbl mt-3" @click="maisDetalhesDePlanoDeAcao()">
    <div class="col-2">
      DD/MM/AA
    </div>
    <div class="col-2">
      R$
    </div>
    <div class="col-2">
      {{ new Date(acao.dataInicio).toLocaleDateString('pt-br') }}
    </div>
    <div class="col-2">
      {{ new Date(acao.dataFim).toLocaleDateString('pt-br') }}
    </div>
    <div class="col-2">
      {{ acao.percentualAtingido }}%
    </div>
    <div class="col-2">
      <a tabindex="1" @click="hitoricoDaAcao(acao.acaoId, planoDeAcaoId, etapaId)">
        <img src="~/static/assets/clock-icon.svg" alt="history-icon" />
      </a>
    </div>
  </div> -->
</template>

<script>

export default {
  name: 'Acao',
  props: {
    acao: {
      type: Object,
      default() {
        return {}
      }
    },
    acaoIndex: {
      type: Number,
      default: 0
    },
    etapaId: {
      type: Number,
      default: 0
    },
    planoDeAcaoId: {
      type: Number,
      default: 0
    }
  },
  methods: {
    maisDetalhesDePlanoDeAcao() {
      const params = {
        etapaDiagnosticoId: this.etapaId,
        planoDeAcaoId: this.planoDeAcaoId
      }
      this.$store.dispatch({
        type: 'empresa/setInfos',
        params
      }).then(() => {
        this.$router.push({
          path: '/planoDeAcao/listaAcoes'
        })
      })
    },
    hitoricoDaAcao(acao, planoDeAcao, etapa) {
      event.stopImmediatePropagation()
      this.$router.push({
        path: this.$router.currentRoute.path + '/historicoAcompanhamentos/' + acao,
        query: {
          planoDeAcaoId: planoDeAcao,
          etapaId: etapa
        }
      })
    }
  }
}
</script>

<style scoped>
.row-amarelo-claro {
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.row-amarelo-claro:hover, .row-amarelo-claro:focus-within {
  cursor: pointer;
  border: 0.75px solid coral;
}
a {
  text-decoration: underline;
  cursor: pointer;
}
.s-gbl {
  font-size: 1.2rem;
}
.legenda {
  font-size: 0.75rem;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.row-amarelo-claro div {
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
