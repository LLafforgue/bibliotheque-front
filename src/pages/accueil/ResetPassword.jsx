import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchList from "../../hooks/fetchList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({mdp:false, confirm:false, notSent:false, error:''})
  const navigate = useNavigate();
  const patern = /[A-Z0-9](&|\*|\$|#|@|\+|_)/
  const {token} = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();
      //Vérification du mot de passe
    if(!patern.test(password)){
      setAlert({...alert, mdp:true});
      return
    }
    if (password !== confirm) {
      // alert("Les mots de passe ne correspondent pas");
      setAlert({...alert, confirm:true});
      return;
    }
    setLoading(true);
    try {
      const data = await fetchList(
        `auth/users/${token}`,
        "PUT",
        { password },
      );

      if (data.result) {
        navigate("/", { replace: true });
      } else {
        setAlert({...alert, notSent:true})
      }
    } catch (err) {
      console.error(err);
      setAlert({...alert, notSent:true, error:err?.toString()})
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="flex flex-col gap-2 mt-2 justify-center items-center">
        <div className="mt-2 text-gray-800 dark:text-gray-50 text-lg font-bold">
          Nouveau mot de passe
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 mt-2 justify-center items-center w-full"
        >
          <label htmlFor="password" className="w-full">
            <input
              type="password"
              id="password"
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => {setPassword(e.target.value); setAlert({mdp:false, confirm:false, notSent:false})}}
              required
              className="w-full rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500"
            />
          </label>
          {alert?.mdp&&<p className="text-red-800">Le mot de passe doit contenir 8 caractères, Majuscule, chiffre et caractère spécial: &,*,$,#,@,+ ou _</p>}

          <label htmlFor="confirm" className="w-full">
            <input
              type="password"
              id="confirm"
              placeholder="Confirmer le mot de passe"
              value={confirm}
              onChange={(e) => {setConfirm(e.target.value); setAlert({mdp:false, confirm:false, notSent:false})}}
              required
              className="w-full rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500"
            />
          </label>
          {alert?.confirm&&<p className="text-red-800">Confirmation invalide</p>}
          {alert?.mdp&&<p className="text-red-800">Le mot de passe doit contenir 8 caractères, Majuscule, chiffre et caractère spécial: &,*,$,#,@,+ ou _</p>}

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500 bg-emerald-300 dark:bg-violet-500 hover:bg-emerald-400 dark:hover:bg-violet-400 text-gray-800 dark:text-gray-50 font-bold mt-2 disabled:opacity-50"
          >
            {loading ? "Changement..." : "Changer le mot de passe"}
          </button>
          {alert?.notSent&&<p className="text-red-800">{`Nous rencontrons une erreur de serveur : ${alert?.error} Effectuez une nouvelle tentative`}</p>}
          
        </form>
        <div
        className="mx-[10%] flex flex-wrap justify-center gap-6"
        onClick={()=>navigate('/nvpassword', {replace:true})}
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} className="h-4 w-4 dark:text-white"/>
        </div>
      </div>
  );
}
