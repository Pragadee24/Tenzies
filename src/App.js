import React from "react";
import Die from "./Components/Die";

function App() {
  const [dice, setNewDices] = React.useState(allNewDice());

  const diceElements = dice.map((newDices) => (
    <Die key={newDices.id} {...newDices} toggle={() => holdDice(newDices.id)} />
  ));

  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allSameValue = dice.every((die) => die.value === dice[0].value);
    if (allHeld && allSameValue) {
      setTenzies((prevstate) => !prevstate);
    }
  }, [dice]);

  function allNewDice() {
    const allNewDiceArr = [];
    for (let i = 0; i < 10; i++) {
      allNewDiceArr.push({
        id: i,
        value: Math.ceil(6 * Math.random()),
        isHeld: false,
      });
    }
    return allNewDiceArr;
  }

  function holdDice(id) {
    setNewDices((holdDice) => {
      return holdDice.map((holdDice) => {
        return holdDice.id === id
          ? { ...holdDice, isHeld: !holdDice.isHeld }
          : holdDice;
      });
    });
  }

  function resetDice() {
    setNewDices(allNewDice());
    setTenzies((prevstate) => !prevstate);
  }

  function rollDice() {
    setNewDices((oldDices) => {
      return oldDices.map((oldDices) => {
        return !oldDices.isHeld
          ? { ...oldDices, value: Math.ceil(6 * Math.random()) }
          : oldDices;
      });
    });
  }

  return (
    <div>
      <main>
        <h1 className="Title">Tenzies</h1>
        <p className="Description">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="die-container">{diceElements}</div>
        <button className="Roll-Btn" onClick={tenzies ? resetDice : rollDice}>
          {" "}
          {tenzies ? "New Game" : "Roll"}{" "}
        </button>
      </main>
    </div>
  );
}

export default App;
