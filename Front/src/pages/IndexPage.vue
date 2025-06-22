<template>
  <q-page padding>
    <q-table rows-per-page-label="Ver:" flat bordered title="Funcionários" :rows="participants" :columns="columns" row-key="name" dark color="secondary">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn color="secondary" round dense flat icon="edit" @click="editParticipant(props.row)" />
          <q-btn color="secondary" round dense flat icon="delete" @click="deleteParticipant(props.row.id)" />
        </q-td>
      </template>

      <template v-slot:top>
        <span>Funcionários</span>
        <q-space />
        <q-btn color="secondary" round dense flat icon="add" @click="addParticipant()" />
      </template>
    </q-table>
  </q-page>
</template>

<script>
import participantsService from 'src/services/participants';  
import { defineComponent, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import ParticipantDialog from 'src/components/ParticipantDialog.vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const $q = useQuasar();
    const participants = ref([]);
    const { get, post, put, remove } = participantsService();
    const columns = [
      { name: 'name', label: 'Nome', field: 'name', sortable: true, align: 'left' },
      { name: 'cpf', label: 'CPF', field: 'cpf', sortable: true, align: 'left' },
      { name: 'email', label: 'E-mail', field: 'email', sortable: true, align: 'left' },
      { name: 'shirt_size', label: 'Tamanho da Camisa', field: 'shirt_size', sortable: true, align: 'center' },
      { name: 'shoe_size', label: 'Tamanho do Calçado', field: 'shoe_size', sortable: true, align: 'center' },
      { name: 'actions', label: 'Ações', field: 'actions', align: 'center' },
    ]

    onMounted(() => {
      getParticipants();
    });

    const getParticipants = async () => {
      try {
        const data = await get();
        participants.value = data.participants
      } catch (error) {
        $q.notify({ message: `Erro ao carregar funcionários! ${error}`, icon: 'close', color: 'negative', position: 'top' });
      }
    }

    const deleteParticipant = (id) => {
      try {
        dialogParticipant({ id }, 'remove');
      } catch (error) {
        $q.notify({ message: `Erro ao remover funcionário! ${error}`, icon: 'close', color: 'negative', position: 'top' });
        return;
      }
    }

    const addParticipant = () => {
      dialogParticipant(
        {
          name: '',
          cpf: '',
          email: '',
          shirt_size: '',
          shoe_size: ''
        }, 
        'new'
      );
    }

    // @TO-DO: validate participant (cpf, email, size shirt/shoe)
    /*const validateParticipant = async (participant) => {
      await participantsService().validate(participant)
        .then(() => {
          $q.notify({ message: 'Funcionário validado com sucesso!', icon: 'check', color: 'positive', position: 'top' });
        })
        .catch((error) => {
          $q.notify({ message: `Erro de validação: ${error}`, icon: 'close', color: 'negative', position: 'top' });
          throw new Error(error);
        });
    }*/

    const editParticipant = (participant) => {
      dialogParticipant(participant, 'edit');
    }

    const dialogParticipant = (participant, action) => {
      const defaultOptions = { 
          component: ParticipantDialog,
          componentProps: { 
            data: participant,
            title: 'Adicionar Funcionário'
          },
      };

      const obj = { 
        'new': {
          method: post,
          title: 'Adicionar',
          verb: 'adicionado',
          options: { ...defaultOptions },
        },
        'edit': {
          method: put,
          title: 'Editar',
          verb: 'editado',
          options: { ...defaultOptions },
        },
        'remove': {
          method: remove,
          options: {
            message: 'Você tem certeza que deseja remover este funcionário?',
          },
          title: 'Remover',
          verb: 'removido'
        }
      };
      
      const type = obj[action];
      if (!type) {
        $q.notify({ message: 'Ação inválida!', icon: 'close', color: 'secondary', position: 'top' });
        return;
      }

      const options = {
        title: type.title,
        persistent: true,
        ok: {
          label: 'Sim',
          color: 'secondary'
        },
        cancel: {
          label: 'Não',
          color: 'secondary'
        }
      }
      
      $q.dialog({ ...options, ...type.options }).onOk(async (data) => {
        try {
          const payload = action === 'remove'
            ? participant.id
            : (data?.participant || data);

          await type.method(payload);
          $q.notify({ message: `Funcionário ${type.verb} com sucesso!`, icon: 'check', color: 'positive', position: 'top' });
          getParticipants();
        } catch (error) {
          $q.notify({ message: `Erro ao ${type.title.toLowerCase()} funcionário! ${error}`, icon: 'close', color: 'negative', position: 'top' });
        }
      })
    };

    return {
      participants,
      columns,
      addParticipant,
      deleteParticipant,
      dialogParticipant,
      editParticipant
    }
  }
});
</script>
