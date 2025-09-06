import { Progress, ProgressTrackProps } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

/** Сосиска
 * @property percentage Процент заполненности
 */
interface Props extends ProgressTrackProps {
  percentage: number;
  children: ReactNode;
  getColor?: typeof getColorDefault;
}

const getColorDefault = (
  percentage: number
): ProgressTrackProps['colorPalette'] => {
  if (percentage >= 75) return 'red';
  else if (percentage >= 50) return 'yellow';
  else return 'green';
  // const value = percentage / 100;
  // const hue = ((1 - value) * 120).toString(10);
  // return ['hsl(', hue, ',100%,50%)'].join('');
};

export const Sausage: FC<Props> = ({
  percentage,
  children,
  getColor = getColorDefault,
  ...props
}) => {
  return (
    <div>
      <Progress.Root shape='rounded' size='lg' value={percentage}>
        <Progress.Track
          height='50px'
          borderRadius='10px'
          colorPalette={getColor(percentage)}
          {...props}
        >
          <Progress.Range />
          {children}{' '}
        </Progress.Track>
      </Progress.Root>
    </div>
  );
};
