import { Button, Grid, GridItem, Switch } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useColorMode } from '../ui/color-mode';

export const Drawer: FC = () => {
  const navigation = useNavigate();
  const { toggleColorMode } = useColorMode();

  const [autoSwitch, setAutoSwitch] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setIndex] = useState(0);

  // Маршруты, которые нужно циклично переключать
  const routes = ['/', '/todo', '/retro', '/EuroDollars', '/WLED'];

  const navigateTo = (to: string) => {
    navigation(to);
  };

  // Автопереключение
  useEffect(() => {
    if (!autoSwitch) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % routes.length;
        navigateTo(routes[next]);
        return next;
      });
    }, 20000);

    return () => clearInterval(interval);
  }, [autoSwitch]);

  return (
    <Grid
      templateColumns='repeat(8, 1fr)'
      justifyItems='center'
      marginTop={4}
      alignItems='center'
    >
      <GridItem>
        <Button onClick={toggleColorMode}>Toggle theme</Button>
      </GridItem>

      {/* Galery — не участвует в автопереключении */}
      <GridItem>
        <Button variant='outline' onClick={() => window.location.assign('/')}>
          Galery
        </Button>
      </GridItem>

      <GridItem>
        <Button variant='outline' onClick={() => navigateTo('/')}>
          Compumon
        </Button>
      </GridItem>

      <GridItem>
        <Button variant='outline' onClick={() => navigateTo('/todo')}>
          TODO
        </Button>
      </GridItem>

      <GridItem>
        <Button variant='outline' onClick={() => navigateTo('/retro')}>
          Retro
        </Button>
      </GridItem>

      <GridItem>
        <Button variant='outline' onClick={() => navigateTo('/EuroDollars')}>
          EuroDollars
        </Button>
      </GridItem>

      <GridItem>
        <Button variant='outline' onClick={() => navigateTo('/WLED')}>
          WLED
        </Button>
      </GridItem>

      <GridItem>
        <Switch.Root
          checked={autoSwitch}
          onCheckedChange={(e) => setAutoSwitch(e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>Auto switch</Switch.Label>
        </Switch.Root>
      </GridItem>
    </Grid>
  );
};
