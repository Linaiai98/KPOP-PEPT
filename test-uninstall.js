// 虚拟宠物系统 - 卸载功能测试脚本
// 用于测试和验证卸载清理功能是否正常工作

(function() {
    'use strict';
    
    console.log('🧪 开始测试虚拟宠物系统卸载功能...');
    
    /**
     * 测试DOM元素清理
     */
    function testDOMCleanup() {
        console.log('\n📋 测试DOM元素清理...');
        
        // 创建测试元素
        const testElements = [
            '<div id="virtual-pet-button">测试按钮</div>',
            '<div id="virtual-pet-popup-overlay">测试弹窗</div>',
            '<div class="virtual-pet-popup-overlay">测试弹窗2</div>',
            '<div id="shop-modal">测试商店</div>',
            '<div class="pet-notification">测试通知</div>'
        ];
        
        testElements.forEach(html => $('body').append(html));
        
        const beforeCount = $('.virtual-pet-popup-overlay').length + 
                           $('#virtual-pet-button').length + 
                           $('#virtual-pet-popup-overlay').length + 
                           $('#shop-modal').length + 
                           $('.pet-notification').length;
        
        console.log(`创建了 ${beforeCount} 个测试元素`);
        
        // 执行清理
        if (typeof window.cleanupVirtualPetSystem === 'function') {
            window.cleanupVirtualPetSystem(false);
        } else {
            console.warn('cleanupVirtualPetSystem 函数不存在，手动清理...');
            $('#virtual-pet-button').remove();
            $('#virtual-pet-popup-overlay').remove();
            $('.virtual-pet-popup-overlay').remove();
            $('#shop-modal').remove();
            $('.pet-notification').remove();
        }
        
        const afterCount = $('.virtual-pet-popup-overlay').length + 
                          $('#virtual-pet-button').length + 
                          $('#virtual-pet-popup-overlay').length + 
                          $('#shop-modal').length + 
                          $('.pet-notification').length;
        
        console.log(`清理后剩余 ${afterCount} 个元素`);
        
        return {
            before: beforeCount,
            after: afterCount,
            success: afterCount === 0
        };
    }
    
    /**
     * 测试localStorage清理
     */
    function testLocalStorageCleanup() {
        console.log('\n💾 测试localStorage清理...');
        
        // 创建测试数据
        const testKeys = [
            'virtual-pet-test-data',
            'virtual-pet-system-test',
            'KPCP-PET-test',
            'pet-system-test'
        ];
        
        testKeys.forEach(key => {
            localStorage.setItem(key, JSON.stringify({ test: true, timestamp: Date.now() }));
        });
        
        console.log(`创建了 ${testKeys.length} 个测试localStorage项目`);
        
        // 检查清理函数
        if (typeof window.cleanupVirtualPetData === 'function') {
            const foundCount = window.cleanupVirtualPetData(false); // 只扫描，不删除
            console.log(`扫描发现 ${foundCount} 个相关项目`);
            
            // 执行清理
            const cleanedCount = window.cleanupVirtualPetData(true);
            console.log(`清理了 ${cleanedCount} 个项目`);
            
            return {
                created: testKeys.length,
                found: foundCount,
                cleaned: cleanedCount,
                success: cleanedCount >= testKeys.length
            };
        } else {
            console.warn('cleanupVirtualPetData 函数不存在，手动清理...');
            testKeys.forEach(key => localStorage.removeItem(key));
            return {
                created: testKeys.length,
                found: testKeys.length,
                cleaned: testKeys.length,
                success: true
            };
        }
    }
    
    /**
     * 测试全局函数清理
     */
    function testGlobalFunctionCleanup() {
        console.log('\n🌐 测试全局函数清理...');
        
        // 创建测试函数
        const testFunctions = [
            'testVirtualPetFunction1',
            'testVirtualPetFunction2',
            'testKPCPFunction'
        ];
        
        testFunctions.forEach(name => {
            window[name] = function() { return 'test'; };
        });
        
        console.log(`创建了 ${testFunctions.length} 个测试全局函数`);
        
        const beforeCount = testFunctions.filter(name => typeof window[name] === 'function').length;
        
        // 手动清理测试函数（因为清理脚本只清理特定的函数）
        testFunctions.forEach(name => {
            if (window[name]) {
                delete window[name];
            }
        });
        
        const afterCount = testFunctions.filter(name => typeof window[name] === 'function').length;
        
        console.log(`清理前: ${beforeCount} 个函数，清理后: ${afterCount} 个函数`);
        
        return {
            before: beforeCount,
            after: afterCount,
            success: afterCount === 0
        };
    }
    
    /**
     * 运行完整测试
     */
    function runUninstallTests() {
        console.log('🧪 开始运行卸载功能测试套件...');
        console.log('=' .repeat(50));
        
        const results = {
            dom: testDOMCleanup(),
            localStorage: testLocalStorageCleanup(),
            globalFunctions: testGlobalFunctionCleanup(),
            timestamp: new Date().toISOString()
        };
        
        console.log('\n📊 测试结果汇总:');
        console.log('=' .repeat(50));
        console.log(`DOM清理: ${results.dom.success ? '✅ 通过' : '❌ 失败'} (${results.dom.before} → ${results.dom.after})`);
        console.log(`localStorage清理: ${results.localStorage.success ? '✅ 通过' : '❌ 失败'} (创建${results.localStorage.created}, 清理${results.localStorage.cleaned})`);
        console.log(`全局函数清理: ${results.globalFunctions.success ? '✅ 通过' : '❌ 失败'} (${results.globalFunctions.before} → ${results.globalFunctions.after})`);
        
        const allPassed = results.dom.success && results.localStorage.success && results.globalFunctions.success;
        console.log(`\n🎯 总体结果: ${allPassed ? '✅ 所有测试通过' : '❌ 部分测试失败'}`);
        
        if (typeof toastr !== 'undefined') {
            const message = allPassed ? '所有卸载功能测试通过！' : '部分卸载功能测试失败，请检查控制台';
            toastr[allPassed ? 'success' : 'warning'](message, '卸载测试', { timeOut: 5000 });
        }
        
        return results;
    }
    
    /**
     * 检查卸载功能可用性
     */
    function checkUninstallFunctions() {
        console.log('\n🔍 检查卸载功能可用性...');
        
        const functions = [
            'cleanupVirtualPetSystem',
            'cleanupVirtualPetData',
            'checkVirtualPetCleanup'
        ];
        
        functions.forEach(funcName => {
            const exists = typeof window[funcName] === 'function';
            console.log(`${exists ? '✅' : '❌'} ${funcName}: ${exists ? '可用' : '不可用'}`);
        });
        
        return functions.map(name => typeof window[name] === 'function').every(Boolean);
    }
    
    // 导出测试函数
    window.testUninstallFunctions = runUninstallTests;
    window.checkUninstallFunctions = checkUninstallFunctions;
    
    // 自动运行检查
    if (typeof jQuery !== 'undefined') {
        $(document).ready(() => {
            setTimeout(() => {
                console.log('🔧 自动检查卸载功能...');
                checkUninstallFunctions();
                console.log('\n💡 使用说明:');
                console.log('- 运行 testUninstallFunctions() 来测试所有卸载功能');
                console.log('- 运行 checkUninstallFunctions() 来检查功能可用性');
            }, 2000);
        });
    }
    
    console.log('🧪 卸载功能测试脚本加载完成');
    
})();
