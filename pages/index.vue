<template>
  <div class="azul">
    <div class="container-fluid">
      <div class="row content-azul">
        <div class="col-12 col-md-9 offset-md-1 col-xl-10 mt-5 logo">
          <img src="~/static/assets/logo-top-left.svg" class="pti" alt="PTI" />
          <div class="box-logo-titulo">
            <div class="azul-bem-especifico">
              PROGRAMA DE
            </div>
            <h1>TRANSFORMAÇÃO<br />DA INDÚSTRIA</h1>
          </div>
          <img src="~/static/assets/logo-fiems.svg" class="logo-fiems" alt="FIEMS" />
        </div>
        <section class="col-12 col-md-6 offset-md-1 col-xl-4 mt-5">
          <header>
            <h2>SEJA BEM-VINDO!</h2>
            <aside>Faça login para acessar sua conta</aside>
          </header>
          <div v-if="!logando">
            <form
              class="user-inputs mt-5"
              @submit.prevent="logarUsuario(login, senha)"
            >
              <label for="user-login">Usuário ou e-mail</label>
              <div class="login-container">
                <div class="user-icon">
                  <img src="~/static/assets/user-icon.svg" class="user-icon" />
                </div>
                <input id="user-login" v-model="login" type="text" trim />
              </div>
              <label class="mt-2" for="user-password">Senha</label>
              <div class="login-container senha">
                <div class="pad-locker">
                  <img src="~/static/assets/pad-locker.svg" />
                </div>

                <input
                  id="user-password"
                  v-model="senha"
                  type="password"
                  trim
                />

                <button
                  class="button-eye"
                  @click.prevent="switchPasswordVisibility()"
                >
                  <img
                    v-if="senhaVisivel"
                    src="~/static/assets/opened-eye.svg"
                  />
                  <img v-else src="~/static/assets/closed-eye.svg" />
                </button>
              </div>
              <footer class="mt-5">
                <div class="btn-login forgot-pass">
                  <button type="submit">
                    LOGIN
                  </button>
                  <NuxtLink to="/esqueceuSenha">
                    Esqueceu sua senha?
                  </NuxtLink>
                </div>
              </footer>
            </form>
          </div>
          <div v-else class="mt-5">
            <b-spinner variant="light" label="Text Centered" />
          </div>
        </section>
      </div>
    </div>
    <!--<div class="watermark" />-->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Login',
  layout: 'default',

  data() {
    return {
      login: '',
      senha: '',
      logando: false,
      senhaVisivel: false
    }
  },

  head() {
    return {
      title: 'Login - PTI'
    }
  },
  computed: {
    ...mapState({
      uiUser: state => state.user.ui,
      usuarioLogado: state => state.user.usuarioLogado
    })
  },
  mounted() {
    if (this.usuarioLogado.id !== undefined) {
      this.$router.replace({ name: 'listaEmpresas' })
    } else {
      this.resetState('empresa', 'diagnostico', 'acao', 'user')
    }
  },
  methods: {
    async logarUsuario(login, senha) {
      this.logando = true
      // Validando digitação de e-mail
      const emailDigitado = login
      if (!emailDigitado || emailDigitado.length === 0) {
        this.showToast(
          'E-mail',
          'info',
          'Você precisa informar um e-mail :)',
          'b-toaster-top-left',
          3000
        )
        document.getElementById('user-login').focus()
        this.logando = false
        return false
      }
      // Validando senha
      const senhaDigitada = senha
      if (!senhaDigitada || senhaDigitada.length === 0) {
        this.showToast(
          'Senha',
          'info',
          'Você precisa informar uma senha :)',
          'b-toaster-top-left',
          3000
        )
        document.getElementById('user-password').focus()
        this.logando = false

        return false
      }
      // Validando quantidade de caracteres senha
      if (senhaDigitada.length < 6) {
        this.showToast(
          'Senha',
          'warning',
          'A senha deve possuir ao menos 6 caracteres',
          'b-toaster-top-left',
          3000
        )
        document.getElementById('user-password').focus()
        this.logando = false

        return false
      }
      // Fazendo o login
      const params = {
        login,
        senha,
        tipoLoginId: 1,
        origemId: 3 // 3 é a origem do PTI
      }

      await this.$store
        .dispatch({
          type: 'user/login',
          params
        })
        .then(() => {
          if (this.uiUser.codigo === 200) {
            // 72 gerente 73 gestor 74 agente
            if (this.usuarioLogado.permissaoId === 74) {
              this.$router.push({ name: 'listaEmpresas' })
            } else {
              this.$router.push({ path: '/painelResultados' })
            }
          } else {
            this.showToast(
              this.uiUser.error,
              'danger',
              ' ',
              'b-toaster-top-left',
              3000
            )
          }
        })
      this.logando = false
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
    },
    switchPasswordVisibility() {
      const inputField = document.querySelector('#user-password')
      if (inputField.hasAttribute('type')) {
        this.senhaVisivel = true
        inputField.removeAttribute('type')
      } else {
        this.senhaVisivel = false
        inputField.setAttribute('type', 'password')
      }
    },
    resetState(state1, state2, state3, state4) {
      switch (arguments.length) {
        case 4:
          this.$store.dispatch(state1 + '/resetState')
          this.$store.dispatch(state2 + '/resetState')
          this.$store.dispatch(state3 + '/resetState')
          this.$store.dispatch(state4 + '/resetState')
          break
        case 3:
          this.$store.dispatch(state1 + '/resetState')
          this.$store.dispatch(state2 + '/resetState')
          this.$store.dispatch(state3 + '/resetState')
          break
        case 2:
          this.$store.dispatch(state1 + '/resetState')
          this.$store.dispatch(state2 + '/resetState')
          break
        case 1:
          this.$store.dispatch(state1 + '/resetState')
          break
        default:
          console.log('a função precisa de 1 até 4 parâmetros')
          break
      }
    }
  }
}
</script>

