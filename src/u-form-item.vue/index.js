import Emitter from '../u-emitter.vue';
import Validator from 'vusion-async-validator';

export default {
    name: 'u-form-item',
    mixins: [Emitter],
    props: {
        name: String,
        label: String,
        title: String,
        rules: Array,
        ignoreRules: { type: Boolean, default: false },
        message: String,
        required: { type: Boolean, default: false },
        labelSize: String,
    },
    data() {
        return {
            value: undefined,
            state: '',
            color: '',
            currentMessage: this.message,
            inputing: false,
            parentVM: undefined,
            fieldVM: undefined,
        };
    },
    computed: {
        currentRules() {
            return this.rules || (this.parentVM && this.parentVM.rules && this.parentVM.rules[this.name]);
        },
        currentRequired() {
            return this.required || this.currentRules && this.currentRules.some((rule) => rule.required);
        },
        currentLabelSize() {
            return this.labelSize || (this.parentVM && this.parentVM.labelSize) || 'auto';
        },
    },
    created() {
        this.dispatch('u-form', 'add-item-vm', this);
        this.$on('add-field-vm', (fieldVM) => {
            // 一个`<u-form-item>`中，只注册一个`fieldVM`，其他的忽略
            if (this.fieldVM)
                return;
            this.fieldVM = fieldVM;
            fieldVM.formItemVM = this;
            this.value = fieldVM.value;
            // 初始化的时候自行验证一次。Fix #23
            this.validate('submit', true).catch((errors) => errors);
        });
        this.$on('remove-field-vm', (fieldVM) => {
            this.fieldVM = undefined;
            fieldVM.formItemVM = undefined;
        });
        this.$on('input', this.onInput);
        this.$on('change', this.onChange);
        this.$on('focus', this.onFocus);
        this.$on('blur', this.onBlur);
    },
    destroyed() {
        this.dispatch('u-form', 'remove-item-vm', this);
    },
    methods: {
        onInput(value) {
            this.inputing = true;
            this.value = value;
            this.$nextTick(() => {
                this.validate('input').catch((errors) => errors);
                this.inputing = false;
            });
        },
        onChange($event) {
            this.value = $event.value;
            !this.inputing && this.validate('submit', true).catch((errors) => errors);
        },
        onFocus() {
            this.color = 'focus';
            this.currentMessage = this.message;
        },
        onBlur() {
            this.color = this.state = '';
            this.$nextTick(() => this.validate('blur').catch((errors) => errors));
        },
        validate(trigger = 'submit', silent = false) {
            let rules = this.currentRules;
            rules = rules && rules.filter((item) => !item.ignore).filter((rule) => (rule.trigger + '+submit').includes(trigger));
            if (this.ignoreRules || !rules || !rules.length) {
                this.color = this.currentMessage = '';
                this.dispatch('u-form', 'validate-item-vm', true);
                return Promise.resolve();
            }

            this.state = 'validating';
            if (!silent)
                this.color = this.state;
            else
                this.color = this.currentMessage = '';

            const name = this.name || 'field';
            const validator = new Validator({
                [name]: rules,
            });

            return new Promise((resolve, reject) => {
                validator.validate({ [name]: this.value }, { firstFields: true }, (errors, fields) => {
                    this.state = errors ? 'error' : 'success';
                    if (!silent) {
                        this.color = this.state;
                        this.currentMessage = errors ? errors[0].message : this.message;
                    }

                    this.dispatch('u-form', 'validate-item-vm', !errors);
                    errors ? reject(errors) : resolve();
                });
            });
        },
    },
};
