import {Amount} from 'mand-mobile'
import {shallowMount, mount} from '@vue/test-utils'

describe('Amount - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('mounted', () => {
    let checked = false
    wrapper = shallowMount(Amount, {
      propsData: {
        value: 1234,
      },
    })
    expect(wrapper.vm.isMounted).toBe(true)
  })

  test('Transition - 01', async () => {
    wrapper = shallowMount({
      template: `
          <md-amount
          :value="val"
          :duration="800"
          transition
          ref="mdAmount"
        ></md-amount>
      `,
      components: {
        [Amount.name]: Amount,
      },
      data() {
        return {
          val: 1000,
        }
      },
    })
    expect(wrapper.vm.val).toBe(1000)

    await wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$refs.mdAmount.formatValue).toBe(1000)
    })

    await wrapper.vm.$nextTick(() => {
      wrapper.setData({
        val: 20.66,
      })
    })

    expect(wrapper.vm.val).toBe(20.66)

    await wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$refs.mdAmount).toBe(20.66)
    })
  })
})
