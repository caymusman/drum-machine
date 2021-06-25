class DrumPad extends React.Component{
    constructor(props){
      super(props);
      
      this.state = {
        activeStyle: "inactive"
      }
       this.handleKeyPress=this.handleKeyPress.bind(this);
       this.handlePlay=this.handlePlay.bind(this);
       this.handlePad=this.handlePad.bind(this);
    }
    
    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyPress);
    }
    
  handlePad(){
    if(this.state.activeStyle == "inactive"){
      this.setState({
        activeStyle: "active"
      })
    }else{
      this.setState({
        activeStyle: "inactive"
      })
    }
  }
    
  handlePlay() {
     let sound = document.getElementById(this.props.letter);
     sound.currentTime = 0;
     sound.play();
     this.handlePad();
     setTimeout(() => this.handlePad(), 130)
     this.props.display(this.props.text);
  }
    
  handleKeyPress(e) {
    if(e.keyCode == this.props.keyCode){
      this.handlePlay();
    };
  }
    
    render(){
      
      return(
        <div 
          className={"drum-pad " + this.state.activeStyle} 
          id="padBlock" 
          onClick={this.handlePlay} 
          onKeyPress={this.handleKeyPress}>
          <audio 
            className = "clip"
            id={this.props.letter} 
            src={this.props.sound} 
            autostart="false">
            
            Your browser does not support the <code>Audio</code> tag</audio>
          
          <a 
            id="padAnchor" 
            >
            
            {this.props.letter}</a>
          </div>
              )
    }
  }
  
  class AllPads extends React.Component{
    constructor(props){
      super(props); 
    }
        render(){
          return(
            <div id="pads">
              {this.props.bank.map((e) => (
                <DrumPad
                        id={e.text}
                        className={"drum-pad"}
                        letter = {e.letter}
                        key={e.letter + e.keyCode}
                        keyCode = {e.keyCode}
                        sound = {e.sound}
                        text = {e.text}
                  display = {this.props.display}
                  />
              ))}
              
           </div>
            )
      }
  }
  
  class App extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        power: true,
        bank: 0,
        audioBanks: defAudioBanks,
        display: String.fromCharCode(160)
      }
      
      this.handlePower = this.handlePower.bind(this);
      this.handleBankClick=this.handleBankClick.bind(this);
      this.updateDisplay=this.updateDisplay.bind(this);
    }
    
    handlePower(){
      if(this.state.power){
        this.setState({
          display: "Powering off.",
          power: false
      })}else{ 
          this.setState({
          display: "Powering on!",
          power: true
      });
    }
    }
    handleBankClick(){
      if(this.state.bank == 0){
        this.setState({
          bank: 1
        })
      }else{
        this.setState({
          bank: 0
        })
      }
    }
   
    updateDisplay(childDis){
      this.setState({
        display: childDis
      })
    }
    
    render(){
      let vault = this.state.audioBanks;
      let bankNum = this.state.bank;
      let mainPowClass = this.state.power ? "powerOn" : "powerOff";
      let openPowClass = !this.state.power ? "powerOn" : "powerOff";
      
      return(
        <div id="mainDiv">
          <div id="toHide"
               className={mainPowClass}>
            <div id="drum-machine">
              <AllPads
                bank = {vault[bankNum]}
                display = {this.updateDisplay}
                /> 
              <div id="display">
                <button 
                  type="button" 
                  id="bankBtn" 
                  className = "btn"
                  onClick={this.handleBankClick}>
                  Bank {bankNum}</button>
                <button
                  type="button"
                  id="powerBtn"
                  className = "btn"
                  onClick={this.handlePower}>
                  Power</button>
                <div id="nameDiv">
                  <p>{this.state.display}</p>
                </div>
              </div>
            </div>
          </div>
          <div id="toShow"
               className={openPowClass}>
            <h1> Welcome to my Drum Machine </h1>
            <button
                type="button"
                id="initBtn"
                className='btn'
                onClick={this.handlePower}>
                Power</button>
          </div>
        </div>
        
      )    
    }
  }
  
  
  let defAudioBanks = [ 
    [
    {
      keyCode: 81,
      letter: 'Q',
      text: 'Heater-1',
      sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      letter: 'W',
      text: 'Heater-2',
      sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      letter: 'E',
      text: 'Heater-3',
      sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      letter: 'A',
      text: 'Heater-4',
      sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      letter: 'S',
      text: 'Clap',
      sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      letter: 'D',
      text: 'Open-HH',
      sound: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      letter: 'Z',
      text: "Kick-n'-Hat",
      sound: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      letter: 'X',
      text: 'Kick',
      sound: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      letter: 'C',
      text: 'Closed-HH',
      sound: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ],
  [
    {
      keyCode: 81,
      letter: 'Q',
      text: 'Chord-1',
      sound: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      keyCode: 87,
      letter: 'W',
      text: 'Chord-2',
      sound: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
      keyCode: 69,
      letter: 'E',
      text: 'Chord-3',
      sound: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
      keyCode: 65,
      letter: 'A',
     text: 'Shaker',
      sound: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
      keyCode: 83,
      letter: 'S',
      text: 'Open-HH',
      sound: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
      keyCode: 68,
      letter: 'D',
      text: 'Closed-HH',
      sound: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
      keyCode: 90,
      letter: 'Z',
      text: 'Punchy-Kick',
      sound: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
      keyCode: 88,
      letter: 'X',
      text: 'Side-Stick',
      sound: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
      keyCode: 67,
      letter: 'C',
      text: 'Snare',
      sound: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
  ]
  ];
  //2d array of name/clip pairs
  
  ReactDOM.render(<App />, document.getElementById('app'));