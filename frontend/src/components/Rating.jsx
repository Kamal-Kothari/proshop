import React from 'react'
import {FaStar, FaRegStar, FaStarHalf} from 'react-icons/fa'

const Rating = ({value,text}) => {
  return (
    <div>
        

{/* { [1, 2, 3, 4, 5].map((i) => (
    <span key={i}>
        {value >= i ? <FaStar /> : value >= i - 0.5 ? <FaStarHalf /> : <FaRegStar />}
    </span>
)) } */}
        <span> {value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalf /> : <FaRegStar />} </span>
        <span> {value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalf /> : <FaRegStar />} </span>
        <span> {value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalf /> : <FaRegStar />} </span>
        <span> {value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalf /> : <FaRegStar />} </span>
        <span> {value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalf /> : <FaRegStar />} </span>
        <span> {text && text}</span>
    </div>
  )
}

export default Rating