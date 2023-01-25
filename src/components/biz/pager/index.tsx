import type { Component } from 'solid-js'

import type { Pager } from '@mx-space/api-client/.'

import './index.css'

export const HomePager: Component<{
  pager: Pager
  onChangePage: (page: number) => void
}> = (props) => {
  return (
    <div class={'pager'}>
      <div
        classList={{
          prev: true,
          disable: !props.pager.hasPrevPage,
        }}
        onClick={() => {
          if (!props.pager.hasPrevPage) {
            return
          }

          const { currentPage } = props.pager

          const nextPage = currentPage - 1
          props.onChangePage(nextPage)
        }}
      >
        上一页
      </div>
      <div
        classList={{
          next: true,
          disable: !props.pager.hasNextPage,
        }}
        onClick={() => {
          if (!props.pager.hasNextPage) {
            return
          }
          const { currentPage } = props.pager

          const nextPage = currentPage + 1
          props.onChangePage(nextPage)
        }}
      >
        下一页
      </div>
    </div>
  )
}
