package com.stardust.autojs.servicecomponents

import com.stardust.autojs.script.JavaScriptSource
import com.stardust.autojs.servicecomponents.ScriptServiceConnection.Companion.GlobalConnection
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.launch
import java.io.File

object EngineController {
    val scope = CoroutineScope(Dispatchers.Default)
    private val serviceConnection: ScriptServiceConnection
        get() = GlobalConnection

    fun runScript(taskInfo: TaskInfo) = scope.launch {
        serviceConnection.runScript(taskInfo)
    }

    fun runScript(file: File) = scope.launch {
        serviceConnection.runScript(object : TaskInfo {
            override val name: String = file.name
            override val desc: String = file.path
            override val engineName: String = JavaScriptSource.ENGINE
            override val workerDirectory: String = file.parent ?: "/"
            override val sourcePath: String = file.path
            override val isRunning: Boolean = false
        })
    }

    fun getAllScriptTasks(): Deferred<MutableList<TaskInfo.BundleTaskInfo>> = scope.async {
        return@async serviceConnection.getAllScriptTasks()
    }

    fun stopScript(taskInfo: TaskInfo) {

    }
}