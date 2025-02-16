import { Component } from "@vue/runtime-core";
import { DialogInterface } from ".";
import { DialogBuilderOptions, IDialogs, InputDialogOptions } from "./options";
type DialogStatus = DialogOps & {
    isShow: boolean;
};
export default class DialogFactory implements IDialogs {
    showin: import("@vue/reactivity").ShallowReactive<Set<[Component, DialogStatus]>>;
    get Dialog(): Component;
    _mountUi(comp: Component, ops: DialogOps): DialogInterface;
    showDialog(options: DialogBuilderOptions): DialogInterface;
    showAlertDialog(title: string, options: DialogBuilderOptions): Promise<void>;
    showConfirmDialog(title: string, options: DialogBuilderOptions): Promise<boolean>;
    showInputDialog(title: string, prefill?: string, options?: InputDialogOptions): Promise<string | null>;
    showSelectDialog(title: string, items: string[], options?: DialogBuilderOptions): Promise<number>;
    showMultiChoiceDialog(title: string, items: string[], initialSelectedIndices?: number[], options?: DialogBuilderOptions): Promise<number[] | null>;
    showSingleChoiceDialog(title: string, items: string[], initialSelectedIndex?: number, options?: DialogBuilderOptions): Promise<number>;
}
export {};
