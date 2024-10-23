package com.stardust.autojs.runtime

import com.stardust.autojs.ScriptEngineService
import com.stardust.autojs.annotation.ScriptInterface
import com.stardust.autojs.core.accessibility.AccessibilityBridge
import com.stardust.autojs.core.console.ConsoleImpl
import com.stardust.autojs.core.image.capture.ScreenCaptureRequester
import com.stardust.autojs.core.looper.Loopers
import com.stardust.autojs.rhino.AndroidClassLoader
import com.stardust.autojs.rhino.TopLevelScope
import com.stardust.autojs.runtime.api.AbstractShell
import com.stardust.autojs.runtime.api.AppUtils
import com.stardust.autojs.runtime.api.Console
import com.stardust.autojs.runtime.api.ConsoleExtension
import com.stardust.autojs.runtime.api.Events
import com.stardust.autojs.runtime.api.Sensors
import com.stardust.autojs.runtime.api.Threads
import com.stardust.autojs.runtime.api.Timers
import com.stardust.pio.UncheckedIOException
import com.stardust.util.ClipboardUtil
import com.stardust.util.Supplier
import com.stardust.util.UiHandler
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withContext
import org.mozilla.javascript.ContextFactory
import org.mozilla.javascript.RhinoException
import java.io.BufferedReader
import java.io.File
import java.io.IOException
import java.io.PrintWriter
import java.io.StringReader
import java.io.StringWriter

class ScriptRuntimeV2(val builder: Builder) : ScriptRuntime(builder) {
    lateinit var consoleExtension: ConsoleExtension

    override fun init() {
        check(loopers == null) { "already initialized" }
        threads = Threads(this)
        timers = Timers(this)
        loopers = Loopers(this)
        consoleExtension = ConsoleExtension(console as ConsoleImpl, loopers!!.servantLooper)
        events = Events(uiHandler.context, accessibilityBridge, this)
        mThread = Thread.currentThread()
        sensors = Sensors(uiHandler.context, this)
    }

    override fun getUiHandler(): UiHandler {
        return uiHandler
    }

    override fun getTopLevelScope(): TopLevelScope = mTopLevelScope
    override fun setTopLevelScope(topLevelScope: TopLevelScope) {
        check(mTopLevelScope == null) { "top level has already exists" }
        mTopLevelScope = topLevelScope
    }

    @ScriptInterface
    fun setClip(text: String): Unit = runBlocking {
        withContext(Dispatchers.Main) {
            ClipboardUtil.setClip(uiHandler.context, text)
        }
    }

    @ScriptInterface
    fun getClip(): String = runBlocking {
        withContext(Dispatchers.Main) {
            ClipboardUtil.getClipOrEmpty(uiHandler.context).toString()
        }
    }

    @ScriptInterface
    fun getRootShell(): AbstractShell {
        ensureRootShell()
        return mRootShell
    }

    @ScriptInterface
    fun loadJar(path: String) {
        var path = path
        path = files.path(path)
        try {
            (ContextFactory.getGlobal().applicationClassLoader as AndroidClassLoader).loadJar(
                File(path)
            )
        } catch (e: IOException) {
            throw UncheckedIOException(e)
        }
    }

    @ScriptInterface
    fun loadDex(path: String) {
        var path = path
        path = files.path(path)
        try {
            (ContextFactory.getGlobal().applicationClassLoader as AndroidClassLoader).loadDex(
                File(path)
            )
        } catch (e: IOException) {
            throw UncheckedIOException(e)
        }
    }

    private fun ensureRootShell() {
        if (mRootShell == null) {
            mRootShell = mShellSupplier.get()
            mRootShell.SetScreenMetrics(mScreenMetrics)
            mShellSupplier = null
        }
    }

    override fun onExit() {
        super.onExit()
        consoleExtension.close()
//        ObjectWatcher.default.watch(this, engines.myEngine().toString() + "::" + TAG)
    }

    class Builder {
        var uiHandler: UiHandler? = null
        var console: Console? = null
        var accessibilityBridge: AccessibilityBridge? = null
        var shellSupplier: Supplier<AbstractShell>? = null
        var screenCaptureRequester: ScreenCaptureRequester? = null
        var appUtils: AppUtils? = null
        var engineService: ScriptEngineService? = null
        fun build(): ScriptRuntimeV2 {
            return ScriptRuntimeV2(this)
        }
    }

    companion object {
        private const val TAG = "ScriptRuntimeV2"

        @JvmStatic
        fun getStackTrace(e: Throwable, printJavaStackTrace: Boolean): String {
            val message = e.message
            val scriptTrace = StringBuilder(if (message == null) "" else message + "\n")
            if (e is RhinoException) {
                scriptTrace.append(e.details()).append("\n")
                for (element in e.scriptStack) {
                    element.renderV8Style(scriptTrace)
                    scriptTrace.append("\n")
                }
                if (printJavaStackTrace) {
                    scriptTrace.append("- - - - - - - - - - -\n")
                } else {
                    return scriptTrace.toString()
                }
            }
            val stringWriter = StringWriter()
            PrintWriter(stringWriter).use { e.printStackTrace(it) }
            val bufferedReader = BufferedReader(StringReader(stringWriter.toString()))
            var line: String?
            while (bufferedReader.readLine().also { line = it } != null) {
                scriptTrace.append("\n").append(line)
            }
            return scriptTrace.toString()
        }
    }
}


