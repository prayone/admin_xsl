<template>
  <div class="dashboard">
    <h1>欢迎来到后台管理系统~</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  h1{
    color: #304156;
    text-align: center;
    margin-top: 200px;
  }
}
</style>
