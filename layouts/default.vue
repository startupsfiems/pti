<template>
  <div>
    <div class="background-geral" />
    <Nuxt />
  </div>
</template>

<style>
.background-geral {
  background-image: url('~/static/assets/background.svg');
  background-size: cover;
  width: 100%;
  height: 100vh;

  position: fixed;
  z-index: -1;
}
.box-branco {
  background-color: white;
  border-radius: 10px;
  border: 0.75px solid #053f5c;
  padding: 36px 24px;
  position: relative;
}
.btn-laranja-strong {
  background-color: #f27f0c;
  color: white;
  height: 41px;
  line-height: 41px;
  border: 0;
  border-radius: 40px;
}
.btn-light-blue {
  background-color: #58AADB;
  color: white;
  height: 41px;
  line-height: 41px;
  border: 0;
  border-radius: 40px;
  filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.25));
  font-family: 'Gotham-light';
  font-size: 16px;
}
.centraliza-icon-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.r-25 {
  right: 25px;
}
.mt-69 {
  margin-top: 69px;
}
.mb-69 {
  margin-bottom: 69px;
}
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.modal-class-one {
  padding: 0;
  border-radius: 25px;
  background-color: #58AADB;
  border: 0;
  height: 269px;
  width: 550px;
  box-shadow: 0px 5px 10px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
.titulo-azul-boxes {
  font-family: 'Gotham-bold';
  font-size: 20px;
  color: #053f5c;
}
.row-azul-claro {
  border-radius: 55px;
  border: 0;
  background-color: #d9ecf2;
}
.row-amarelo-claro {
  border-radius: 55px;
  border: 0.75px solid transparent;
  background-color: #FDEFD1;
}
.orange-border {
  border: 2px solid #F7AD19;
  border-radius: 10px;
}
/* gbl = general blue label */
.gbl {
  font-family: 'Gotham-light';
  font-weight: 1000;
  font-size: 14px;
  color: #053F5C;
}
.m-gbl {
  font-family: 'Gotham-Medium';
  font-size: 15px;
  color: #053F5C;
}
.s-gbl {
  font-family: 'Gotham-bold';
  font-weight: 1000;
  font-size: 1rem;
  color: #053F5C;
}
/* Classe utilizada para a altura das rows azuis */
.h-40 {
  height: 40px;
}
.h-27 {
  height: 27px;
}
.overflow-in-row {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
