import { EventEmitter } from 'node:events';
import { d as defineComponent, x as xml, p as padding, h as heightIn, v as verticalScroll, w as widthIn, f as fillMaxWidth, s as shallowReactive, r as reactive, a as watch, n as nodeOps, c as createApp, b as ref, e as clickable } from '../index-C9n9dDp8.js';
import 'lodash';

function dialogButton(text, color, onClick) {
    if (!text)
        return;
    return xml `
        <Button onClick=${onClick} type="text">
            <text color=${color}>${text}</text>
        </Button>
    `;
}
function createDialogContent(options) {
    const { title, content, contentColor, positive, positiveColor, icon, negative, negativeColor, neutralColor, neutral, } = options;
    return defineComponent({
        props: {
            events: Object
        },
        render() {
            let contentVnode;
            if (typeof content === 'string') {
                contentVnode = xml `<text color=${contentColor}>${content}</text>`;
            }
            else if (content) {
                contentVnode = xml `<${content}/>`;
            }
            const positiveVnode = dialogButton(positive, positiveColor, this.$props.events?.onPositive);
            const negativeVnode = dialogButton(negative, negativeColor, this.$props.events?.onNegative);
            const neutralVnode = dialogButton(neutral, neutralColor, this.$props.events?.onNeutral);
            return xml `
            <card>
                <column modifier=${[padding(16, 16, 16, 8)]}>
                    <row modifier=${[padding(0, 0, 0, 10)]}>
                        <text fontSize=${18}>${title}</text>
                    </row>
                    <column modifier=${[heightIn(35, 500), verticalScroll(), widthIn(140)]}>
                        ${contentVnode}
                    </column>
                    <row modifier=${[fillMaxWidth(), padding(0, 5, 0, 0)]}>
                        ${neutralVnode}
                        <row modifier=${[fillMaxWidth()]} horizontalArrangement="end">
                            ${negativeVnode}
                            ${positiveVnode}
                        </row>
                    </row>
                </column>
               </card>
            `;
        }
    });
}

class MutxDialog extends EventEmitter {
    state;
    constructor(state) {
        super();
        this.state = state;
    }
    dismiss() {
        this.state.isShow = false;
    }
}
class DialogFactory {
    showin = shallowReactive(new Set());
    get Dialog() {
        const showin = this.showin;
        return defineComponent({
            render() {
                const nodes = Array.from(showin).map((t) => {
                    const [comp, ops] = t;
                    if (!ops.isShow) {
                        showin.delete(t);
                        return;
                    }
                    return xml `
                    <Dialog
                        dismissOnBackPress=${ops.dismissOnBackPress}
                        dismissOnClickOutside=${ops.dismissOnClickOutside}
                        securePolicy=${ops.securePolicy}
                        onDismissRequest=${() => { ops.isShow = false; }}>
                        <${comp} />
                    </Dialog>
                    `;
                });
                return xml `
                ${nodes}
                `;
            }
        });
    }
    _mountUi(comp, ops) {
        const state = reactive({
            ...ops,
            isShow: true
        });
        const p = watch(() => state.isShow, (isShow) => {
            if (isShow === false) {
                ops.onDismiss();
                p();
            }
        });
        this.showin.add([comp, state]);
        return new MutxDialog(state);
    }
    showDialog(options) {
        options.type = this;
        return showDialog({
            ...options,
            type: this,
        });
    }
    showAlertDialog(title, options) {
        return showAlertDialog(title, {
            ...options,
            type: this,
        });
    }
    showConfirmDialog(title, options) {
        return showConfirmDialog(title, {
            ...options,
            type: this,
        });
    }
    showInputDialog(title, prefill, options) {
        return showInputDialog(title, prefill, {
            ...options,
            type: this,
        });
    }
    showSelectDialog(title, items, options) {
        return showSelectDialog(title, items, {
            ...options,
            type: this,
        });
    }
    showMultiChoiceDialog(title, items, initialSelectedIndices, options) {
        return showMultiChoiceDialog(title, items, initialSelectedIndices, {
            ...options,
            type: this,
        });
    }
    showSingleChoiceDialog(title, items, initialSelectedIndex, options) {
        return showSingleChoiceDialog(title, items, initialSelectedIndex, {
            ...options,
            type: this,
        });
    }
}

