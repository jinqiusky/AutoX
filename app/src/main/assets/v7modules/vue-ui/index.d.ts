/**
 * 入门
 * @document README.md
 * @packageDocumentation
 */
import { App, type CreateAppFunction, type RootRenderFunction, type VNode } from '@vue/runtime-core';
import { setDebug } from './nodeOps';
import { ActivityEventListener, PxElement } from './types';
import * as ModifierExtension from './modifierExtension';
export declare const render: RootRenderFunction<PxElement>;
export declare const createApp: CreateAppFunction<PxElement>;
export declare function renderActivity(vnode: VNode, listener?: ActivityEventListener): void;
/**
 * 启动Activity并挂载app实例作为内容
 * @param app Vue的app实例
 * @param listener 用于监听该Activity各种事件的监听器
 * @returns 当Activity创建完成后返回该Activity实例
 */
export declare function startActivity(app: App<PxElement>, listener?: ActivityEventListener): Promise<Activity>;
/**
 * 该函数用于创建VNode节点，详细参考[htm](https://github.com/developit/htm)
 */
export declare const xml: (strings: TemplateStringsArray, ...values: any[]) => VNode<import("@vue/runtime-core").RendererNode, import("@vue/runtime-core").RendererElement, {
    [key: string]: any;
}> | VNode<import("@vue/runtime-core").RendererNode, import("@vue/runtime-core").RendererElement, {
    [key: string]: any;
}>[];
export { setDebug };
export * from '@vue/runtime-core';
export * as Icons from './icons';
/**
 * 这个对象导出用于设置`Modifier`的函数
 */
export { ModifierExtension };
export { ActivityEventListener };
export * as Theme from './theme';
