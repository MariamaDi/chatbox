import { Dispatch, DispatchWithoutAction, SetStateAction } from "react";

interface Props {
  nom: string; // On définit le type de la prop nom
  prenom: string;
  //enfant:
  setTime: Dispatch<SetStateAction<Date>>;
}
const Child = ({ nom, prenom, setTime }: Props) => {
  return (
    <div>
      <h1>Enfant</h1>
      <p>Nom : {nom}</p>
      <p>Prenom : {prenom}</p>
      <button onClick={() => setTime(new Date())}>soumetre</button>
    </div>
  );
};
export default Child;
