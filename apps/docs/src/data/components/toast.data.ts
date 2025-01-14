import type {ComponentReference} from './ComponentReference'

export default {
  load: (): ComponentReference[] => [
    {
      component: 'BToast',
      props: [
        {
          description: '',
          prop: 'delay',
          type: 'number',
        },
        {
          prop: 'body',
          type: 'BodyProp',
          description: 'Content of Body',
        },
        {
          prop: 'bodyClass',
          type: 'string',
          description: 'CSS class (or classes) to add to the toast body element',
        },
        {
          prop: 'headerClass',
          type: 'string',
          description: 'CSS class (or classes) to add to the toast header element',
        },
        {
          prop: 'headerTag',
          type: 'string',
          description: 'Specify the HTML tag to render instead of the default tag for the footer',
        },
        {
          description: '',
          prop: 'animation',
          type: 'Booleanish',
        },
        {
          description: '',
          prop: 'id',
          type: 'string',
        },
        {
          prop: 'isStatus',
          type: 'Booleanish',
          description:
            "When set to 'true', makes the toast have attributes aria-live=polite and role=status. When 'false' aria-live will be 'assertive' and role will be 'alert'",
        },
        {
          description: '',
          prop: 'autohide',
          type: 'Booleanish',
        },
        {
          prop: 'noCloseButton',
          type: 'Booleanish',
          description: 'When set, hides the close button in the toast header',
        },
        {
          description: '',
          prop: 'noFade',
          type: 'Booleanish',
        },
        {
          prop: 'noHoverPause',
          type: 'Booleanish',
          description:
            'When set, disables the pausing of the auto hide delay when the mouse hovers the toast',
        },
        {
          prop: 'solid',
          type: 'Booleanish',
          description:
            'When set, renderes the toast with a solid background rather than translucent',
        },
        {
          description: '',
          prop: 'static',
          type: 'Booleanish',
        },
        {
          prop: 'title',
          type: 'string',
          description: "The toast's title text",
        },
        {
          description: '',
          prop: 'modelValue',
          type: 'Booleanish',
        },
        {
          prop: 'toastClass',
          type: 'string[]',
          description: 'CSS class (or classes) to add to the toast wrapper element',
        },
        {
          prop: 'variant',
          type: 'ColorVariant',
          description: 'Applies one of the Bootstrap theme color variants to the component',
        },
      ],
      slots: [],
      emits: [
        {
          event: 'update:modelValue',
          description: 'Emitted when toast visibility changes',
          args: [
            {
              arg: 'value',
              type: 'Boolean',
              description: 'The resulting value that was changed',
            },
          ],
        },
        {
          args: [
            {
              arg: 'destroyed',
              description: '',
              type: 'string',
            },
          ],
          description: '',
          event: 'destroyed',
        },
      ],
    },
    {
      component: 'BToaster',
      emits: [],
      slots: [],
      props: [
        {
          description: '',
          prop: 'position',
          type: 'ContainerPosition',
        },
        {
          description: '',
          prop: 'instance',
          type: 'ToastInstance',
        },
      ],
    },
  ],
}
