var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DrumPad = function (_React$Component) {
  _inherits(DrumPad, _React$Component);

  function DrumPad(props) {
    _classCallCheck(this, DrumPad);

    var _this = _possibleConstructorReturn(this, (DrumPad.__proto__ || Object.getPrototypeOf(DrumPad)).call(this, props));

    _this.state = {
      activeStyle: "inactive"
    };
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.handlePlay = _this.handlePlay.bind(_this);
    _this.handlePad = _this.handlePad.bind(_this);
    return _this;
  }

  _createClass(DrumPad, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('keydown', this.handleKeyPress);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyPress);
    }
  }, {
    key: 'handlePad',
    value: function handlePad() {
      if (this.state.activeStyle == "inactive") {
        this.setState({
          activeStyle: "active"
        });
      } else {
        this.setState({
          activeStyle: "inactive"
        });
      }
    }
  }, {
    key: 'handlePlay',
    value: function handlePlay() {
      var _this2 = this;

      var sound = document.getElementById(this.props.letter);
      sound.currentTime = 0;
      sound.play();
      this.handlePad();
      setTimeout(function () {
        return _this2.handlePad();
      }, 130); //reset pad after played
      this.props.display(this.props.text);
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(e) {
      if (e.keyCode == this.props.keyCode) {
        this.handlePlay();
      };
    }
  }, {
    key: 'render',
    value: function render() {

      return React.createElement(
        'div',
        {
          className: "drum-pad " + this.state.activeStyle,
          id: 'padBlock',
          onClick: this.handlePlay,
          onKeyPress: this.handleKeyPress },
        React.createElement(
          'audio',
          {
            className: 'clip',
            id: this.props.letter,
            src: this.props.sound,
            autostart: 'false' },
          'Your browser does not support the ',
          React.createElement(
            'code',
            null,
            'Audio'
          ),
          ' tag'
        ),
        React.createElement(
          'a',
          {
            id: 'padAnchor'
          },
          this.props.letter
        )
      );
    }
  }]);

  return DrumPad;
}(React.Component);

