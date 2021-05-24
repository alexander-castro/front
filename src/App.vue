<template>
<nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">KoraApp</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="#registro">Registro</a></li>
        <li><a href="#prediccion">Predicción</a></li>
        <li><a href="#contacto">Contactanos</a></li>
      </ul>
    </div>
  </nav>
  <Form/>
</template>

<script>
import Form from './components/Form.vue'
import M from 'materialize-css'

export default {
  name: 'App',
  components: {
    Form
  },
  mounted () {
    M.AutoInit()
  }
}
</script>

<style>
</style>
