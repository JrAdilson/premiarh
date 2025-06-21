<template>
  <q-page padding>
    <q-table flat bordered title="Funcionários" :rows="participants" :columns="columns" row-key="name" dark
      color="amber" />
  </q-page>
</template>

<script>
import { api } from 'boot/axios';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const participants = ref([]);
    const columns = [
      { name: 'name', label: 'Nome', field: 'name', sortable: true, align: 'left' },
      { name: 'cpf', label: 'CPF', field: 'cpf', sortable: true, align: 'left' },
      { name: 'email', label: 'E-mail', field: 'email', sortable: true, align: 'left' },
      { name: 'shirt_size', label: 'Tamanho da Camisa', field: 'shirt_size', sortable: true, align: 'left' },
      { name: 'shoe_size', label: 'Tamanho do Calçado', field: 'shoe_size', sortable: true, align: 'center' },
    ]

    onMounted(() => {
      getParticipants();
    });

    const getParticipants = async () => {
      await api.get('participants')
        .then(({ data }) => participants.value = data.participants)
        .catch(() => null);
    }

    return {
      participants,
      columns
    }
  }
});
</script>
