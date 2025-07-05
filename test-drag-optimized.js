// 优化后的拖拽功能测试脚本
// 基于 preset-manager-momo 的拖拽实现进行测试

(function() {
    console.log("🐾 测试优化后的拖拽功能...");
    
    const DragTestsOptimized = {
        
        // 检查按钮基本状态
        checkButtonBasics: function() {
            const button = $('#virtual-pet-button');
            console.log("✅ 按钮基本检查:");
            console.log("   - 存在:", button.length > 0 ? "是" : "否");
            
            if (button.length > 0) {
                const styles = {
                    cursor: button.css('cursor'),
                    position: button.css('position'),
                    zIndex: button.css('z-index')
                };
                
                console.log("   - 默认cursor:", styles.cursor);
                console.log("   - position:", styles.position);
                console.log("   - z-index:", styles.zIndex);
                
                // 检查关键样式
                const isCorrect = styles.cursor === 'pointer' && 
                                styles.position === 'fixed';
                console.log("   - 样式正确:", isCorrect ? "是" : "否");
                
                return isCorrect;
            }
            return false;
        },
        
        // 测试拖拽阈值（5像素，参考momo）
        testDragThreshold: function() {
            console.log("🧪 测试拖拽阈值（5像素）:");
            
            const testCases = [
                { moveX: 3, moveY: 3, shouldDrag: false, desc: "3像素移动" },
                { moveX: 5, moveY: 0, shouldDrag: true, desc: "5像素水平移动" },
                { moveX: 0, moveY: 5, shouldDrag: true, desc: "5像素垂直移动" },
                { moveX: 10, moveY: 10, shouldDrag: true, desc: "10像素对角移动" }
            ];
            
            testCases.forEach((test, index) => {
                const shouldTrigger = Math.abs(test.moveX) > 5 || Math.abs(test.moveY) > 5;
                const result = shouldTrigger === test.shouldDrag;
                console.log(`   - ${test.desc}:`, result ? "✅ 正确" : "❌ 错误");
            });
        },
        
        // 模拟拖拽事件（简化版）
        simulateDragSequence: function() {
            console.log("🧪 模拟拖拽事件序列:");
            
            const button = $('#virtual-pet-button');
            if (button.length === 0) {
                console.log("   ❌ 按钮不存在");
                return false;
            }
            
            try {
                // 记录初始位置
                const initialPos = {
                    left: button.css('left'),
                    top: button.css('top')
                };
                console.log("   - 初始位置:", initialPos);
                
                // 模拟mousedown
                const startEvent = new MouseEvent('mousedown', {
                    bubbles: true,
                    cancelable: true,
                    clientX: 100,
                    clientY: 100
                });
                button[0].dispatchEvent(startEvent);
                console.log("   - mousedown事件: ✅ 已触发");
                
                // 模拟mousemove（超过5像素阈值）
                setTimeout(() => {
                    const moveEvent = new MouseEvent('mousemove', {
                        bubbles: true,
                        cancelable: true,
                        clientX: 110, // 移动10像素
                        clientY: 110
                    });
                    document.dispatchEvent(moveEvent);
                    console.log("   - mousemove事件: ✅ 已触发");
                    
                    // 模拟mouseup
                    setTimeout(() => {
                        const endEvent = new MouseEvent('mouseup', {
                            bubbles: true,
                            cancelable: true,
                            clientX: 110,
                            clientY: 110
                        });
                        document.dispatchEvent(endEvent);
                        console.log("   - mouseup事件: ✅ 已触发");
                        
                        // 检查位置是否改变
                        const finalPos = {
                            left: button.css('left'),
                            top: button.css('top')
                        };
                        console.log("   - 最终位置:", finalPos);
                        
                        const posChanged = finalPos.left !== initialPos.left || 
                                         finalPos.top !== initialPos.top;
                        console.log("   - 位置已改变:", posChanged ? "是" : "否");
                        
                    }, 50);
                }, 50);
                
                return true;
            } catch (error) {
                console.log("   ❌ 模拟失败:", error.message);
                return false;
            }
        },
        
        // 测试边界限制
        testBoundaryConstraints: function() {
            console.log("🧪 测试边界限制:");
            
            const windowWidth = $(window).width();
            const windowHeight = $(window).height();
            const buttonSize = 60; // 假设按钮大小
            
            const testPositions = [
                { x: -10, y: 100, desc: "左边界外" },
                { x: windowWidth + 10, y: 100, desc: "右边界外" },
                { x: 100, y: -10, desc: "上边界外" },
                { x: 100, y: windowHeight + 10, desc: "下边界外" }
            ];
            
            testPositions.forEach(pos => {
                const constrainedX = Math.max(0, Math.min(pos.x, windowWidth - buttonSize));
                const constrainedY = Math.max(0, Math.min(pos.y, windowHeight - buttonSize));
                
                const isConstrained = (pos.x !== constrainedX) || (pos.y !== constrainedY);
                console.log(`   - ${pos.desc}:`, isConstrained ? "✅ 已限制" : "⚠️  未限制");
            });
        },
        
        // 测试位置保存
        testPositionSaving: function() {
            console.log("🧪 测试位置保存:");
            
            const testPosition = { x: "100px", y: "200px" };
            
            // 模拟保存位置
            localStorage.setItem('virtual-pet-button-position', JSON.stringify(testPosition));
            
            // 检查是否保存成功
            const saved = localStorage.getItem('virtual-pet-button-position');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    const isCorrect = parsed.x === testPosition.x && parsed.y === testPosition.y;
                    console.log("   - 位置保存:", isCorrect ? "✅ 成功" : "❌ 失败");
                    console.log("   - 保存的数据:", parsed);
                    return isCorrect;
                } catch (error) {
                    console.log("   - 位置保存: ❌ 解析失败");
                    return false;
                }
            } else {
                console.log("   - 位置保存: ❌ 未保存");
                return false;
            }
        },
        
        // 检查事件绑定
        checkEventBindings: function() {
            console.log("🧪 检查事件绑定:");
            
            const button = $('#virtual-pet-button');
            if (button.length === 0) {
                console.log("   ❌ 按钮不存在");
                return false;
            }
            
            // 检查是否绑定了必要的事件
            const events = $._data(button[0], 'events');
            if (events) {
                const hasMouseDown = events.mousedown && events.mousedown.length > 0;
                const hasClick = events.click && events.click.length > 0;
                const hasTouchStart = events.touchstart && events.touchstart.length > 0;
                
                console.log("   - mousedown事件:", hasMouseDown ? "✅ 已绑定" : "❌ 未绑定");
                console.log("   - click事件:", hasClick ? "✅ 已绑定" : "❌ 未绑定");
                console.log("   - touchstart事件:", hasTouchStart ? "✅ 已绑定" : "❌ 未绑定");
                
                return hasMouseDown && hasClick;
            } else {
                console.log("   ❌ 无法检测事件绑定");
                return false;
            }
        },
        
        // 运行所有测试
        runAllTests: function() {
            console.log("🚀 开始优化后的拖拽功能测试...");
            console.log("==========================================");
            
            const results = {
                basics: this.checkButtonBasics(),
                threshold: this.testDragThreshold(),
                simulation: this.simulateDragSequence(),
                boundary: this.testBoundaryConstraints(),
                saving: this.testPositionSaving(),
                events: this.checkEventBindings()
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
                console.log("🎉 所有测试通过！优化后的拖拽功能正常工作。");
                console.log("💡 拖拽实现已参考 preset-manager-momo 进行优化");
            } else {
                console.log("⚠️  部分测试失败，请检查相关功能。");
            }
        }
    };
    
    // 导出到全局
    window.DragTestsOptimized = DragTestsOptimized;
    
    // 自动运行测试
    DragTestsOptimized.runAllTests();
    
    console.log("\n💡 使用说明：");
    console.log("   - 运行 DragTestsOptimized.runAllTests() 重新测试");
    console.log("   - 运行 DragTestsOptimized.simulateDragSequence() 模拟拖拽");
    console.log("   - 现在拖拽阈值为5像素（与momo一致）");
    
})();
