export default function switchValue<T>(
    caseValue: string, conditions: {default: T, [key:string]: T},
  ) {
    return (caseValue in conditions) ? conditions[caseValue] : conditions.default;
  }
  