const dialogs = Autox.dialogs;
const defaultDialogType = 'app';
function showAppDialog(comp, ops) {
    const el = nodeOps.createElement('box');
    const app = createApp(comp);
    app.mount(el);
    const s = setInterval(() => { }, 2000);
    return dialogs.showDialog(el.__xel, Object.assign({
        dismissOnBackPress: true
    }, ops, {
        onDismiss() {
            app.unmount();
            clearInterval(s);
            ops?.onDismiss();
        }
    }));
}
var DialogEvent;
(function (DialogEvent) {
    /**@event */
    DialogEvent["ON_DISMISS"] = "dismiss";
    /**@event */
    DialogEvent["ON_POSITIVE"] = "positive";
    /**@event */
    DialogEvent["ON_NEGATIVE"] = "negative";
    /**@event */
    DialogEvent["ON_NEUTRAL"] = "neutral";
    /**@event */
    DialogEvent["ON_INPUT_CHANGE"] = "input_change";
})(DialogEvent || (DialogEvent = {}));
class Dialog extends EventEmitter {
    _nv;
    destroyed = false;
    constructor() {
        super();
        this.once(DialogEvent.ON_DISMISS, () => { this.destroyed = true; });
    }
    dismiss() {
        this._nv?.dismiss();
    }
}
const showDialog = function (options) {
    const { type = defaultDialogType, dismissOnBackPress, dismissOnClickOutside } = options;
    const Content = createDialogContent(options);
    let dialog;
    const dialogEventListener = {
        onPositive() {
            dialog.emit(DialogEvent.ON_POSITIVE, dialog);
        },
        onNegative() {
            dialog.emit(DialogEvent.ON_NEGATIVE, dialog);
        },
        onNeutral() {
            dialog.emit(DialogEvent.ON_NEUTRAL, dialog);
        },
    };
    const comp = () => {
        return xml `
                <${Content} events=${dialogEventListener}/>
            `;
    };
    const ops = {
        dismissOnBackPress: (typeof dismissOnBackPress === 'boolean') ? dismissOnBackPress : true,
        dismissOnClickOutside: (typeof dismissOnClickOutside === 'boolean') ? dismissOnClickOutside : true,
        onDismiss() {
            dialog.emit(DialogEvent.ON_DISMISS);
        },
    };
    if (type === 'app') {
        dialog = new Dialog();
        dialog._nv = showAppDialog(comp, ops);
    }
    else if (type instanceof DialogFactory) {
        dialog = type._mountUi(comp, ops);
    }
    else {
        dialog = new Dialog();
        console.warn('Unknown Dialog type: ' + type);
    }
    return dialog;
};
/**
 * 显示一个消息提示对话框，返回一个Promise
 * @param title
 * @param options
 * @returns Promise将在对话框消失时完成
 */
const showAlertDialog = async function (title, options) {
    const f = {
        title: title,
        positive: '确认',
    };
    const dialog = showDialog(Object.assign(f, options));
    return new Promise((resolve, reject) => {
        dialog.once(DialogEvent.ON_DISMISS, resolve);
        dialog.once(DialogEvent.ON_POSITIVE, () => { dialog.dismiss(); });
    });
};
/**
 * 显示一个确认对话框
 * @param title
 * @param options
 * @returns 只在点击positive按钮时返回true,其他情况返回false
 */
const showConfirmDialog = async function (title, options) {
    const f = {
        title: title,
        positive: '确认',
        negative: '取消',
    };
    const dialog = showDialog(Object.assign(f, options));
    let r = false;
    return new Promise((resolve, reject) => {
        dialog.once(DialogEvent.ON_DISMISS, () => resolve(r));
        dialog.once(DialogEvent.ON_POSITIVE, () => {
            r = true;
            dialog.dismiss();
        });
        dialog.once(DialogEvent.ON_NEGATIVE, () => { dialog.dismiss(); });
    });
};
/**
 * 显示一个输入框，提示用户输入信息
 * @param title
 * @param prefill 输入框的默认内容
 * @param options
 * @returns 点击positive时返回字符串，即使输入为空，被取消时返回null
 */
const showInputDialog = async function (title, prefill, options) {
    let input = prefill || "";
    const DialogContent = defineComponent(function () {
        function updateInput(value) {
            input = value;
            dialog.emit(DialogEvent.ON_INPUT_CHANGE, value, dialog);
        }
        return function render() {
            return xml `
            <TextField value=${input} 
                placeholder=${options?.inputHint}
                label=${options?.inputLable}
                onValueChange=${updateInput} />
            `;
        };
    });
    const f = {
        title: title,
        inputPrefill: prefill,
        positive: '确认',
        negative: '取消',
    };
    const dialog = showDialog(Object.assign(f, options, { content: DialogContent, }));
    return new Promise((resolve, reject) => {
        dialog.once(DialogEvent.ON_DISMISS, () => resolve(null));
        dialog.once(DialogEvent.ON_POSITIVE, () => {
            resolve(input);
            dialog.dismiss();
        });
        dialog.once(DialogEvent.ON_NEGATIVE, () => { dialog.dismiss(); });
    });
};
/**
 * 显示一个选择对话框，选中任意项后消失
 * @param title
 * @param items 选项数组
 * @param options
 * @returns 返回选中的项目索引，被取消则返回-1
 */
