<template>
  <div class="table">
    <template v-if="contactsList.length">
      <TableRow
        v-for="(contact, index) in contactsList"
        :key="index"
        :item="contact"
      />
    </template>
    <p class="table__text" v-else>
      Пока у вас нет контактов.
      <router-link to="/form" class="table__link">
        Добавить первый
      </router-link>
    </p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import TableRow from "./TableRow";
export default {
  components: {
    TableRow,
  },
  computed: {
    ...mapGetters(["contactsList"]),
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/vars.scss";
::v-deep .table {
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px 0;
    border-bottom: 1px solid $color-bg;
  }
  &__box {
    display: flex;
    align-items: center;
    & > * {
      margin-left: 10px;
    }
  }
  &__name {
    font-size: 18px;
  }
  &__arrow {
    cursor: pointer;
    transition: 0.4s ease;
    &--open {
      transform: rotate(180deg);
    }
  }
  &__list {
    width: 100%;
    background: $color-bg;
    padding: 20px;
    margin: 10px 0;
  }
  &__link {
    color: $color-accent;
    text-decoration: underline;
  }
}
</style>
