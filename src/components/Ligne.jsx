import { IonRow } from "@ionic/react"

const Ligne = (props) => {
    return (
        <IonRow>
            {props.children}
        </IonRow>
    )
}

export default Ligne;