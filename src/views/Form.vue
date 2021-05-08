<template>
  <div class="page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-header__title">Добавить контакт</h1>
      </div>
      <div class="page__row">
        <div class="box">
          <div action="" class="form">
            <div class="form__box">
              <label class="form__label">Имя контакта</label>
              <input
                type="text"
                class="form__input"
                v-model="name"
                placeholder="Имя контакта"
              />
            </div>
            <label for="" class="form__label form__label--outer">
              Дополнительные поля
            </label>
            <div
              v-for="(field, index) in fields"
              :key="index"
              class="form__row"
            >
              <input
                type="text"
                class="form__input"
                :class="{ error: field.error }"
                v-model="field.name"
                placeholder="Название"
              />
              <input
                type="text"
                class="form__input"
                :class="{ error: field.error }"
                v-model="field.value"
                placeholder="Значение"
              />
              <button class="btn form__delete" @click="removeFiled(index)">
                <!-- eslint-disable-next-line -->
                <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> 
              </button>
            </div>
            <button class="btn" @click="addFiled">Добавить поле</button>
          </div>
        </div>
        <div class="form-preview">
          <!-- Блок с Превью -->
          <div class="box">
            <p class="form-preview__title">{{ name }}</p>
            <ul class="form-preview__list">
              <li
                v-for="(field, index) in fields"
                :key="index"
                class="form-preview__item"
              >
                <p
                  v-if="field.name"
                  class="form-preview__text form-preview__text--title"
                >
                  {{ field.name }}:
                </p>
                <p class="form-preview__text">{{ field.value }}</p>
              </li>
            </ul>
            <p class="form-preview__date">Дата создания: {{ date }}</p>
            <button
              @click="returnVersion"
              v-if="isArchive"
              class="btn form-preview__btn"
            >
              Вернуть прошлую версию
            </button>
            <button
              @click="updateContact"
              v-if="oneContact"
              :class="{ 'btn--disabled': checkUpdate }"
              class="btn form-preview__btn"
            >
              Обновить
            </button>
            <button @click="addToCont" v-else class="btn form-preview__btn">
              Создать
            </button>
            <button
              v-if="oneContact"
              @click="removeContact"
              class="btn btn--danger form-preview__btn"
            >
              Удалить
            </button>
          </div>

          <!-- Блок с ошибками -->
          <div class="box" v-if="errors.length">
            <ul class="form-preview__list">
              <li
                v-for="(error, index) in errors"
                :key="index"
                class="form-preview__item"
              >
                <p class="form-preview__text form-preview__text--danger">
                  {{ error.title }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "",
      date: "",
      id: "",
      fields: [],
      oneContact: null,
      isArchive: false,
      errors: [],
    };
  },
  mounted() {
    this.date = new Date().toLocaleDateString();
    let item = this.$store.getters.contactFindById(this.$route.params.id);
    item = item ? JSON.parse(JSON.stringify(item)) : '';
    console.log(item);
    if (item) {
      this.name = item.name;
      this.fields = item.fields;
      this.date = item.date;
      this.id = item.id;
      this.isArchive = item.archive ? true : false;
      this.oneContact = JSON.parse(JSON.stringify(item));
    }
  },
  computed: {
    ...mapGetters(["contactsList"]),
    contact() {
      const contact = {
        id: this.id ? this.id : Date.now(),
        name: this.name,
        fields: this.fields,
        date: new Date().toLocaleDateString(),
      };
      return contact;
    },
    checkUpdate() {
      // Нужно сделать копию без ссылок
      delete this.oneContact["archive"];
      return JSON.stringify(this.contact) === JSON.stringify(this.oneContact);
    },
  },
  methods: {
    addFiled() {
      this.fields.push({ name: "", value: "" });
    },
    removeFiled(index) {
      if (confirm("Вы действительно хотите удалить поле?")) {
        this.fields = this.fields.filter((item, idx) => idx != index);
      }
    },
    checkForm() {
      this.errors = [];
      let errorCount = 0;
      if (!this.name) {
        this.errors.push({ title: `Вы не указали имя контакта` });
      }
      this.fields.forEach((item) => {
        if (item.name == "" || item.value == "") {
          item.error = true;
          errorCount++;
        } else {
          item.error = false;
        }
      });
      if (errorCount) {
        this.errors.push({ title: `У вас ${errorCount} незаполных поля` });
      }
    },
    addToCont() {
      this.checkForm();
      if (!this.errors.length) {
        this.$store.dispatch("addContact", this.contact);
        this.$router.push("/");
        this.$toast.success("Контакт добавлен!");
      }
    },
    updateContact() {
      this.checkForm();
      if (confirm("Вы точно хотите обновить контакт?") && !this.errors.length) {
        this.$store.dispatch("updateContact", this.contact);
        this.$router.push("/");
        this.$toast.info("Контакт обвновлен!");
      }
    },
    returnVersion() {
      if (confirm("Вы уверены? Все текущие данные могут измениться")) {
        this.$store.dispatch("returnVersion", this.contact);
        this.$router.push("/");
        this.$toast.warning("Даные обновленны!");
      }
    },
    removeContact() {
      if (confirm("Вы точно хотите удалить контакт?")) {
        this.$store.dispatch("removeContact", this.oneContact.id);
        this.$router.push("/");
        this.$toast.warning("Контакт удален!");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/vars.scss";
.error {
  border: 1px solid red;
}
.form {
  position: relative;
  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr 20px;
    grid-gap: 10px;
    margin-bottom: 10px;
  }
  &__delete {
    padding: 0 5px;
  }
  &__box {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  &__label {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
    display: block;
    &--outer {
      margin: 40px 0 10px 0;
    }
  }
}
.form-preview {
  height: fit-content;
  position: sticky;
  top: 20px;
  .box {
    margin-bottom: 20px;
  }
  &__title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  &__item {
    display: flex;
    align-items: center;
  }
  &__text {
    font-weight: 400;
    &--title {
      color: $color-gray;
      margin-right: 10px;
    }
    &--danger {
      color: $color-danger;
    }
  }
  &__date {
    font-size: 12px;
    color: $color-gray;
    margin-top: 20px;
  }
  &__btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
