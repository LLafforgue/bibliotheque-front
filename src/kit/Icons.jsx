import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser, faBook, faStar, faRightFromBracket, faBell, faCog, faPlusCircle, faPen} from '@fortawesome/free-solid-svg-icons';
import useMobile from "../hooks/UseMobile";
/**
 * Composant Icon avec tooltip intégré.
 * @param {Object} props - Props du composant.
 * @param {string} props.title - Titre à afficher dans le tooltip.
 * @param {Object} props.type - Type de l'icône Font Awesome (ex: faUser).
 * @param {string} [props.className] - Classes CSS supplémentaires pour l'icône.
 * @param {string} [props.tooltipClassName] - Classes CSS supplémentaires pour le tooltip.
 * @returns {JSX.Element} - Composant Icon avec tooltip.
 */
const Icon = ({ title, type, action, showTitle, className = "", classNameFont = "", tooltipClassName = "" }) => {
  const isMobile = useMobile();
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            aria-label={title}
            className={`rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-800 ${className}`}
            onClick={action}
          >
            <FontAwesomeIcon icon={type} className={`h-5 w-5 ${classNameFont}`} />
            {showTitle && !isMobile && <span>{title}</span>}
          </button>
        </Tooltip.Trigger>
        {isMobile&&<Tooltip.Portal>
          <Tooltip.Content
            className={`px-2 py-1 rounded shadow-lg whitespace-nowrap will-change-[transform,opacity] inline-block
                        data-[state=delayered-open]:data-[side=top]:animate-[slideDownAndFade_0.3s_ease-out]
                        data-[state=delayered-open]:data-[side=right]:animate-[slideLeftAndFade_0.3s_ease-out]
                        data-[state=delayered-open]:data-[side=left]:animate-[slideRightAndFade_0.3s_ease-out]
                        data-[state=delayered-open]:data-[side=bottom]:animate-[slideUpAndFade_0.3s_ease-out]
                        ${tooltipClassName}`}
            sideOffset={8}
          >
            {title}
            <Tooltip.Arrow className="w-full dark:fill-gray-800" />
          </Tooltip.Content>
        </Tooltip.Portal>}
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};


export default Icon;