<style scoped>

.logo-fiems {
  position: absolute;
  right: 0;
}
.azul-bem-especifico {
  font-family: 'Gotham-bold';
  color: #57a7e0;
  font-size: 20px;
}
.logo {
  position: relative;
  display: flex;
}
.logo .pti {
  width: 105px;
  height: 105px;
  margin-right: 22px;
}
.logo h1 {
  font-family: 'Gotham-bold';
  color: white;
  font-size: 30px;
}
.azul {
  background-color: #497aaa;
  mix-blend-mode: multiply;
  height: 100vh;
  width: 100%;

  background-image: url('~/static/assets/watermark2.svg');
  background-repeat: no-repeat;
  background-position: 820px 320px;
  overflow-x: hidden;
}
.azul section h2 {
  color: #58aadb;
  font-family: 'Gotham-bold';
}
.azul aside {
  color: #ffffff;
  font-family: 'Gotham-light';
  font-size: 20px;
}

.content-azul {
  padding-left: 10px;
}

header h2 {
  font-size: 30px;
}

header aside {
  font-size: 20px;
}

.login-container {
  display: flex;
  flex-direction: row;
  border-radius: 117px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding-left: 24px;

  border: 2px solid white;
}

.user-icon {
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-icon img {
  width: 30px;
  height: 30px;
}

.pad-locker {
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pad-locker img {
  width: 30px;
  height: 30px;
}

.button-eye {
  background-color: transparent;
  border: 0;
}

.button-eye img {
  width: 30px;
  height: 30px;
}

.login-container input {
  border: 0;
  background-color: unset;
  outline: none;
  height: 55px;
  padding: 0 14px 0 8px;
  flex: 1;
}

.senha {
  padding-right: 24px;
}

.login-container:hover,
.login-container:focus-within {
  border: 2px solid coral;
}
.user-inputs label {
  font-family: 'Gotham-light';
  color: #fff;
  padding-left: 30px;
}
.btn-login button {
  background-color: #58aadb;
  color: white;
  width: 150px;
  height: 40px;
  line-height: 40px;
  border: 0;
  border-radius: 25px;
  font-family: 'Gotham-bold';
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
.forgot-pass a {
  text-decoration: none;
  color: white;
  font-family: 'Gotham-light';
}
.btn-login {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.spinner-border {
  width: 6rem;
  height: 6rem;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  /* border: 2px solid green; */
  border-radius: 25px;
  -webkit-text-fill-color: black;
  -webkit-box-shadow: 0 0 0px 1000px white inset;
  transition: background-color 5000s ease-in-out 0s;
}

footer {
  padding-bottom: 20px;
}
@media (max-width: 991px) {
  .logo-fiems {
    width: 25%;
    right: -100px;
  }
}
@media (max-width: 768px) {
  .logo-fiems {
    width: 25%;
    right: 25px;
  }
}
@media (max-width: 576px) {
  .logo .pti {
    display: none;
  }
}
@media (max-width: 458px) {
  .logo h1 {
    font-size: 30px;
  }
  .azul-bem-especifico {
    font-size: 25px;
  }
  .azul section h2 {
    font-size: 25px;
  }
  .azul aside {
    font-size: 17px;
  }
}
@media (max-width: 363px) {
  .btn-login {
    flex-direction: column;
  }
  .azul section footer {
    margin-top: 20px !important;
  }
  .logo img {
    width: 260px;
  }
}
</style>
