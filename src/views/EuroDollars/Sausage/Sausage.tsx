import { FC } from 'react';
import styles from './style.module.scss';
import { Progress, Text } from '@chakra-ui/react';
import { useColorMode } from '../../../components/ui/color-mode';

/** Сосиска
 * @property text Текст внутри сосиски
 * @property suffix Единица измерения
 * @property percentage Процент заполненности
 */
interface Props {
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

  const { colorMode } = useColorMode();

  return (
    <div>
      <Progress.Root shape={'rounded'} size={'lg'} value={percentage}>

        <Progress.Track height={'30px'} borderRadius={'10px'} colorPalette={getColor(percentage)}>
          <Progress.Range />

          <div className={styles.suffix}>
            <Text color={colorMode === 'dark' ? 'white' : 'black'}>
              {text}
            </Text>
            <Text color={colorMode === 'dark' ? 'white' : 'black'}>
              {suffix}
            </Text>
          </div>
        </Progress.Track>
      </Progress.Root>
    </div >
  );
};
