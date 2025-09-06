import {
  Card,
  Collapsible,
  Container,
  HStack,
  IconButton,
  Input,
  Stack,
  Status,
  Text,
} from '@chakra-ui/react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';
import { RxCircle, RxCrosshair1, RxCrumpledPaper } from 'react-icons/rx';

import { Loader } from '../../components/Loader';
import { useColorMode } from '../../components/ui/color-mode';
import { useMobxStore } from '../../stores';
import { TRenderPlanItem } from '../../stores/EuroDollarStore';
import { getSpendStatus } from '../../utils/getSpendStatus';
import { Drawer } from './Drawer';
import { Sausage } from './Sausage';
import styles from './style.module.scss';
import { Totals } from './Totals';

const ElementPlan: FC<TRenderPlanItem> = ({ spent, tag, plane }) => {
  const { colorMode } = useColorMode();
  const { euroDollarStore } = useMobxStore();
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputVal, setInputVal] = useState<string>(plane.toString());
  const inputRef = useRef<HTMLInputElement | null>();
  const textRef = useRef<HTMLParagraphElement | null>();
  const handleTextClick = () => {
    setIsInputActive(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  const handleBlur = () => {
    inputRef.current?.blur();
    setIsInputActive(false);
    euroDollarStore.setPlanByTagId(tag.id, +inputVal);
  };

  const width = '70px';

  return (
    <div className={styles.suffix}>
      <HStack
        className={styles.controlPanel}
        color={colorMode === 'dark' ? 'white' : 'black'}
      >
        <Text className={styles.controlPanel_text}>{tag.title}</Text>
        <HStack className={styles.controlPanel_btns} colorPalette='gray'>
          <IconButton
            onClick={() =>
              euroDollarStore.setCategoryByTagId(tag.id, 'necessary')
            }
          >
            <RxCircle />
          </IconButton>
          <IconButton
            onClick={() =>
              euroDollarStore.setCategoryByTagId(tag.id, 'optional')
            }
          >
            <RxCrosshair1 />
          </IconButton>
          <IconButton
            onClick={() =>
              euroDollarStore.setCategoryByTagId(tag.id, 'archive')
            }
          >
            <RxCrumpledPaper />
          </IconButton>
        </HStack>
      </HStack>
      <HStack>
        <Text color={colorMode === 'dark' ? 'white' : 'black'}>
          {spent.toLocaleString()}
        </Text>
        <div
          className={cn(
            styles.planContainer,
            isInputActive && styles.planContainer__disableHover
          )}
          onClick={handleTextClick}
          style={{ width }}
        >
          <Status.Root position='absolute' top='18px' left='-2px'>
            <Status.Indicator colorPalette={getSpendStatus(spent, plane)} />
          </Status.Root>
          {isInputActive ? (
            <Input
              variant='subtle'
              color={colorMode === 'dark' ? 'white' : 'black'}
              ref={(ins) => (inputRef.current = ins)}
              onBlur={handleBlur}
              inputMode='numeric'
              width={width}
              value={inputVal}
              onChange={(event) => setInputVal(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && handleBlur()}
            />
          ) : (
            <Text
              color={colorMode === 'dark' ? 'white' : 'black'}
              ref={(ins) => (textRef.current = ins)}
              whiteSpace='pre'
            >
              {plane.toLocaleString()}
            </Text>
          )}
        </div>
      </HStack>
    </div>
  );
};

export const EuroDollars = observer(() => {
  const { euroDollarStore } = useMobxStore();
  const timeoutId = useRef<number>();

  useEffect(() => {
    handleSetTimeout();
    return () => {
      clearTimeout(timeoutId.current);
    };
  }, []);

  const handleSetTimeout = () => {
    timeoutId.current = window.setTimeout(
      () => {
        euroDollarStore.update().then(() => {
          handleSetTimeout();
        });
      },
      5 * 60 * 1000
    );
  };

  if (!euroDollarStore.loaded) {
    return <Loader />;
  }

  return (
    <Container marginTop={8}>
      <Drawer />
      <Stack gap={8}>
        <Totals />
        <Card.Root>
          <Card.Header>
            <HStack justify='space-between'>
              <Text fontSize='2xl'>Обязательные</Text>
              <Text fontSize='2xl'>
                {euroDollarStore.planItems
                  .filter((plan) => plan.category === 'necessary')
                  .reduce((prev, curr) => prev + curr.spent, 0)
                  .toLocaleString()}{' '}
                /{' '}
                {euroDollarStore.planItems
                  .filter((plan) => plan.category === 'necessary')
                  .reduce((prev, curr) => prev + curr.plane, 0)
                  .toLocaleString()}
              </Text>
            </HStack>
          </Card.Header>
          <Card.Body>
            <Stack gap={4}>
              {euroDollarStore.planItems
                .filter((plan) => plan.category === 'necessary')
                .sort((a, b) => b.spent - a.spent)
                .map(({ spent, tag, plane, category }) => (
                  <Sausage percentage={(spent / plane) * 100} key={tag.id}>
                    <ElementPlan
                      tag={tag}
                      spent={spent}
                      plane={plane}
                      category={category}
                    />
                  </Sausage>
                ))}
            </Stack>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <HStack justify='space-between'>
              <Text fontSize='2xl'>Необязательные</Text>
              <Text fontSize='2xl'>
                {euroDollarStore.planItems
                  .filter((plan) => plan.category === 'optional')
                  .reduce((prev, curr) => prev + curr.spent, 0)
                  .toLocaleString()}{' '}
                /{' '}
                {euroDollarStore.planItems
                  .filter((plan) => plan.category === 'optional')
                  .reduce((prev, curr) => prev + curr.plane, 0)
                  .toLocaleString()}
              </Text>
            </HStack>
          </Card.Header>
          <Card.Body>
            <Stack gap={4}>
              {euroDollarStore.planItems
                .filter((plan) => plan.category === 'optional')
                .sort((a, b) => b.spent - a.spent)
                .map(({ spent, tag, plane, category }) => (
                  <Sausage percentage={(spent / plane) * 100} key={tag.id}>
                    <ElementPlan
                      tag={tag}
                      spent={spent}
                      plane={plane}
                      category={category}
                    />
                  </Sausage>
                ))}
            </Stack>
          </Card.Body>
        </Card.Root>

        <Collapsible.Root>
          <Card.Root>
            <Card.Header>
              <Collapsible.Trigger asChild>
                <HStack justify='space-between'>
                  <Text fontSize='2xl'>Архив</Text>
                  <Text fontSize='2xl'>
                    {euroDollarStore.planItems
                      .filter((plan) => plan.category === 'archive')
                      .reduce((prev, curr) => prev + curr.spent, 0)
                      .toLocaleString()}{' '}
                    /{' '}
                    {euroDollarStore.planItems
                      .filter((plan) => plan.category === 'archive')
                      .reduce((prev, curr) => prev + curr.plane, 0)
                      .toLocaleString()}
                  </Text>
                </HStack>
              </Collapsible.Trigger>
            </Card.Header>
            <Card.Body>
              <Collapsible.Content>
                <Stack gap={4}>
                  {euroDollarStore.planItems
                    .filter((plan) => plan.category === 'archive')
                    .sort((a, b) => b.spent - a.spent)
                    .map(({ spent, tag, plane, category }) => (
                      <Sausage
                        percentage={
                          spent == 0 && spent == 0 ? 0 : (spent / plane) * 100
                        }
                        key={tag.id}
                      >
                        <ElementPlan
                          tag={tag}
                          spent={spent}
                          plane={plane}
                          category={category}
                        />
                      </Sausage>
                    ))}
                </Stack>
              </Collapsible.Content>
            </Card.Body>
          </Card.Root>
        </Collapsible.Root>
      </Stack>
    </Container>
  );
});
