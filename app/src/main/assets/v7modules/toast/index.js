import { format } from 'util';

/**
 * 弹出一条toast
 * @example
 * import { showToast } from 'toast'
 * showToast('hello world')
 * @param message 要显示的消息
 * @param option 可以是`"short" | "long"`，表示弹出时长
 */
function showToast(message, option) {
    let duration;
    if (typeof option === "string") {
        if (option !== "short") {
            duration = Autox.toast.SHORT;
        }
        else
            duration = Autox.toast.LONG;
    }
    else if (option?.duration === 'long') {
        duration = Autox.toast.LONG;
    }
    else {
        duration = Autox.toast.SHORT;
    }
    Autox.toast.showToast(format(message), duration);
}

export { showToast };
