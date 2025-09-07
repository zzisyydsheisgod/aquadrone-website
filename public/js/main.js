// ============ 无人船位置定义 ============
// 当前测试区域：韶关学院附近水域
const BOAT_AREA = {
    lat: 24.77298,
    lng: 113.67162
};

// 全局变量
let map, boatMarker;

// ============ 初始化地图 ============
function initMap() {
    // 创建高德地图实例
    map = new AMap.Map('map', {
        center: [BOAT_AREA.lng, BOAT_AREA.lat], // 中心点
        zoom: 15,                              // 缩放等级
        viewMode: '2D',                        // 2D 视图
        mapStyle: 'amap://styles/light',       // 浅色地图风格
        features: ['bg', 'point', 'road', 'building'] // 显示元素
    });

    // 添加比例尺和工具栏控件
    map.addControl(new AMap.Scale());
    map.addControl(new AMap.ToolBar());

    // 创建无人船标记
    boatMarker = new AMap.Marker({
        position: new AMap.LngLat(BOAT_AREA.lng, BOAT_AREA.lat),
        map: map,
        icon: 'https://img.icons8.com/ios-filled/50/00bfa5/boat.png', // 小船图标
        offset: new AMap.Pixel(-15, -30), // 图标偏移
        title: '无人船当前位置'
    });

    // 模拟传感器数据
    document.getElementById('coord').textContent = `${BOAT_AREA.lng.toFixed(5)}, ${BOAT_AREA.lat.toFixed(5)}`;
    document.getElementById('temp').textContent = '25.3';
    document.getElementById('oxygen').textContent = '6.8';
    document.getElementById('ph').textContent = '7.2';
}

// ============ 摄像头播放功能 ============
function initCamera() {
    const videoElement = document.getElementById('camera-video');

    // ⚠️ 请替换为你的实际 FLV 流地址
    // 示例：rtmp://your-server/live/boat → 转为 http://your-server/live/boat.flv
    const flvUrl = 'https://your-flv-server.com/live/boat.flv'; // ← 修改为你的地址

    if (flvjs.isSupported()) {
        const flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: flvUrl
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play().catch(e => {
            console.error('摄像头播放失败:', e);
            videoElement.src = 'https://via.placeholder.com/800x400?text=摄像头未连接';
        });
    } else {
        videoElement.src = 'https://via.placeholder.com/800x400?text=浏览器不支持FLV播放';
    }
}

// ============ 二维码功能 ============
let qrcodeModal = document.getElementById('qrcode-modal');
let qrcodeBtn = document.getElementById('qrcode-btn');
let closeBtn = document.querySelector('.close');

// 显示二维码弹窗
qrcodeBtn.onclick = function () {
    qrcodeModal.style.display = "block";
    if (!window.qrGenerated) {
        generateQRCode();
        window.qrGenerated = true;
    }
};

// 关闭弹窗
closeBtn.onclick = function () {
    qrcodeModal.style.display = "none";
};

// 点击背景关闭
window.onclick = function (event) {
    if (event.target == qrcodeModal) {
        qrcodeModal.style.display = "none";
    }
};

// 生成二维码（使用 qrcode.js）
function generateQRCode() {
    let script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/qrcode.js/lib/qrcode.min.js';
    script.onload = function () {
        new QRCode(document.getElementById("qrcode"), {
            text: "https://aquadrone.pages.dev", // ← 替换为你的真实部署地址
            width: 200,
            height: 200,
            colorDark: "#00bfa5",
            colorLight: "#ffffff"
        });
    };
    document.head.appendChild(script);
}

// ============ 控制按钮功能（模拟） ============
function startCruise() {
    alert('🚀 自动巡航已启动！');
}

function feedFish() {
    alert('🍚 自动投喂中...');
}

function takePhoto() {
    alert('📸 拍照成功！图像已上传云端');
}

// ============ 页面加载完成后初始化 ============
window.onload = function () {
    initMap();     // 初始化地图
    initCamera();  // 初始化摄像头
};