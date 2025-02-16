import { EventEmitter } from 'node:events';
export declare class ScriptEngineProxy extends EventEmitter {
    private engine;
    get id(): number;
    get isDestroyed(): boolean;
    constructor(engine: ScriptEngine);
    emit<K>(eventName: string | symbol, ...args: any[]): boolean;
    forceStop(): void;
    cwd(): string;
}
/**
 * 当前运行的引擎
 */
export declare const selfEngine: ScriptEngineProxy;
export interface ExecutionConfigOptions {
    workingDirectory?: string;
    arguments?: Map<string, any>;
    onStart?: (execution: ScriptExecution) => void;
    onSuccess?: (execution: ScriptExecution, result: any) => void;
    onException?: (execution: ScriptExecution, err: any) => void;
}
/**
 * 获取当前运行的引擎
 * @returns
 */
export declare function myEngine(): ScriptEngineProxy;
/**
 * 运行一个脚本文件
 * @param path 只能是绝对路径，不支持相对路径
 * @param ops
 * @returns
 */
export declare function execScriptFile(path: string, ops: ExecutionConfigOptions): ScriptExecution;
/**
 * 停止所有运行中的脚本，包括自身
 * @returns
 */
export declare function stopAll(): void;
/**
 * 获取所有运行中的脚本
 * @returns
 */
export declare function getRunningEngines(): ScriptEngineProxy[];
/**
 * 向所有运行中的脚本发送事件，相当于
 * ```js
 * getRunningEngines().forEach((engine) => {
        engine.emit(event, ...args)
    })
 * ```
 * @param event
 * @param args
 */
export declare function broadcast(event: string, ...args: any): void;
