import { Badge, Card, SimpleGrid, Stack, Stat, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useMobxStore } from '../../../stores';

function calculatePercentageIncrease(
  oldValue: number,
  newValue: number
): number {
  if (oldValue === 0) {
    throw new Error('Исходное значение не может быть нулевым');
  }
  return ((newValue - oldValue) / oldValue) * 100;
}

export const Totals: FC = observer(() => {
  const { euroDollarStore } = useMobxStore();
  // const { colorMode } = useColorMode();

  const currentTotal = euroDollarStore.getTotalOutcome();
  const lastTotal = euroDollarStore.getTotalOutcome(
    euroDollarStore.safeLastMonthDiff
  );
  const income = euroDollarStore.totalIncome;

  return (
    <Card.Root>
      <Card.Header>
        <Text fontSize='2xl'>Итоги</Text>
      </Card.Header>
      <Card.Body>
        <Stack>
          {/*<Sausage percentage={(currentTotal / income) * 100} height={8}>*/}
          {/*  <Text*/}
          {/*    className={cn(styles.suffix, styles.suffix__center)}*/}
          {/*    fontSize='2xl'*/}
          {/*    color={colorMode === 'dark' ? 'white' : 'black'}*/}
          {/*  >{`${currentTotal.toLocaleString()} / ${income.toLocaleString()}`}</Text>*/}
          {/*</Sausage>*/}
          {/*<Sausage percentage={(currentTotal / income) * 100} height={8}>*/}
          {/*  <Text*/}
          {/*    className={cn(styles.suffix, styles.suffix__center)}*/}
          {/*    fontSize='2xl'*/}
          {/*    color={colorMode === 'dark' ? 'white' : 'black'}*/}
          {/*  >*/}
          {/*    {euroDollarStore.podushka.toLocaleString()} /{' '}*/}
          {/*    {euroDollarStore.podushkaTarget.toLocaleString()}*/}
          {/*  </Text>*/}
          {/*</Sausage>*/}
          <SimpleGrid minChildWidth='40' gap={6}>
            {/* Остаток денег за месяц */}
            <Stat.Root>
              <Stat.Label>Потрачено</Stat.Label>
              <Stat.ValueText>
                {`${currentTotal.toLocaleString()} / ${income.toLocaleString()}`}
              </Stat.ValueText>
              <Badge
                colorPalette={lastTotal < currentTotal ? 'red' : 'green'}
                variant='plain'
                px='0'
              >
                {lastTotal > currentTotal ? (
                  <Stat.DownIndicator color='lightgreen' />
                ) : (
                  <Stat.UpIndicator color='red' />
                )}
                {calculatePercentageIncrease(
                  lastTotal,
                  currentTotal
                ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                %
              </Badge>
            </Stat.Root>
            {/* Остаток денег за месяц */}
            <Stat.Root>
              <Stat.Label>Остаток</Stat.Label>
              <Stat.ValueText>
                {(income - currentTotal).toLocaleString()}
              </Stat.ValueText>
              <Badge
                colorPalette={
                  income - lastTotal > income - currentTotal ? 'red' : 'green'
                }
                variant='plain'
                px='0'
              >
                {income - lastTotal > income - currentTotal ? (
                  <Stat.DownIndicator />
                ) : (
                  <Stat.UpIndicator color='lightgreen' />
                )}
                {calculatePercentageIncrease(
                  income - lastTotal,
                  income - currentTotal
                ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                %
              </Badge>
            </Stat.Root>
            {/* Траты в не обязательный категориях */}
            <Stat.Root>
              <Stat.Label>Не обязательные</Stat.Label>
              <Stat.ValueText>
                {euroDollarStore.getRequiredOutcome().toLocaleString()}
              </Stat.ValueText>
              <Badge
                colorPalette={
                  euroDollarStore.getRequiredOutcome(
                    euroDollarStore.safeLastMonthDiff
                  ) <
                  euroDollarStore.getRequiredOutcome(euroDollarStore.safeDiff)
                    ? 'red'
                    : 'green'
                }
                variant='plain'
                px='0'
              >
                {euroDollarStore.getRequiredOutcome(
                  euroDollarStore.safeLastMonthDiff
                ) >
                euroDollarStore.getRequiredOutcome(euroDollarStore.safeDiff) ? (
                  <Stat.DownIndicator color='lightgreen' />
                ) : (
                  <Stat.UpIndicator color='red' />
                )}
                {calculatePercentageIncrease(
                  euroDollarStore.getRequiredOutcome(
                    euroDollarStore.safeLastMonthDiff
                  ),
                  euroDollarStore.getRequiredOutcome(euroDollarStore.safeDiff)
                ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                %
              </Badge>
            </Stat.Root>
            {/* Остаток денег за месяц */}
            <Stat.Root>
              <Stat.Label>Остаток по плану</Stat.Label>
              <Stat.ValueText>
                {(
                  income -
                  euroDollarStore.planItems.reduce(
                    (prev, curr) => prev + curr.plane,
                    0
                  )
                ).toLocaleString()}
              </Stat.ValueText>
            </Stat.Root>
            {/* Внеплана */}
            <Stat.Root>
              <Stat.Label>Внеплана</Stat.Label>
              <Stat.ValueText>
                {
                  euroDollarStore.planItems.filter(
                    (plan) => plan.spent > plan.plane
                  ).length
                }{' '}
                / {euroDollarStore.planItems.length}
              </Stat.ValueText>
              <Stat.HelpText>
                {euroDollarStore.planItems
                  .filter((plan) => plan.spent > plan.plane)
                  .reduce((prev, curr) => prev - (curr.plane - curr.spent), 0)
                  ?.toLocaleString() || ''}
              </Stat.HelpText>
            </Stat.Root>{' '}
            {/* Мотоцикл */}
            <Stat.Root>
              <Stat.Label>Мотоцикл</Stat.Label>
              <Stat.ValueText>
                {euroDollarStore.podushka.toLocaleString()} /{' '}
                {euroDollarStore.podushkaTarget.toLocaleString()}
              </Stat.ValueText>
              {euroDollarStore.podushkaIncome && (
                <Badge
                  colorPalette={
                    euroDollarStore.podushkaIncome < 0 ? 'red' : 'green'
                  }
                  variant='plain'
                  px='0'
                >
                  {euroDollarStore.podushkaIncome < 0 ? (
                    <Stat.DownIndicator />
                  ) : (
                    <Stat.UpIndicator />
                  )}
                  {euroDollarStore.podushkaIncome.toLocaleString()}
                </Badge>
              )}
            </Stat.Root>
          </SimpleGrid>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
});
