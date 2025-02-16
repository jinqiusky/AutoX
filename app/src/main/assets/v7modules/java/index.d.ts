/**
 * 采用默认的计算线程池异步调用java方法，返回Promise接受结果
 * @alpha
 * @param javaobj java对象，不能是js对象
 * @param methodName 要调用的方法名
 * @param args 传递的参数
 * @returns 调用结果
 */
export declare function invokeDefault<T>(javaobj: any, methodName: string, args?: any[]): Promise<T>;
/**
 * 加载并返回一个java类
 * @alpha
 * @param className java全类名
 * @returns
 */
export declare function loadClass(className: string): JavaClass;
/**
 * 和{@link invokeDefault}类似，采用io线程池
 * @alpha
 * @param javaobj
 * @param methodName
 * @param args
 * @returns
 */
export declare function invokeIo<T>(javaobj: any, methodName: string, args?: any[]): Promise<T>;
/**
 * 和{@link invokeDefault}类似，采用ui线程
 * @alpha
 * @param javaobj
 * @param methodName
 * @param args
 * @returns
 */
export declare function invokeUi<T>(javaobj: any, methodName: string, args?: any[]): Promise<T>;
/**
 * 用于向rhino一样访问java类，如
 * `Packages.java`或`Packages.javax`
 * 此外该模块直接导出了常用的包
 * ```js
 * import { java, android, com } from 'java'
 *
 * new java.io.File(...)
 * ```
 */
export declare const Packages: any;
declare const javaPackage: any;
declare const androidPackage: any;
declare const javaxPackage: any;
declare const comPackage: any;
declare const netPackage: any;
declare const androidxPackage: any;
export { javaPackage as java, androidPackage as android, javaxPackage as javax, comPackage as com, netPackage as net, androidxPackage as androidx, };
