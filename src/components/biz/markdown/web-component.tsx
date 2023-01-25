const register = () => {
  customElements.define(
    'markdown-render',
    class MarkdownRender extends HTMLElement {
      constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.render()
      }

      static get observedAttributes() {
        return ['props']
      }

      render() {
        const shadowRoot = this.shadowRoot!

        shadowRoot.innerHTML = ''

        // @ts-ignore
        // solidjs pass props to web component on this scope, not attribute
        const props = this.getAttribute('props') || this.props

        if (!props) {
          return
        }
        const propsObj = JSON.parse(props)
        const { style, body, script, link, extraScripts } = propsObj

        const $styles: HTMLElement[] = style.map((text: string) => {
          const $style = document.createElement('style')
          $style.innerHTML = text || ''
          return $style
        })

        const $scripts: HTMLElement[] = script.map((text: string) => {
          const $script = document.createElement('script')
          $script.innerHTML = text || ''
          return $script
        })

        const $links: HTMLElement[] = link.map((text: string) => {
          const $link = document.createElement('link')
          $link.setAttribute('rel', 'stylesheet')
          $link.setAttribute('href', text || '')
          return $link
        })

        const $extraScripts: HTMLElement[] = extraScripts.map(
          (text: string) => {
            const $script = document.createElement('script')

            $script.setAttribute('src', text || '')
            return $script
          },
        )

        const $body = document.createElement('div')
        $body.innerHTML = body[0] || ''

        shadowRoot.append(
          ...$styles,
          ...$scripts,
          ...$links,
          $body,
          ...$extraScripts,
        )
      }
      attributeChangedCallback() {
        this.render()
      }
    },
  )
}
export { register }
