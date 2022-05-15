import { IonCol } from "@ionic/react"
import styles from "./Bouton.module.css";

const Bouton = (props) => {

    // Recuperation des valeurs transmise
    const { valeur, speciale, clickEvent } = props
    return (
        <IonCol className={`${speciale ? styles.speciale : styles.nonSpeciale} animate__animated animate__faster`} onClick={e => clickEvent(e, valeur)}>
            {valeur === "/" ? <>&divide;</> : valeur === "*" ? <>&times;</> : valeur}
        </IonCol>
    )
}

export default Bouton