import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { Button, Flex, Typography } from '@maxhub/max-ui';

import { Card, StateGate } from '@/shared/ui/kit';
import { useMotionControls } from '@/shared/motion/useMotionControls';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useServiceStore } from '@/store/service';
import styles from './BotTab.module.css';

const replies: Record<string, string> = {
  'Статус заявки': 'Заявка №4821 в работе. Мастер свяжется до 18:00.',
  Записаться: 'Свободно 12:30 у Анны. Открыть запись?',
  'Позвать оператора': 'Передаю оператору. Ответит в течение 5 минут.',
};

export function BotTab() {
  useSectionScenario(scenarios['service-bot']);
  const { get, enabled } = useMotionControls();

  const messages = useServiceStore((s) => s.messages);
  const typing = useServiceStore((s) => s.typing);
  const quickReplies = useServiceStore((s) => s.quickReplies);
  const pushMessage = useServiceStore((s) => s.pushMessage);
  const setTyping = useServiceStore((s) => s.setTyping);

  const endRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages, typing]);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const reply = (text: string) => {
    pushMessage('user', text);
    setTyping(true);
    timerRef.current = window.setTimeout(() => {
      setTyping(false);
      pushMessage('bot', replies[text] ?? 'Принял в работу.');
    }, 900);
  };

  return (
    <div className={styles.page}>
      <StateGate emptyTitle="Чат недоступен" emptyText="Бот появится после запуска акции.">
        <Card className={styles.chatCard}>
          <Flex align="center" gap={10} className={styles.header}>
            <span className={styles.avatar}>
              <SparklesIcon className={styles.avatarGlyph} />
            </span>
            <div className={styles.headerBody}>
              <Typography.Title variant="small-strong">Бот бренда</Typography.Title>
              <Typography.Body variant="small" className={styles.status}>
                онлайн · отвечает сразу
              </Typography.Body>
            </div>
          </Flex>

          <div className={styles.messages}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={styles.bubble}
                data-from={message.from}
                {...get('listItem')}
              >
                {message.text}
              </motion.div>
            ))}

            {typing ? (
              <div className={styles.bubble} data-from="bot" data-typing="true">
                {[0, 1, 2].map((index) => (
                  <motion.span
                    key={index}
                    className={styles.dot}
                    animate={enabled ? { opacity: [0.3, 1, 0.3] } : undefined}
                    transition={
                      enabled
                        ? { duration: 0.9, repeat: Infinity, delay: index * 0.15 }
                        : undefined
                    }
                  />
                ))}
              </div>
            ) : null}

            <div ref={endRef} />
          </div>
        </Card>

        <div className={styles.quick}>
          {quickReplies.map((text) => (
            <Button key={text} size="small" mode="secondary" onClick={() => reply(text)}>
              {text}
            </Button>
          ))}
        </div>
      </StateGate>
    </div>
  );
}
