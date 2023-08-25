<template>
    <div>
        <h1>Таблица проектов</h1>
        <p>Общее количество: {{ projects.count }}</p>
        <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <table class="min-w-full text-left text-sm font-light">
                            <thead class="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" class="px-6 py-4">№</th>
                                <th scope="col" class="px-6 py-4">Id</th>
                                <th scope="col" class="px-6 py-4">Title</th>
                                <th scope="col" class="px-6 py-4">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                class="border-b dark:border-neutral-500"
                                v-for="(project, key) in projects.results"
                                :key="key"
                            >
                                <td class="whitespace-nowrap px-6 py-4 font-medium">{{ key }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ project.id }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ project.title }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ project.status }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";

import {ref, onMounted} from 'vue'

let projects = ref({});

onMounted(async () => {
    // el.value // <div>
    await fetchData();
})

async function fetchData() {
    const res = await axios.get('https://dev.aicap.tech/api/v1/interview/projects/');
    projects.value = res.data;
}
</script>

<style scoped>
h1 {
    text-align: center;
    font-size: 30px;
}
</style>
