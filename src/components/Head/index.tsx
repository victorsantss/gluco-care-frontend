import Head from 'next/head'

interface HeadProps {
  title: string
}

export default function HeadContent({ title }: HeadProps): React.ReactElement {
  return (
    <Head>
      <title>GlucoCare | {title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
