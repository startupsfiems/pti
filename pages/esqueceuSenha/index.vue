<template>
  <div class="azul">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-md-9 offset-md-1 col-xl-11 mt-5 logo">
          <img src="~/static/assets/logo-top-left.svg" alt="" />
          <div class="box-logo-titulo">
            <div class="azul-bem-especifico">PROGRAMA DE</div>
            <h1>TRANSFORMAÇÃO<br />DA INDÚSTRIA</h1>
          </div>
        </div>
        <section class="col-12 col-md-6 offset-md-1 col-xl-4 mt-5">
          <header>
            <h2>ESQUECEU SUA SENHA?</h2>
            <aside>
              Insira nome de usuário ou e-mail, para receber o link de
              recuperação.
            </aside>
          </header>
          <div>
            <form
              class="user-inputs mt-5"
              @submit.prevent="enviarEmailDeRecuperacao(email)"
            >
              <label for="user-login">E-mail</label>
              <div class="login-container">
                <div class="user-icon">
                  <img src="~/static/assets/user-icon.svg" class="user-icon" />
                </div>
                <input
                  id="user-login"
                  v-model="email"
                  type="text"
                  trim
                  required
                />
              </div>

              <footer v-if="!loading" class="mt-5">
                <div class="btn-login forgot-pass">
                  <p v-if="emailEnviado" class="mensagem">Email enviado! ✅</p>
                  <button v-else type="sumensagembmit">Enviar</button>
                </div>
              </footer>

              <div v-else class="mt-5">
                <b-spinner variant="light" />
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
    <!--<div class="watermark" />-->
  </div>
</template>

<script>
import axios from 'axios'
// import header from '../../utils/headers'
import { Constantes } from '../../utils/constantes'

export default {
  name: 'EsqueceuSenha',
  layout: 'default',

  data() {
    return {
      email: '',
      loading: false,
      emailEnviado: false
    }
  },
  methods: {
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

    async enviarEmailDeRecuperacao(email) {
      // (PUT) {{url}}/api/Usuario/trocasenha
      // (GET) {{url}}/api/Usuario/tokensenha?email=fernando.almmm@gmail.com&origemId=2
      this.loading = true
      const response = await axios.get(
        `${Constantes.URL_API_INTEGRADORA}Usuario/tokensenha?email=${email}&origemId=3`
      )

      if (response.data.codigo === 200) {
        this.showToast(
          'Email enviado com sucesso!',
          'info',
          'Acesse o link enviado para redefinir sua senha :)',
          'b-toaster-top-left',
          '2500'
        )
        this.emailEnviado = true
      } else {
        this.showToast(
          'Erro',
          'info',
          'Não foi possível enviar o link para seu email',
          'b-toaster-top-left',
          '2500'
        )
      }

      this.loading = false
    }
  }
}
</script>

<style scoped>
p.mensagem {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}

button:disabled {
  background-color: gray !important;
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
