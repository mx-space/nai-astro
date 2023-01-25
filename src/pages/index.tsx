import { Match, Show, Switch, createSignal } from 'solid-js'

import { createQuery } from '@tanstack/solid-query'

import { NoteList } from '../components/biz/note-list'
import { HomePager } from '../components/biz/pager'
import { withQueryContextWrapper } from '../contexts/query-context'
import { apiClient } from '../utils/api'

export default withQueryContextWrapper(() => {
  const [page, setPage] = createSignal(1)
  const query = createQuery({
    queryKey: () => ['notes', page().toString()],
    queryFn: async ({ queryKey }) => {
      const [, page] = queryKey
      return apiClient.note.getList(+page)
    },
    keepPreviousData: true,
  })

  return (
    <>
      <Switch>
        <Match when={query.isLoading && !query.dataUpdatedAt}>
          <div>Loading...</div>
        </Match>
        <Match when={query.isError}>
          <div>Error: {(query.error as any).message}</div>
        </Match>

        <Match when={query.isSuccess}>
          <NoteList notes={query.data!.data} />
        </Match>
      </Switch>
      <Show when={!!query.data?.pagination}>
        <HomePager
          onChangePage={(page) => {
            setPage(page)
          }}
          pager={query.data!.pagination}
        />
      </Show>
    </>
  )
})
