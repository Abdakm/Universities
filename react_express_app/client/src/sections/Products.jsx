import React from 'react'
import { products } from '../constants'
import ProductCard from '../components/ProductCard'

const Products = () => {
  return (
    <div className='flex flex-wrap justify-start items-center gap-10 pt-28'>
        {
            products.map((product, index) => (
                <ProductCard 
                    Product={product}
                />
            ))
        }
    </div>
  )
}

export default Products