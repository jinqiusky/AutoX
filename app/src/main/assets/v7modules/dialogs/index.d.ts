import { EventEmitter } from 'node:events';
import { Component } from '@/vue-ui';
import { IDialogs } from './options';
import DialogFactory from './DialogFactory';
export type DialogType = 'app' | 'overlay' | DialogFactory;
export declare const defaultDialogType: DialogType;
export declare function showAppDialog(comp: Component, ops?: DialogOps): AppDialogBuilder;
export declare enum DialogEvent {
    /**@event */
    ON_DISMISS = "dismiss",
    /**@event */
    ON_POSITIVE = "positive",
    /**@event */
    ON_NEGATIVE = "negative",
    /**@event */
    ON_NEUTRAL = "neutral",
    /**@event */
    ON_INPUT_CHANGE = "input_change"
}
export interface DialogInterface extends EventEmitter<Record<DialogEvent, any[]>> {
    dismiss(): void;
}
export declare const showDialog: IDialogs['showDialog'];
/**
 * 显示一个消息提示对话框，返回一个Promise
 * @param title
 * @param options
 * @returns Promise将在对话框消失时完成
 */
export declare const showAlertDialog: IDialogs['showAlertDialog'];
/**
 * 显示一个确认对话框
 * @param title
 * @param options
 * @returns 只在点击positive按钮时返回true,其他情况返回false
 */
export declare const showConfirmDialog: IDialogs['showConfirmDialog'];
/**
 * 显示一个输入框，提示用户输入信息
 * @param title
 * @param prefill 输入框的默认内容
 * @param options
 * @returns 点击positive时返回字符串，即使输入为空，被取消时返回null
 */
export declare const showInputDialog: IDialogs['showInputDialog'];
/**
 * 显示一个选择对话框，选中任意项后消失
 * @param title
 * @param items 选项数组
 * @param options
 * @returns 返回选中的项目索引，被取消则返回-1
 */
export declare const showSelectDialog: IDialogs['showSelectDialog'];
/**
 * 显示一个多选对话框
 * @param title
 * @param items 可多选的项目
 * @param initialSelectedIndices 初始选中的项目索引数组
 * @param options
 * @returns 返回选中的项目索引数组，被取消则返回`null`
 */
export declare const showMultiChoiceDialog: IDialogs['showMultiChoiceDialog'];
/**
 * 显示一个单选对话框
 * @param title
 * @param items
 * @param initialSelectedIndex
 * @param options
 * @returns 返回选中的项目索引，被取消则返回-1
 */
export declare const showSingleChoiceDialog: IDialogs['showSingleChoiceDialog'];
export { DialogFactory, IDialogs };
