import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CreateView from '@/views/CreateView.vue'

describe('create purchase order form', () => {
  const wrapper = mount(CreateView)

  it('adds new purchase order item row when add button got clicked', async () => {
    // click the button twice
    await wrapper.find('#addItem').trigger('click')
    await wrapper.find('#addItem').trigger('click')
    const inputs = wrapper.findAll('.description')
    // expect having the initial row plus two more rows
    expect(inputs).toHaveLength(3)
  })

  it('it removes row when the delete row button got clicked', async () => {
    // add row (total now should be 3)
    await wrapper.find('#addItem').trigger('click')
    await wrapper.find('#addItem').trigger('click')
    // remove one (total should be 2)
    await wrapper.find('.delete-row-btn').trigger('click')
    const inputs = wrapper.findAll('.description')

    // expect having the initial row plus two more rows
    expect(inputs).toHaveLength(4)
  })
})
