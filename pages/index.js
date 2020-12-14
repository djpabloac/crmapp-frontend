import Head from 'next/head'
import Layout from '../components/Layout'
import { usePermisson } from '../components/Global';

export default function Home() {

  return (
    <div>
      <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Index</h1>
      </Layout>
    </div>
  )
}
