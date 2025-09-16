import {useId, useState} from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

/**
 * Composant Input avancé avec tooltip, gestion des alertes et autocomplétion.
 *
 * @param {Object} props - Props du composant.
 * @param {string} [props.type="text"] - Type de l'input (ex: "text", "password").
 * @param {string} props.title - Titre (label) de l'input.
 * @param {string} props.placeholder - Placeholder de l'input.
 * @param {string} props.value - Valeur de l'input (contrôlé).
 * @param {Function} props.change - Fonction appelée lors du changement de valeur. Reçoit un événement synthétique.
 * @param {boolean} [props.alerte=false] - Si vrai, affiche une alerte visuelle et un message d'erreur.
 * @param {string} [props.alerteMessage=""] - Message d'alerte à afficher.
 * @param {boolean} [props.showLabel=true] - Si vrai, affiche le label.
 * @param {string} [props.className=""] - Classes CSS pour le conteneur principal.
 * @param {string} [props.labelClassName=""] - Classes CSS pour le label.
 * @param {string} [props.inputClassName=""] - Classes CSS pour l'input (largeur, hauteur, margin, etc.).
 * @param {string} [props.tooltipClassName=""] - Classes CSS pour le tooltip d'erreur.
 * @param {string} [props.autoBoxClassName=""] - Classes CSS pour le conteneur de l'autocomplétion.
 * @param {boolean} [props.autocomplete=false] - Active/désactive la fonctionnalité d'autocomplétion.
 * @param {Array<string>} [props.dataliste=[]] - Liste des valeurs proposées pour l'autocomplétion.
 * @param {Function} [props.onAutoClick] - Callback appelée lors de la sélection d'une suggestion. Reçoit la valeur sélectionnée en paramètre.
 * @param {string} [props.id] - ID de l'input (généré automatiquement si non fourni).
 *
 * @returns {JSX.Element} - Composant Input avec tooltip, gestion des alertes et autocomplétion.
 *
 * @example
 * // Exemple d'utilisation avec autocomplétion
 * <Input
 *   value={searchTerm}
 *   change={(e) => setSearchTerm(e.target.value)}
 *   onAutoClick={(value) => setSearchTerm(value)}
 *   autocomplete={true}
 *   dataliste={["Option 1", "Option 2", "Option 3"]}
 *   placeholder="Rechercher..."
 * />
 *
 * @todo
 * - [Évolution à venir] Ajout de la navigation clavier pour les suggestions d'autocomplétion (flèches haut/bas, Entrée, Échap)
 * - Amélioration de l'accessibilité (ARIA)
 * - Gestion du focus et du blur pour une meilleure UX
 */
function Input({
  type = "text",
  title,
  placeholder,
  value,
  change,
  alerte = false,
  alerteMessage = "",
  showLabel = true,
  className = "",
  labelClassName = "",
  inputClassName = "",
  tooltipClassName = "",
  autoBoxClassName = "",
  autocomplete = false,
  dataliste = [],
  onAutoClick,
  helpMessage = '',
  id,
}) {
  const inputId = useId();
  const finalId = id || inputId;
  const filteredDataliste = value&&dataliste.filter((e) => new RegExp(value.toString(), 'i').test(e));

  return (
    <div className={`flex flex-col ${className}`}>
      {showLabel && (
        <label htmlFor={finalId} className={`text-m font-medium mb-1 ${labelClassName}`}>
          {title}
        </label>
      )}
      <Tooltip.Provider delayDuration={200}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <div className="flex flex-col"> 
              <input
                id={finalId}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => {change(e)}}
                className={`rounded-md px-2 py-1 border-2 ${
                  alerte ? "border-red-500 dark:border-red-400" : "border-emerald-300 dark:border-violet-500"
                } ${inputClassName}`}
              />
              {autocomplete && value && (
                <div role="listbox" className={`mt-1 overflow-y-auto ${autoBoxClassName}`}>
                  {(filteredDataliste.length?filteredDataliste:dataliste).map((e) => {
                    console.log(e)
                    return(
                    <span
                      key={e}
                      role="option"
                      onClick={()=>onAutoClick(e)}
                      className={`flex p-1 rounded-lg border-2 hover:bg-gray-100 border-black cursor-pointer `}
                    >
                      {e}
                    </span>
                  )})}
                </div>
              )}
            </div>
          </Tooltip.Trigger>
          {helpMessage && (
            <Tooltip.Portal>
              <Tooltip.Content
                className={`px-2 py-1 rounded shadow-lg whitespace-nowrap will-change-[transform,opacity] inline-block
                        data-[state=delayered-open]:data-[side=top]:animate-[slideDownAndFade_0.3s_ease-out]
                        data-[state=delayered-open]:data-[side=right]:animate-[slideLeftAndFade_0.3s_ease-out]
                        data-[state=delayered-open]:data-[side=left]:animate-[slideRightAndFade_0.3s_ease-out]
                        data-[state=delayered-open]:data-[side=bottom]:animate-[slideUpAndFade_0.3s_ease-out]
                        z-[9999]
                        ${tooltipClassName}`}
                sideOffset={8}
                
              >
                {helpMessage}
                <Tooltip.Arrow className="fill-red-500" />
              </Tooltip.Content>
            </Tooltip.Portal>
          )}
        </Tooltip.Root>
      </Tooltip.Provider>
      {alerte && !tooltipClassName && (
        <p className="text-red-500 text-xs mt-1">{alerteMessage}</p>
      )}
    </div>
  );
}

export default Input;