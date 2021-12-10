<template>
  <nav class="side-menu-container">
    <main>
      <button @click.prevent="$emit('close-menu')">
        <img src="/assets/hamburguer-menu.svg" alt="menu" />
      </button>
      <NuxtLink v-if="userPermission === 74" class="menu-item s-gbl" to="/listaEmpresas">
        <img src="/assets/home-icon.svg" alt="home-icon" />
        HOME
      </NuxtLink>
      <div class="menu-item s-gbl painel" @click.prevent="showList()">
        <img src="/assets/results-panel-icon.svg" alt="home-icon" />
        PAINEL DE RESULTADOS
        <ul id="areas" @click="$router.push({path: '/painelResultados'})">
          <li>
            Empresas
          </li>
          <li>
            Ações
          </li>
        </ul>
      </div>
      <NuxtLink v-if="userPermission === 73" class="menu-item s-gbl" to="/novoTipoAcao/cadastrarTarefas">
        <img src="/assets/check-icon.svg" alt="home-icon" />
        NOVO CHECKLIST
      </NuxtLink>
      <!-- <NuxtLink v-if="userPermission === 74" class="menu-item s-gbl" to="#">
        <img src="/assets/pen-icon.svg" alt="home-icon" />
        NOVO TIPO AÇÃO
      </NuxtLink> -->
    </main>
  </nav>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
    // 74 === agente
    userPermission: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      //
    }
  },
  methods: {
    showList() {
      const list = document.querySelector('#areas')
      const parent = list.parentElement
      if (list.style.display === 'block') {
        list.style.display = 'none'
        parent.style.height = '70px'
      } else {
        list.style.display = 'block'
        parent.style.height = '100px'
      }
    }
  }
}
</script>

<style scoped>
  .side-menu-container {
    position: fixed;
    left: 0;
    top: 0;
    background-color: var(--text-title);
    width: 24rem;
    height: 100vh;
    z-index: 9999;
  }
  .side-menu-container main {
    display: flex;
    flex-direction: column;
    padding: 21px 0;
    color: white;
    align-items: flex-start;
    height: 100%;
  }
  .side-menu-container button {
    background: none;
    border: 0;
    padding: 0;
    z-index: 99999;
    margin-left: 3.6rem;
    margin-bottom: 1.56rem;
  }
  .side-menu-container a img, .painel img {
    height: 1.75rem;
    width: 1.75rem;
    margin-right: 1rem;
  }
  .menu-item {
    display: block;
    width: 100%;
    height: 70px;
    line-height: 70px;
    padding: 0 3.6rem;
    color: white;
    font-size: 1.125rem;
    white-space: nowrap;
    position: relative;
  }
  .menu-item:hover {
    background-color: lightblue;
    transition: ease 0.5s;
    cursor: pointer;
  }
  .menu-item:hover {
    text-decoration: none;
  }
  .painel ul {
    display: none;
  }
  .painel ul {
    color: white;
    height: 40px;
    line-height: 40px;
    margin-left: 23px;
    position: absolute;
    top: 50px;
  }
  .painel ul li {
    height: 20px;
    line-height: 20px;
  }
  @media (max-width: 576px) {
    .side-menu-container a img {
      height: 1.4rem;
      width: 1.4rem;
    }
    .menu-item {
      font-size: 1rem;
    }
    .side-menu-container button {
      margin-left: 2.6rem;
    }
    .menu-item {
      padding-left: 2.6rem;
    }
    .side-menu-container {
      width: 20rem;
    }
  }
</style>
