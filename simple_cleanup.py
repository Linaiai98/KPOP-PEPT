#!/usr/bin/env python3
"""
系统性清理脚本：删除所有测试函数和调试函数
"""

import re

def clean_code():
    with open('index.js', 'r', encoding='utf-8') as f:
        content = f.read()

    print("开始清理测试函数...")

    # 删除所有window.test*, window.debug*, window.check*, window.reset*函数
    # 使用更精确的正则表达式匹配完整的函数块
    function_patterns = [
        r'window\.(test|debug|check|reset)[A-Za-z0-9_]*\s*=\s*(?:async\s+)?function[^{]*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\};?',
        r'/\*\*[^*]*\*+(?:[^/*][^*]*\*+)*/\s*window\.(test|debug|check|reset)[A-Za-z0-9_]*\s*=\s*(?:async\s+)?function[^{]*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\};?'
    ]

    # 分步删除，避免复杂的嵌套匹配问题
    lines = content.split('\n')
    cleaned_lines = []
    skip_function = False
    brace_count = 0
    function_start_pattern = re.compile(r'^\s*(?:/\*\*.*?\*/\s*)?window\.(test|debug|check|reset)')

    i = 0
    while i < len(lines):
        line = lines[i]

        # 检查是否是测试函数的开始
        if function_start_pattern.search(line):
            skip_function = True
            brace_count = 0

            # 跳过前面的注释块
            j = len(cleaned_lines) - 1
            while j >= 0 and (cleaned_lines[j].strip().startswith('*') or
                             cleaned_lines[j].strip().startswith('/**') or
                             cleaned_lines[j].strip() == ''):
                j -= 1
            if j >= 0 and '/**' in cleaned_lines[j]:
                cleaned_lines = cleaned_lines[:j]

            # 继续处理函数体
            while i < len(lines):
                current_line = lines[i]
                brace_count += current_line.count('{') - current_line.count('}')

                # 如果大括号平衡且遇到函数结束标志
                if brace_count <= 0 and (current_line.strip().endswith('};') or
                                       (current_line.strip().endswith('}') and brace_count == 0)):
                    skip_function = False
                    break
                i += 1
        elif not skip_function:
            cleaned_lines.append(line)

        i += 1

    content = '\n'.join(cleaned_lines)

    # 删除重复的buildChatPrompt函数
    print("删除重复的buildChatPrompt函数...")

    # 找到所有buildChatPrompt函数并只保留最后一个
    buildchat_pattern = r'(/\*\*[^*]*构建.*?聊天.*?Prompt[^*]*\*+(?:[^/*][^*]*\*+)*/\s*)?function\s+buildChatPrompt\([^{]*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}'
    matches = list(re.finditer(buildchat_pattern, content, re.DOTALL))

    if len(matches) > 1:
        # 删除除最后一个之外的所有buildChatPrompt函数
        for match in matches[:-1]:
            content = content[:match.start()] + content[match.end():]
            # 重新查找，因为位置已经改变
            matches = list(re.finditer(buildchat_pattern, content, re.DOTALL))

    # 清理多余的空行
    content = re.sub(r'\n{3,}', '\n\n', content)

    # 删除孤立的测试相关代码片段
    test_fragments = [
        r'console\.log\([^)]*[测试调试检查]\w*[^)]*\);?\s*',
        r'//.*[测试调试检查].*\n',
        r'\s*\*\s*[🧪🔧🔍].*\n',
    ]

    for pattern in test_fragments:
        content = re.sub(pattern, '', content, flags=re.MULTILINE)

    # 最终清理
    content = re.sub(r'\n{3,}', '\n\n', content)
    content = re.sub(r'^\s*\n', '', content, flags=re.MULTILINE)

    with open('index.js', 'w', encoding='utf-8') as f:
        f.write(content)

    print("✅ 系统性清理完成")

if __name__ == "__main__":
    clean_code()
