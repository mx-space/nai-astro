import type { Component } from 'solid-js'
import { For } from 'solid-js'

import type { NoteModel } from '@mx-space/api-client'

import './index.css'

export const NoteList: Component<{
  notes: NoteModel[]
}> = (props) => {
  return (
    <ul class={'list-root'}>
      <For each={props.notes}>
        {(note) => {
          const created = new Date(note.created)
          const day = created.getDate()
          const month = created.getMonth() + 1
          return (
            <li>
              <a href={`/notes?nid=${note.nid}`}>
                <span class={'title'}>{note.title}</span>
                <span class={'created'}>{`${month}/${day}`}</span>
              </a>
            </li>
          )
        }}
      </For>
    </ul>
  )
}
