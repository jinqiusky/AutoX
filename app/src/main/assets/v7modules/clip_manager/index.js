import { EventEmitter } from 'events';

/**
 * 剪贴板模块，该模块提供一些操作剪贴板的函数
 * 在高版本安卓中，只有应用在前台才能获取剪贴板内容
 * @packageDocumentation
 */
const clipManager = Autox.clipManager;
/**
 * 此对象是一个EventEmitter，用于监听剪贴板变化
 * @template
 * ```js
 * clipboardManager.on('clip_changed',()=>{
 *      getClip()
 * })
 * ```
 */
const clipboardManager = new EventEmitter();
clipManager.registerListener({
    onClipChanged: () => {
        clipboardManager.emit('clip_changed');
    }
});
/**设置剪贴板内容 */
function setClip(text) {
    clipManager.setClip(text);
}
/**获取剪贴板内容，需要应用在前台才有效 */
function getClip() {
    return clipManager.getClip();
}
/**判断剪贴板是否有内容 */
function hasClip() {
    return clipManager.hasClip();
}
/**清空剪贴板 */
function clearClip() {
    clipManager.clearClip();
}

export { clearClip, clipboardManager, getClip, hasClip, setClip };
