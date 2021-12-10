<template>
  <div class="azul">
    <div class="container-fluid">
      <div class="row">
        <div
          class="col-12 col-md-9 offset-md-1 col-xl-11  mt-5 logo"
        >
          <img src="~/static/assets/logo-top-left.svg" alt="" />
          <div class="box-logo-titulo">
            <div class="azul-bem-especifico">
              PROGRAMA DE
            </div>
            <h1>TRANSFORMAÇÃO<br />DA INDÚSTRIA</h1>
          </div>
        </div>
        <section v-if="!senhaAlterada" class="col-12 col-md-6 offset-md-1 col-xl-4  mt-5">
          <header>
            <h2>NOVA SENHA</h2>
            <aside>Insira uma nova senha.</aside>
          </header>
          <div v-if="!carregando">
            <form
              class="user-inputs mt-5"
              @submit.prevent="mudarSenha()"
            >
              <label class="mt-2" for="user-password">Nova senha</label>
              <div class="login-container senha">
                <div class="pad-locker">
                  <img src="~/static/assets/pad-locker.svg" />
                </div>

                <input
                  id="user-password"
                  v-model="senha"
                  type="password"
                  trim
                  required
                />

                <button
                  class="button-eye"
                  @click.prevent="switchPasswordVisibility('#user-password')"
                >
                  <img
                    v-if="senhaVisivel"
                    src="~/static/assets/opened-eye.svg"
                  />
                  <img v-else src="~/static/assets/closed-eye.svg" />
                </button>
              </div>

              <label class="mt-2" for="user-password">Repita a nova senha</label>
              <div class="login-container senha">
                <div class="pad-locker">
                  <img src="~/static/assets/pad-locker.svg" />
                </div>

                <input
                  id="user-password-repeat"
                  v-model="senhaRepetida"
                  type="password"
                  trim
                  required
                />

                <button
                  class="button-eye"
                  @click.prevent="switchPasswordVisibility('#user-password-repeat')"
                >
                  <img
                    v-if="senhaRepetidaVisivel"
                    src="~/static/assets/opened-eye.svg"
                  />
                  <img v-else src="~/static/assets/closed-eye.svg" />
                </button>
              </div>
              <footer class="mt-5">
                <div class="btn-login forgot-pass">
                  <button type="submit">
                    Salvar
                  </button>
                </div>
              </footer>
            </form>
          </div>
          <div v-else class="mt-5">
            <b-spinner variant="light" label="Text Centered" />
          </div>
        </section>

        <section v-else class="col-12 col-md-6 offset-md-3 col-xl-4 offset-xl-1 mt-5">
          <p class="mensagem">
            Senha alterada com sucesso! ✅
          </p>
          <footer class="mt-5 footer-mensagem">
            <div class="btn-login forgot-pass">
              <a href="/">
                Ir para tela de Login
              </a>
            </div>
          </footer>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import header from '../../utils/headers'
import { Constantes } from '../../../utils/constantes'

export default {
  name: 'RedefinirSenha',
  layout: 'default',

  data() {
    return {
      senha: '',
      senhaVisivel: false,
      senhaRepetida: '',
      senhaRepetidaVisivel: false,
      carregando: false,
      senhaAlterada: false
    }
  },
  methods: {
    async mudarSenha() {
      if (this.senha !== this.senhaRepetida) {
        return this.showToast(
          'Erro',
          'info',
          'As senhas digitadas não são iguais',
          'b-toaster-top-left',
          3000
        )
      } else if (this.senha.length < 6 || this.senhaRepetida.length < 6) {
        return this.showToast(
          'Erro',
          'info',
          'As senhas digitadas precisam ter no mínimo 6 caracteres',
          'b-toaster-top-left',
          3000
        )
      } else {
        this.carregando = true
        const data = {
          loginId: Number(this.$route.query.id),
          token: this.$route.query.token,
          novaSenha: this.senha,
          confirmacaoNovaSenha: this.senhaRepetida
        }
        // /api/Usuario/trocasenha
        const response = await axios.put(`${Constantes.URL_API_INTEGRADORA}Usuario/trocasenha`, data)

        if (response.data.codigo === 200) {
          this.showToast(
            'Sucesso!',
            'info',
            'Sua senha foi alterada',
            'b-toaster-top-left',
            3000
          )
          this.senhaAlterada = true
        } else {
          this.showToast(
            'Erro!',
            'info',
            'Não foi possível alterar sua senha',
            'b-toaster-top-left',
            3000
          )
        }

        this.carregando = false
      }
    },

    voltarParaLogin() {
      this.$router.push('/')
      // window.location.href = '/login'
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

    switchPasswordVisibility(inputId) {
      const inputField = document.querySelector(inputId)

      if (inputId === '#user-password') {
        if (inputField.hasAttribute('type')) {
          this.senhaVisivel = true
          inputField.removeAttribute('type')
        } else {
          this.senhaVisivel = false
          inputField.setAttribute('type', 'password')
        }
      } else if (inputField.hasAttribute('type')) {
        this.senhaRepetidaVisivel = true
        inputField.removeAttribute('type')
      } else {
        this.senhaRepetidaVisivel = false
        inputField.setAttribute('type', 'password')
      }
    }
  }
}
</script>

<style scoped>
section p.mensagem {
  font-size: 20px;

  color: #fff;
}

section footer.footer-mensagem {
  text-decoration: underline;
  font-size: 18px;
  font-weight: bold;
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
.logo img {
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
@media (max-width: 1199px) {
  .watermark {
    top: unset;
    position: fixed;
    background-position-y: top;
  }
}
@media (max-width: 576px) {
  .watermark {
    display: none;
  }
  .logo img {
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