var AllPads = function (_React$Component2) {
  _inherits(AllPads, _React$Component2);

  function AllPads(props) {
    _classCallCheck(this, AllPads);

    return _possibleConstructorReturn(this, (AllPads.__proto__ || Object.getPrototypeOf(AllPads)).call(this, props));
  }

  _createClass(AllPads, [{
    key: 'render',
    value: function render() {
      var _this4 = this;

      return React.createElement(
        'div',
        { id: 'pads' },
        this.props.bank.map(function (e) {
          return React.createElement(DrumPad, {
            id: e.text,
            className: "drum-pad",
            letter: e.letter,
            key: e.letter + e.keyCode,
            keyCode: e.keyCode,
            sound: e.sound,
            text: e.text,
            display: _this4.props.display
          });
        })
      );
    }
  }]);

  return AllPads;
}(React.Component);

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App(props) {
    _classCallCheck(this, App);

    var _this5 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this5.state = {
      power: false,
      bank: 0,
      audioBanks: defAudioBanks,
      display: String.fromCharCode(160)
    };

    _this5.handlePower = _this5.handlePower.bind(_this5);
    _this5.handleBankClick = _this5.handleBankClick.bind(_this5);
    _this5.updateDisplay = _this5.updateDisplay.bind(_this5);
    return _this5;
  }

  _createClass(App, [{
    key: 'handlePower',
    value: function handlePower() {
      if (this.state.power) {
        this.setState({
          display: "Powering off.",
          power: false
        });
      } else {
        this.setState({
          display: "Powering on!",
          power: true
        });
      }
    }
  }, {
    key: 'handleBankClick',
    value: function handleBankClick() {
      if (this.state.bank == 0) {
        this.setState({
          bank: 1
        });
      } else {
        this.setState({
          bank: 0
        });
      }
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay(childDis) {
      this.setState({
        display: childDis
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var vault = this.state.audioBanks;
      var bankNum = this.state.bank;
      var mainPowClass = this.state.power ? "powerOn" : "powerOff";
      var openPowClass = !this.state.power ? "powerOn" : "powerOff";

      return React.createElement(
        'div',
        { id: 'mainDiv' },
        React.createElement(
          'div',
          { id: 'toHide',
            className: mainPowClass },
          React.createElement(
            'div',
            { id: 'drum-machine' },
            React.createElement(AllPads, {
              bank: vault[bankNum],
              display: this.updateDisplay
            }),
            React.createElement(
              'div',
              { id: 'display' },
              React.createElement(
                'button',
                {
                  type: 'button',
                  id: 'bankBtn',
                  className: 'btn',
                  onClick: this.handleBankClick },
                'Bank ',
                bankNum
              ),
              React.createElement(
                'button',
                {
                  type: 'button',
                  id: 'powerBtn',
                  className: 'btn',
                  onClick: this.handlePower },
                'Power'
              ),
              React.createElement(
                'div',
                { id: 'nameDiv' },
                React.createElement(
                  'p',
                  null,
                  this.state.display
                )
              )
            )
          )
        ),
        React.createElement(
          'div',
          { id: 'toShow',
            className: openPowClass },
          React.createElement(
            'h1',
            null,
            ' Welcome to my Drum Machine! '
          ),
          React.createElement(
            'button',
            {
              type: 'button',
              id: 'initBtn',
              className: 'btn',
              onClick: this.handlePower },
            'Power'
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

var defAudioBanks = [[{
  keyCode: 81,
  letter: 'Q',
  text: 'Heater-1',
  sound: 'audio/Heater-1.mp3'
}, {
  keyCode: 87,
  letter: 'W',
  text: 'Heater-2',
  sound: 'audio/Heater-2.mp3'
}, {
  keyCode: 69,
  letter: 'E',
  text: 'Heater-3',
  sound: 'audio/Heater-3.mp3'
}, {
  keyCode: 65,
  letter: 'A',
  text: 'Heater-4',
  sound: 'audio/Heater-4.mp3'
}, {
  keyCode: 83,
  letter: 'S',
  text: 'Clap',
  sound: 'audio/Heater-6.mp3'
}, {
  keyCode: 68,
  letter: 'D',
  text: 'Open-HH',
  sound: 'audio/Dsc_Oh.mp3'
}, {
  keyCode: 90,
  letter: 'Z',
  text: "Kick-n'-Hat",
  sound: 'audio/Kick_n_Hat.mp3'
}, {
  keyCode: 88,
  letter: 'X',
  text: 'Kick',
  sound: 'audio/RP4_KICK_1.mp3'
}, {
  keyCode: 67,
  letter: 'C',
  text: 'Closed-HH',
  sound: 'audio/Cev_H2.mp3'
}], [{
  keyCode: 81,
  letter: 'Q',
  text: 'Chord-1',
  sound: 'audio/Chord_1.mp3'
}, {
  keyCode: 87,
  letter: 'W',
  text: 'Chord-2',
  sound: 'audio/Chord_2.mp3'
}, {
  keyCode: 69,
  letter: 'E',
  text: 'Chord-3',
  sound: 'audio/Chord_3.mp3'
}, {
  keyCode: 65,
  letter: 'A',
  text: 'Shaker',
  sound: 'audio/Give_us_a_light.mp3'
}, {
  keyCode: 83,
  letter: 'S',
  text: 'Open-HH',
  sound: 'audio/Dry_Ohh.mp3'
}, {
  keyCode: 68,
  letter: 'D',
  text: 'Closed-HH',
  sound: 'audio/Bld_H1.mp3'
}, {
  keyCode: 90,
  letter: 'Z',
  text: 'Punchy-Kick',
  sound: 'audio/punchy_kick_1.mp3'
}, {
  keyCode: 88,
  letter: 'X',
  text: 'Side-Stick',
  sound: 'audio/side_stick_1.mp3'
}, {
  keyCode: 67,
  letter: 'C',
  text: 'Snare',
  sound: 'audio/Brk_Snr.mp3'
}]];

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));