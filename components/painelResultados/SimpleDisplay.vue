<template>
  <div v-if="shape === 'circle'" class="container-simples">
    <div v-if="isPercentage" class="box-branco s-gbl">
      {{ dataToDisplay }}%
    </div>
    <div v-else class="box-branco s-gbl">
      {{ dataToDisplay }}
    </div>
    <aside class="gbl">
      {{ description }}
    </aside>
  </div>
  <div v-else-if="shape === 'rectangle'" class="container-simples-rectangle">
    <div class="box-branco s-gbl">
      <div v-if="formatter.hasFormatter" class="set-itens">
        <div v-for="(item, index) in formatter.data" :key="index">
          <aside class="gbl">
            {{ item.nome }}
          </aside>
          {{ displayer[index] || item.valor }}
        </div>
      </div>
      <div v-else>
        <aside class="gbl">
          {{ description }}
        </aside>
        {{ displayer || dataToDisplay }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleDisplay',
  props: {
    dataToDisplay: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      default: 'Descrição'
    },
    shape: {
      type: String,
      default: 'circle'
    },
    formatter: {
      type: Object,
      default() {
        return {
          hasFormatter: false,
          type: null,
          position: null,
          data: null
        }
      }
    },
    isPercentage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    displayer() {
      const displayer = []
      if (this.formatter.hasFormatter) {
        this.formatter.data.forEach((element) => {
          if (element.position === 'start') {
            displayer.push(element.type + ' ' + element.valor)
          } else {
            displayer.push(element.valor + ' ' + element.type)
          }
        })
      }
      return displayer
    }
  }
}
</script>

<style scoped>
  .container-simples {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    max-width: 13rem;
    margin: 5px;
  }
  .container-simples-rectangle .box-branco{
    padding: 15px;
    border-radius: 10px;
    min-height: 32.5rem;
    width: 100%;
  }
  .set-itens {
    display: flex;
    flex-direction: column;
    height: 30rem;
    justify-content: space-around;
  }
  .container-simples aside {
    text-align: left;
    margin-left: 10px;
    height: 60px;
    font-size: 1rem;
    /* display: flex; */
    width: 118px;
    line-height: 15px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    white-space: normal;
  }
  .container-simples .box-branco {
    border: 1px solid #000000;
    box-sizing: border-box;
    box-shadow: -7px 4px 10px -1px rgb(0 0 0 / 10%);
    height: 5.8rem;
    width: 5.8rem;
    display: flex;
    border-radius: 50px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-content: space-around;
  }
  .container-simples .s-gbl {
    font-size: 1.4rem
  }
  .container-simples-rectangle .s-gbl{
    font-size: 1.6rem;
    color: var(--main-light);
  }

</style>
