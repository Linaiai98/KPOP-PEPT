#!/bin/bash

# 虚拟宠物系统 - 插件清理工具 (Linux/Mac版本)
# 使用方法: chmod +x cleanup_plugin.sh && ./cleanup_plugin.sh

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_header() {
    echo
    echo "========================================"
    echo "   虚拟宠物系统 - 插件清理工具"
    echo "========================================"
    echo
}

# 查找SillyTavern目录
find_sillytavern() {
    local paths=(
        "$HOME/Desktop/SillyTavern"
        "$HOME/Documents/SillyTavern"
        "$HOME/Downloads/SillyTavern"
        "/opt/SillyTavern"
        "/usr/local/SillyTavern"
        "$HOME/SillyTavern"
        "$HOME/Desktop/写代码/写代码/代码"
        "$(pwd)"
    )
    
    print_info "正在查找SillyTavern安装目录..."
    
    for path in "${paths[@]}"; do
        if [[ -d "$path/public/scripts/extensions/third-party" ]]; then
            echo "$path"
            return 0
        fi
    done
    
    return 1
}

# 主函数
main() {
    print_header
    
    # 查找SillyTavern目录
    SILLYTAVERN_PATH=$(find_sillytavern)
    
    if [[ -z "$SILLYTAVERN_PATH" ]]; then
        print_error "未找到SillyTavern安装目录"
        echo
        echo "请手动输入SillyTavern的完整路径:"
        echo "例如: /home/username/SillyTavern"
        echo
        read -p "请输入路径: " MANUAL_PATH
        
        if [[ ! -d "$MANUAL_PATH/public/scripts/extensions/third-party" ]]; then
            print_error "输入的路径无效或不是SillyTavern目录"
            print_error "请确认路径正确后重新运行此脚本"
            exit 1
        fi
        
        SILLYTAVERN_PATH="$MANUAL_PATH"
    fi
    
    print_success "找到SillyTavern目录: $SILLYTAVERN_PATH"
    
    EXTENSION_DIR="$SILLYTAVERN_PATH/public/scripts/extensions/third-party"
    print_info "扩展目录: $EXTENSION_DIR"
    echo
    
    # 检查需要删除的目录（包含所有可能的名称）
    DIRS_TO_DELETE=()

    if [[ -d "$EXTENSION_DIR/KPCP-PET" ]]; then
        DIRS_TO_DELETE+=("KPCP-PET")
    fi

    if [[ -d "$EXTENSION_DIR/KPOP-PET" ]]; then
        DIRS_TO_DELETE+=("KPOP-PET")
    fi

    if [[ -d "$EXTENSION_DIR/virtual-pet-system" ]]; then
        DIRS_TO_DELETE+=("virtual-pet-system")
    fi

    if [[ -d "$EXTENSION_DIR/pet-system" ]]; then
        DIRS_TO_DELETE+=("pet-system")
    fi

    if [[ -d "$EXTENSION_DIR/Virtual-Pet-System" ]]; then
        DIRS_TO_DELETE+=("Virtual-Pet-System")
    fi
    
    if [[ ${#DIRS_TO_DELETE[@]} -eq 0 ]]; then
        print_success "未发现需要清理的插件目录"
        print_success "所有目录都是干净的！"
        echo
        exit 0
    fi
    
    print_info "发现以下插件目录:"
    for dir in "${DIRS_TO_DELETE[@]}"; do
        echo "  - $dir"
    done
    echo
    
    print_warning "警告: 这将删除上述所有目录及其内容！"
    print_warning "删除后你需要重新安装虚拟宠物系统插件。"
    echo
    
    read -p "确定要继续吗？(y/N): " CONFIRM
    
    if [[ ! "$CONFIRM" =~ ^[Yy]([Ee][Ss])?$ ]]; then
        print_error "用户取消操作"
        exit 0
    fi
    
    echo
    print_info "开始清理插件目录..."
    echo
    
    # 删除目录
    FAILED_DIRS=()
    
    for dir in "${DIRS_TO_DELETE[@]}"; do
        print_info "正在删除: $dir"
        
        if rm -rf "$EXTENSION_DIR/$dir" 2>/dev/null; then
            if [[ ! -d "$EXTENSION_DIR/$dir" ]]; then
                print_success "删除成功: $dir"
            else
                print_error "删除失败: $dir (权限不足或目录被占用)"
                FAILED_DIRS+=("$dir")
            fi
        else
            print_error "删除失败: $dir (权限不足)"
            FAILED_DIRS+=("$dir")
        fi
    done
    
    echo
    print_info "验证清理结果..."
    
    if [[ ${#FAILED_DIRS[@]} -eq 0 ]]; then
        print_success "所有目录清理完成！"
        echo
        echo "📋 接下来的步骤:"
        echo "1. 重启SillyTavern"
        echo "2. 进入扩展页面"
        echo "3. 重新安装虚拟宠物系统插件"
        echo "4. 在扩展设置中启用插件"
        echo
    else
        print_error "以下目录清理失败:"
        for dir in "${FAILED_DIRS[@]}"; do
            echo "  - $dir"
        done
        echo
        echo "💡 建议:"
        echo "1. 使用sudo权限运行此脚本: sudo $0"
        echo "2. 完全关闭SillyTavern后重试"
        echo "3. 或者手动删除这些目录:"
        for dir in "${FAILED_DIRS[@]}"; do
            echo "   sudo rm -rf \"$EXTENSION_DIR/$dir\""
        done
        echo
    fi
}

# 检查是否以root权限运行（可选）
check_permissions() {
    if [[ $EUID -eq 0 ]]; then
        print_warning "正在以root权限运行"
        print_warning "请确认这是必要的"
        echo
    fi
}

# 脚本入口
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    check_permissions
    main "$@"
fi
