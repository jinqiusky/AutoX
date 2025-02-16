package com.stardust.autojs.core.ui.widget

import android.content.Context
import android.os.Build
import android.util.AttributeSet
import android.webkit.*
import androidx.annotation.RequiresApi
import com.stardust.autojs.core.web.JsBridge

open class JsWebView : WebView {
    //val events = EventEmitter()
    @RequiresApi(Build.VERSION_CODES.M)
    val jsBridge = JsBridge(this)

    init {
        val settings = settings
        settings.useWideViewPort = true //启用宽视图端口
        settings.builtInZoomControls = true  //启用内置缩放控件。
        settings.loadWithOverviewMode = true //启用概述模式加载页面
        settings.javaScriptEnabled = true  //启用 JavaScript
        settings.javaScriptCanOpenWindowsAutomatically = true  //允许 JavaScript 自动打开新窗口
        settings.domStorageEnabled = true  //启用 DOM 存储（Web 存储）
        settings.displayZoomControls = false  //隐藏内置缩放控件的显示

        settings.cacheMode = WebSettings.LOAD_NO_CACHE // 禁用缓存
        settings.allowFileAccess = true        // 允许文件访问
        settings.allowContentAccess = true        // 允许内容访问
        settings.allowFileAccessFromFileURLs = true   // 允许从文件URL进行文件访问
        settings.allowUniversalAccessFromFileURLs = true  // 允许从任何来源进行访问

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) webViewClient = JsBridge.SuperWebViewClient()
    }

    constructor(context: Context) : super(context)
    constructor(context: Context, attrs: AttributeSet) : super(context, attrs)
    constructor(context: Context, attrs: AttributeSet, defStyleAttr: Int) : super(
        context,
        attrs,
        defStyleAttr
    )
    @RequiresApi(Build.VERSION_CODES.M)
    fun injectionJsBridge(){
        JsBridge.injectionJsBridge(this)
    }
}
