function calculateChargeableWeight() {
    let length = parseFloat(document.getElementById("length").value);
    let width = parseFloat(document.getElementById("width").value);
    let height = parseFloat(document.getElementById("height").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let freightType = document.getElementById("freightType").value;

    if (isNaN(length) || isNaN(width) || isNaN(height) || isNaN(weight)) {
        alert("Please enter valid numerical values.");
        return;
    }

    // Calculate CBM (Cubic Meter)
    let cbm = length * width * height;
    document.getElementById("cbmOutput").textContent = cbm.toFixed(2);

    let chargeableWeight = 0;
    let volumetricWeight = 0;
    let breakdownText = "";

    if (freightType === "air") {
        // Air Freight Calculation (Volumetric Weight)
        volumetricWeight = (length * 100) * (width * 100) * (height * 100) / 6000; 
        chargeableWeight = Math.max(volumetricWeight, weight);

        breakdownText += `Air Freight Calculation:\n`;
        breakdownText += `Volumetric Weight = (Length x Width x Height) ÷ 6000\n`;
        breakdownText += `= (${(length * 100).toFixed(2)} cm × ${(width * 100).toFixed(2)} cm × ${(height * 100).toFixed(2)} cm) ÷ 6000\n`;
        breakdownText += `= ${volumetricWeight.toFixed(2)} kg\n\n`;
        breakdownText += `Chargeable Weight = Max(Actual Weight, Volumetric Weight)\n`;
        breakdownText += `= Max(${weight} kg, ${volumetricWeight.toFixed(2)} kg) = ${chargeableWeight.toFixed(2)} kg`;
    } else {
        // LCL (Sea Freight) Calculation
        chargeableWeight = Math.max(cbm, weight / 1000);
        breakdownText += `LCL (Sea Freight) Calculation:\n`;
        breakdownText += `CBM = Length × Width × Height\n`;
        breakdownText += `= ${length.toFixed(2)} m × ${width.toFixed(2)} m × ${height.toFixed(2)} m\n`;
        breakdownText += `= ${cbm.toFixed(2)} CBM\n\n`;
        breakdownText += `Chargeable Weight = Max(CBM, Weight in Metric Tons)\n`;
        breakdownText += `= Max(${cbm.toFixed(2)} CBM, ${(weight / 1000).toFixed(2)} tons)\n`;
        breakdownText += `= ${chargeableWeight.toFixed(2)} CBM/tons`;
    }

    document.getElementById("volWeightOutput").textContent = freightType === "air" ? volumetricWeight.toFixed(2) : "N/A";
    document.getElementById("chargeableWeight").textContent = chargeableWeight.toFixed(2);
    document.getElementById("calculationBreakdown").textContent = breakdownText;
}
