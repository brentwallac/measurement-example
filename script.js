function calculateChargeableWeight() {
    let length = parseFloat(document.getElementById("length").value) / 100; // Convert cm to meters
    let width = parseFloat(document.getElementById("width").value) / 100;
    let height = parseFloat(document.getElementById("height").value) / 100;
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

    if (freightType === "air") {
        // Air Freight Calculation (Volumetric Weight)
        volumetricWeight = (length * 100) * (width * 100) * (height * 100) / 6000; 
        chargeableWeight = Math.max(volumetricWeight, weight);
        document.getElementById("volWeightOutput").textContent = volumetricWeight.toFixed(2);
    } else {
        // LCL (Sea Freight) Calculation (Compare CBM vs. Metric Tons)
        chargeableWeight = Math.max(cbm, weight / 1000);
        document.getElementById("volWeightOutput").textContent = "N/A";
    }

    document.getElementById("chargeableWeight").textContent = chargeableWeight.toFixed(2);
}
