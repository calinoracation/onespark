import Head from 'next/head'

import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

import fs from 'fs/promises';
import path from 'path';

import { Lesson } from '../../../components/Lesson';
import { Logo } from '../../../components/Logo';

const components = { Lesson, Logo };

export default function LessonPage({ source, frontMatter }) {
  return (
    <div className="wrapper">
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <MDXRemote {...source} components={components} />
    </div>
  )
}

interface LessonParams {
  id: string
  module: string
}

export async function getStaticPaths() {
  const contentDir = path.join(process.cwd(), 'content');
  const modules = (await fs.readdir(contentDir)).map((modulePath) => ({
    modulePath: path.join(contentDir, modulePath),
    moduleId: path.basename(modulePath),
    lessonIds: [] as string[],
  }));  

  await Promise.all(modules.map(async ({ modulePath, lessonIds }) => {
    const lessons = await fs.readdir(modulePath);

    lessons.forEach((lessonPath) => {
      const lessonId = path.basename(lessonPath, '.mdx');
      lessonIds.push(lessonId);
    });
  }));

  const paths = modules.flatMap((module) => {
    return module.lessonIds.map((lessonId) => {
      return {
        params: {
          id: lessonId,
          module: module.moduleId,
        },
      };
    });
  })

  return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: LessonParams}) {
  const { id, module } = params;
  const filePath = path.join(process.cwd(), 'content', module, `${id}.mdx`);
  const source = await fs.readFile(filePath, { encoding: 'utf8' });
  const { content, data: frontMatter } = matter(source)
  const mdxSource = await serialize(content, { scope: frontMatter })
  return { props: { source: mdxSource, frontMatter } }
}