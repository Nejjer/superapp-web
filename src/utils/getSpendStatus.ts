export function getSpendStatus(spent: number, limit: number): string {
  if (limit <= 0) return 'green'; // если лимита нет, всё ок

  const plannedRatio = new Date().getDate() / 30; // сколько % месяца прошло
  const actualRatio = spent / limit; // сколько % лимита потрачено

  // допустимый разброс, чтобы не жёстко рубить
  const tolerance = 0.1;

  if (actualRatio <= plannedRatio * (1 - tolerance)) {
    return 'green'; // тратишь медленнее, чем месяц идёт
  } else if (actualRatio <= plannedRatio * (1 + tolerance)) {
    return 'yellow'; // тратишь примерно по графику
  } else {
    return 'red'; // тратишь быстрее, чем идёт месяц
  }
}
