<template>
  <div class="card-acompanhamento box-branco">
    <h3 class="s-gbl">
      {{ acao.nome || acao.nomeAcao }}
    </h3>
    <p><strong class="gbl">{{ dataECanalDeAtendimento.data + ' | ' + dataECanalDeAtendimento.canalDeAtendimento }}</strong></p>
    <article :id="'texto-acao' + counter" class="gbl text-left mt-3 mb-4">
      {{ acao.observacao }}
    </article>
    <progress id="progresso-acao" :value="percentual" max="100">
      {{ percentual }}
    </progress>
    <aside class="s-gbl">
      <label for="progresso-acao" class="gbl">% de conclusão</label>{{ percentual }}%
    </aside>
  </div>
</template>

<script>
export default {
  props: {
    counter: {
      type: Number,
      default: -1
    },
    acao: {
      type: Object,
      default() {
        return {}
      }
    },
    dataECanalDeAtendimento: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    percentual() {
      let percentual
      if (this.acao.percentualAtingido === 0 || this.acao.percentualConclusao === 0) {
        percentual = 0
      } else {
        percentual = this.acao.percentualAtingido || this.acao.percentualConclusao
      }
      return percentual
    }
  },
  created() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('resize', this.injectOverFlow)
  },
  destroyed() {
    window.removeEventListener('resize', this.injectOverFlow)
  },
  methods: {
    injectOverFlow() {
      const text = document.querySelector('#texto-acao' + this.counter)

      if (text.clientHeight === 200) {
        text.classList.add('overflow-to-action-text')
      }
    }
  }
}
</script>

<style scoped>
    .box-branco {
        padding: 40px 45px;
        box-shadow: -5px 4px 5px 2px rgba(0, 0, 0, 0.05);
    }
    .card-acompanhamento {
        min-height: 300px;
        max-width: 80%;
        max-height: 60%;
        margin: auto;
    }
    .card-acompanhamento article{
        max-height: 200px;
    }
    .card-acompanhamento strong {
        color: #58AADB;
    }
    .card-acompanhamento h3 {
        font-size: 20px;
    }
    .card-acompanhamento aside {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
    }
    .overflow-to-action-text {
      text-overflow: ellipsis;
      overflow: auto;
      padding-right: 15px;
    }
    progress {
        width: 100%;
    }
    @media (max-width: 1300px) {
      .card-acompanhamento {
        max-width: 100%;
      }
    }
    @media (max-width: 918px) {
      .gbl {
          font-size: 12px;
      }
      .box-branco {
          padding: 20px 25px;
      }
    }
</style>
