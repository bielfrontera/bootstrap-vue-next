import type {AriaInvalid, Booleanish, Size} from '../types'
import {
  computed,
  type ExtractPropTypes,
  nextTick,
  onActivated,
  onMounted,
  type PropType,
  ref,
  toRef,
  watch,
} from 'vue'
import {useBooleanish, useId} from '.'
import {resolveAriaInvalid} from '../utils'
import {useFocus} from '@vueuse/core'

export const COMMON_INPUT_PROPS = {
  ariaInvalid: {
    type: [Boolean, String] as PropType<AriaInvalid>,
    default: undefined,
  },
  autocomplete: {type: String, required: false},
  autofocus: {type: Boolean, default: false},
  disabled: {type: Boolean, default: false},
  form: {type: String, required: false},
  formatter: {type: Function, required: false},
  id: {type: String, required: false},
  lazy: {type: Boolean, default: false},
  lazyFormatter: {type: Boolean, default: false},
  list: {type: String, required: false},
  modelValue: {type: [String, Number] as PropType<string | number>, default: ''},
  name: {type: String, required: false},
  number: {type: Boolean, default: false},
  placeholder: {type: String, required: false},
  plaintext: {type: Boolean, default: false},
  readonly: {type: Boolean, default: false},
  required: {type: Boolean, default: false},
  size: {type: String as PropType<Size>, required: false},
  state: {type: Boolean as PropType<Booleanish | null | undefined>, default: null},
  trim: {type: Boolean, default: false},
}

type InputProps = ExtractPropTypes<typeof COMMON_INPUT_PROPS>
type InputEmitType = (
  event: 'update:modelValue' | 'change' | 'blur' | 'input',
  ...args: any[]
) => void

export default (props: Readonly<InputProps>, emit: InputEmitType) => {
  const input = ref<HTMLInputElement | null>(null)
  let inputValue: string | null = null
  let neverFormatted = true
  const computedId = useId(toRef(props, 'id'), 'input')
  const stateBoolean = useBooleanish(toRef(props, 'state'))

  const {focused} = useFocus(input, {
    initialValue: props.autofocus,
  })

  const _formatValue = (value: unknown, evt: Event, force = false) => {
    value = String(value)
    if (typeof props.formatter === 'function' && (!props.lazyFormatter || force)) {
      neverFormatted = false
      return props.formatter(value, evt)
    }
    return value
  }

  const _getModelValue = (value: any) => {
    if (props.trim) return value.trim()
    if (props.number) return Number.parseFloat(value)

    return value
  }

  const handleAutofocus = () => {
    if (props.autofocus) {
      focused.value = true
    }
  }

  onMounted(() => {
    if (input.value) {
      input.value.value = props.modelValue as string
    }
  })

  onActivated(() => {
    nextTick(() => {
      handleAutofocus()
    })
  })

  const computedAriaInvalid = computed(() =>
    resolveAriaInvalid(props.ariaInvalid, stateBoolean.value)
  )

  const onInput = (evt: Event) => {
    const {value} = evt.target as HTMLInputElement
    const formattedValue = _formatValue(value, evt)
    if (formattedValue === false || evt.defaultPrevented) {
      evt.preventDefault()
      return
    }

    if (props.lazy) return

    const nextModel = _getModelValue(formattedValue)

    if (props.modelValue !== nextModel) {
      inputValue = value
      emit('update:modelValue', nextModel)
    }

    emit('input', formattedValue)
  }

  const onChange = (evt: Event) => {
    const {value} = evt.target as HTMLInputElement
    const formattedValue = _formatValue(value, evt)
    if (formattedValue === false || evt.defaultPrevented) {
      evt.preventDefault()
      return
    }

    if (!props.lazy) return
    inputValue = value
    emit('update:modelValue', formattedValue)

    const nextModel = _getModelValue(formattedValue)
    if (props.modelValue !== nextModel) {
      emit('change', formattedValue)
    }
  }

  const onBlur = (evt: FocusEvent) => {
    emit('blur', evt)
    if (!props.lazy && !props.lazyFormatter) return

    const {value} = evt.target as HTMLInputElement
    const formattedValue = _formatValue(value, evt, true)

    inputValue = value
    emit('update:modelValue', formattedValue)
  }

  const focus = () => {
    if (!props.disabled) {
      focused.value = true
    }
  }

  const blur = () => {
    if (!props.disabled) {
      input.value?.blur()
    }
  }

  watch(
    () => props.modelValue,
    (newValue) => {
      if (!input.value) return
      input.value.value = inputValue && neverFormatted ? inputValue : (newValue as string)
      inputValue = null
      neverFormatted = true
    }
  )

  return {
    input,
    computedId,
    computedAriaInvalid,
    onInput,
    onChange,
    onBlur,
    focus,
    blur,
  }
}
