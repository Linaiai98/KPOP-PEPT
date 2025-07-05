// 简化版虚拟宠物系统 - 用于测试
// 如果主插件不工作，可以用这个文件替换index.js进行测试

jQuery(async () => {
    console.log("🐾 简化版虚拟宠物系统开始加载...");
    
    const extensionName = "virtual-pet-system";
    const BUTTON_ID = "virtual-pet-button";
    const STORAGE_KEY_ENABLED = "virtual-pet-enabled";
    
    // 简单的浮动按钮创建函数
    function createSimpleButton() {
        console.log("🐾 创建简单测试按钮...");
        
        // 移除已存在的按钮
        $(`#${BUTTON_ID}`).remove();
        
        // 创建按钮HTML
        const buttonHtml = `
            <div id="${BUTTON_ID}" style="
                position: fixed;
                top: 50%;
                left: 20px;
                width: 60px;
                height: 60px;
                background: linear-gradient(145deg, #7289da, #5b6eae);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 30px;
                z-index: 999999;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                transition: transform 0.2s;
                user-select: none;
            " title="虚拟宠物（测试版）">
                🐾
            </div>
        `;
        
        // 添加到页面
        $("body").append(buttonHtml);
        
        const $button = $(`#${BUTTON_ID}`);
        console.log("🐾 按钮创建结果:", $button.length > 0 ? "成功" : "失败");
        
        // 添加点击事件
        $button.on("click", function() {
            alert("🎉 虚拟宠物系统测试成功！\n\n如果你看到这个消息，说明基础功能正常。\n现在可以尝试使用完整版本。");
        });
        
        // 添加悬停效果
        $button.on("mouseenter", function() {
            $(this).css("transform", "scale(1.1)");
        }).on("mouseleave", function() {
            $(this).css("transform", "scale(1)");
        });
        
        return $button.length > 0;
    }
    
    // 创建简单的设置面板
    function createSimpleSettings() {
        console.log("🐾 创建简单设置面板...");
        
        const settingsHtml = `
            <div id="virtual-pet-settings-simple">
                <div class="inline-drawer">
                    <div class="inline-drawer-toggle inline-drawer-header">
                        <b>🐾 虚拟宠物系统（测试版）</b>
                        <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
                    </div>
                    <div class="inline-drawer-content">
                        <div class="flex-container">
                            <label class="checkbox_label" for="virtual-pet-enabled-toggle-simple">
                                <input id="virtual-pet-enabled-toggle-simple" type="checkbox" checked>
                                <span>启用虚拟宠物系统（测试版）</span>
                            </label>
                        </div>
                        <small class="notes">
                            这是简化版本，用于测试基础功能是否正常。<br>
                            如果这个版本工作正常，说明环境没有问题。
                        </small>
                        <div style="margin-top: 10px; padding: 10px; background: #f0f0f0; border-radius: 5px;">
                            <strong>测试状态：</strong>
                            <div id="test-status">正在检测...</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 添加到扩展设置区域
        $("#extensions_settings2").append(settingsHtml);
        
        // 绑定开关事件
        $("#virtual-pet-enabled-toggle-simple").on("change", function() {
            const enabled = $(this).is(":checked");
            console.log("🐾 开关状态:", enabled);
            
            if (enabled) {
                createSimpleButton();
                $("#test-status").html("✅ 已启用 - 应该能看到🐾按钮");
            } else {
                $(`#${BUTTON_ID}`).remove();
                $("#test-status").html("❌ 已禁用 - 按钮已隐藏");
            }
        });
    }
    
    // 运行测试
    function runTests() {
        console.log("🐾 开始运行测试...");
        
        const tests = [
            {
                name: "jQuery可用性",
                test: () => typeof jQuery !== 'undefined',
                result: null
            },
            {
                name: "DOM就绪",
                test: () => $('body').length > 0,
                result: null
            },
            {
                name: "扩展设置区域",
                test: () => $('#extensions_settings2').length > 0,
                result: null
            },
            {
                name: "localStorage可用",
                test: () => typeof localStorage !== 'undefined',
                result: null
            }
        ];
        
        tests.forEach(test => {
            try {
                test.result = test.test();
                console.log(`🐾 ${test.name}: ${test.result ? '✅ 通过' : '❌ 失败'}`);
            } catch (error) {
                test.result = false;
                console.log(`🐾 ${test.name}: ❌ 错误 -`, error);
            }
        });
        
        const allPassed = tests.every(test => test.result);
        console.log(`🐾 测试总结: ${allPassed ? '✅ 所有测试通过' : '❌ 部分测试失败'}`);
        
        return { tests, allPassed };
    }
    
    // 主初始化函数
    async function initSimpleVersion() {
        console.log("🐾 初始化简化版虚拟宠物系统...");
        
        // 运行基础测试
        const testResults = runTests();
        
        if (!testResults.allPassed) {
            console.error("🐾 基础测试失败，无法继续初始化");
            return;
        }
        
        // 创建设置面板
        createSimpleSettings();
        
        // 等待一下确保DOM更新
        setTimeout(() => {
            // 创建按钮
            const buttonCreated = createSimpleButton();
            
            if (buttonCreated) {
                console.log("🐾 ✅ 简化版虚拟宠物系统初始化成功！");
                console.log("🐾 你应该能在屏幕左侧看到一个🐾按钮");
                
                // 更新测试状态
                setTimeout(() => {
                    $("#test-status").html("✅ 初始化成功 - 🐾按钮应该可见");
                }, 100);
            } else {
                console.error("🐾 ❌ 按钮创建失败");
                setTimeout(() => {
                    $("#test-status").html("❌ 按钮创建失败 - 请检查控制台");
                }, 100);
            }
        }, 500);
    }
    
    // 开始初始化
    try {
        await initSimpleVersion();
    } catch (error) {
        console.error("🐾 初始化过程中发生错误:", error);
    }
});

console.log("🐾 简化版虚拟宠物系统脚本已加载");
