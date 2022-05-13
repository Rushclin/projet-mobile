import {
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonPage,
} from "@ionic/react";
import styles from "./Home.module.css";
import { buttons } from "../utils/Button";
import Button from "../components/Button";
import ButtonRow from "../components/ButtonRow";
import { useEffect, useState } from "react";

const Home = () => {

  const [showTitle, setShowTitle] = useState("_______");
  const [sum, setSum] = useState(0)
  const [sumHistory, setSumHistory] = useState("Calculateur");

  const handleClick = (e, operateur) => {
    const tempSumHistory = sumHistory.replace("Calculateur ", "");
    if (operateur === "=") {
      calculate()
    } else if (operateur === "C") {
      reset()
    } else if (operateur === "Del") {
      backspace()
    } else {
      e.target.classList.add("animate__headShake");

      setTimeout(() => {
        setSumHistory(tempSumHistory + operateur);
        e.target.classList.remove("animate__headShake");
      }, 500);
    }
  }
  useEffect(() => {

    calculate();
  }, [sumHistory]);

  const calculate = () => {

    try {
      // eslint-disable-next-line no-eval
      setSum(eval(sumHistory).length > 5 ? eval(sumHistory).toFixed(4) : eval(sumHistory));
      setShowTitle("Calculateur Rushclin");
    } catch (e) {


    }
  }

  const reset = () => {

    setSumHistory("Ionic Calculator");
    setSum("0");
    setShowTitle("_______");
  }

  const backspace = () => {

    const tempSum = sumHistory.substr(0, sumHistory.length - 1);
    setSumHistory(tempSum);
  }

  return (
    <IonPage>
      <IonHeader>
        <div className={styles.sumContainer}>

          {showTitle && <h4>{showTitle}</h4>}
          <p>{sumHistory}</p>
          <h1 className="animate__animated animate__headShake">{sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
        </div>
      </IonHeader>
      <IonContent fullscreen>

      </IonContent>
      <IonFooter>
        <IonGrid className="ion-text-center ion-justify-content-center">
          {
            buttons.map((buttonRow, index) => {
              return (
                <ButtonRow key={index}>
                  {
                    buttonRow.map(button => {
                      return <Button key={button.value} value={button.value} special={button.special} clickEvent={handleClick} />
                    })
                  }
                </ButtonRow>
              )
            })
          }
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
