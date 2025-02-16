import { Color } from "@/vue-ui/theme";
import { DialogType, DialogInterface } from ".";
import { Component, PropType } from "@/vue-ui";
export type SecureTpye = TSecureTpye;
/**
 * 创建对话框的一些通用选项
 */
export interface DialogBuilderOptions {
    /**对话框标题 */
    title?: string;
    /**对话框内容，可以是一个vue组件对象 */
    content?: string | Component;
    /**仅在content是字符串时有效 */
    contentColor?: Color;
    /**尚未支持 */
    icon?: string;
    /**positive的文本，不设置将不显示positive按钮 */
    positive?: string;
    positiveColor?: Color;
    /**negative的文本，不设置将不显示negative按钮 */
    negative?: string;
    negativeColor?: Color;
    neutralColor?: Color;
    /**neutral的文本，不设置将不显示neutral按钮 */
    neutral?: string;
    /**是否允许返回键取消对话框，默认为true */
    dismissOnBackPress?: boolean;
    /**是否允许点击对话框外部取消对话框，默认为true */
    dismissOnClickOutside?: boolean;
    /**设置对话框窗口的安全策略 */
    securePolicy?: SecureTpye;
    type?: DialogType;
}
export interface DialogEventListener {
    onPositive?: () => void;
    onNegative?: () => void;
    onNeutral?: () => void;
}
export interface InputDialogOptions extends DialogBuilderOptions {
    /**输入框的提示 */
    inputHint?: string;
    /**输入框的默认文本 */
    inputPrefill?: string;
    /**输入框的lable */
    inputLable?: string;
}
export declare function createDialogContent(options: DialogBuilderOptions): import("@vue/runtime-core").DefineComponent<{
    events: PropType<DialogEventListener>;
}, unknown, unknown, {}, {}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").ComponentOptionsMixin, {}, string, import("@vue/runtime-core").PublicProps, Readonly<import("@vue/runtime-core").ExtractPropTypes<{
    events: PropType<DialogEventListener>;
}>>, {}, {}>;
export interface IDialogs {
    showDialog(options: DialogBuilderOptions): DialogInterface;
    showAlertDialog(title: string, options?: DialogBuilderOptions): Promise<void>;
    showConfirmDialog(title: string, options?: DialogBuilderOptions): Promise<boolean>;
    showInputDialog(title: string, prefill?: string, options?: InputDialogOptions): Promise<string | null>;
    showSelectDialog(title: string, items: string[], options?: DialogBuilderOptions): Promise<number>;
    showMultiChoiceDialog(title: string, items: string[], initialSelectedIndices?: number[], options?: DialogBuilderOptions): Promise<number[] | null>;
    showSingleChoiceDialog(title: string, items: string[], initialSelectedIndex?: number, options?: DialogBuilderOptions): Promise<number>;
}
