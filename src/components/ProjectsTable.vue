<template>
    <div>
        <h1>Таблица проектов</h1>
        <p>Общее количество: {{ projects.count }}</p>
        <div class="flex flex-col">
            <SearchComponent :query="query" />
            <SelectorComponent :query="query" />
        </div>
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
                            <tbody v-if="loading.status">
                            <tr>
                                <LoadingSvg />
                            </tr>
                            </tbody>
                            <tbody v-else>
                            <tr
                                class="border-b dark:border-neutral-500"
                                v-for="(project, index) in paginatedProjects"
                                :key="project.id"
                            >
                                <td class="whitespace-nowrap px-6 py-4 font-medium">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
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

        <div class="flex justify-center mt-4">
            <button
                v-for="page in totalPages"
                :key="page"
                @click="setCurrentPage(page)"
                :class="{ 'bg-blue-500 text-white px-4 py-2 mx-1 rounded hover:bg-blue-600': page !== currentPage, 'bg-blue-300 text-blue-800 px-4 py-2 mx-1 rounded': page === currentPage }"
            >
                {{ page }}
            </button>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed, reactive } from "vue";
import SearchComponent from "@/components/SearchComponent.vue";
import SelectorComponent from "@/components/SelectorComponent.vue";
import LoadingSvg from "@/components/LoadingSvg.vue";

let projects = ref({
    search: null,
});
let loading = reactive({
    status: false,
});
let query = reactive({
    search: "",
    selector: null,
});
let currentPage = ref(1);
const pageSize = 7;

onMounted(async () => {
    await fetchData();
});

async function fetchData() {
    loading.status = true;
    const res = await axios.get("https://dev.aicap.tech/api/v1/interview/projects/");

    // here setTimeout done for showing loading status. without it loading is instant
    setTimeout(() => {
        projects.value = res.data;
        loading.status = false;
    }, 2000);
}

const filter = computed(() => {
    if (query.search) {
        return getSearchableProjects();
    } else if (query.selector) {
        return getSelectableProjects();
    }
    return projects.value.results;
});

const getSearchableProjects = () => {
    return projects.value.results.filter((el) => {
        return el.title.toLowerCase().indexOf(query.search.toLowerCase()) !== -1;
    });
};

const getSelectableProjects = () => {
    return projects.value.results.filter((el) => {
        return el.status.indexOf(query.selector) !== -1;
    });
};

const setCurrentPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

const paginatedProjects = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if(filter.value){
        return filter.value.slice(startIndex, endIndex);
    } else {
        return null;
    }
});

const totalPages = computed(() => {
    if(filter.value) {
        return Math.ceil(filter.value.length / pageSize);
    }
});
</script>

<style scoped>
h1 {
    text-align: center;
    font-size: 30px;
}
</style>
