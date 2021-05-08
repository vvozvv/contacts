<template>
  <div class="page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-header__title">Список контактов</h1>
        <router-link to="/form" class="btn">Добавить контакт</router-link>
      </div>
      <div class="box">
        <Table />
      </div>
    </div>
  </div>
</template>

<script>
import Table from '../components/table/Table'
export default {
  components: {
    Table,
  }
};
</script>
