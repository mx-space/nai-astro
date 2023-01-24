export const configs = {
  title: '森',
  subtitle: '寻的碎碎念',
  website: 'https://innei.ren',

  apiBase:
    import.meta.env.VITE_APP_APIBASE?.toString() ?? 'https://api.innei.ren/v2',
}
