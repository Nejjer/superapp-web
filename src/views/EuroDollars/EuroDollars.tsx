import { Stack, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { useColorMode } from '../../components/ui/color-mode';
import { useMobxStore } from '../../stores';
import { Drawer } from './Drawer';
import { Sausage } from './Sausage';
import styles from './style.module.scss';

export const EuroDollars = observer(() => {
  const { euroDollarStore } = useMobxStore();
  const { colorMode } = useColorMode();

  return (
    <div>
      <Drawer />
      <Stack gap={4}>
        {euroDollarStore.planItems.map(({ spent, tag }) => (
          <Sausage percentage={(spent / 10000) * 100} key={tag.id}>
            <div className={styles.suffix}>
              <Text color={colorMode === 'dark' ? 'white' : 'black'}>
                {tag.title}
              </Text>
              <Stack>
                <Text color={colorMode === 'dark' ? 'white' : 'black'}>
                  {spent}
                </Text>
              </Stack>
            </div>{' '}
          </Sausage>
        ))}
      </Stack>
    </div>
  );
});
