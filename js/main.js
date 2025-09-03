// ======== 韶关学院（韶乐园校区）坐标 ========
const SHAOGUAN_YUELUAN = {
    lat: 24.77298,// 纬度
    lng: 113.67162// 经度
};

let map, boatMarker, infoWindow;

// ======== 初始化地图 ========
function initMap() {
    map = new AMap.Map('map', {
        center: [SHAOGUAN_YUELUAN.lng, SHAOGUAN_YUELUAN.lat],
        zoom: 16,
        viewMode: '2D',
        mapStyle: 'amap://styles/normal', // 标准彩色地图
        features: ['bg', 'point', 'road', 'building']
    });

    // 添加控件
    AMap.plugin(['AMap.Scale', 'AMap.ToolBar'], () => {
        map.addControl(new AMap.Scale());
        map.addControl(new AMap.ToolBar({ liteStyle: true }));
    });

    // 创建无人船标记
    boatMarker = new AMap.Marker({
        position: new AMap.LngLat(SHAOGUAN_YUELUAN.lng, SHAOGUAN_YUELUAN.lat),
        map: map,
        // ✅ 推荐使用高德官方图标 或 国内 CDN
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        offset: new AMap.Pixel(-16, -16),
        title: 'AquaDrone',
        zIndex: 100
    });

    // 信息窗体
    infoWindow = new AMap.InfoWindow({
        content: `
            <div style="font-size:14px;line-height:1.6;background:#0f172a;color:#e2e8f0;padding:12px;border-radius:8px;">
                <strong style="color:#0ea5e9;">🚤 AquaDrone 无人船</strong><br>
                📍 位置：韶关学院（韶乐园校区）<br>
                ✅ 状态：正常运行<br>
                🔋 电池：87%<br>
                🌊 高度：水面航行
            </div>
        `,
        offset: new AMap.Pixel(0, -30)
    });

    // 点击反馈
    boatMarker.on('click', () => {
        infoWindow.open(map, boatMarker.getPosition());
        // 轻微震动反馈（现代浏览器支持）
        if (navigator.vibrate) navigator.vibrate(50);
    });

    // 默认打开
    setTimeout(() => infoWindow.open(map, boatMarker.getPosition()), 1000);
}

// ======== 模拟传感器数据 ========
function updateSensors() {
    document.getElementById('temp').textContent = (24.5 + Math.random() * 3).toFixed(1) + '°C';
    document.getElementById('ph').textContent = (7.2 + (Math.random() - 0.5)).toFixed(1);
    document.getElementById('oxygen').textContent = (6.0 + Math.random() * 1.5).toFixed(1) + ' mg/L';
    document.getElementById('density').textContent = Math.floor(75 + Math.random() * 25) + '%';
}

// ======== 摄像头功能 ========
document.getElementById('startCamera').addEventListener('click', async () => {
    const video = document.getElementById('video');
    const btn = document.getElementById('startCamera');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        btn.textContent = '📹 摄像头已开启';
        btn.disabled = true;
        // 模拟AI识别
        setTimeout(() => alert('🔍 AI检测到鱼群活动区域！'), 2000);
    } catch (err) {
        alert('摄像头访问失败：' + err.message);
    }
});

// ======== 投喂功能 ========
document.getElementById('feedButton').addEventListener('click', () => {
    const btn = document.getElementById('feedButton');
    btn.textContent = '🚀 投喂中...';
    btn.disabled = true;
    // 模拟投喂动画
    boatMarker.setAnimation('AMAP_ANIMATION_BOUNCE');
    setTimeout(() => {
        boatMarker.setAnimation(null);
        alert('✅ 投喂完成！已投放 200g 高营养饲料');
        btn.textContent = '🚀 启动自动投喂';
        btn.disabled = false;
    }, 2500);
});

// ======== 页面加载 ========
window.onload = () => {
    initMap();
    updateSensors();
    setInterval(updateSensors, 3000);
};