import './_Nutrients.scss';
import Calorieicone from '../../assets/Calorieicone.svg';
import chicken from '../../assets/chicken.svg'
import apple from '../../assets/apple.svg'
import cheeseburger from '../../assets/cheeseburger.svg'

const Nutrients = ({ nutrientData }) => {
  return (
    <section className="nutrients-section">
      {nutrientData && (
        <>
          <div className='bg-nutri'>
            <div className='bg-img bg-img-calories'>
              <img src={Calorieicone} alt="" className='icone-calorie' />
            </div>
            <div className='bg-nb-nutri-score'>
            <p className='nb nb-calories'>{nutrientData.calorieCount + 'kCal'}</p>
              <p className='calories-txt'>Calories</p>
            </div>
          </div>

          <div className='bg-nutri'>
            <div className='bg-img bg-img-prot'>
              <img src={chicken} alt="" className='icone-calorie' />
            </div>
            <div className='bg-nb-nutri-score'>
              <p className='nb nb-prot'>{nutrientData.proteinCount + 'kCal'}</p>
              <p className='calories-txt'>Proteines</p>
            </div>
          </div>

          <div className='bg-nutri'>
            <div className='bg-img bg-img-glucides'>
              <img src={apple} alt="" className='icone-calorie' />
            </div>
            <div className='bg-nb-nutri-score'>
              <p className='nb nb-glucides'>{nutrientData.carbohydrateCount + 'kCal'}</p>
              <p className='calories-txt'>Glucides</p>
            </div>
          </div>

          <div className='bg-nutri'>
            <div className='bg-img bg-img-lipides'>
              <img src={cheeseburger} alt="" className='icone-calorie' />
            </div>
            <div className='bg-nb-nutri-score'>
              <p className='nb nb-lipides'>{nutrientData.lipidCount + 'kCal'}</p>
              <p className='calories-txt'>Lipides</p>
            </div>
          </div>
          </>
      )}
    </section>
  );
};

export default Nutrients;