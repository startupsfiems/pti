<template>
  <div>
    <div v-if="type === 'doted-list'" class="box-list-container">
      <h1 class="title" :style="titleStyle">
        {{ title }}
      </h1>

      <main>
        <!-- fazer o For depois -->
        <div v-for="(pagina, indexP) in tamanhoPaginação" :key="indexP">
          <div v-if="pagina === posicaoPaginacao + 1 ">
            <div
              v-for="(item) in arraysItemsDasPaginas[posicaoPaginacao]"
              :key="item.id"
            >
              <p class="nome">
                <span>{{ item.id + 1 }}.</span>
                {{ item.nome }}
              </p>
              <div class="line-separator" />
              <p class="valor">
                {{ item.valor }}
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <button @click="decrementarPagina">
          <img src="/assets/arrow-left-darkblue.svg" />
        </button>

        <button
          v-for="(pagina, index) in tamanhoPaginação"
          :key="index"
          class="pagina"
          :style="pagina === posicaoPaginacao + 1 && { fontWeight: 'bold' }"
          @click="setPaginaAtual(pagina)"
        >
          {{ pagina }}<span v-if="pagina < tamanhoPaginação">,</span>
        </button>

        <button @click="incrementarPagina">
          <img src="/assets/arrow-right-darkblue.svg" />
        </button>
      </footer>
    </div>

    <section v-else-if="type === 'row-list'" class="box-branco acoes-mais-indicadas">
      <header>
        <h4 class="m-gbl text-center mb-3">
          {{ title }}
        </h4>
      </header>
      <body>
        <div v-for="(pagina, indexP) in tamanhoPaginação" :key="indexP">
          <div v-if="pagina === posicaoPaginacao + 1 ">
            <div v-for="(item) in arraysItemsDasPaginas[posicaoPaginacao]" :key="item.id" class="gray-row gbl">
              <div class="nome-acao">
                <span class="s-gbl">{{ item.id }}.</span>
                {{ item.nome }}
              </div>
              <div class="quantidade-indicacoes">
                <span class="s-gbl">{{ item.valor }}</span>
              </div>
            </div>
          </div>
        </div>
      </body>

      <footer>
        <button @click="decrementarPagina">
          <img src="/assets/arrow-left-darkblue.svg" />
        </button>

        <button
          v-for="(pagina, index) in tamanhoPaginação"
          :key="index"
          class="pagina"
          :style="pagina === posicaoPaginacao + 1 && { fontWeight: 'bold' }"
          @click="setPaginaAtual(pagina)"
        >
          {{ pagina }}<span v-if="pagina < tamanhoPaginação">,</span>
        </button>

        <button @click="incrementarPagina">
          <img src="/assets/arrow-right-darkblue.svg" />
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
export default {
  name: 'BoxList',

  props: {
    title: { type: String, required: true },
    listaData: { type: Array, required: true },
    limite: { type: Number, default: 10 },
    type: { type: String, default: 'doted-list' },
    titleStyle: { type: Object, default: () => {} }
  },

  data() {
    return {
      tamanhoPaginação: Math.ceil(this.listaData.length / this.limite),
      posicaoPaginacao: 0,
      arraysItemsDasPaginas: []
    }
  },

  mounted() {
    // console.log(this.tamanhoPaginação)
    this.separarArraysDePaginas()
  },
  methods: {
    setPaginaAtual(pagina) {
      this.posicaoPaginacao = pagina - 1
    },

    incrementarPagina() {
      if (this.posicaoPaginacao < this.tamanhoPaginação - 1) {
        this.posicaoPaginacao += 1
      }
    },

    decrementarPagina() {
      if (this.posicaoPaginacao > 0) {
        this.posicaoPaginacao -= 1
      }
    },

    separarArraysDePaginas() {
      const a = this.listaData
      while (a.length) {
        this.arraysItemsDasPaginas.push(a.splice(0, this.limite))
      }
      let id = 1
      this.arraysItemsDasPaginas.forEach((array) => {
        for (const obj of array) {
          if (!Object.hasOwnProperty.call(obj, 'id')) {
            obj.id = id
          }
          id++
        }
      })
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
}

.box-list-container {
  width: 100%;
  min-height: 32.5rem;

  border: 1.5px solid var(--text-title);
  border-radius: 8px;
  padding: 1.8rem;
  background-color: var(--shape);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: 1.25rem;
  color: var(--main-light);
  margin-bottom: 1.8rem;
  align-self: flex-start;
  max-height: 1.5rem;
  word-break: break-all;
}

main {
  width: 100%;
  flex: 1;
}

main > div > div {
  width: 100%;
  display: flex;
  flex-direction: column;
}

main > div > div > div {
  width: 100%;
  display: flex;
  align-items: center;

  font-size: 0.85rem;
  color: var(--text-title);
  margin-bottom: 1rem;
}

main .nome span,
main .valor {
  font-weight: bold;
}

main div .line-separator {
  display: flex;
  flex: 1;
  margin: 0 .8rem;
  border-top: 1px dashed  var(--text-title);
  margin-top: 4px;
}

footer {
  margin-top: 0.8rem;
  display: flex;
  align-items: center;
}

footer img {
  height: 0.9rem;

}

footer button {
  border: 0;
  padding: 0;
  background-color: transparent;
  margin: 0 .9rem;
  margin-top: -2px;
}

footer .pagina {
  margin-top: 0;
  margin: 0 .4rem;
  font-size: 1.2rem;
}
  .acoes-mais-indicadas .m-gbl {
    font-size: 1.25rem;
    color: var(--main-light)
  }
  .acoes-mais-indicadas {
    padding: 40px 100px;
    height: 467px;
  }
  .acoes-mais-indicadas body {
    display: flex;
    flex-direction: column;
    height: 305px;
  }
  .acoes-mais-indicadas .gray-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 1.56rem;
    line-height: 1.56rem;
    background-color: rgba(182, 182, 182, 0.2);
    border-radius: 30px;
    padding: 0 30px 0 24px;
    margin: 5px 0;
  }
  .acoes-mais-indicadas .gray-row span {
    font-weight: bolder;
  }
  .acoes-mais-indicadas .nome-acao {
    width: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .acoes-mais-indicadas footer {
    justify-content: center;
  }
</style>
