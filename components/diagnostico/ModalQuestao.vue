<template>
  <div class="container-fluid card-questao">
    <div class="row">
      <p id="enunciado">
        {{ questao.enunciado }}
      </p>
      <br />
      <p v-if="questao.explicacao !== null" id="explicacao">
        * {{ questao.explicacao }}
      </p>
      <b-form-group v-slot="{ ariaDescribedby }" class="pb-3">
        <div
          v-for="(alternativa, index) in alternativas"
          :key="index"
          class="content-questions"
          :style="{ postion: 'relative' }"
        >
          <label :for="alternativa.id" class="radio">
            <div v-if="index == indexSelecionado" class="selected" />
          </label>

          <b-form-radio
            :id="alternativa.id"
            v-model="indexSelecionado"
            class="radio-item"
            :aria-describedby="ariaDescribedby"
            :name="`alternativas-questao` + questao.id"
            :value="index"
            :checked="index == indexSelecionado"
            :disabled="mostrandoRespostas"
          >
            {{ alternativa.texto }}
          </b-form-radio>
        </div>
      </b-form-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalQuestao',
  props: {
    questao: {
      type: Object,
      default: () => {
        return {
          id: 403,
          enunciado: 'A empresa possui um programa para retenção de talentos?',
          explicacao: 'Missão, visão, posicionamento, orçamento financeiro, onde pretende chegar nos próximos 3 anos, objetivos e metas',
          pontuacao: 1.0,
          jsonQuestao: '{\n   "alternativas": [\n      {\n         "texto": "Não possui",\n         "pontuacao": 0\n      },\n      {\n         "texto": "Não possui mas realiza ações eventuamente com o objetivo de reter talentos",\n         "pontuacao": 0.33\n      },\n      {\n         "texto": "Não possui um programa formalizado mas realiza ações como pesquisa de clima e desenvolvimento de carreira",\n         "pontuacao": 0.66\n      },\n      {\n         "texto": "Possui um programa formalizado, realiza pesquisa de clima, ações para desenvolvimento de carreira, tem propósito claro com alinhamento de valores pessoa-empresa e mensura resultados dessas ações",\n         "pontuacao": 1\n      }\n   ],\n   "aleatorio": false\n}'
        }
      }
    },
    atividadeId: {
      type: Number,
      default: 0
    },
    resposta: {
      type: Object,
      default: null
    },
    mostrandoRespostas: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      alternativas: [],
      indexSelecionado: -1,
      carregado: false
    }
  },
  watch: {
    indexSelecionado(novo, anterior) {
      if (this.carregado) {
        this.salvarRespostaDeQuestao()
      } else {
        this.carregado = true
      }
    },
    questao() {
      this.setaAlternativasESelecionado()
    }
  },
  mounted() {
    this.setaAlternativasESelecionado()
    if (!this.mostrandoRespostas) {
      this.carregado = true
    }
  },
  methods: {
    async salvarRespostaDeQuestao() {
      const atividadeId = this.atividadeId
      const questaoId = this.questao.id
      const nota = this.alternativas[this.indexSelecionado].pontuacao
      const resposta = this.alternativas[this.indexSelecionado].texto
      await this.$store.dispatch({
        type: 'diagnostico/setRespostaQuestao',
        atividadeId,
        questaoId,
        nota,
        resposta
      })
    },
    setaAlternativasESelecionado() {
      this.alternativas = JSON.parse(this.questao.jsonQuestao).alternativas
      // trecho para gerar Id para cada alternativa
      this.alternativas = this.alternativas.map((item) => { return { ...item, id: String(Math.random()) } })
      if (this.resposta.jsonResposta !== '') {
        if (this.resposta.nota === 0.0) {
          this.indexSelecionado = 0
        } else if (this.resposta.nota === 0.33) {
          this.indexSelecionado = 1
        } else if (this.resposta.nota === 0.66) {
          this.indexSelecionado = 2
        } else {
          this.indexSelecionado = 3
        }
      }
    }
  }
}
</script>

<style>
  .card-questao {
    background: #FFFFFF;
    border: 1px solid #053F5C;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 2em 6em 0 4em;
  }

  #enunciado {
    font-family: GothamBook;
    font-style: normal;
    font-weight: normal;
    font-size: 1.2rem;
    line-height: 1.2rem;
    color: #053F5C;
  }

  #explicacao {
    font-family: GothamBook;
    font-style: italic;
    font-weight: normal;
    font-size: 1.1rem;
    line-height: 1.2rem;
    color: #429EBD;
    padding-left: 1em;
    padding-right: 10em;
  }

  input[type=radio] {
    border: 0px;
    width: 100%;
    height: 2em;
  }

  .content-questions:not(:first-of-type) {
    margin-top: 18px;
  }

  .radio-item{
    font-family: GothamBook;
    font-style: normal;
    font-weight: normal;
    font-size: 1.1rem;
    line-height: 1.3rem;

    color: #053F5C;

    margin-left: 9px;
    margin-top: 4px;
  }

  .radio {
    width: 27px;
    height: 27px;
    background-color: #fff;
    border: 1px solid var(--text-title);
    border-radius: 50%;

    position: absolute;
    margin-top: -2px;
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .selected {
    width: 11px;
    height: 11px;
    background-color:  var(--text-title);
    border-radius: 50%;
  }
</style>
