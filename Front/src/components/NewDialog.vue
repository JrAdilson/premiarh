<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card dark class="q-dialog-plugin" style="max-width: 700px; width: 100%">
            <q-card-section>
                <div class="text-h6">{{ title }}</div>
            </q-card-section>

            <q-card-section>
                <q-form>
                    <div class="row q-col-gutter-md q-mb-md">
                        <div class="col-8">
                            <q-input 
                                color="white" 
                                text-color="white" 
                                outlined 
                                v-model="localData.name" 
                                label="Nome" 
                                maxlength="255" 
                                @keypress="onlyLetters"
                                @paste.prevent="onlyLetters"
                                :rules="[val => !!val || 'Informe o nome do Funcionário']"
                            />
                        </div>
                        <div class="col-4">
                            <q-input 
                                color="white" 
                                text-color="white" 
                                outlined 
                                v-model="localData.cpf" 
                                label="CPF" 
                                maxlength="14" 
                                mask="###.###.###-##"
                                @keypress="onlyNumbers"
                                @paste.prevent="onlyNumbers"
                                :rules="[val => !!val || 'Informe o CPF do Funcionário']"
                            />
                        </div>
                    </div>

                    <div class="row q-mb-md">
                        <div class="col-12">
                            <q-input 
                                color="white" 
                                text-color="white" 
                                outlined 
                                v-model="localData.email" 
                                label="E-mail" 
                                maxlength="255" 
                                :rules="[val => !!val || 'Informe o e-mail do Funcionário']"
                            />
                        </div>
                    </div>

                    <div class="row q-col-gutter-md">
                        <div class="col-6">
                            <q-select
                                outlined
                                v-model="localData.shirt_size"
                                :options="shirtSizes"
                                label="Tamanho da Camiseta"
                                emit-value
                                :clearable="false"
                                :options-dense="true"
                                :options-highlight="true"
                                color="white" 
                                text-color="white"
                                :rules="[val => !!val || 'Informe o tamanho da camiseta do Funcionário']"
                            />
                        </div>
                        <div class="col-6">
                            <q-input 
                                color="white" 
                                text-color="white" 
                                outlined 
                                v-model="localData.shoe_size" 
                                label="Tamanho do Calçado" 
                                maxlength="2"
                                :rules="[val => !!val || 'Informe o tamanho do calçado do Funcionário']"
                                @keypress="onlyNumbers"
                                @paste.prevent="onlyNumbers"
                            />
                        </div>
                    </div>
                </q-form>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="secondary" @click="onDialogCancel" />
                <q-btn flat label="OK" color="secondary" @click="validateDialog(localData)" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useQuasar, useDialogPluginComponent } from 'quasar'

const $q = useQuasar();
const shirtSizes = ['PP', 'P', 'M', 'G', 'GG', 'XGG']
const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    },
    title: {
        type: String,
        default: 'Adicionar/Editar Funcionário'
    }
})

const { dialogRef,  onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const localData = ref({ ...props.data })

const onlyLetters = (event) => {
    const char = String.fromCharCode(event.keyCode || event.which);
    !/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]$/.test(char) && event.preventDefault();
}

const onlyNumbers = (event) => {
    const char = String.fromCharCode(event.keyCode || event.which);
    !/^[0-9]$/.test(char) && event.preventDefault();
}

const validateDialog = (data) => {
    const requiredFields = ['name', 'cpf', 'email', 'shirt_size', 'shoe_size'];
    const toPortuguese = { 
        name: 'nome',
        cpf: 'CPF',
        email: 'e-mail',
        shirt_size: 'tamanho da camiseta',
        shoe_size: 'tamanho do calçado'
    };

    for (const key of requiredFields) {
        const value = data[key];
        if (value === null || value === undefined || value === '') {
            $q.notify({
                message: `Informe o ${toPortuguese[key]}`,
                color: 'warning',
                icon: 'warning',
                position: 'top'
            });
            return;
        }

        if (key === 'cpf' && value.length !== 11) {
            $q.notify({
                message: 'Informe um CPF válido',
                color: 'warning',
                icon: 'warning',
                position: 'top'
            });
            return;
        }

        if (key === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(String(value.toLowerCase()))) {
                $q.notify({
                    message: 'Informe um e-mail válido',
                    color: 'warning',
                    icon: 'warning',
                    position: 'top'
                });
                return;
            }
        }

        if (key === 'shoe_size') {
            const size = Number(value);
            if (size < 34 || size > 48) {
                $q.notify({
                    message: 'O tamanho do calçado deve estar entre 34 e 48',
                    color: 'warning',
                    icon: 'warning',
                    position: 'top'
                });
                return;
            }
        }
    }

    onDialogOK(data);
};

watch(
    () => props.data, (newVal) => localData.value = { ...newVal }, 
    { deep: true }
)

defineEmits([
    ...useDialogPluginComponent.emits
])
</script>

<style scoped>
.custom-card {
    background-color: #404040;
}

:deep(.q-field__label) {
    color: white !important;
}

:deep(.q-field__append .q-icon) {
    color: white !important;
}

:deep(.q-field__native),
:deep(.q-field__input) {
    color: white !important;
}
</style>