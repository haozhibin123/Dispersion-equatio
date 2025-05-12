function calculate() {
    // 获取输入值
    const T = parseFloat(document.getElementById('period').value);
    const h = parseFloat(document.getElementById('depth').value);
    const g = parseFloat(document.getElementById('gravity').value) || 9.81;

    // 输入验证
    if ([T, h].some(v => v <= 0 || isNaN(v))) {
        showError("请输入有效的正数！");
        return;
    }

    // 色散方程求解（牛顿迭代法）
    const omega = 2 * Math.PI / T;  // 角频率
    let k = Math.pow(omega, 2) / g; // 初始猜测（深水近似）
    let iterations = 0;
    let tolerance = 1e-6;

    for (let i = 0; i < 50; i++) {
        const f = omega**2 - g * k * Math.tanh(k * h);
        const df = -g * (Math.tanh(k * h) + g * k * h * (1 - Math.tanh(k * h)**2);
        const delta = f / df;
        
        k -= delta;
        if (Math.abs(delta) < tolerance) break;
    }

    // 计算波长
    const L = (2 * Math.PI) / k;

    // 显示结果
    document.getElementById('result').innerHTML = `
        <h3>计算结果</h3>
        <p>波长 L = ${L.toFixed(2)} 米</p>
    `;
}

function showError(message) {
    document.getElementById('result').innerHTML = `
        <div class="error">${message}</div>
    `;
}