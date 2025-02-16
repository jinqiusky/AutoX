import { EventEmitter } from 'node:events';

const engines = Autox.engines;
class ScriptEngineProxy extends EventEmitter {
    engine;
    get id() {
        return this.engine.id;
    }
    get isDestroyed() {
        return this.engine.isDestroyed;
    }
    constructor(engine) {
        super();
        this.engine = engine;
    }
    emit(eventName, ...args) {
        super.emit(eventName, ...args);
        if (typeof eventName === 'string' && this.id !== selfEngine.id) {
            this.engine.emit(eventName, ...args);
        }
        return true;
    }
    forceStop() {
        if (engines.selfEngine === this) {
            process.exit(1);
            return;
        }
        this.engine.forceStop();
    }
    cwd() {
        return this.engine.cwd();
    }
}
/**
 * 当前运行的引擎
 */
const selfEngine = new ScriptEngineProxy(engines.myEngine());
engines.setupJs({
    emitCallback(name, ...args) {
        selfEngine.emit(name, ...args);
    },
});
/**
 * 获取当前运行的引擎
 * @returns
 */
function myEngine() {
    return selfEngine;
}
/**
 * 运行一个脚本文件
 * @param path 只能是绝对路径，不支持相对路径
 * @param ops
 * @returns
 */
function execScriptFile(path, ops) {
    if (ops) {
        const executionConfig = engines.createExecutionConfig();
        if (ops.workingDirectory) {
            executionConfig.workingDirectory = ops.workingDirectory;
        }
        if (ops.arguments) {
            ops.arguments.forEach((value, key) => {
                executionConfig.arguments.set(key, value);
            });
        }
        return engines.execScriptFile(path, executionConfig, (a, ...args) => {
            if (a == 0) {
                ops.onStart?.(args[0]);
            }
            else if (a == 1) {
                ops.onSuccess?.(args[0], args[1]);
            }
            else if (a == 2) {
                ops.onException?.(args[0], args[1]);
            }
        });
    }
    return engines.execScriptFile(path, null, null);
}
/**
 * 停止所有运行中的脚本，包括自身
 * @returns
 */
function stopAll() {
    engines.stopAll();
}
/**
 * 获取所有运行中的脚本
 * @returns
 */
function getRunningEngines() {
    const r = [];
    engines.allEngine().forEach((engine) => {
        r.push(new ScriptEngineProxy(engine));
    });
    return r;
}
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
function broadcast(event, ...args) {
    getRunningEngines().forEach((engine) => {
        engine.emit(event, ...args);
    });
}

export { ScriptEngineProxy, broadcast, execScriptFile, getRunningEngines, myEngine, selfEngine, stopAll };
