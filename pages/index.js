import Link from 'next/link'
import React from 'react'

import { client } from '../lib/client'
import { Product, FooterBanner, HeroBanner } from '../components'

const Home = ({ products, bannerData }) => (
  <div>
    <HeroBanner heroBanner={bannerData && bannerData[0]} />
    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>Copy Same As Original Product </p>
    </div>

    <div className="products-container">
      {products?.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
)

export default Home

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: { products, bannerData },
  }
}
