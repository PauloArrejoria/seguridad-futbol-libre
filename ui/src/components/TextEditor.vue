<template>
    <quill-editor
        v-model:content="mensajeLocal"
        contentType="html"
        theme="snow"
        toolbar="full"
    >
    </quill-editor>
</template>

<script lang="ts" setup>
import { toRefs, watch, ref, defineProps, defineEmits } from 'vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { QuillEditor } from '@vueup/vue-quill';

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['update:modelValue']);
const { modelValue } = toRefs(props);
const mensajeLocal = ref(modelValue.value);

watch(modelValue, (nuevoValor) => {
    mensajeLocal.value = nuevoValor;
});

watch(mensajeLocal, (nuevoValor) => {
    emit('update:modelValue', nuevoValor);
});
</script>

<style scoped>

</style>