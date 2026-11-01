import { motion } from 'motion/react';
import { DocumentArrowDownIcon, InboxIcon } from '@heroicons/react/24/outline';
import { Flex, Typography } from '@maxhub/max-ui';

import { Card, Chip, Section, StateGate } from '@/shared/ui/kit';
import { useMotionControls } from '@/shared/motion/useMotionControls';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useServiceStore, type RequestStatus } from '@/store/service';
import styles from './RequestsTab.module.css';

const statusMeta: Record<RequestStatus, { label: string; tone: 'muted' | 'accent' | 'success' }> = {
  new: { label: 'Принята', tone: 'muted' },
  progress: { label: 'В работе', tone: 'accent' },
  done: { label: 'Готова', tone: 'success' },
};

const steps: RequestStatus[] = ['new', 'progress', 'done'];
const stepLabels = ['Принята', 'В работе', 'Готова'];

export function RequestsTab() {
  useSectionScenario(scenarios['service-requests']);
  const { get } = useMotionControls();

  const requests = useServiceStore((s) => s.requests);
  const active = requests.filter((request) => request.status !== 'done').length;

  return (
    <div className={styles.page}>
      <StateGate emptyTitle="Заявок пока нет" emptyText="Здесь появятся ваши обращения.">
        <Card>
          <Flex align="center" gap={12}>
            <span className={styles.summaryIcon}>
              <InboxIcon className={styles.summaryGlyph} />
            </span>
            <div className={styles.summaryBody}>
              <Typography.Title variant="medium-strong">Мои заявки</Typography.Title>
              <Typography.Body variant="small" className={styles.muted}>
                {active} в работе · ответ в течение 2 часов
              </Typography.Body>
            </div>
          </Flex>
        </Card>

        <Section title="Обращения">
          {requests.map((request, index) => {
            const meta = statusMeta[request.status];
            const activeIndex = steps.indexOf(request.status);

            return (
              <motion.div key={request.id} {...get('listItem', index * 0.05)}>
                <Card>
                  <Flex justify="space-between" align="flex-start" gap={8}>
                    <div className={styles.grow}>
                      <Typography.Title variant="small-strong">{request.title}</Typography.Title>
                      <Typography.Body variant="small" className={styles.meta}>
                        {request.number} · {request.date}
                      </Typography.Body>
                    </div>
                    <Chip tone={meta.tone}>{meta.label}</Chip>
                  </Flex>

                  <div className={styles.steps}>
                    {steps.map((step, stepIndex) => (
                      <div key={step} className={styles.step}>
                        <span
                          className={styles.stepBar}
                          data-done={stepIndex <= activeIndex ? 'true' : undefined}
                        />
                        <span
                          className={styles.stepLabel}
                          data-done={stepIndex <= activeIndex ? 'true' : undefined}
                        >
                          {stepLabels[stepIndex]}
                        </span>
                      </div>
                    ))}
                  </div>

                  {request.document ? (
                    <div className={styles.document}>
                      <DocumentArrowDownIcon className={styles.documentIcon} />
                      <span className={styles.documentName}>{request.document}</span>
                      <Chip tone="success">Готов</Chip>
                    </div>
                  ) : null}
                </Card>
              </motion.div>
            );
          })}
        </Section>
      </StateGate>
    </div>
  );
}
