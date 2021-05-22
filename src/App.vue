<template>
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
