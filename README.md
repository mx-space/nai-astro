# nai-astro-solidjs

## Notes For me

- In Solid, props can't destruct before return render element, if that will lost props reactive. E.g.

```tsx
const FC = (props) => {
  const { someProps } = props // will lost props reactive
  return null
}
```

- Seem to Astro only a buildkit framework, only render DOM structure in server-side or SSG (in build period). So it hadn't any state-management and global layout or router system, even root context injection. We can't pass `<Context />` (e.g. React, Solid or other) in `.astro` page layout, or do this it will not working.

```tsx
// pages/index.astro

<ReactContext.Provider value={{}}>
  <Home />
</ReactContext.Provider>

// context/index.tsx
const ReactContext = React.createContext()

// components/home.tsx
const Home = () => {
  const context = useContext(ReactContext) // can't access context which passing in the `index.astro`
}
```
