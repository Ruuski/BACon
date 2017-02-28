const KG_TO_GRMS = 1000;
const MS_TO_HR = 1/3600000;
const SAFETY_CONST = 1.02;  // give buffer of 2% to BAC to account for errors

calcBac = (gramsAlc, bodyWeightKg, genderConstant, timeIngested) => {
  curTime = new Date().getTime();
  hrsElapsed = (curTime - timeIngested) * MS_TO_HR;
  bodyWeightGrams = bodyWeightKg * KG_TO_GRMS;
  return ((gramsAlc / (bodyWeightGrams * genderConstant)) * 100)*SAFETY_CONST - (hrsElapsed * 0.015);
}

export default calcBac;
