import Field from '../u-field.vue';

export default {
    name: 'u-input',
    mixins: [Field],
    props: {
        value: { type: [String, Number] },
        color: { type: String },
        readonly: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },
    data() {
        return {
            focused: false,
            currentValue: this.value,
            currentColor: this.color,
            compositionInputing: false,
        };
    },
    computed: {
        listeners() {
            const listeners = Object.assign({}, this.$listeners);
            ['input', 'change', 'focus', 'blur', 'update:value'].forEach((prop) => {
                delete listeners[prop];
            });
            return listeners;
        },
    },
    watch: {
        value(value) {
            this.currentValue = value;
        },
        currentValue(value, oldValue) {
            this.$emit('change', { value, oldValue });
        },
        color(color) {
            this.currentColor = color;
        },
    },
    methods: {
        onInput(e) {
            if (!this.compositionInputing) {
                this.currentValue = e.target.value;
                this.$emit('input', this.currentValue);
                this.$emit('update:value', this.currentValue);
            }
        },
        onFocus(e) {
            this.focused = true;
            this.$emit('focus', e);
        },
        onBlur(e) {
            this.focused = false;
            this.$emit('blur', e);
        },
        onCompositionEnd(e) {
            // 中文输入的时候，会先触发onInput事件，再触发此事件，导致不能捕捉到中文输入
            // 因此需要特殊处理，此时compositionInputing值为true
            this.compositionInputing = false;
            this.currentValue = e.target.value;
            this.$emit('input', this.currentValue);
            this.$emit('update:value', this.currentValue);
        },
        focus() {
            this.$refs.input.focus();
        },
        blur() {
            this.$refs.input.blur();
        },
    },
};
