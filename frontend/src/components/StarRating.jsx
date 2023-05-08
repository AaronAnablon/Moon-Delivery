import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, overAll }) => {
  const percentage = (rating / (overAll * 5)) * 100;

  return (
    <div >
<div  >
<div style={{ position: 'relative', display: 'inline-block' }}>
  <div  style={{ position: 'absolute', width: `${percentage}%`, color: '#ffc107', top: '0', left: '0', whiteSpace: 'nowrap', overflow: 'hidden' }}>
    <FaStar />
    <FaStar />
    <FaStar />
    <FaStar />
    <FaStar />
  </div>
  <div >
    <FaStar style={{ color: 'grey' }} />
    <FaStar style={{ color: 'grey' }} />
    <FaStar style={{ color: 'grey' }} />
    <FaStar style={{ color: 'grey' }} />
    <FaStar style={{ color: 'grey' }} />
   
  </div>
  <span> {isNaN(percentage) ? 0 : percentage / 20}</span>
    <span> | {overAll} sold</span>
</div> 
</div>
     </div>
  );
};

export default StarRating;