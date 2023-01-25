import {
  Match,
  Show,
  Switch,
  createComputed,
  createMemo,
  createSignal,
  onCleanup,
} from 'solid-js'

import { createQuery } from '@tanstack/solid-query'

import { configs } from '../../app.config'
import { withQueryContextWrapper } from '../../contexts/query-context'
import { apiClient } from '../../utils/api'

import '../../components/biz/markdown'

export const NodeNidPage = withQueryContextWrapper<{ nid: number | string }>(
  () => {
    const nid = new URLSearchParams(location.search).get('nid')

    if (!nid) {
      return <div>404</div>
    }

    const [renderProps, setRenderProps] = createSignal({})
    const query = createQuery({
      queryKey: () => ['note-nid', nid],
      queryFn: async ({ queryKey }) => {
        const [, nid] = queryKey
        const note = await apiClient.note
          .getNoteById(+nid)
          .then((data) => data.data)
        const noteId = note.id
        const props = await apiClient.proxy.markdown.render
          .structure(noteId)
          .get<any>({ params: { theme: 'github' } })

        setRenderProps(props)

        return note
      },
    })
    const data = createMemo(() => query.data)

    const originalTitle = document.title
    createComputed(() => {
      const title = data()?.title
      if (!title) {
        return
      }
      document.title = `${title} | ${configs.title}`
    })

    onCleanup(() => {
      document.title = originalTitle
    })

    return (
      <Switch>
        <Match when={query.isLoading}>
          <div class="content-wrapper">Loading...</div>
        </Match>
        <Match when={data()}>
          {/* @ts-ignore */}
          <markdown-render
            props={renderProps() ? JSON.stringify(renderProps()) : ''}
          />
        </Match>
      </Switch>
    )
  },
)
