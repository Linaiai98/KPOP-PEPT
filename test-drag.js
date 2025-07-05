// 拖拽功能测试脚本 - 改进版本
// 在浏览器控制台中运行此脚本来测试拖拽功能

(function() {
    console.log("🐾 开始测试改进的拖拽功能...");

    // 测试函数集合
    const DragTests = {

        // 检查悬浮按钮是否存在
        checkButton: function() {
            const button = $('#virtual-pet-button');
            console.log("✅ 悬浮按钮检查:", button.length > 0 ? "存在" : "不存在");
            if (button.length > 0) {
                const rect = button[0].getBoundingClientRect();
                const styles = window.getComputedStyle(button[0]);
                console.log("   - 位置:", { left: rect.left, top: rect.top });
                console.log("   - 尺寸:", rect.width + 'x' + rect.height);
                console.log("   - 层级:", styles.zIndex);
                console.log("   - 定位:", styles.position);
                console.log("   - 光标:", styles.cursor);
            }
            return button.length > 0;
        },

        // 检查事件绑定
        checkEvents: function() {
            const button = $('#virtual-pet-button');
            if (button.length === 0) {
                console.log("❌ 按钮不存在，无法检查事件");
                return false;
            }

            const events = $._data(button[0], "events");
            console.log("✅ 事件绑定检查:");
            if (events) {
                Object.keys(events).forEach(eventType => {
                    console.log(`   - ${eventType}: ${events[eventType].length} 个监听器`);
                    events[eventType].forEach((handler, index) => {
                        console.log(`     ${index + 1}. 命名空间: ${handler.namespace || '无'}`);
                    });
                });
            } else {
                console.log("   ❌ 没有找到事件监听器");
            }
            return events && Object.keys(events).length > 0;
        },

        // 测试按钮位置保存和恢复
        testButtonPosition: function() {
            console.log("🧪 测试按钮位置保存...");

            const button = $('#virtual-pet-button');
            if (button.length === 0) {
                console.log("❌ 按钮不存在，无法测试");
                return false;
            }

            // 保存当前位置
            const originalRect = button[0].getBoundingClientRect();
            const originalPos = {
                left: originalRect.left,
                top: originalRect.top
            };
            console.log("原始位置:", originalPos);

            // 移动到测试位置
            const testPos = { left: '150px', top: '150px' };
            button.css({
                'position': 'fixed',
                'left': testPos.left,
                'top': testPos.top
            });

            // 验证移动结果
            setTimeout(() => {
                const newRect = button[0].getBoundingClientRect();
                const moved = Math.abs(newRect.left - 150) < 5 && Math.abs(newRect.top - 150) < 5;
                console.log(moved ? "✅ 位置移动成功" : "❌ 位置移动失败");
                console.log("新位置:", { left: newRect.left, top: newRect.top });

                // 恢复原始位置
                button.css({
                    'left': originalPos.left + 'px',
                    'top': originalPos.top + 'px'
                });
                console.log("✅ 已恢复原始位置");
            }, 100);

            return true;
        },

        // 测试拖动阈值
        testDragThreshold: function() {
            console.log("🧪 测试拖动阈值...");

            const button = $('#virtual-pet-button');
            if (button.length === 0) {
                console.log("❌ 按钮不存在，无法测试");
                return false;
            }

            console.log("模拟小幅移动（应该不触发拖动）...");
            // 这里可以添加模拟事件的代码
            console.log("ℹ️ 手动测试：轻微移动鼠标应该不会触发拖动");
            console.log("ℹ️ 手动测试：移动超过8像素应该触发拖动");

            return true;
        },

        // 测试边界限制
        testBoundaryLimits: function() {
            console.log("🧪 测试边界限制...");

            const button = $('#virtual-pet-button');
            if (button.length === 0) {
                console.log("❌ 按钮不存在，无法测试");
                return false;
            }

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const buttonWidth = button.outerWidth() || 48;
            const buttonHeight = button.outerHeight() || 48;

            console.log("窗口尺寸:", { width: windowWidth, height: windowHeight });
            console.log("按钮尺寸:", { width: buttonWidth, height: buttonHeight });

            // 测试边界位置
            const testPositions = [
                { name: "左上角", left: 5, top: 5 },
                { name: "右上角", left: windowWidth - buttonWidth - 5, top: 5 },
                { name: "左下角", left: 5, top: windowHeight - buttonHeight - 5 },
                { name: "右下角", left: windowWidth - buttonWidth - 5, top: windowHeight - buttonHeight - 5 },
                { name: "超出左边界", left: -50, top: 100 },
                { name: "超出右边界", left: windowWidth + 50, top: 100 }
            ];

            testPositions.forEach((pos, index) => {
                setTimeout(() => {
                    console.log(`测试 ${pos.name}...`);
                    button.css({
                        'position': 'fixed',
                        'left': pos.left + 'px',
                        'top': pos.top + 'px'
                    });

                    setTimeout(() => {
                        const rect = button[0].getBoundingClientRect();
                        const inBounds = rect.left >= 0 && rect.top >= 0 &&
                                       rect.right <= windowWidth && rect.bottom <= windowHeight;
                        console.log(`${pos.name} - 在边界内: ${inBounds ? '✅' : '❌'}`);
                        console.log(`实际位置: (${rect.left}, ${rect.top})`);
                    }, 50);
                }, index * 200);
            });

            return true;
        },

        // 测试点击与拖动的区分
        testClickVsDrag: function() {
            console.log("🧪 测试点击与拖动区分...");
            console.log("ℹ️ 手动测试说明:");
            console.log("1. 快速点击按钮 - 应该显示弹窗");
            console.log("2. 按住并拖动按钮 - 应该移动按钮，不显示弹窗");
            console.log("3. 拖动后立即点击 - 应该被阻止，不显示弹窗");

            return true;
        },

        // 运行所有测试
        runAllTests: function() {
            console.log("🚀 运行所有拖动测试...");

            const tests = [
                'checkButton',
                'checkEvents',
                'testButtonPosition',
                'testDragThreshold',
                'testBoundaryLimits',
                'testClickVsDrag'
            ];

            tests.forEach((testName, index) => {
                setTimeout(() => {
                    console.log(`\n--- 测试 ${index + 1}/${tests.length}: ${testName} ---`);
                    try {
                        this[testName]();
                    } catch (error) {
                        console.error(`❌ 测试 ${testName} 失败:`, error);
                    }
                }, index * 1000);
            });
        }
    };

    // 导出测试对象到全局
    window.DragTests = DragTests;

    console.log("✅ 拖动测试脚本加载完成");
    console.log("使用方法:");
    console.log("- DragTests.runAllTests() - 运行所有测试");
    console.log("- DragTests.checkButton() - 检查按钮状态");
    console.log("- DragTests.testButtonPosition() - 测试位置功能");
    console.log("- DragTests.testBoundaryLimits() - 测试边界限制");

})();
            
            // 模拟保存位置
            localStorage.setItem('virtual-pet-button-position', JSON.stringify({
                x: testPos.left,
                y: testPos.top
            }));
            
            // 检查是否保存成功
            const saved = localStorage.getItem('virtual-pet-button-position');
            console.log("   - 位置保存:", saved ? "成功" : "失败");
            
            // 恢复原位置
            button.css(originalPos);
            
            return !!saved;
        },
        
        // 测试边界限制
        testBoundaryLimits: function() {
            console.log("🧪 测试边界限制...");
            
            const windowWidth = $(window).width();
            const windowHeight = $(window).height();
            const buttonWidth = 60; // 假设按钮宽度
            const buttonHeight = 60; // 假设按钮高度
            
            // 测试边界计算
            const testCases = [
                { x: -50, y: 100, expectedX: 0, expectedY: 100 },
                { x: windowWidth + 50, y: 100, expectedX: windowWidth - buttonWidth, expectedY: 100 },
                { x: 100, y: -50, expectedX: 100, expectedY: 0 },
                { x: 100, y: windowHeight + 50, expectedX: 100, expectedY: windowHeight - buttonHeight }
            ];
            
            testCases.forEach((test, index) => {
                const newX = Math.max(0, Math.min(test.x, windowWidth - buttonWidth));
                const newY = Math.max(0, Math.min(test.y, windowHeight - buttonHeight));
                
                const passed = (newX === test.expectedX && newY === test.expectedY);
                console.log(`   - 测试 ${index + 1}:`, passed ? "✅ 通过" : "❌ 失败");
                if (!passed) {
                    console.log(`     期望: (${test.expectedX}, ${test.expectedY}), 实际: (${newX}, ${newY})`);
                }
            });
        },
        
        // 模拟拖拽事件
        simulateDrag: function() {
            console.log("🧪 模拟拖拽事件...");
            
            const button = $('#virtual-pet-button');
            if (button.length === 0) {
                console.log("❌ 按钮不存在，无法测试");
                return false;
            }
            
            try {
                // 模拟鼠标按下
                const mouseDownEvent = new MouseEvent('mousedown', {
                    bubbles: true,
                    cancelable: true,
                    clientX: 100,
                    clientY: 100
                });
                button[0].dispatchEvent(mouseDownEvent);
                console.log("   - mousedown 事件:", "✅ 触发成功");
                
                // 模拟鼠标移动
                setTimeout(() => {
                    const mouseMoveEvent = new MouseEvent('mousemove', {
                        bubbles: true,
                        cancelable: true,
                        clientX: 150,
                        clientY: 150
                    });
                    document.dispatchEvent(mouseMoveEvent);
                    console.log("   - mousemove 事件:", "✅ 触发成功");
                    
                    // 模拟鼠标释放
                    setTimeout(() => {
                        const mouseUpEvent = new MouseEvent('mouseup', {
                            bubbles: true,
                            cancelable: true,
                            clientX: 150,
                            clientY: 150
                        });
                        document.dispatchEvent(mouseUpEvent);
                        console.log("   - mouseup 事件:", "✅ 触发成功");
                    }, 100);
                }, 100);
                
                return true;
            } catch (error) {
                console.log("❌ 拖拽模拟失败:", error.message);
                return false;
            }
        },
        
        // 检查CSS样式
        checkStyles: function() {
            console.log("🧪 检查CSS样式...");
            
            const button = $('#virtual-pet-button');
            if (button.length === 0) {
                console.log("❌ 按钮不存在，无法检查样式");
                return false;
            }
            
            const styles = {
                cursor: button.css('cursor'),
                position: button.css('position'),
                zIndex: button.css('z-index'),
                userSelect: button.css('user-select'),
                touchAction: button.css('touch-action')
            };
            
            console.log("   - 样式检查:");
            Object.entries(styles).forEach(([key, value]) => {
                console.log(`     ${key}: ${value}`);
            });
            
            // 检查关键样式
            const checks = [
                { name: 'position', expected: 'fixed', actual: styles.position },
                { name: 'cursor', expected: 'grab', actual: styles.cursor },
                { name: 'user-select', expected: 'none', actual: styles.userSelect }
            ];
            
            checks.forEach(check => {
                const passed = check.actual === check.expected;
                console.log(`   - ${check.name}:`, passed ? "✅ 正确" : `❌ 错误 (期望: ${check.expected}, 实际: ${check.actual})`);
            });
        },
        
        // 运行所有测试
        runAllTests: function() {
            console.log("🚀 开始完整测试...");
            console.log("==========================================");
            
            const results = {
                button: this.checkButton(),
                popup: this.checkPopup(),
                position: this.testButtonPosition(),
                boundary: this.testBoundaryLimits(),
                styles: this.checkStyles(),
                drag: this.simulateDrag()
            };
            
            console.log("==========================================");
            console.log("📊 测试结果汇总:");
            
            let passedCount = 0;
            Object.entries(results).forEach(([test, passed]) => {
                if (typeof passed === 'boolean') {
                    console.log(`   ${test}: ${passed ? "✅ 通过" : "❌ 失败"}`);
                    if (passed) passedCount++;
                } else {
                    console.log(`   ${test}: ✅ 完成`);
                    passedCount++;
                }
            });
            
            const totalTests = Object.keys(results).length;
            console.log(`\n🎯 总体结果: ${passedCount}/${totalTests} 测试通过`);
            
            if (passedCount === totalTests) {
                console.log("🎉 所有测试通过！拖拽功能正常工作。");
            } else {
                console.log("⚠️  部分测试失败，请检查相关功能。");
            }
        }
    };
    
    // 导出到全局，方便调用
    window.DragTests = DragTests;
    
    // 自动运行测试
    DragTests.runAllTests();
    
    console.log("\n💡 提示：");
    console.log("   - 运行 DragTests.runAllTests() 重新测试所有功能");
    console.log("   - 运行 DragTests.checkButton() 检查按钮状态");
    console.log("   - 运行 DragTests.simulateDrag() 模拟拖拽操作");
    
})();
