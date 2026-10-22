import { ref, watch } from 'vue'

const contactsInitiaux = [
{ id: 1, nom: 'Ben Ali', prenom: 'Ahmed', telephone: '20111222', email: '[ahmed@example.com](mailto:ahmed@example.com)', photo: '' },
{ id: 2, nom: 'Trabelsi', prenom: 'Sarra', telephone: '22123456', email: '[sarra@example.com](mailto:sarra@example.com)', photo: '' },
{ id: 3, nom: 'Mansour', prenom: 'Youssef', telephone: '55123456', email: '[youssef@example.com](mailto:youssef@example.com)', photo: '' },
{ id: 4, nom: 'Gharbi', prenom: 'Mariam', telephone: '98123456', email: '[mariam@example.com](mailto:mariam@example.com)', photo: '' },
{ id: 5, nom: 'Jaziri', prenom: 'Omar', telephone: '50123456', email: '[omar@example.com](mailto:omar@example.com)', photo: '' }
]

function chargerContacts() {
try {
const donnees = localStorage.getItem('contacts')
return donnees ? JSON.parse(donnees) : contactsInitiaux
} catch {
return contactsInitiaux
}
}

export const contacts = ref(chargerContacts())

watch(contacts, (nouveauxContacts) => {
localStorage.setItem('contacts', JSON.stringify(nouveauxContacts))
}, { deep: true })
