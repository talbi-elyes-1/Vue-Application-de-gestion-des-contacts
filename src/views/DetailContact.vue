<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { contacts } from '../data/contacts'

const route = useRoute()
const router = useRouter()

const nouveau = route.params.id === 'nouveau'
const id = Number(route.params.id)

const contactOriginal = contacts.value.find(c => c.id === id)

const contact = ref(
  nouveau || !contactOriginal
    ? {
        id: Date.now(),
        nom: '',
        prenom: '',
        telephone: '',
        email: '',
        photo: ''
      }
    : { ...contactOriginal }
)

const erreur = ref('')

const emailValide = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.value.email)
)

function choisirPhoto(event) {
  const fichier = event.target.files[0]

  if (!fichier) return

  if (!fichier.type.startsWith('image/')) {
    erreur.value = 'Veuillez choisir un fichier image.'
    event.target.value = ''
    return
  }

  const lecteur = new FileReader()

  lecteur.onload = () => {
    contact.value.photo = lecteur.result
    erreur.value = ''
  }

  lecteur.onerror = () => {
    erreur.value = 'Impossible de charger cette image.'
  }

  lecteur.readAsDataURL(fichier)
}

function enregistrer() {
  if (
    !contact.value.nom.trim() ||
    !contact.value.prenom.trim() ||
    !contact.value.telephone.trim() ||
    !contact.value.email.trim()
  ) {
    erreur.value = 'Veuillez remplir tous les champs obligatoires.'
    return
  }

  if (!emailValide.value) {
    erreur.value = 'Veuillez saisir une adresse e-mail valide.'
    return
  }

  if (nouveau) {
    contacts.value.push({ ...contact.value })
  } else {
    const index = contacts.value.findIndex(c => c.id === id)

    if (index === -1) {
      erreur.value = 'Contact introuvable.'
      return
    }

    contacts.value[index] = { ...contact.value }
  }

  // Le fichier contacts.js sauvegarde automatiquement dans localStorage.
  router.push('/')
}

function retour() {
  router.push('/')
}
</script>

<template>
  <main class="page">
    <button class="back-button" @click="retour">
      ← Retour
    </button>

    <section class="form-card">
      <h1>{{ nouveau ? 'Ajouter un contact' : 'Modifier le contact' }}</h1>
      <p class="description">Informations du contact</p>

      <div class="photo-section">
        <img
          :src="contact.photo || 'https://placehold.co/150x150?text=Photo'"
          alt="Photo du contact"
          class="contact-photo"
        >

        <div class="photo-actions">
          <label class="file-button">
            Galerie
            <input
              type="file"
              accept="image/*"
              @change="choisirPhoto"
              hidden
            >
          </label>

          <label class="file-button">
            Caméra
            <input
              type="file"
              accept="image/*"
              capture="environment"
              @change="choisirPhoto"
              hidden
            >
          </label>
        </div>
      </div>

      <form @submit.prevent="enregistrer">
        <label for="nom">Nom *</label>
        <input id="nom" v-model="contact.nom" type="text" required>

        <label for="prenom">Prénom *</label>
        <input id="prenom" v-model="contact.prenom" type="text" required>

        <label for="telephone">Téléphone *</label>
        <input
          id="telephone"
          v-model="contact.telephone"
          type="tel"
          required
        >

        <label for="email">E-mail *</label>
        <input
          id="email"
          v-model="contact.email"
          type="email"
          required
        >

        <p v-if="erreur" class="error">{{ erreur }}</p>

        <div class="actions">
          <a
            v-if="contact.telephone"
            class="action-button"
            :href="`tel:${contact.telephone}`"
          >
            📞 Appeler
          </a>

          <a
            v-if="contact.email"
            class="action-button"
            :href="`mailto:${contact.email}`"
          >
            ✉️ E-mail
          </a>
        </div>

        <button class="save-button" type="submit">
          Enregistrer
        </button>

        <button class="cancel-button" type="button" @click="retour">
          Annuler
        </button>
      </form>
    </section>
  </main>
</template>

<style scoped>
.page {
  max-width: 700px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: Arial, sans-serif;
  color: #20243a;
}

.back-button {
  margin-bottom: 20px;
  border: none;
  background: transparent;
  color: #6755d9;
  cursor: pointer;
  font-size: 16px;
}

.form-card {
  padding: 30px;
  border: 1px solid #e7e7ef;
  border-radius: 18px;
  background: white;
}

h1 {
  margin-bottom: 8px;
}

.description {
  color: #777b8c;
}

.photo-section {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 25px 0;
}

.contact-photo {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
}

.photo-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.file-button,
.action-button {
  display: inline-block;
  padding: 10px 14px;
  border-radius: 9px;
  background: #efedff;
  color: #5744c4;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
}

form label {
  display: block;
  margin-top: 15px;
  margin-bottom: 7px;
  font-weight: bold;
}

form input:not([type="file"]) {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  border: 1px solid #d9d9e4;
  border-radius: 9px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
}

.save-button,
.cancel-button {
  margin: 5px 8px 0 0;
  padding: 12px 18px;
  border: none;
  border-radius: 9px;
  cursor: pointer;
}

.save-button {
  background: #6755d9;
  color: white;
}

.cancel-button {
  background: #eeeef3;
  color: #333;
}

.error {
  color: #c62828;
}

@media (max-width: 500px) {
  .form-card {
    padding: 20px;
  }

  .photo-section {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
