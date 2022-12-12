<template>
  <div class="home">
    <login></login>
    <services></services>
  </div>
</template>

<script>
// @ is an alias to /src
import Services from '@/components/Services.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'HomeView',
  components: {
    Services,
    Login
  }
}


</script>
