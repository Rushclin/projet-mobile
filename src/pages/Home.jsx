import { IonContent, IonFooter, IonGrid, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { useEffect, useState } from "react"
import Bouton from "../components/Bouton"
import Ligne from "../components/Ligne"
import { boutons } from "../utils/ListeBoutons"
import styles from "./Home.module.css"

const Home = () => {

    // Declaration des HOOKS 
    const [affTitre, setAffTitre] = useState("")
    const [somme, setSomme] = useState(0)
    const [historiqueSomme, setHistoriqueSomme] = useState("")

    const handleClick = (e, operateur) => {
        const historiqueTmp = historiqueSomme.replace(" ", "")

        if (operateur === "=") {
            calcluer()
        } else if (operateur === "C") {
            reinitialiser()
        } else if (operateur === "Del") {
            effacer()
        } else {
            e.target.classList.add("animate__headShake");
            setTimeout(() => {
                setHistoriqueSomme(historiqueTmp + operateur)
                e.target.classList.remove("animate__headShake");
            }, 100)
        }
    }

    useEffect(() => {
        calcluer()
    }, [historiqueSomme])

    const calcluer = () => {
        try {
            // Effectuer le calcul  
            setSomme(eval(historiqueSomme).length > 5 ? eval(historiqueSomme).toFixed(4) : eval(historiqueSomme))
            setAffTitre("")
        } catch (e) {

        }
    }

    const reinitialiser = () => {
        setHistoriqueSomme("")
        setSomme(0)
        setAffTitre("")
    }

    const effacer = () => {
        const sommeTmp = historiqueSomme.substr(0, historiqueSomme.length - 1)
        setHistoriqueSomme(sommeTmp)
    }

    const afficher = () => {
        if (somme.toString().length > 9) {
            return somme.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").substr(0, 10).concat("..")
        } else {
            return somme.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle><h1>Calculatrice TR. </h1></IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonText>
                    <div className={styles.containerSomme}>
                        {affTitre && <h4>{affTitre}</h4>}
                        <p>{historiqueSomme}</p>
                        <h1 className="animate__animated animate__headShake">
                            {afficher()}
                        </h1>
                    </div>
                </IonText>
            </IonContent>
            <IonFooter>
                <IonGrid className="ion-text-center ion-justify-content-center">
                    {
                        boutons.map((ligne, i) => {
                            return (
                                <Ligne key={i}>
                                    {
                                        ligne.map(bouton => {
                                            return <Bouton key={bouton.valeur} valeur={bouton.valeur} speciale={bouton.speciale} clickEvent={handleClick} />
                                        })
                                    }
                                </Ligne>
                            )
                        })
                    }
                </IonGrid>
            </IonFooter>
        </IonPage>
    )
}

export default Home