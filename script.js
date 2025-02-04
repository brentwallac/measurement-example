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

    let cbm = length * width * height;
    document.getElementById("cbmOutput").textContent = cbm.toFixed(2);

    let chargeableWeight = 0;
    let buyRate = 0;
    let breakdownText = "";

    if (freightType === "air") {
        let volumetricWeight = (length * 100) * (width * 100) * (height * 100) / 6000;
        chargeableWeight = Math.max(volumetricWeight, weight);
        breakdownText += `Chargeable Weight Calculation (Air Freight):\n`;
        breakdownText += `Formula: Max(Volumetric Weight, Actual Weight)\n`;
        breakdownText += `= Max(${volumetricWeight.toFixed(2)} kg, ${weight} kg)\n\n`;
    } else {
        chargeableWeight = Math.max(cbm, weight / 1000);
        breakdownText += `Chargeable Weight Calculation (LCL):\n`;
        breakdownText += `Formula: Max(CBM, Weight in Metric Tons)\n`;
        breakdownText += `= Max(${cbm.toFixed(2)} CBM, ${(weight / 1000).toFixed(2)} tons)\n\n`;
    }

    switch (chargeMeasurement) {
        case "W/M":
            buyRate = Math.max(weight / 1000, cbm) * marginRate;
            breakdownText += `Buy Rate Calculation (W/M):\n`;
            breakdownText += `Formula: Max(Weight in Metric Tons, CBM) × Margin Rate\n`;
            breakdownText += `= Max(${(weight / 1000).toFixed(2)} tons, ${cbm.toFixed(2)} CBM) × $${marginRate}\n`;
            breakdownText += `= $${buyRate.toFixed(2)}\n`;
            break;
        case "M":
            buyRate = cbm * marginRate;
            breakdownText += `Buy Rate Calculation (M):\n`;
            breakdownText += `Formula: CBM × Margin Rate\n`;
            breakdownText += `= ${cbm.toFixed(2)} × $${marginRate}\n`;
            breakdownText += `= $${buyRate.toFixed(2)}\n`;
            break;
        default:
            buyRate = chargeableWeight * marginRate;
            breakdownText += `Buy Rate Calculation (Default):\n`;
            breakdownText += `Formula: Chargeable Weight × Margin Rate\n`;
            breakdownText += `= ${chargeableWeight.toFixed(2)} × $${marginRate}\n`;
            breakdownText += `= $${buyRate.toFixed(2)}\n`;
            break;
    }

    document.getElementById("chargeableWeight").textContent = chargeableWeight.toFixed(2);
    document.getElementById("buyRate").textContent = `$${buyRate.toFixed(2)}`;
    document.getElementById("calculationBreakdown").textContent = breakdownText;
}