import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Fib = () => {

    const [seenIndexes, setSeenIndexes] = useState([]);
    const [values, setValues] = useState({});
    const [index, setIndex] = useState('');


    useEffect(() => {
        async function fetchValues() {
            const values = await axios.get('/api/values/current');
            setValues(values.data);
        }

        async function fetchIndexes() {
            const seenIndexes = await axios.get('/api/values/all');
            setSeenIndexes(seenIndexes.data);
        }

        fetchValues();
        fetchIndexes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('/api/values', {
            index
        });

        setIndex('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your Index:</label>
                <input value={index} onChange={(e) => setIndex(e.target.value)} />
                <button>Submit</button>
            </form>

            <h3>Indexes I have seen</h3>
            {seenIndexes.map(({ number }) => number).join(', ')}

            <h3>Calculated Values:</h3>
            <CalculatedValues values={values} />
        </div>
    )
};

const CalculatedValues = ({ values }) => {
    const entries = [];

    for (let key in values) {
        entries.push(<div key={key}>
            for Index {key} I calculated {values[key]}
        </div>);
    }

    return entries;
}

export default Fib