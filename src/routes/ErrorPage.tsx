import { isRouteErrorResponse, useRouteError, Link } from 'react-router'

function ErrorPage() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Noget gik galt.'

  return (
    <div className="rounded-2xl border border-stone-900/10 bg-stone-900/5 p-8 text-center dark:border-white/10 dark:bg-slate-950/40">
      <p className="text-xs uppercase tracking-[0.32em] text-amber-700/70 dark:text-amber-200/60">
        Fejl
      </p>
      <h1 className="mt-3 font-serif text-2xl text-stone-900 dark:text-white">{message}</h1>
      <Link
        to="/"
        className="mt-6 inline-block text-sm text-amber-700 hover:text-amber-600 dark:text-amber-200 dark:hover:text-amber-100"
      >
        &larr; Tilbage til guiden
      </Link>
    </div>
  )
}

export default ErrorPage
