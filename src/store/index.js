import { createStore } from "vuex";
export default createStore({
  state: {
    contact: JSON.parse(localStorage.getItem("contacts")) || [],
  },
  mutations: {
    GET_CONTACT: (state, payload) => {
      state.contact.push(payload);
      localStorage.setItem("contacts", JSON.stringify(state.contact));
    },
    REMOVE_CONTACT: (state, payload) => {
      state.contact = payload;
      localStorage.setItem("contacts", JSON.stringify(payload));
    },
    UPDATE_CONTACT: (state, payload) => {
      // Копируем массив
      let cloneContacts = JSON.parse(JSON.stringify(state.contact));
      // Ищем текущий индекс контакт
      let index = cloneContacts.findIndex((item) => item.id === payload.id);
      // Возвращаем контакт
      let contact = JSON.parse(JSON.stringify(cloneContacts[index]));
      delete contact["archive"]
      // Меняем значение на новый контакт, в архив помещаем прошлую версию
      cloneContacts[index] = { ...payload, archive: contact };
      // Меняем значения
      state.contact = cloneContacts;
      localStorage.setItem("contacts", JSON.stringify(cloneContacts));
    },
    RETURN_LAST_VERSION: (state, payload) => {
      let cloneContacts = state.contact.concat();
      let index = cloneContacts.findIndex((item) => item.id === payload.id);
      let contact = cloneContacts[index];
      console.log(contact.archive, payload);
      cloneContacts[index] = { ...contact.archive, archive: payload };
      state.contact = cloneContacts;
      localStorage.setItem("contacts", JSON.stringify(cloneContacts));
    },
  },
  actions: {
    addContact({ commit }, payload) {
      commit("GET_CONTACT", payload);
    },
    updateContact({ commit }, payload) {
      commit("UPDATE_CONTACT", payload);
    },
    returnVersion({ commit }, payload) {
      commit("RETURN_LAST_VERSION", payload);
    },
    removeContact({ commit, state }, id) {
      const newContact = state.contact.filter((item) => item.id !== id);
      commit("REMOVE_CONTACT", newContact);
    },
  },
  getters: {
    contactsList: (state) => state.contact,
    contactFindById: (state) => (id) => state.contact.find((item) => item.id == id),
  },
});
