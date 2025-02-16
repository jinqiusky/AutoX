import { EventEmitter } from 'events';
/**
 * 此对象是一个EventEmitter，用于监听剪贴板变化
 * @template
 * ```js
 * clipboardManager.on('clip_changed',()=>{
 *      getClip()
 * })
 * ```
 */
export declare const clipboardManager: EventEmitter<[never]>;
/**设置剪贴板内容 */
export declare function setClip(text: string): void;
/**获取剪贴板内容，需要应用在前台才有效 */
export declare function getClip(): string;
/**判断剪贴板是否有内容 */
export declare function hasClip(): boolean;
/**清空剪贴板 */
export declare function clearClip(): void;
