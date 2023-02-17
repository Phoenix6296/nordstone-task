import { Button, MenuItem, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import Nav from '../../Nav/Nav'
import styles from './FourthPage.module.css'
import { auth } from '../../../firebase'
import { useNavigate } from 'react-router-dom'

const currencies = [
    { value: 'ADD', label: '+' },
    { value: 'SUB', label: '-' },
    { value: 'MUL', label: '*' }
];

const FourthPage = () => {
    const [state, setState] = useState({
        value1: '',
        value2: '',
        operator: ''
    })
    const [result, setResult] = useState('')
    const calculate = () => {
        const API = fetch(`https://newton.now.sh/api/v2/simplify/${state.value1}${state.operator}${state.value2}`).then(res => res.json()).then(data => setResult(data.result))
        console.log(state);
    }
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            user ? setIsAuthenticated(true) : navigate('/login');
        });
        return unsubscribe;
    }, [navigate]);
    return (
        <div className={`${styles.fourthpg} ${styles.center}`}>
            {isAuthenticated && <Nav />}
            <div className={`${styles.cal} ${styles.center}`}>
                <TextField id="outlined-basic" label="1st number" variant="outlined" type="number"
                    sx={{ width: 150 }}
                    onChange={(e) => { setState({ ...state, value1: e.target.value }) }} />
                <TextField select sx={{ width: 70 }}
                    onChange={(e) => { setState({ ...state, operator: e.target.value }) }}
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.label}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField id="outlined-basic" label="2nd number" variant="outlined" type="number"
                    sx={{ width: 150 }}
                    onChange={(e) => { setState({ ...state, value2: e.target.value }) }} />

            </div>
            <Button onClick={calculate} variant="outlined"
                disabled={state.value1 === '' || state.value2 === '' || state.operator === ''}
            >Calculate</Button>
            {result && <h1>{result}</h1>}
        </div>
    )
}

export default FourthPage