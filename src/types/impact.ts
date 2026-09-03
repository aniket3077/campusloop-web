export interface EnvironmentalImpactSummary {
  totalKgCo2Saved: number;
  totalKgWasteDiverted: number;
  totalINRStudentSavings: number;
  totalItemsRecirculated: number;
  equivalentTreesPlanted: number;
  waterSavedLiters: number;
  averageCirculationPerItem: number; // e.g. 3.4x average reuse cycles
}

export interface ImpactByDepartment {
  department: string;
  itemsShared: number;
  co2SavedKg: number;
  wasteDivertedKg: number;
}
