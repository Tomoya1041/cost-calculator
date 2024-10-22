document.addEventListener('DOMContentLoaded', function() {
    // パターン1とパターン2の入力要素を監視
    ['1', '2'].forEach(pattern => {
        const inputs = [
            `commission${pattern}`,
            `exchangeRate${pattern}`,
            `shippingRate${pattern}`,
            `chinesePrice${pattern}`,
            `weight${pattern}`,
            `expenses${pattern}`
        ];

        inputs.forEach(inputId => {
            document.getElementById(inputId).addEventListener('input', () => calculateCost(pattern));
        });
    });

    // 原価計算関数
    function calculateCost(pattern) {
        const commission = parseFloat(document.getElementById(`commission${pattern}`).value) || 0;
        const exchangeRate = parseFloat(document.getElementById(`exchangeRate${pattern}`).value) || 0;
        const shippingRate = parseFloat(document.getElementById(`shippingRate${pattern}`).value) || 0;
        const chinesePrice = parseFloat(document.getElementById(`chinesePrice${pattern}`).value) || 0;
        const weight = parseFloat(document.getElementById(`weight${pattern}`).value) || 0;
        const expenses = parseFloat(document.getElementById(`expenses${pattern}`).value) || 0;

        // 修正後の計算式：
        // (中国価格*(1+代行手数料)+1+重量/1000*発送レート)*通貨レート*1.1+経費
        const cost = (
            chinesePrice * (1 + commission) + 1 + 
            (weight / 1000 * shippingRate)
        ) * exchangeRate * 1.1 + expenses;

        // 結果を表示（小数点以下を四捨五入）
        document.getElementById(`result${pattern}`).textContent = Math.round(cost);
    }

    // 初期計算
    calculateCost('1');
    calculateCost('2');
});
