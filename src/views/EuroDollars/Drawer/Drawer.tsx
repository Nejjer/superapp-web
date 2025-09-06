import {
  Button,
  Drawer as ChakraDrawer,
  Field,
  Input,
  Portal,
  Separator,
  Stack,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

import { toaster } from '../../../components/ui/toaster';
import { useMobxStore } from '../../../stores';
import { getZMToken, setZMToken } from '../../../utils/ZMToken';
import styles from './styles.module.scss';

export const Drawer: FC = observer(() => {
  const { euroDollarStore } = useMobxStore();

  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(getZMToken());
  const [target, setTarget] = useState(euroDollarStore.podushkaTarget);

  const handleClickSave = () => {
    setZMToken(token);
    euroDollarStore.setPodushkaTarget(target);
    toaster.create({
      description: 'Сохранено!',
      type: 'success',
    });
    setOpen(false);
  };

  return (
    <ChakraDrawer.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement='start'
    >
      <ChakraDrawer.Trigger asChild>
        <Button variant='subtle' className={styles.btn}>
          Настройки
        </Button>
      </ChakraDrawer.Trigger>
      <Portal>
        <ChakraDrawer.Backdrop />
        <ChakraDrawer.Positioner>
          <ChakraDrawer.Content>
            <ChakraDrawer.Body>
              <Stack justifyContent='end' height='100%'>
                <Field.Root>
                  <Field.Label>Токен</Field.Label>
                  <Input
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Сумма цели</Field.Label>
                  <Input
                    value={target}
                    onChange={(e) => setTarget(+e.target.value)}
                    inputMode='numeric'
                  />
                </Field.Root>
                <Separator />
                <Button variant='subtle' onClick={handleClickSave}>
                  Сохранить
                </Button>
              </Stack>
            </ChakraDrawer.Body>
          </ChakraDrawer.Content>
        </ChakraDrawer.Positioner>
      </Portal>
    </ChakraDrawer.Root>
  );
});
