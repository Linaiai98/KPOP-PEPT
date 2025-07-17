#!/usr/bin/env python3
"""
清理脚本：删除所有测试函数、调试函数和无用注释
"""

import re

def clean_code():
    with open('index.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # 删除特定的测试函数（使用更精确的匹配）
    test_functions = [
        'checkFloatingButton', 'debugAIFunctions', 'testModelFetch', 'testGoogleURLBuild',
        'resetAPIConfig', 'testAutoFillURL', 'testAPIConfig', 'testRelayServerSimple',
        'testRelayServer', 'testChatModal', 'testChatButton', 'testToggleFunction',
        'testFinalDragFix', 'testToggleNow', 'testAllFixedFeatures', 'testButtonClicks',
        'testNewBalance', 'testTimeDecay', 'checkValueSystem', 'resetHighValues',
        'testAvatarSync', 'checkSyncStatus', 'testTamagotchiSystem', 'testShopSystem',
        'testTamagotchiUI', 'testStatusColors', 'testHealButton', 'testButtonStyles',
        'testDecayFix', 'testSettingsButtonColor', 'testPersonalitySave', 'debugPersonalityLoss',
        'checkValueChanges', 'testCleanPrompt', 'checkInteractionFunctions', 'testInteractionFlow',
        'testSimpleInteraction', 'checkUIButtonBinding', 'checkFeedPetVersions', 'testFixedUIButton',
        'testUIAfterCooldown', 'testRewardDisplay', 'testNewDecaySystem', 'testNewValueBalance',
        'testHugFunction', 'testHugFunctionComplete', 'checkStoredData', 'testAvatarFunction',
        'testDragFunction', 'testUnifiedUI', 'testMobileSize', 'testAndroidUI',
        'testUnifiedUIForAllPlatforms', 'testIOSClose', 'testVirtualPetAPIDiscovery',
        'testSpecificAPI', 'getUserConfiguredModels', 'getThirdPartyModels', 'testVirtualPetAI',
        'testAIReply', 'testPersonalitySwitch', 'testMobileAPIConnection', 'testURLBuilder',
        'testNewPrompt', 'testGeminiAPI', 'testThirdPartyAPI', 'debugAPICall', 'debugAPIResponse',
        'testSimpleRequest', 'testPromptGeneration', 'testSmartInitSystem', 'resetRandomizationFlag'
    ]

    # 删除每个测试函数
    for func_name in test_functions:
        # 匹配函数定义到结束的完整块
        pattern = rf'window\.{func_name}\s*=\s*(?:async\s+)?function[^{{]*\{{[^{{}}]*(?:\{{[^{{}}]*\}}[^{{}}]*)*\}};?'
        content = re.sub(pattern, '', content, flags=re.MULTILINE | re.DOTALL)

        # 也删除注释块
        comment_pattern = rf'/\*\*[^*]*\*+(?:[^/*][^*]*\*+)*/\s*window\.{func_name}'
        content = re.sub(comment_pattern, f'window.{func_name}', content, flags=re.MULTILINE | re.DOTALL)

    # 删除长注释块
    long_comment_patterns = [
        r'/\*\*\s*\n\s*\*\s*🎉[^*]*\*+(?:[^/*][^*]*\*+)*/',
        r'/\*\*\s*\n\s*\*\s*🧪[^*]*\*+(?:[^/*][^*]*\*+)*/',
        r'/\*\*\s*\n\s*\*\s*🔧[^*]*\*+(?:[^/*][^*]*\*+)*/',
        r'/\*\*\s*\n\s*\*\s*🔍[^*]*\*+(?:[^/*][^*]*\*+)*/',
    ]

    for pattern in long_comment_patterns:
        content = re.sub(pattern, '', content, flags=re.MULTILINE | re.DOTALL)

    # 删除重复的buildChatPrompt函数
    content = re.sub(r'function buildChatPrompt\([^}]*\{[^}]*\}', '', content, flags=re.MULTILINE | re.DOTALL)

    # 清理多余的空行
    content = re.sub(r'\n{3,}', '\n\n', content)

    with open('index.js', 'w', encoding='utf-8') as f:
        f.write(content)

    print("✅ 代码清理完成")

if __name__ == "__main__":
    clean_code()
