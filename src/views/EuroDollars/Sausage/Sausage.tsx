import { Progress } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

/** Сосиска
 * @property percentage Процент заполненности
 */
interface Props {
  percentage: number;
  children: ReactNode;
}

const getColor = (percentage: number): string => {
  if (percentage >= 75) return 'red';
  else if (percentage >= 50) return 'yellow';
  else return 'green';
};

export const Sausage: FC<Props> = ({ percentage, children }) => {
  return (
    <div>
      <Progress.Root shape={'rounded'} size={'lg'} value={percentage}>
        <Progress.Track
          height={'30px'}
          borderRadius={'10px'}
          colorPalette={getColor(percentage)}
        >
          <Progress.Range />
          {children}
        </Progress.Track>
      </Progress.Root>
    </div>
  );
};