const showSelectDialog = async function (title, items, options) {
    let select = -1;
    const DialogContent = defineComponent(function () {
        function click(i) {
            select = i;
            dialog.dismiss();
        }
        const modifier = [fillMaxWidth(), heightIn(50)];
        return function render() {
            return items.map((item, i) => {
                const onClick = click.bind(undefined, i);
                return xml `
                <box contentAlignment="center_start"
                    modifier=${[...modifier, clickable(onClick)]}>
                    <text fontSize=${15}>${item}</text>
                </box>
                `;
            });
        };
    });
    const f = {
        title: title
    };
    const dialog = showDialog(Object.assign(f, options, { content: DialogContent, }));
    return new Promise((resolve, reject) => {
        dialog.once(DialogEvent.ON_DISMISS, () => resolve(select));
    });
};
/**
 * 显示一个多选对话框
 * @param title
 * @param items 可多选的项目
 * @param initialSelectedIndices 初始选中的项目索引数组
 * @param options
 * @returns 返回选中的项目索引数组，被取消则返回`null`
 */
const showMultiChoiceDialog = async function (title, items, initialSelectedIndices, options) {
    let select = new Set();
    const DialogContent = defineComponent(function () {
        const state = reactive(items.map(() => false));
        if (initialSelectedIndices) {
            for (let i of initialSelectedIndices) {
                if (i >= items.length)
                    continue;
                select.add(i);
                state[i] = true;
            }
        }
        function click(i) {
            const r = state[i] = !state[i];
            if (r) {
                select.add(i);
            }
            else
                select.delete(i);
        }
        const modifier = [fillMaxWidth(), heightIn(50)];
        return function render() {
            return items.map((item, i) => {
                const onCheckedChange = click.bind(undefined, i);
                return xml `
                <row verticalAlignment="center"
                    modifier=${[...modifier, clickable(onCheckedChange)]}>
                    <Checkbox checked=${state[i]} 
                        onCheckedChange=${onCheckedChange} />
                    <text fontSize=${15}>${item}</text>
                </row>
                `;
            });
        };
    });
    const f = {
        title: title,
        positive: '确认',
        negative: '取消',
    };
    const dialog = showDialog(Object.assign(f, options, { content: DialogContent, }));
    return new Promise((resolve, reject) => {
        dialog.once(DialogEvent.ON_DISMISS, () => resolve(null));
        dialog.once(DialogEvent.ON_POSITIVE, () => {
            resolve(Array.from(select));
            dialog.dismiss();
        });
        dialog.once(DialogEvent.ON_NEGATIVE, () => { dialog.dismiss(); });
    });
};
/**
 * 显示一个单选对话框
 * @param title
 * @param items
 * @param initialSelectedIndex
 * @param options
 * @returns 返回选中的项目索引，被取消则返回-1
 */
const showSingleChoiceDialog = async function (title, items, initialSelectedIndex, options) {
    let select = ref(initialSelectedIndex || 0);
    const DialogContent = defineComponent(function () {
        function click(i) {
            select.value = i;
        }
        const modifier = [fillMaxWidth(), heightIn(50)];
        return function render() {
            return items.map((item, i) => {
                const onCheckedChange = click.bind(undefined, i);
                return xml `
                <row verticalAlignment="center"
                    modifier=${[...modifier, clickable(onCheckedChange)]}>
                    <RadioButton selected=${select.value == i}
                         onClick=${onCheckedChange} />
                    <text fontSize=${15}>${item}</text>
                </row>
                `;
            });
        };
    });
    const f = {
        title: title,
        positive: '确认',
        negative: '取消',
    };
    const dialog = showDialog(Object.assign(f, options, { content: DialogContent, }));
    return new Promise((resolve, reject) => {
        dialog.once(DialogEvent.ON_DISMISS, () => resolve(-1));
        dialog.once(DialogEvent.ON_POSITIVE, () => {
            resolve(select.value);
            dialog.dismiss();
        });
        dialog.once(DialogEvent.ON_NEGATIVE, () => { dialog.dismiss(); });
    });
};

export { DialogEvent, DialogFactory, defaultDialogType, showAlertDialog, showAppDialog, showConfirmDialog, showDialog, showInputDialog, showMultiChoiceDialog, showSelectDialog, showSingleChoiceDialog };
