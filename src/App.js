import './Style.css'
import Logo from './Icons/Logo.png';
import { useState } from 'react';
import api from './api';

const App = () => {
  const [input, setInputText] = useState("Willkommen zum AI super Projekt 😁\n1. Hier gibst du deinen Englischen Text ein!");
  const [outputBoxTranslationGerman, setOutputBoxTranslationGerman] = useState('2. Hier wird dir dein Deutscher Text angezeigt.')
  const [outputBoxImprovedGerman, setOutputBoxImprovedGerman] = useState('3. Hier wird dir dein optimierter Deutscher Text angezeigt.')
  const [outputBoxFinalEnglishText, setOutputBoxFinalEnglishText] = useState('4. Hier wird das Endergebniss angezeigt.')
  const [selectedStyle, setselectedStyle] = useState("wissenschaftlich");
  const [deltaValue, setdeltaValue] = useState("?");


  const [userName, setUserName] = useState("");
  const [passwort,setPasswort] = useState("");

  function setAnimation(element){
    const divElementA = document.querySelector('.b');
    divElementA.style.animationDuration = '500ms';
    divElementA.style.backgroundColor = "red";
    
    const divElementB = document.querySelector('.c');
    divElementB.style.animationDuration = '500ms';
  }

  function resetAnimation(element){
    const divElementA = document.querySelector('.b');
    divElementA.style.animationDuration = '10s';
    divElementA.style.backgroundColor = "blue";
    
    const divElementB = document.querySelector('.c');
    divElementB.style.animationDuration = '5s';
  }
  
  
  const handleButtonClick = async (actionParameter) => {
  
    let result;
    console.log("sending data:" + actionParameter);
    switch(actionParameter){
      case 'translated-text':
        setAnimation();
        result = await api.sendData(actionParameter,{message: input, targetLanguage:"DE" });
        resetAnimation();
        if (result.error == false) {
          setOutputBoxTranslationGerman(result.message);
        }else if(result.error ==true) {
          setOutputBoxTranslationGerman(result.errorMessage);
        }else {
          setOutputBoxTranslationGerman("Error:" + result.htmlError.message);
        }
        break;

      case 'optimized-text':
        setAnimation();
        result = await api.sendData(actionParameter,{message: outputBoxTranslationGerman , style: selectedStyle});
        resetAnimation();
        if (result.error == false) {
          setOutputBoxImprovedGerman(result.message);
        }else if(result.errorMessage) {
          setOutputBoxImprovedGerman(result.errorMessage);
        }
        else {
          setOutputBoxImprovedGerman("Error:" + result.htmlError.message);
        }
        break;

      case 'autocorrected-textDE':
        setAnimation();
        result = await api.sendData("autocorrected-text",{ message: outputBoxTranslationGerman, language:"DE"});
        resetAnimation();
        if (result.error == false) {
          setOutputBoxTranslationGerman(result.message);
        }else if(result.error ==true) {
          setOutputBoxTranslationGerman(result.errorMessage);
        } else {
          setOutputBoxTranslationGerman("Error:" + result.htmlError.message);
        }
        break;

      case 'autocorrected-textEN':
        setAnimation();
        result = await api.sendData("autocorrected-text",{ message: input, language:"EN"});
        resetAnimation();
        if (result.error == false) {
          setInputText(result.message);
        }else if(result.error ==true) {
          setInputText(result.errorMessage);
        } else {
          setInputText("Error:" + result.htmlError.message);
        }
        break;

      case 'final-text':
        setAnimation();
        result = await api.sendData(actionParameter,{originalInput: input ,message:outputBoxImprovedGerman});
        resetAnimation();
        console.log(actionParameter +"\n" + input + "\n" + outputBoxImprovedGerman);
        
        
        if (result.error == false) {
          setOutputBoxFinalEnglishText(result.message);
          setdeltaValue(result.delta)                  
        }else if(result.error ==true) {
          setOutputBoxFinalEnglishText(result.errorMessage);
          setdeltaValue(result.errorMessagetwo);         
        } else {
          setOutputBoxFinalEnglishText("Error:" + result.htmlError.message);
          setdeltaValue("?")
        }
        break;
    }
  };


  const handleSelectChange = (event) => {
    setselectedStyle(event.target.value); 
  };

  const handleLogin = () =>{
    let userName = prompt("Enter your user id:")
    let passwort = prompt("Enter your password:")
    setUserName(userName);
    setPasswort(passwort);
    api.setCredentials(userName,passwort);
  }

  const handleDeltaUpdate = (event) =>{
    setdeltaValue(event.target.value)
  }

  return (
    <>
      <div className="appcontainer">
        <Navbar handleLogin={handleLogin}/>
        
        <div className='container'>
          <Textinput 
            input={input} 
            setInputText={setInputText} 
          />
          <SettingsBoxA
            handleButtonClick={handleButtonClick}
          />
          <OutputboxEnglish output={outputBoxFinalEnglishText} />
        </div>

        <div className='secondContainer'>
          <OutputboxTranslationGerman 
            output={outputBoxTranslationGerman} 
            setOutputText={setOutputBoxTranslationGerman} 
          />
          <OutputboxUpgradedGerman 
            output={outputBoxImprovedGerman} 
            setOutputText={setOutputBoxImprovedGerman} 
          />
          
        </div>

        <div className='thirdContainer'>
            <SettingsBoxB
              handleButtonClick={handleButtonClick}
              handleSelectChange={handleSelectChange}
              selectedStyle={selectedStyle}
            />
            <SettingsBoxC
              handleButtonClick={handleButtonClick}
              handleDeltaUpdate={handleDeltaUpdate}
              deltaValue={deltaValue}
            />
        </div>
      </div>
    </>
  )
}

