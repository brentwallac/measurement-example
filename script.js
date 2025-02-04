function calculateChargeableWeight() {
    let length = parseFloat(document.getElementById("length").value);
    let width = parseFloat(document.getElementById("width").value);
    let height = parseFloat(document.getElementById("height").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let freightType = document.getElementById("freightType").value;
    let chargeMeasurement = document.getElementById("chargeMeasurement").value;
    let marginRate = parseFloat(document.getElementById("marginRate").value);

    if (isNaN(length) || isNaN(width) || isNaN(height) || isNaN(weight) || isNaN(marginRate)) {
        alert("Please enter valid numerical values.");
        return;
    }

    // Calculate CBM
    let cbm = length * width * height;
    document.getElementById("cbmOutput").textContent = cbm.toFixed(2);

    let chargeableWeight = 0;
    let volumetricWeight = 0;
    let buyRate = 0;
    let breakdownText = "";

    if (freightType === "air") {
        volumetricWeight = (length * 100) * (width * 100) * (height * 100) / 6000; 
        chargeableWeight = Math.max(volumetricWeight, weight);
    } else {
        chargeableWeight = Math.max(cbm, weight / 1000);
    }

    // Buy rate calculations based on charge measurement type
    switch (chargeMeasurement) {
        case "100LBS":
            buyRate = (weight / 45.36) * marginRate; 
            breakdownText = `Buy Rate: (Total weight in kg ÷ 45.36) × Margin Rate`;
            break;
        case "800LBS/M":
            buyRate = (weight / 362.87) * marginRate; 
            breakdownText = `Buy Rate: (Total weight in kg ÷ 362.87) × Margin Rate`;
            break;
        case "CW_1_TO_3":
            buyRate = Math.max(cbm * 333, weight) * marginRate;
            breakdownText = `Buy Rate: Max(CBM × 333, Weight) × Margin Rate`;
            break;
        case "CW_1_TO_6":
            buyRate = Math.max(cbm * 167, weight) * marginRate;
            breakdownText = `Buy Rate: Max(CBM × 167, Weight) × Margin Rate`;
            break;
        case "W/M":
            let wmValue = Math.max(weight / 1000, cbm); 
            buyRate = wmValue * marginRate;
            breakdownText = `Buy Rate: Max(Weight in Metric Tons, CBM) × Margin Rate`;
            break;
        case "M":
            buyRate = cbm * marginRate;
            breakdownText = `Buy Rate: CBM × Margin Rate`;
            break;
    }

    document.getElementById("chargeableWeight").textContent = chargeableWeight.toFixed(2);
    document.getElementById("buyRate").textContent = `$${buyRate.toFixed(2)}`;
    document.getElementById("calculationBreakdown").textContent = breakdownText;
}
