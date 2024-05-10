import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Greet} from "../wailsjs/go/main/App";

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);

    function greet() {
        Greet(name).then(updateResultText);
    }

    function handleSubmit(e:any){
        e.preventDefault();
       
        const formData = new FormData();
        const fileField = document.querySelector('pokedex-img') as HTMLInputElement;
      
    } 
        

    
    return (
        <div id="App">
            <form action="">
                <h1>POKEDEX</h1>
                <label htmlFor="pokedex-img">Upload a pokemon</label>
                <br />
                <input type="file" id="pokedex-img" name="pokedex-img"  />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default App
