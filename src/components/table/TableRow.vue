<template>
  <div class="table__row">
    <p class="table__name">
      {{ item.name }}
    </p>
    <div class="table__box">
      <div
        @click="toggleDesc"
        :class="{ 'table__arrow--open': openDesc }"
        class="table__arrow"
      >
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M19 12l-7 7-7-7" stroke="#182347" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <router-link
        :to="{ name: 'form-item', params: { id: item.id } }"
        :item="item"
        class="btn"
      >
        Открыть
      </router-link>
      <button class="btn btn--icon btn--danger" @click="removeContact">
        <svg width="17" height="17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.125 4.958h12.75M5.667 4.958V3.542a1.417 1.417 0 011.416-1.417h2.834a1.417 1.417 0 011.416 1.417v1.416m2.125 0v9.917a1.416 1.416 0 01-1.416 1.417H4.958a1.417 1.417 0 01-1.416-1.417V4.958h9.916z" stroke="#FC4C41" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
    <ul class="table__list" v-show="openDesc">
      <li
        v-for="(field, index) in item.fields"
        :key="index"
        class="table__item"
      >
        <span>{{ field.name }}:</span>
        <span>{{ field.value }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    item: JSON,
  },
  data() {
    return {
      openDesc: false,
    };
  },
  methods: {
    toggleDesc() {
      this.openDesc = !this.openDesc;
    },
    removeContact() {
      if (confirm("Вы действительно хотите удалить контакт?")) {
        this.$store.dispatch("removeContact", this.item.id);
        this.$toast.warning("Контакт удален!");
      }
    },
  },
};
</script>