const Navbar = ({handleLogin}) => {
  return (
    <div className="topnav">
      <a className="active"><img src={Logo} alt="logo"></img></a>
      <a href="https://app.swaggerhub.com/apis-docs/SIMONKLEINENSK/Vs-API/1.0.0">API</a>
      <button className='loginButton'  onClick={() => handleLogin()}>Login</button>
    </div>
  )
}


const Textinput = ({ input, setInputText }) => {
  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div className="mainInput">
      <textarea
        className="input"
        value={input}
        onChange={handleTextChange}
        placeholder="Enter a Message..."
      ></textarea>
    </div>
  );
};

const SettingsBoxA = (props) => {
  const { handleButtonClick} = props;


  return (
    <div className="settingsBoxA">
        <Brain />
        <button className='sendButton spellCorrection'  onClick={() => handleButtonClick("autocorrected-textEN")}>Rechtschreibung Englisch</button>
        <button className='sendButton translateButton'  onClick={() => handleButtonClick("translated-text")} >Übersetzen</button>
    </div>
  )
}

const SettingsBoxB = (props) => {
  const { selectedStyle,selectedCreativityLevel,handleButtonClick,  handleSelectChange} = props;


  return (
    <div className="settingsBoxB">
      <button className='sendButton upgradeButton'  onClick={() => handleButtonClick("autocorrected-textDE")}>Rechtschreibung Deutsch</button>
      <button className='sendButton upgradeButton'  onClick={() => handleButtonClick("optimized-text")}>Verbessern</button>
        
    
        
        <select className='sendButton dropDownSelection' name="Texttyp"  value={selectedStyle} onChange={handleSelectChange}>
          <option value="wissenschaftlich">Wissenschaftlich</option>
          <option value="strassensprache">Straßen-slang</option>
          <option value="yoda">Yoda</option>
    </select>
    </div>
  )
}

const SettingsBoxC = (props) => {
  const { handleButtonClick, handleDeltaUpdate, deltaValue} = props;

  return (
    <div className="settingsBoxB settingsBoxC">
        <button className='sendButton finalText'  onClick={() => handleButtonClick("final-text")}>Final Text</button>
        <div className="DeltaScorebox">
            <p><b>{deltaValue}/100</b></p>
            <p>scorebox</p>
        </div>
    </div>
  )
}
const Brain = () => {
  return (<div className='brain'>
    <div className='a'></div>
    <div className='b'></div>
    <div className='c'></div>
  </div>)
}



function OutputboxTranslationGerman(props) {
  const { output, setOutputText } = props;

  const handleOutputChange = (event) => {
    setOutputText(event.target.value);
  };

  return (
    <div className="translationGerman">
      <textarea
        className="outputGerman"
        value={output}
        onChange={handleOutputChange}
      ></textarea>
    </div>
  );
}

function OutputboxUpgradedGerman(props){
  const { output, setOutputText } = props;

  const handleOutputChange = (event) => {
    setOutputText(event.target.value);
  };

  return (
    <div className="translationGerman upgradeGerman">
      <textarea
        className="outputGerman outputUpgradeGerman"
        value={output}
        onChange={handleOutputChange}
      ></textarea>
    </div>
  );
}

function OutputboxEnglish(props) {
  const { output } = props;

  return (
    <div className="mainInput translationEnglish">
      <textarea
        className="mainInput input outputEnglish"
        value={output}
      ></textarea>
    </div>
  );
}

export default App;