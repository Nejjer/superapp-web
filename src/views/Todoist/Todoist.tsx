import {
  Card,
  CardHeader,
  Center,
  Container,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';

import { CheckboxCard } from '../../components/ui/checkbox-card.tsx';
import { useMobxStore } from '../../stores';

export const TodoistCard = observer(() => {
  const { todoistStore } = useMobxStore();
  const timeoutId = useRef<number>();

  useEffect(() => {
    todoistStore.loadActive();
  }, []);

  useEffect(() => {
    handleSetTimeout();
    return () => {
      clearTimeout(timeoutId.current);
    };
  }, []);

  const handleSetTimeout = () => {
    timeoutId.current = window.setTimeout(() => {
      todoistStore.loadActive(true).then(() => {
        handleSetTimeout();
      });
    }, 60 * 1000);
  };

  const renderOther = () => {
    if (todoistStore.loading) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }

    if (todoistStore.error) {
      return <Text color='red.500'>Ошибка: {todoistStore.error}</Text>;
    }
  };

  return (
    <Container marginTop={4}>
      <Card.Root>
        <CardHeader>
          <Text fontSize='2xl'>Задачи</Text>
        </CardHeader>

        <Card.Body>
          {renderOther() ?? (
            <VStack align='stretch' gap={3}>
              {todoistStore.tasks.map((task) => (
                <CheckboxCard
                  description={task.description}
                  label={task.content}
                  key={task.id}
                  checked={task.checked ?? false}
                  onCheckedChange={() => todoistStore.completeTask(task.id)}
                />
              ))}
              {todoistStore.tasks.length === 0 && (
                <Text color='gray.500'>Нет активных задач</Text>
              )}
            </VStack>
          )}
        </Card.Body>
      </Card.Root>
    </Container>
  );
});
