import { PxText } from './nodeOps';
import { PxElement } from './types';
declare function createText(text: string): ComposeElement;
declare function createElement(tag: string, props?: Record<string, any>, ...children: any[]): ComposeElement;
export declare function setText(el: PxText, text: string): void;
declare function removeElement(element: PxElement): void;
declare function insertElement(child: PxElement, parent: PxElement, ref?: PxElement): void;
declare function patchElementProp(el: PxElement, key: string, prevValue: any, nextValue: any): void;
export { createElement, createText, removeElement, insertElement, patchElementProp };
