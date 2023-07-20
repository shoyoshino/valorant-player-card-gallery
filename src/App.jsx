import { useEffect, useRef, useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import LogoPng from './assets/logo.png';

function App() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const ref = useRef(null);
  const [playerCardType, setPlayerCardType] = useState('large');

  const radioButtons = [
    {
      label: 'Large',
      value: 'large',
    },
    {
      label: 'Wide',
      value: 'wide',
    },
    {
      label: 'Small',
      value: 'small',
    },
  ];

  useEffect(() => {
    fetch('https://valorant-api.com/v1/playercards?language=ja-JP')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setData(json.data);
        setFilterData(json.data);
      });
  }, []);

  const handleChange = () => {
    setFilterData(
      data.filter((playerCard) => playerCard.displayName.toLowerCase().includes(ref.current.value.toLowerCase()))
    );
  };

  const handleRadioChecked = (event) => {
    setPlayerCardType(event.target.value);
  };

  return (
    <>
      <div className="text-white bg-[#0f1822] w-full min-h-screen" id="home">
        <header className="sticky top-0 w-full">
          <div className="h-auto md:h-40 container mx-auto px-5 flex items-start md:items-center md:justify-between flex-col gap-0 md:flex-row">
            <h1 className="text-xl md:text-2xl font-bold pt-5 md:pt-0 mx-auto md:mx-0">
              <img src={LogoPng} alt="VALORANTプレイヤーカードギャラリー" className="w-32 md:w-40" />
            </h1>
            <div className="sticky top-0 w-full md:w-auto flex items-start md:items-center flex-col md:flex-row">
              <input
                type="text"
                ref={ref}
                onChange={() => handleChange()}
                className="w-full md:w-auto bg-[#0f1822] border border-white focus:border-[#ff4654] rounded-lg outline-none mt-5 md:mt-0 mr-0 md:mr-2 px-2 py-2"
                placeholder="検索"
              />

              <div className="flex">
                {radioButtons.map((radioButton, index) => (
                  <div key={index} className="mt-2 md:mt-0 mr-2">
                    <input
                      type="radio"
                      name="playerCardType"
                      id={radioButton.value}
                      value={radioButton.value}
                      className="hidden peer"
                      onChange={(event) => handleRadioChecked(event)}
                      checked={radioButton.value === playerCardType} // playerCardTypeは現在選択しているカードタイプ
                      required
                    />
                    <label
                      htmlFor={radioButton.value}
                      className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-400 hover:text-gray-600 font-bold bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg cursor-pointer peer-checked:text-[#ff4654] peer-checked:border-[#ff4654]"
                    >
                      <div className="block select-none">{radioButton.label}</div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-5 pb-20">
          <div
            className={`grid gap-5 md:gap-10 mt-10 ${
              playerCardType === 'large'
                ? 'grid-cols-2 md:grid-cols-5'
                : playerCardType === 'wide'
                ? 'grid-cols-1 md:grid-cols-3'
                : playerCardType === 'small'
                ? 'grid-cols-2 md:grid-cols-8'
                : ''
            }`}
          >
            {filterData.map((playerCard) => (
              <div key={playerCard.uuid}>
                {playerCardType === 'large' ? (
                  <img src={playerCard.largeArt} alt={playerCard.displayName} className="w-full mx-auto" />
                ) : playerCardType === 'wide' ? (
                  <img src={playerCard.wideArt} alt={playerCard.displayName} className="w-full mx-auto" />
                ) : playerCardType === 'small' ? (
                  <img src={playerCard.smallArt} alt={playerCard.displayName} className="w-full mx-auto" />
                ) : (
                  <div>No image available</div>
                )}
                <div className="text-base font-bold mt-2">{playerCard.displayName}</div>
              </div>
            ))}
          </div>
        </div>
        <AnchorLink
          href="#home"
          className="w-12 md:w-16 h-12 md:h-16 flex items-center justify-center fixed right-5 md:right-8 bottom-5 select-none bg-gray-800 rounded-full p-1 drop-shadow-md"
        >
          <span className="material-icons text-4xl md:text-5xl">keyboard_arrow_up</span>
        </AnchorLink>
      </div>
    </>
  );
}

export default App;
