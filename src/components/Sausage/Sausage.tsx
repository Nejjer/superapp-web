import { FC } from 'react';
import styles from './style.module.scss';
import { Progress, Status, Text } from '@chakra-ui/react';

interface Props {
  icon: string;
  text: string;
  suffix: string;
  percentage: number;
}

const getColor = (percentage: number): string => {
  if (percentage >= 75) return 'red';
  else if (percentage >= 50) return 'yellow';
  else return 'green';
};

export const Sausage: FC<Props> = ({ percentage, text, suffix }) => {
  return (
    <div>
      <Progress.Root shape={'rounded'} size={'lg'} value={percentage}>
        <Progress.Label mb="2">
          {text}
        </Progress.Label>
        <Progress.Track height={'30px'} borderRadius={'10px'}>
          <Progress.Range />
          <div className={styles.suffix}>
            <Status.Root colorPalette={getColor(percentage)}>
              <Status.Indicator />
              <Text color={percentage < 15 ? 'white' : 'black'}>
                {suffix}
              </Text>
            </Status.Root>
          </div>
        </Progress.Track>
      </Progress.Root>
    </div>
  );
};
