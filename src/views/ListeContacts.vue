```vue
<script setup>
import { contacts } from '../data/contacts'
</script>

<template>
  <main class="page">
    <header class="header">
      <div>
        <p class="subtitle">MON CARNET PERSONNEL</p>
        <h1>Mes contacts</h1>
        <p class="description">Retrouvez facilement vos contacts.</p>
      </div>

      <button
        class="add-button"
        @click="$router.push('/contact/nouveau')"
      >
        + Ajouter
      </button>
    </header>

    <section class="contacts">
      <article
        v-for="contact in contacts"
        :key="contact.id"
        class="contact-card"
      >
        <img
          :src="contact.photo"
          :alt="`Photo de ${contact.prenom} ${contact.nom}`"
          class="contact-photo"
        >

        <div class="contact-info">
          <h2>{{ contact.prenom }} {{ contact.nom }}</h2>
          <p>{{ contact.telephone }}</p>
          <p class="email">{{ contact.email }}</p>
        </div>

        <button
          class="edit-button"
          @click="$router.push(`/contact/${contact.id}`)"
        >
          Modifier
        </button>
      </article>
    </section>

    <footer>
      {{ contacts.length }} contacts enregistrés
    </footer>
  </main>
</template>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px;
  font-family: Arial, sans-serif;
  color: #20243a;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.subtitle {
  color: #6755d9;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 2px;
}

h1 {
  margin: 8px 0;
  font-size: 34px;
}

.description {
  color: #777b8c;
}

.add-button,
.edit-button {
  border: none;
  border-radius: 10px;
  padding: 12px 18px;
  cursor: pointer;
  font-weight: bold;
}

.add-button {
  background: #6755d9;
  color: white;
}

.contacts {
  display: grid;
  gap: 16px;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px;
  background: white;
  border: 1px solid #e7e7ef;
  border-radius: 16px;
}

.contact-photo {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
}

.contact-info {
  flex: 1;
  min-width: 0;
}

.contact-info h2 {
  margin: 0 0 8px;
  font-size: 18px;
}

.contact-info p {
  margin: 4px 0;
  color: #65697b;
}

.contact-info .email {
  font-size: 13px;
}

.edit-button {
  background: #efedff;
  color: #5744c4;
}

footer {
  margin-top: 24px;
  text-align: center;
  color: #777b8c;
  font-size: 14px;
}

@media (max-width: 600px) {
  .header {
    align-items: flex-start;
    flex-direction: column;
  }

  .contact-card {
    flex-wrap: wrap;
  }

  .contact-info {
    flex-basis: 60%;
  }

  .edit-button {
    margin-left: auto;
  }
}
</style>
```
