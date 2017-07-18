// calculates time until sober after drinking more alcohol
addToBac = (gramsAlc, limit, initialTimeMs, bodyWeightKg, genderConstant) => {
    const extraBac = bacFromAlc(gramsAlc, bodyWeightKg, genderConstant);
    const extraTimeMs = timeTillBac(extraBac, limit);
    const newTimeAtMs = initialTimeMs + extraTimeMs;
    return newTimeAtMs;
}

export default addToBac;
