<template>
  <div class="container-fluid">
    <div class="row header-container">
      <div class="col-xl-10 offset-xl-1 col-12">
        <header>
          <div v-if="usuarioLogado.permissaoId !== 72" class="logo-content">
            <button v-if="!showSideMenu" @click.prevent="openSideMenu()">
              <img src="/assets/hamburguer-menu.svg" alt="logo" />
            </button>
            <SideMenu
              v-if="showSideMenu"
              :user-permission="usuarioLogado.permissaoId"
              @close-menu="openSideMenu()"
            />
            <img src="~/static/assets/logo-fiems.svg" class="logo-fiems" alt="FIEMS" />
          </div>
          <h1>{{ title }}</h1>

          <div class="profile-content">
            <div class="user-content">
              <img src="/assets/user-icon.svg" alt="user" />
            </div>

            <p>{{ usuarioLogado.nome }}</p>

            <button @click="mostrarOpcoes">
              <img src="/assets/seta_down_branca.svg" alt="logo" />
            </button>

            <ul v-if="opcoesVisivel" class="options">
              <li @click="sair">
                Sair
              </li>
            </ul>
          </div>
        </header>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import SideMenu from './SideMenu.vue'

export default Vue.extend({
  components: { SideMenu },
  props: {
    title: { type: String, required: true },
    isHome: { type: Boolean, required: false }
  },
  data() {
    return {
      opcoesVisivel: false,
      showSideMenu: false
    }
  },
  computed: {
    ...mapState({
      usuarioLogado: state => state.user.usuarioLogado
    })
  },
  methods: {
    mostrarOpcoes() {
      this.opcoesVisivel = !this.opcoesVisivel
    },
    async sair() {
      await this.$store
        .dispatch({
          type: 'user/resetState'
        }).then(() => {
          this.$router.push({ name: 'index' })
        })
    },
    openSideMenu() {
      if (!this.showSideMenu) {
        this.showSideMenu = true
      } else {
        this.showSideMenu = false
      }
    }
  }
})
</script>

<style scoped>
.header-container {
  position: relative;
  max-width: 100vw;
  background-color: var(--main);
  /* padding: 1rem 4%; */
  height: 70px;
  margin: 0;
}
.container-fluid {
  padding: 0;
}

header {
  width: 100%;
  height: 100%;
  /* max-width: 1320px;
  margin: 0 auto; */
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

header h1 {
  font-size: 1.25rem;
  font-family: Gotham-Bold;
  color: var(--shape);
  line-height: 1.4rem;
  margin-top: 0.65rem;
  position: absolute;
  width: 100%;
  text-align: center;
  /* top: 0; */

  text-transform: uppercase;
}

.logo-content {
  display: flex;
  align-items: center;
  position: relative;
}
.logo-content button {
  background: none;
  border: 0;
  padding: 0;
  z-index: 99999;
}
.logo-content a {
  z-index: 2;
  color: var(--shape);
  font-size: 1rem;
  font-family: GothamBook;
}
.logo-fiems {
  position: absolute;
  right: -200px;
  width: 100px;
}
.profile-content {
  display: flex;
  align-items: center;
  z-index: 2;
  position: relative;
}

.profile-content .user-content {
  position: relative;
  margin-right: 1.2rem;
}

.profile-content .user-content > img {
  width: 2.5rem;
  height: 2.5rem;

  border: 2px solid var(--shape);
  border-radius: 50%;
}

.profile-content .user-content .notification {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background-color: var(--tertiary);

  color: var(--shape);
  font-size: 0.8rem;

  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -8px;
  right: -8px;
}

.profile-content > p {
  margin-bottom: 0;
  font-family: GothamBook;
  color: var(--shape);
  font-size: 0.9rem;
}

.profile-content > button {
  border: 0;
  background: none;
  margin-left: 0.8rem;

}

.profile-content button img {
  width: 1.25rem;
}

.profile-content .options {
  position: absolute;
  top: 40px;
  right: 0;
  background-color: var(--shape);
  padding: 0;
  width: 4.8rem;
  border: 1px solid var(--text-title);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-content .options li {
  list-style: none;
  font-size: 1.1rem;
  color: var(--attention);
  font-weight: 500;
  cursor: pointer;
}

@media (max-width: 780px) {
  .profile-content > p {
      display: none;
  }
}

@media (max-width: 720px) {

  .profile-content .user-content {
    margin-right: 0.4rem;
  }
}

@media (max-width: 640px) {
  header h1 {
    line-height: 1.4rem;
    margin-top: 0.85rem;
    top: 0;
  }

  .profile-content .user-content {
    margin-right: 0.2rem;
  }

  .logo-content a {
    z-index: 2;
    color: var(--shape);
    font-size: 1rem;
    font-family: GothamBook;
  }

  .link-to-home {
    display: none;
  }
}

@media (max-width: 520px) {
  .profile-content .user-content > img {
      display: none;
  }

  header h1 {
    max-width: 280px;
    position: relative;
  }
}
</style>
