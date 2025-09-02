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
};