interface LessonProps {
  title: string;
}

export function Lesson({ title }: LessonProps) {
  return (
    <div>
      <h2>Lesson Module: {title}</h2>
    </div>
  );
}