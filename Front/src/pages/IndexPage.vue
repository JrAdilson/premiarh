<template>
  <q-page padding>
    <q-table flat bordered title="Funcionários" :rows="participants" :columns="columns" row-key="name" dark color="amber">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn color="secondary" round dense flat icon="edit" @click="editParticipant(props.row)" />
          <q-btn color="secondary" round dense flat icon="delete" @click="deleteParticipant(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import participantsService from 'src/services/participants';  
import { defineComponent, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const participants = ref([]);
    const { get } = participantsService();
    const $q = useQuasar();
    const columns = [
      { name: 'name', label: 'Nome', field: 'name', sortable: true, align: 'left' },
      { name: 'cpf', label: 'CPF', field: 'cpf', sortable: true, align: 'left' },
      { name: 'email', label: 'E-mail', field: 'email', sortable: true, align: 'left' },
      { name: 'shirt_size', label: 'Tamanho da Camisa', field: 'shirt_size', sortable: true, align: 'left' },
      { name: 'shoe_size', label: 'Tamanho do Calçado', field: 'shoe_size', sortable: true, align: 'center' },
      { name: 'actions', label: 'Ações', field: 'actions', align: 'right' },
    ]

    onMounted(() => {
      getParticipants();
    });

    const getParticipants = async () => {
      const data = await get();
      participants.value = data.participants
    }

    const deleteParticipant = async (id) => {
      try {
        $q.dialog({
          title: 'Confirmação',
          message: 'Você tem certeza que deseja remover este funcionário?',
          persistent: true,
          ok: {
            label: 'Sim',
            color: 'secondary'
          },
          cancel: {
            label: 'Não',
            color: 'secondary'
          }
        }).onOk(async () => {
          await participantsService().remove(id);
          $q.notify({ message: 'Funcionário removido com sucesso!', icon: 'check', color: 'positive', position: 'top' });
          getParticipants();
        }).onCancel(() => {
          $q.notify({ message: 'Operação cancelada!', icon: 'close', color: 'negative', position: 'top' });
        });
      } catch (error) {
        $q.notify({ message: `Erro ao remover funcionário! ${error}`, icon: 'close', color: 'negative', position: 'top' });
        return;
      }
    }

    const editParticipant = async (participant) => {
      await participantsService().put(participant);
      getParticipants();
    }

    return {
      participants,
      columns,
      deleteParticipant,
      editParticipant
    }
  }
});
</script>
