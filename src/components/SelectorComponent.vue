<template>
    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Выберите значение
        статуса:</label>
    <select id="countries"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="query.selector"
    >
        <option
            v-for="option in options"
            :value="option.value"
        >
            {{ option.label }}
        </option>
    </select>
</template>

<script>
import {ref} from "vue";

export default {
    name: 'SelectorComponent',
    props: ['query'],
    setup(props) {
        let options = ref([
            {
                label: 'Не выбрано',
                value: null,
            },
            {
                label: 'CREATED',
                value: 'CREATED',
            },
            {
                label: 'IN_PROGRESS',
                value: 'IN_PROGRESS',
            },
            {
                label: 'FINISHED',
                value: 'FINISHED',
            },
        ])
        return {
            options
        }
    },
}
</script>

<style scoped>

</style>