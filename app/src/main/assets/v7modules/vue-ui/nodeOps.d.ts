import { RendererOptions } from '@vue/runtime-core';
import { PxNode, PxNodeTypes } from './types';
export type DomRendererOptions = RendererOptions<PxNode, PxElement>;
export declare enum NodeOpTypes {
    CREATE = "create",
    INSERT = "insert",
    REMOVE = "remove",
    SET_TEXT = "setText",
    SET_ELEMENT_TEXT = "setElementText",
    PATCH = "patch"
}
export declare class PxElement implements PxNode {
    id: number;
    type: PxNodeTypes;
    parentNode: PxElement | null;
    tag: string;
    __xel: ComposeElement;
    children: PxNode[];
    props: Record<string, any>;
    eventListeners: Record<string, Function | Function[]> | null;
    constructor(tag: string);
    setText(text: string): void;
}
export declare class PxText extends PxElement {
    type: PxNodeTypes;
    text: string;
    __xel: ComposeTextNode;
    constructor(text: string);
}
export declare class PxComment implements PxNode {
    id: number;
    type: PxNodeTypes;
    parentNode: PxElement | null;
    text: string;
    constructor(text: string);
}
export interface NodeOp {
    type: NodeOpTypes;
    nodeType?: PxNodeTypes;
    tag?: string;
    text?: string;
    targetNode?: PxNode;
    parentNode?: PxElement;
    refNode?: PxNode | null;
    propKey?: string;
    propPrevValue?: any;
    propNextValue?: any;
}
export declare function setDebug(d: boolean): void;
export declare function logNodeOp(op: NodeOp): void;
export declare const nodeOps: Omit<DomRendererOptions, 'patchProp'>;
