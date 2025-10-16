import {
  Button,
  Center,
  CloseButton,
  Container,
  Dialog,
  Field,
  Portal,
  SegmentGroup,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

import { axiosInstance } from '../../api/axiosInstance';
import { Card } from '../../components/Card';
import { toaster } from '../../components/ui/toaster';

interface ICheerUp {
  title: string;
  desc: string;
}

interface IResponse {
  productivity: string;
  done_tasks: string[];
  satisfaction: string;
}

const cheerUpTexts: ICheerUp[] = [
  {
    title: '🎀 Готово!',
    desc: `Ты умничка ✨
С каждым шагом становишься лучше 🌱`,
  },
  {
    title: '💌 Записано~',
    desc: `Спасибо, что заботишься о себе 💖
Ты заслуживаешь всего самого светлого 🌸`,
  },
  {
    title: '🐾 Шажок сделан!',
    desc: `Ты сделал шаг вперед 🚀
С каждым днем становишься ближе к цели 🌟`,
  },
  {
    title: '✏️ Миссия выполнена!',
    desc: `Записал — значит, стал сильнее 💪
Ты на правильном пути, котик 🐱`,
  },
  {
    title: '📚 Ретроспектива готова!',
    desc: `Ты заботишься о себе, и это так важно 💫
Обними себя мысленно — ты классный! 🫂💜`,
  },
];

export const RetroWeek: FC = () => {
  const [productivity, setProductivity] = useState<string | null>(
    'Удовлетворительно'
  );
  const [done_tasks, setDone_tasks] = useState('');
  const [loading, setLoading] = useState(false);
  const [satisfaction, setSatisfaction] = useState<string | null>(
    'Удовлетворительно'
  );
  const [cheerUpText, setCheerUpText] = useState<ICheerUp>(cheerUpTexts[0]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    axiosInstance
      .get<IResponse>('/api/get-retro')
      .then((response) => {
        const { productivity, done_tasks, satisfaction } = response.data;
        setProductivity(productivity);
        setDone_tasks(done_tasks.join('\n'));
        setSatisfaction(satisfaction);
      })
      .catch((error) => {
        console.error('Ошибка при получении данных RetroWeek:', error);
        toaster.create({
          description: 'Пока нет записи на эту неделю',
          type: 'info',
        });
      });
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axiosInstance.post('/api/add-retro', {
        productivity,
        done_tasks,
        satisfaction,
      });
      setCheerUpText(
        cheerUpTexts[Math.floor(Math.random() * cheerUpTexts.length)]
      );
      setDialogOpen(true);
    } catch (error) {
      toaster.create({
        description: 'Чет не получилось',
        type: 'info',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container paddingTop='20vh'>
      <Center>
        <Card radius='12px' header='Ретро недели'>
          <form>
            <Stack gap='24px'>
              <Field.Root required>
                <Field.Label>Производительность</Field.Label>
                <SegmentGroup.Root
                  defaultValue='Удовлетворительно'
                  value={productivity}
                  onValueChange={(value) => setProductivity(value.value)}
                >
                  <SegmentGroup.Indicator />
                  <SegmentGroup.Items
                    items={['Плохо', 'Удовлетворительно', 'Хорошо']}
                  />
                </SegmentGroup.Root>
              </Field.Root>

              <Field.Root required>
                <Field.Label>Удовлетворение</Field.Label>
                <SegmentGroup.Root
                  defaultValue='Удовлетворительно'
                  value={satisfaction}
                  onValueChange={(value) => setSatisfaction(value.value)}
                >
                  <SegmentGroup.Indicator />
                  <SegmentGroup.Items
                    items={['Плохо', 'Удовлетворительно', 'Хорошо']}
                  />
                </SegmentGroup.Root>
              </Field.Root>

              <Field.Root required>
                <Field.Label>Что случилось за неделю?</Field.Label>
                <Textarea
                  value={done_tasks}
                  onChange={(e) => setDone_tasks(e.target.value)}
                  placeholder='через перенос'
                />
              </Field.Root>
              <Button
                loading={loading}
                onClick={handleSubmit}
                disabled={!done_tasks}
              >
                Отправить
              </Button>
            </Stack>
          </form>
        </Card>
        <Dialog.Root
          open={dialogOpen}
          onOpenChange={(val) => setDialogOpen(val.open)}
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>{cheerUpText.title}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <p>{cheerUpText.desc}</p>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button>Закрыть</Button>
                  </Dialog.ActionTrigger>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size='sm' />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </Center>
    </Container>
  );
};
