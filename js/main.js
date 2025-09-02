<<<<<<< HEAD
// ========== 地图初始化 ==========
let map, boatMarker, trail = [];

function initMap() {
    map = L.map('map').setView([22.5, 114.2], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    boatMarker = L.marker([22.5, 114.2], { title: "AquaDrone" }).addTo(map);
    trail = [[22.5, 114.2]];
    window.boatLine = L.polyline(trail, { color: '#00bfa5', opacity: 0.7 }).addTo(map);
}

// ========== 实时数据更新 ==========
async function fetchRealTimeData() {
    try {
        const res = await fetch('/api/data');
        const data = await res.json();

        document.getElementById('temp').textContent = data.temperature + '°C';
        document.getElementById('ph').textContent = data.ph;
        document.getElementById('oxygen').textContent = data.oxygen + ' mg/L';
        document.getElementById('density').textContent = data.density + '%';

        const lat = data.latitude + (Math.random() - 0.5) * 0.0005;
        const lng = data.longitude + (Math.random() - 0.5) * 0.0005;
        boatMarker.setLatLng([lat, lng]);
        trail.push([lat, lng]);
        if (trail.length > 10) trail.shift();
        window.boatLine.setLatLngs(trail);

        // 更新系统状态
        document.getElementById('battery').textContent = '87%';
        document.getElementById('signal').textContent = '强';
        document.getElementById('status').textContent = '正常运行';
        document.getElementById('last-update').textContent = new Date().toLocaleTimeString();

    } catch (err) {
        console.log("使用模拟数据");
        document.getElementById('temp').textContent = (24 + Math.random() * 6).toFixed(1) + '°C';
        document.getElementById('ph').textContent = (7.0 + (Math.random() - 0.5)).toFixed(1);
        document.getElementById('oxygen').textContent = (5.5 + Math.random() * 2).toFixed(1) + ' mg/L';
        document.getElementById('density').textContent = Math.floor(80 + Math.random() * 20) + '%';
        document.getElementById('battery').textContent = '85%';
        document.getElementById('signal').textContent = '中';
        document.getElementById('status').textContent = '运行中';
        document.getElementById('last-update').textContent = new Date().toLocaleTimeString();
    }
}

// ========== 摄像头功能 ==========
document.getElementById('startCamera').addEventListener('click', async () => {
    const video = document.getElementById('video');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });
        video.srcObject = stream;
        document.getElementById('startCamera').textContent = '📹 摄像头已开启';
        document.getElementById('startCamera').disabled = true;
    } catch (err) {
        alert('无法访问摄像头：' + err.message);
    }
});

// ========== 投喂按钮 ==========
document.getElementById('feedButton').addEventListener('click', () => {
    const btn = document.getElementById('feedButton');
    btn.textContent = '🚀 投喂中...';
    btn.disabled = true;
    setTimeout(() => {
        alert('✅ 投喂完成！已投放 200g 饲料');
        btn.textContent = '🚀 启动自动投喂';
        btn.disabled = false;
    }, 2000);
});

// ========== 初始化 ==========
window.onload = function () {
    initMap();
    fetchRealTimeData();
    setInterval(fetchRealTimeData, 3000);
=======
// 初始化地图
let map, boatMarker;
function initMap() {
    map = L.map('map').setView([22.5, 114.2], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    boatMarker = L.marker([22.5, 114.2], { title: "AquaDrone" }).addTo(map);
}

// 获取实时数据（模拟 API 调用）
async function fetchRealTimeData() {
    try {
        const res = await fetch('/api/data');
        const data = await res.json();

        document.getElementById('temp').textContent = data.temperature + '°C';
        document.getElementById('ph').textContent = data.ph;
        document.getElementById('oxygen').textContent = data.oxygen + ' mg/L';
        document.getElementById('density').textContent = data.density + '%';
        boatMarker.setLatLng([data.latitude, data.longitude]);
    } catch (err) {
        console.log("使用模拟数据");
        // 模拟数据（部署前可用）
        document.getElementById('temp').textContent = (24 + Math.random() * 6).toFixed(1) + '°C';
        document.getElementById('ph').textContent = (7.0 + (Math.random() - 0.5)).toFixed(1);
        document.getElementById('oxygen').textContent = (5.5 + Math.random() * 2).toFixed(1) + ' mg/L';
        document.getElementById('density').textContent = Math.floor(80 + Math.random() * 20) + '%';
    }
}

// 投喂按钮
document.getElementById('feedButton').addEventListener('click', () => {
    alert('✅ 投喂指令已发送！');
});

// 初始化
window.onload = function () {
    initMap();
    fetchRealTimeData();
    setInterval(fetchRealTimeData, 3000); // 每3秒更新
>>>>>>> a1676df02de70586ab2777f5d3eccab40b66addb
};