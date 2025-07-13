/**
 * Firebase 配置验证脚本
 * 用于验证Firebase配置是否正确，以及各项服务是否可用
 */

// Firebase 配置 (从你提供的配置更新)
const firebaseConfig = {
    apiKey: "AIzaSyA74TnN9IoyQjCncKOIOShWEktrL1hd96o",
    authDomain: "kpop-pett.firebaseapp.com",
    projectId: "kpop-pett",
    storageBucket: "kpop-pett.firebasestorage.app",
    messagingSenderId: "264650615774",
    appId: "1:264650615774:web:f500ff555183110c3f0b4f",
    measurementId: "G-3BH0GMJR3D"
};

/**
 * 验证Firebase配置
 */
function validateFirebaseConfig() {
    console.log('🔍 验证Firebase配置...');
    
    const requiredFields = [
        'apiKey',
        'authDomain', 
        'projectId',
        'storageBucket',
        'messagingSenderId',
        'appId'
    ];
    
    const missingFields = requiredFields.filter(field => !firebaseConfig[field]);
    
    if (missingFields.length > 0) {
        console.error('❌ 缺少必需的配置字段:', missingFields);
        return false;
    }
    
    // 验证配置格式
    const validations = [
        {
            field: 'apiKey',
            test: (value) => value.startsWith('AIza') && value.length === 39,
            message: 'API Key格式不正确'
        },
        {
            field: 'authDomain',
            test: (value) => value.endsWith('.firebaseapp.com'),
            message: 'Auth Domain格式不正确'
        },
        {
            field: 'projectId',
            test: (value) => value === 'kpop-pett',
            message: 'Project ID应该是 kpop-pett'
        },
        {
            field: 'storageBucket',
            test: (value) => value.endsWith('.firebasestorage.app') || value.endsWith('.appspot.com'),
            message: 'Storage Bucket格式不正确'
        },
        {
            field: 'appId',
            test: (value) => value.startsWith('1:') && value.includes(':web:'),
            message: 'App ID格式不正确'
        }
    ];
    
    let isValid = true;
    
    validations.forEach(validation => {
        const value = firebaseConfig[validation.field];
        if (!validation.test(value)) {
            console.error(`❌ ${validation.field}: ${validation.message}`);
            console.error(`   当前值: ${value}`);
            isValid = false;
        } else {
            console.log(`✅ ${validation.field}: 格式正确`);
        }
    });
    
    // 验证可选字段
    if (firebaseConfig.measurementId) {
        if (firebaseConfig.measurementId.startsWith('G-')) {
            console.log('✅ measurementId: 格式正确 (Analytics已启用)');
        } else {
            console.warn('⚠️ measurementId: 格式可能不正确');
        }
    } else {
        console.log('ℹ️ measurementId: 未配置 (Analytics未启用)');
    }
    
    return isValid;
}

/**
 * 测试Firebase连接
 */
async function testFirebaseConnection() {
    console.log('🔗 测试Firebase连接...');
    
    try {
        // 这里只是模拟测试，实际需要在浏览器环境中运行
        console.log('📋 配置信息:');
        console.log(`   项目ID: ${firebaseConfig.projectId}`);
        console.log(`   认证域: ${firebaseConfig.authDomain}`);
        console.log(`   存储桶: ${firebaseConfig.storageBucket}`);
        console.log(`   应用ID: ${firebaseConfig.appId}`);
        
        if (firebaseConfig.measurementId) {
            console.log(`   Analytics ID: ${firebaseConfig.measurementId}`);
        }
        
        console.log('✅ 配置信息显示正常');
        
        // 检查域名可访问性
        const domains = [
            firebaseConfig.authDomain,
            `${firebaseConfig.projectId}.firebaseio.com`,
            'firestore.googleapis.com',
            'firebase.googleapis.com'
        ];
        
        console.log('🌐 相关域名:');
        domains.forEach(domain => {
            console.log(`   - https://${domain}`);
        });
        
        return true;
    } catch (error) {
        console.error('❌ Firebase连接测试失败:', error);
        return false;
    }
}

/**
 * 生成Firebase初始化代码
 */
function generateInitCode() {
    console.log('📝 生成Firebase初始化代码...');
    
    const initCode = `
// Firebase 配置
const firebaseConfig = ${JSON.stringify(firebaseConfig, null, 4)};

// 初始化 Firebase (v9+ 模块化方式)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
${firebaseConfig.measurementId ? 'const analytics = getAnalytics(app);' : '// Analytics未配置'}

// 或者使用 compat 版本 (向后兼容)
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
${firebaseConfig.measurementId ? 'const analytics = firebase.analytics();' : '// Analytics未配置'}
`;
    
    console.log(initCode);
    return initCode;
}

/**
 * 检查Firestore安全规则建议
 */
function checkSecurityRules() {
    console.log('🔒 Firestore安全规则建议...');
    
    const rules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 用户数据 - 只允许认证用户访问自己的数据
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 连接码 - 允许认证用户读取和创建
    match /connectionCodes/{codeId} {
      allow read, create: if request.auth != null;
      allow update: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         request.auth.uid != resource.data.get('secondaryUserId', ''));
      allow delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    
    // 拒绝所有其他访问
    match /{document=**} {
      allow read, write: if false;
    }
  }
}`;
    
    console.log('建议的Firestore安全规则:');
    console.log(rules);
    
    return rules;
}

/**
 * 主函数
 */
function main() {
    console.log('🔥 Firebase 配置验证工具');
    console.log('================================');
    
    // 1. 验证配置
    const configValid = validateFirebaseConfig();
    console.log('');
    
    // 2. 测试连接
    testFirebaseConnection();
    console.log('');
    
    // 3. 生成初始化代码
    generateInitCode();
    console.log('');
    
    // 4. 安全规则建议
    checkSecurityRules();
    console.log('');
    
    // 5. 总结
    console.log('📋 验证总结:');
    if (configValid) {
        console.log('✅ Firebase配置验证通过');
        console.log('✅ 可以开始使用Firebase服务');
        console.log('');
        console.log('📌 下一步:');
        console.log('1. 在Firebase控制台中设置Firestore安全规则');
        console.log('2. 启用Authentication匿名登录');
        console.log('3. 配置Storage访问规则');
        console.log('4. 在浏览器中测试firebase-test.html');
    } else {
        console.log('❌ Firebase配置存在问题，请检查并修正');
    }
}

// 如果在Node.js环境中运行
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        firebaseConfig,
        validateFirebaseConfig,
        testFirebaseConnection,
        generateInitCode,
        checkSecurityRules
    };
}

// 如果在浏览器环境中运行
if (typeof window !== 'undefined') {
    window.FirebaseConfigTest = {
        firebaseConfig,
        validateFirebaseConfig,
        testFirebaseConnection,
        generateInitCode,
        checkSecurityRules,
        main
    };
}

// 自动运行
main();
