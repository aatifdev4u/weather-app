import React from 'react';

const Weather = (props)=>{
    const { 
        city,
        country,
        temp_celsius,
        temp_min,
        temp_max,
        description,
        weatherIcon
    } = props;
    return (
        <div className='container pt-4 text-light'>
            <div className="cards">
                <h1>{city}</h1>
                <h5 className="py-4">
                    <i className={`wi ${weatherIcon} display-1`}></i>
                </h5>
                {
                   temp_celsius ?
                    (<h1 className="py-2">{temp_celsius}&deg;C</h1>) : null 
                }
               
                {/* {show max and min temo} */}
                {minmaxTemp(temp_min, temp_max)}
                <h4 className="py-4">{description}</h4>
            </div>
        </div>
    )
}

function minmaxTemp(min, max){
    if(min && max){
        return(
            <h3>
              <span className="px-4">{min}&deg;</span>
              <span className="px-4">{max}&deg;</span>
            </h3>
        )
    } 
  }


export default Weather;