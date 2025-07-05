// 虚拟宠物系统 - 卸载清理脚本
// 此脚本用于在插件卸载时自动清理相关数据和文件

(function() {
    'use strict';
    
    const EXTENSION_NAME = 'virtual-pet-system';
    const CLEANUP_VERSION = '1.0.0';
    
    console.log(`[${EXTENSION_NAME}] 卸载清理脚本开始执行...`);
    
    /**
     * 清理DOM元素
     */
    function cleanupDOMElements() {
        console.log(`[${EXTENSION_NAME}] 清理DOM元素...`);
        
        const elementsToRemove = [
            '#virtual-pet-button',
            '#virtual-pet-popup-overlay', 
            '.virtual-pet-popup-overlay',
            '#shop-modal',
            '.pet-notification',
            '#ios-test-button',
            '#test-popup-button'
        ];
        
        let removedCount = 0;
        elementsToRemove.forEach(selector => {
            const elements = $(selector);
            if (elements.length > 0) {
                elements.remove();
                removedCount += elements.length;
                console.log(`[${EXTENSION_NAME}] 已移除 ${elements.length} 个 ${selector} 元素`);
            }
        });
        
        console.log(`[${EXTENSION_NAME}] 共移除 ${removedCount} 个DOM元素`);
        return removedCount;
    }
    
    /**
     * 清理事件监听器
     */
    function cleanupEventListeners() {
        console.log(`[${EXTENSION_NAME}] 清理事件监听器...`);
        
        // 移除命名空间事件
        $(document).off('.petdragtemp');
        $(document).off('.virtualpet');
        $(window).off('.virtualpet');
        
        console.log(`[${EXTENSION_NAME}] 事件监听器清理完成`);
    }
    
    /**
     * 清理全局变量和函数
     */
    function cleanupGlobalVariables() {
        console.log(`[${EXTENSION_NAME}] 清理全局变量...`);
        
        const globalFunctionsToRemove = [
            'testVirtualPet',
            'forceShowPetButton', 
            'forceDataMigration',
            'forceClearAndReload',
            'fixAllIssues',
            'createIOSTestButton',
            'showIOSPopup',
            'clearAllPopups',
            'forceCloseAllPopups',
            'closeShopModal',
            'testShopSystem',
            'cleanupVirtualPetSystem',
            'fixValueSystem',
            'forceUpdateToTamagotchi',
            'testUnifiedUI',
            'createTestPopupButton'
        ];
        
        let removedCount = 0;
        globalFunctionsToRemove.forEach(funcName => {
            if (window[funcName]) {
                delete window[funcName];
                removedCount++;
                console.log(`[${EXTENSION_NAME}] 已移除全局函数: ${funcName}`);
            }
        });
        
        console.log(`[${EXTENSION_NAME}] 共移除 ${removedCount} 个全局函数`);
        return removedCount;
    }
    
    /**
     * 清理localStorage数据
     */
    function cleanupLocalStorage(userConfirmed = false) {
        console.log(`[${EXTENSION_NAME}] 扫描localStorage数据...`);
        
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (
                key.includes('virtual-pet') || 
                key.includes('KPCP-PET') || 
                key.includes('pet-system') ||
                key.startsWith(EXTENSION_NAME)
            )) {
                keysToRemove.push(key);
            }
        }
        
        console.log(`[${EXTENSION_NAME}] 发现 ${keysToRemove.length} 个相关localStorage项目:`, keysToRemove);
        
        if (keysToRemove.length === 0) {
            console.log(`[${EXTENSION_NAME}] 没有需要清理的localStorage数据`);
            return 0;
        }
        
        if (!userConfirmed) {
            // 如果用户没有确认，只显示发现的数据，不删除
            console.log(`[${EXTENSION_NAME}] 发现以下数据，如需清理请调用 cleanupVirtualPetData(true):`);
            keysToRemove.forEach(key => {
                console.log(`  - ${key}: ${localStorage.getItem(key)?.substring(0, 100)}...`);
            });
            return keysToRemove.length;
        }
        
        // 用户确认后删除数据
        keysToRemove.forEach(key => {
            localStorage.removeItem(key);
            console.log(`[${EXTENSION_NAME}] 已删除localStorage: ${key}`);
        });
        
        console.log(`[${EXTENSION_NAME}] 已清理 ${keysToRemove.length} 个localStorage项目`);
        return keysToRemove.length;
    }
    
    /**
     * 完整的卸载清理函数
     */
    function performFullCleanup(includeData = false) {
        console.log(`[${EXTENSION_NAME}] 开始执行完整清理...`);
        console.log(`[${EXTENSION_NAME}] 清理版本: ${CLEANUP_VERSION}`);
        console.log(`[${EXTENSION_NAME}] 包含数据清理: ${includeData}`);
        
        const results = {
            domElements: 0,
            globalFunctions: 0,
            localStorageItems: 0,
            timestamp: new Date().toISOString()
        };
        
        try {
            // 1. 清理DOM元素
            results.domElements = cleanupDOMElements();
            
            // 2. 清理事件监听器
            cleanupEventListeners();
            
            // 3. 清理全局变量
            results.globalFunctions = cleanupGlobalVariables();
            
            // 4. 清理localStorage（可选）
            results.localStorageItems = cleanupLocalStorage(includeData);
            
            console.log(`[${EXTENSION_NAME}] 清理完成！统计:`, results);
            
            // 显示清理结果
            if (typeof toastr !== 'undefined') {
                const message = `清理完成！移除了 ${results.domElements} 个DOM元素，${results.globalFunctions} 个全局函数` + 
                               (includeData ? `，${results.localStorageItems} 个数据项` : '');
                toastr.success(message, '虚拟宠物系统卸载', { timeOut: 5000 });
            }
            
            return results;
            
        } catch (error) {
            console.error(`[${EXTENSION_NAME}] 清理过程中发生错误:`, error);
            
            if (typeof toastr !== 'undefined') {
                toastr.error('清理过程中发生错误，请检查控制台', '卸载清理', { timeOut: 5000 });
            }
            
            return { error: error.message, ...results };
        }
    }
    
    /**
     * 检查是否需要清理
     */
    function checkAndCleanup() {
        // 检查插件是否仍然启用
        const isEnabled = localStorage.getItem('virtual-pet-enabled') !== 'false';
        const hasElements = $('#virtual-pet-button').length > 0;
        
        if (!isEnabled && hasElements) {
            console.log(`[${EXTENSION_NAME}] 检测到插件已禁用但仍有残留元素，执行清理...`);
            performFullCleanup(false); // 不清理数据，只清理UI元素
        }
    }
    
    // 导出清理函数到全局作用域，供用户手动调用
    window.cleanupVirtualPetSystem = performFullCleanup;
    window.cleanupVirtualPetData = cleanupLocalStorage;
    window.checkVirtualPetCleanup = checkAndCleanup;
    
    // 自动检查是否需要清理
    if (typeof jQuery !== 'undefined') {
        $(document).ready(() => {
            setTimeout(checkAndCleanup, 1000);
        });
    }
    
    console.log(`[${EXTENSION_NAME}] 卸载清理脚本加载完成`);
    console.log(`[${EXTENSION_NAME}] 可用函数:`);
    console.log(`  - cleanupVirtualPetSystem(includeData) - 完整清理`);
    console.log(`  - cleanupVirtualPetData(confirmed) - 仅清理数据`);
    console.log(`  - checkVirtualPetCleanup() - 检查并清理`);
    
})();
