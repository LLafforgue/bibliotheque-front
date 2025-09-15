import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

/**
 * Composant Input avec tooltip et gestion des alertes.
 * @param {Object} props - Props du composant.
 * @param {string} props.type - Type de l'input (ex: "text", "password").
 * @param {string} props.title - Titre (label) de l'input.
 * @param {string} props.placeholder - Placeholder de l'input.
 * @param {string} props.value - Valeur de l'input.
 * @param {Function} props.change - Fonction appelée lors du changement de valeur.
 * @param {boolean} props.alerte - Si vrai, affiche une alerte.
 * @param {string} props.alerteMessage - Message d'alerte à afficher.
 * @param {boolean} [props.showLabel=true] - Si vrai, affiche le label.
 * @param {string} [props.className] - Classes CSS pour le conteneur (label).
 * @param {string} [props.inputClassName] - Classes CSS pour l'input (largeur, hauteur, margin, etc.).
 * @param {string} [props.tooltipClassName] - Classes CSS pour le tooltip.
 * @param {string} [props.id] - ID de l'input (généré automatiquement si non fourni).
 * @returns {JSX.Element} - Composant Input avec tooltip et gestion des alertes.
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
  id,
}) {
  // Génère un ID unique si non fourni
  const inputId = React.useId();
  const finalId = id || inputId;

  return (
    <div className={`flex flex-col ${className}`}>
      {showLabel && (
        <label htmlFor={finalId} className={`text-m font-medium mb-1 ${labelClassName} `}>
          {title}
        </label>
      )}
      <Tooltip.Provider delayDuration={200}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <input
              id={finalId}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={change}
              className={`rounded-md px-2 py-1 border-2 ${
                alerte
                  ? "border-red-500 dark:border-red-400"
                  : "border-emerald-300 dark:border-violet-500"
              } ${inputClassName}`}
            />
          </Tooltip.Trigger>
          {alerte && (
            <Tooltip.Portal>
              <Tooltip.Content
                className={`bg-red-500 text-white text-sm px-2 py-1 rounded shadow-lg whitespace-nowrap ${tooltipClassName}`}
                sideOffset={5}
              >
                {alerteMessage}
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
