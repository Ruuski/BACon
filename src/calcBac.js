const KG_TO_GRMS = 1000;
const MS_TO_HR = 1/3600000;

calcBac = (gramsAlc, bodyWeightKg, genderConstant) => {
  curTime = new Date().getTime();
  bodyWeightGrams = bodyWeightKg * KG_TO_GRMS;
  return ((gramsAlc / (bodyWeightGrams * genderConstant)) * 100);
}

export default calcBac;
