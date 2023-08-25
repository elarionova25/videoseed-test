import {describe, it, expect} from 'vitest'
import {mount} from '@vue/test-utils'
import {createApp} from 'vue';
import ProjectsTable from '../ProjectsTable.vue'

describe('ComponentUnderTest', () => {
    it('renders the component', async () => {
        const app = createApp(ProjectsTable);
        const wrapper = mount(app);

        expect(wrapper.exists()).toBe(true);
    });
});
