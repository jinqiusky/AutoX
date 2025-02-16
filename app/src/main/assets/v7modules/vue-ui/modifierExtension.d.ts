/**
 * 设置背景色，传入'theme'表示使用当前主题的背景色,
 * 使用数值表示时必须是bigint，普通数值在java会转成Int溢出范围
 * @param color 颜色值,如`0xffffcc12n`的数值或`#ffcc89`的字符串
 * @returns
 */
export declare function background(color: string | bigint | 'theme'): ModifierExt;
/**
 * 仅在row和column直接子组件上使用有效,表示此组件占用父组件剩余空间的权重,
 * 假如有一个row剩余高度为300，有一个子组件这设置了此修饰符为1,那么它的高度为300,
 * 如果有两个组件都设为1，那么这两个组件各得150高度
 * @param i
 * @returns
 */
export declare function weight(i: number): ModifierExt;
/**
 *
 * @returns
 */
export declare function fillMaxSize(): ModifierExt;
export declare function fillMaxWidth(): ModifierExt;
export declare function fillMaxHeight(): ModifierExt;
/**
 * 设置高度，单位为dp
 * @param width
 * @returns
 */
export declare function width(width: number): ModifierExt;
/**
 * 设置高度，单位为dp
 * @param height
 * @returns
 */
export declare function height(height: number): ModifierExt;
/**
 * 设置旋转角度
 * @param angle 一般为0~360
 * @returns
 */
export declare function rotate(angle: number): ModifierExt;
/**
 * 设置padding，传递一个值时表示四边均使用此值，
 * 传递两个值时第一个参数表示水平padding，第二个参数表示垂直padding
 * @param left
 * @param top
 * @param right
 * @param bottom
 * @returns
 */
export declare function padding(left: number, top?: number, right?: number, bottom?: number): ModifierExt;
/**
 * 设置组件可点击，大部分组件会自动添加相应的点击效果
 * @param clickable
 * @returns
 */
export declare function clickable(clickable: () => void): ModifierExt;
/**
 * 设置可水平滚动
 * @returns
 */
export declare function horizontalScroll(): ModifierExt;
/**
 * 设置可垂直滚动
 * @returns
 */
export declare function verticalScroll(): ModifierExt;
/**
 * 设置组件最小或最大宽度
 * @param min 最小值，可以为null
 * @param max 最大值，可以为null
 * @returns
 */
export declare function widthIn(min?: number, max?: number): ModifierExt;
/**
 * 设置组件最小或最大高度
 * @param min 最小值，可以为null
 * @param max 最大值，可以为null
 * @returns
 */
export declare function heightIn(min?: number, max?: number): ModifierExt;
