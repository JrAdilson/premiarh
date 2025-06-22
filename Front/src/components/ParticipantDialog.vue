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
                            <q-input color="white" text-color="white" outlined v-model="localData.name" label="Nome" />
                        </div>
                        <div class="col-4">
                            <q-input color="white" text-color="white" outlined v-model="localData.cpf" label="CPF" />
                        </div>
                    </div>

                    <div class="row q-mb-md">
                        <div class="col-12">
                            <q-input color="white" text-color="white" outlined v-model="localData.email" label="E-mail" />
                        </div>
                    </div>

                    <div class="row q-col-gutter-md">
                        <div class="col-6">
                            <q-select
                                outlined
                                v-model="localData.shirt_size"
                                :options="shirtSizes"
                                label="Tamanho da Camisa"
                                emit-value
                                :clearable="false"
                                :options-dense="true"
                                :options-highlight="true"
                                color="white" 
                                text-color="white"
                            />
                        </div>
                        <div class="col-6">
                            <q-input color="white" text-color="white" outlined v-model="localData.shoe_size" label="Tamanho do Calçado" />
                        </div>
                    </div>
                </q-form>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="secondary" @click="onDialogCancel" />
                <q-btn flat label="OK" color="secondary" @click="onDialogOK(localData)" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDialogPluginComponent } from 'quasar'

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

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const localData = ref({ ...props.data })

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