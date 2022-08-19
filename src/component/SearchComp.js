import axios from 'axios';
import React, { useEffect, useState } from 'react'
import usericon from './user.png'

const SearchComp = () => {

    const [originaldata, setOriginalData] = useState([]);
    const [data, setData] = useState([]);
    const [choice, setChoice] = useState();
    const [vehicleName, setVehicleName] = useState();
    const [title, setTitle] = useState("");
    const [click, setClick] = useState(false);

    const api = 'https://612619c7e40e1900170727fe.mockapi.io/api/users';

    // Fetch the API as the page renders

    useEffect(() => {
        axios.get(api)
            .then((res) => {
                setData(res.data)
                setOriginalData(res.data)
            })
    }, [])

    // Change the data in Real time when the country gets changed
    useEffect(() => {
        let newData = data.filter((val) => {
            return choice.length <= 0 ? val.country : choice.toLowerCase() === val.country.toLowerCase()
        })
        setOriginalData(newData);
    }, [choice])

    // Change the list according to the vehicle selected
    const handleOnVehicle = (e) => {
        let a = e.target.value.toLowerCase();
        let newData = data.filter((val) => {
            return val.vehicle.toLowerCase() === a;
        })
        setOriginalData(newData);
    }

    // Changing of data occurs when we type something in input field
    const searchItems = (searchValue) => {

        if (searchValue.length > 0) {
            let newSpell = searchValue.toLowerCase();
            const filteredData = data.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(newSpell);
            })
            setOriginalData(filteredData)
        } else if (searchValue.length <= 0) {
            setOriginalData(data)
        }
    }

    // Effect takes place when we reset the data.
    useEffect(() => {
        setOriginalData(data);
    }, [click])

    // function to reset everything
    const handleOnClick = (e) => {
        setClick(!click)
        setChoice('Select Country')
        setTitle("")
        setVehicleName('Vehicle')
    }

    return (
        <>
            <div className="title">
                <h1>Filtering Data</h1>
            </div>

            <div className="main_container">
                <div className="first_container">
                    <select
                        name="country"
                        id="country"
                        defaultValue="default"
                        value={choice}
                        onChange={(e) => {
                            setChoice(e.target.value)

                        }}
                    >
                        <option value="" selected>Select Country</option>
                        {originaldata.map((val) => {
                            return <option
                                value={val.country}
                                key={val.id}
                            >
                                {val.country}
                            </option>
                        })
                        }
                    </select>

                    <select name="vehicle" id="vehicle" value={vehicleName} onChange={(e) => {
                        handleOnVehicle(e)
                        setVehicleName(e.target.value)
                    }}>

                        <option value="" selected>Vehicle</option>
                        {originaldata.map((val) => {
                            return <option
                                value={val.vehicle}
                                key={val.id}
                            >
                                {val.vehicle}
                            </option>
                        })
                        }
                    </select>
                </div>

                <div className="second_container">
                    <input
                        type="text"
                        placeholder='Search'
                        value={title}
                        onChange={(e) => {
                            searchItems(e.target.value)
                            setTitle(e.target.value)
                        }} />
                </div>

                <div>
                    <button
                        className="button-39"
                        onClick={(e) => handleOnClick(e)}
                    >
                        Reset Filter
                    </button>
                </div>

                {originaldata.map((val, i) => {
                    return (
                        <div className="third_container" key={val.id}>

                            <div className="image_item">
                                <img src={usericon} alt="" height='50px' width='50px' />
                            </div>

                            <div className='details_container name_email'>
                                <span className='name'>{val.name}</span><br />
                                <span className='email'>{val.email}</span>
                            </div>

                            <div className='details_container country_vehicle'>
                                <span className='country_wrapper'>{val.country}</span> <br />
                                <span className='country_wrapper'>{val.vehicle}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default SearchComp