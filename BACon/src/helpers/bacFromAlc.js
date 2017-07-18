import { KG_TO_GRMS, MS_TO_HR } from '../constants';

// returns blood alcohol content based on grams of alcohol immediatly consumed,
// and a person's attributes
bacFromAlc = (gramsAlc, bodyWeightKg, genderConstant) => {
  const bodyWeightGrams = bodyWeightKg * KG_TO_GRMS;
  return ((gramsAlc / (bodyWeightGrams * genderConstant)) * 100);
}

export default bacFromAlc;
