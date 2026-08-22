import { createBrowserRouter, type LoaderFunctionArgs } from 'react-router'
import Root from './routes/Root'
import Home from './routes/Home'
import Chapter from './routes/Chapter'
import ErrorPage from './routes/ErrorPage'
import { getChapter, chapters } from './data/chapters'

function homeLoader() {
  return chapters
}

function chapterLoader({ params }: LoaderFunctionArgs) {
  const chapter = getChapter(params.slug!)

  if (!chapter) {
    throw new Response('Kapitlet blev ikke fundet', { status: 404 })
  }

  return chapter
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home, loader: homeLoader },
      { path: 'chapters/:slug', Component: Chapter, loader: chapterLoader },
    ],
  },
])
