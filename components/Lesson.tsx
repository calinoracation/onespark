interface LessonProps {
  children: React.ReactNode;
  title: string;
}

import styles from '../styles/lesson.module.css';

export function Lesson({ children, title }: LessonProps) {
  return (
    <section className={styles.lesson}>
      <h1 className={styles.lessonTitle}>{title}</h1>
      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
}