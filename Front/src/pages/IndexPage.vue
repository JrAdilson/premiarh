<template>
  <q-page padding>
    <q-table 
      rows-per-page-label="Ver:" 
      flat 
      bordered 
      title="Funcionários" 
      :rows="employees" 
      :columns="columns" 
      :visible-columns="['name', 'cpf', 'email', 'shirt_size', 'shoe_size', 'actions']"
      :filter="filter"
      :filter-method="filterByField"
      row-key="id" 
      dark 
      color="secondary"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn color="secondary" round dense flat icon="edit" @click="editEmployee(props.row.id)" />
          <q-btn color="secondary" round dense flat icon="delete" @click="deleteEmployee(props.row.id)" />
        </q-td>
      </template>

      <template v-slot:top>
        <span>Funcionários</span>
        <q-space />
        <q-select
          v-model="filter.field"
          :options="options"
          dense
          dark
          outlined
          emit-value  
          map-options
          color="white"
          text-color="white"
          style="min-width: 120px; margin-right: 10px"
        />
        <q-input
          dark
          borderless
          dense
          debounce="300"
          v-model="filter.value"
          placeholder="Pesquisar..."
          class="q-mr-md"
        >
          <template v-slot:append>
            <q-icon color="secondary" name="search" />
          </template>
        </q-input>
        <q-btn color="secondary" round dense flat icon="add" @click="addEmployee()" />
      </template>
    </q-table>
  </q-page>
</template>

<script>
import employeesService from 'src/services/employees';  
import { defineComponent, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import Dialog from 'src/components/NewDialog.vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const $q = useQuasar();
    const employees = ref([]);
    const { get, getById, post, put, remove } = employeesService();
    const filter = ref({
      field: 'name',
      value: ''
    });
    const options = [
      { label: 'CPF', value: 'cpf' },
      { label: 'Nome', value: 'name' },
      { label: 'Email', value: 'email' },
      { label: 'Tamanho Camiseta', value: 'shirt_size' },
      { label: 'Tamanho Calçado', value: 'shoe_size' }
    ];
    const columns = [
      { name: 'id', label: 'ID', field: 'id', hidden: true }, 
      { name: 'name', label: 'Nome', field: 'name', sortable: true, align: 'left' },
      { 
        name: 'cpf', 
        label: 'CPF', 
        field: 'cpf', 
        sortable: true,
        align: 'left',
        format: (val) => {
          return val.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
      },
      { name: 'email', label: 'E-mail', field: 'email', sortable: true, align: 'left' },
      { name: 'shirt_size', label: 'Tamanho da Camiseta', field: 'shirt_size', align: 'center' },
      { name: 'shoe_size', label: 'Tamanho do Calçado', field: 'shoe_size', sortable: true, align: 'center' },
      { name: 'actions', label: 'Ações', field: 'actions', align: 'center' },
    ];

    onMounted(() => {
      getEmployees();
    });

    const getEmployees = async () => {
      try {
        const data = await get();
        employees.value = data.employees
      } catch (error) {
        $q.notify({ message: `Erro ao carregar funcionários! ${error}`, icon: 'close', color: 'negative', position: 'top' });
      }
    }

    const deleteEmployee = (id) => {
      try {
        dialog({ id }, 'remove');
      } catch (error) {
        $q.notify({ message: `Erro ao remover funcionário! ${error}`, icon: 'close', color: 'negative', position: 'top' });
        return;
      }
    }

    const addEmployee = () => {
      dialog(
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

    const filterByField = (rows, terms) => {
      if (!terms.value) {
        return rows;
      }

      const field = terms.field;
      const search = terms.value.toLowerCase();
    
      return rows.filter(row => {
        if (field === 'cpf') {
          const cpf = String(row.cpf).replace(/\D/g, '');
          return cpf.includes(search.replace(/\D/g, ''));
        }
        
        const value = String(row[field] ?? '').toLowerCase();
        return value.includes(search.toLowerCase());
      })
    }


    const editEmployee = async (id) => {
      const employee = await getById(id)
      if (!employee?.dataValues) {
        $q.notify({ message: 'Funcionário não encontrado!', icon: 'close', color: 'negative', position: 'top' });
        return;
      }

      dialog(employee.dataValues, 'edit');
    }

    const dialog = (employee, action) => {
      const defaultOptions = { 
          component: Dialog,
          componentProps: { 
            data: employee,
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
          options: { 
            ...defaultOptions,
            componentProps: { 
              data: employee,
              title: 'Editar Funcionário'
            }
          },
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
        dark: true,
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
            ? employee.id
            : (data?.employee || data);
          
          await type.method(payload)
          $q.notify({ message: `Funcionário ${type.verb} com sucesso!`, icon: 'check', color: 'positive', position: 'top' });
          getEmployees();
        } catch (error) {
          $q.notify({ message: `Erro ao ${type.title.toLowerCase()} funcionário! ${error}`, icon: 'close', color: 'negative', position: 'top' });
        }
      })
    };

    return {
      employees,
      filter,
      columns,
      options,
      addEmployee,
      deleteEmployee,
      dialog,
      editEmployee,
      filterByField,
    }
  }
});
</script>
