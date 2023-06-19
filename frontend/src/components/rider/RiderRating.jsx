import { Card } from 'react-bootstrap'
import StarRating from '../products/StarRating'
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setHeaders, url } from '../../slices/api';
import { useSelector } from 'react-redux';

const RiderRating = () => {
    const [ratings, setRating] = useState()
    const auth = useSelector((state) => state.auth)

    const getRatings = async () => {
        try {
            const ratings = await axios.get(`${url}/ratings/riderRating/${auth._id}`, setHeaders())
            setRating(ratings.data[0].comment)
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong!!')
        }
    }

    useEffect(() => {
        getRatings()
    }, [])

    return (
        <div>
            <h2>Ratings from Customer</h2>
            {ratings && ratings.map((rating) => (
                <div className='d-flex border-bottom p-2'>
                    <CgProfile className='col-1' size={28} />
                    <div className='col-8'>
                        <Card.Text>{rating[0]}</Card.Text>
                    </div>
                    <div className='col-3'>
                        <StarRating rating={3} overAll={5} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RiderRating
