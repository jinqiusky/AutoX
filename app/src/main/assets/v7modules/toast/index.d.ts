interface ToastOptions {
    duration?: "short" | "long";
}
/**
 * 弹出一条toast
 * @example
 * import { showToast } from 'toast'
 * showToast('hello world')
 * @param message 要显示的消息
 * @param option 可以是`"short" | "long"`，表示弹出时长
 */
export declare function showToast(message: any, option?: ToastOptions | string): void;
export {};
