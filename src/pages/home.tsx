import React, {
  MouseEventHandler,
  ReactHTMLElement,
  useEffect,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForward,
  faPlus,
  faPen,
  faTimes,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

export interface Title {
  id: number;
  value: string;
}

export default function Home() {
  const [deg, setDeg] = useState(0);
  const [sec, setSec] = useState(60);
  const [min, setMin] = useState(1);
  const [stopTimer, setStopTimer] = useState(true);
  const [items, setItem] = useState<Title[]>([]);

  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState<number>();

  useEffect(() => {
    // if (items.length <= 0) {
    //   setStopTimer(true);
    //   console.log(stopTimer);
    // } else {
    //   setStopTimer(false);
    // }

    if (!stopTimer) {
      let timer = setInterval(() => {
        console.log(items.length);
        if (items.length > 0) {
          if (deg >= 360) {
            resetTiming();
            completeItem();
          } else {
            startTiming();
          }
          clearInterval(timer);
        }
      }, 1000);
    }
  });

  function startTiming() {
    setDeg(() => {
      return deg + 6;
    });
    setSec(sec - 1);
    setMin(0);
  }
  function stopTiming() {
    setStopTimer(!stopTimer);
  }
  function resetTiming() {
    setStopTimer(true);
    setDeg(0);
    setMin(1);
    setSec(60);
  }
  function add() {
    setItem([...items, { id: items.length + 1, value: title }]);
  }

  function handleTextfield(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleItemValue(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    let newArray = [...items];
    newArray[index].value = e.target.value;
    setItem(newArray);
  }
  function handleDeleteItem(index: number) {
    let newArray = [...items];
    newArray.splice(index, 1);
    setItem(newArray);
  }
  function completeItem() {
    let newArray = [...items];
    newArray.splice(0, 1);
    setItem(newArray);
  }

  function handleEdit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) {
    setSelected(index);
    setEdit(!edit);
    if (!edit) {
    }
  }

  return (
    <div className="home">
      <div className="title">
        <div className="title-flow">
          <FontAwesomeIcon
            icon={faForward}
            size={"5x"}
            color={
              stopTimer || items.length <= 0 ? "rgb(255, 126, 126)" : "#707070"
            }
          />
          <h1
            className={
              stopTimer || items.length <= 0
                ? "title-flow-content-enable"
                : "title-flow-content-disable"
            }
          >
            {items.length > 0 ? items[0].value : "Please Add New"}
          </h1>

          <div className="todo-area">
            <input
              type="text"
              className="todo-area-input"
              onChange={handleTextfield}
            />
            <button type="button" className="todo-area-add" onClick={add}>
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </button>
            <ul>
              {items.map((item, index) => (
                <li className="todo-item" key={item.id}>
                  {edit && index === selected ? (
                    <input
                      className="todo-item-title-disable"
                      type="text"
                      defaultValue={item.value}
                      onChange={(event) => handleItemValue(event, index)}
                    />
                  ) : (
                    <span className="todo-item-title-enable">{item.value}</span>
                  )}
                  <div>
                    <button
                      className="edit-btn"
                      onClick={(event) => handleEdit(event, index)}
                      key={item.id}
                    >
                      <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    </button>
                    <button
                      className="delete-btn"
                      onClick={(event) => handleDeleteItem(index)}
                    >
                      <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="timer">
        <div
          className={
            stopTimer || items.length <= 0 ? "circle-enable" : "circle-disable"
          }
        ></div>

        <h1
          className={
            stopTimer || items.length <= 0 ? "time-enable" : "time-disable"
          }
        >
          {min > 0 ? "01:00" : "0" + min + ":" + sec}
        </h1>
        <button
          className="start-btn"
          onClick={stopTiming}
          disabled={items.length <= 0}
        >
          <FontAwesomeIcon icon={faPlay} size={"2x"}></FontAwesomeIcon>
        </button>
        <div
          className="circle-inside"
          style={{
            transform: `rotate(${deg}deg)`,
          }}
        >
          <div
            className={
              stopTimer || items.length <= 0 ? "dot-enable" : "dot-disable"
            }
          ></div>
        </div>
      </div>
    </div>
  );
}
