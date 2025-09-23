import * as Tooltip from "@radix-ui/react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser, faLock, faLockOpen, faXmark, faDoorClosed, faDoorOpen ,faBook, faLink, faVideo, faStar, faRightFromBracket, faBell, faCog, faPlusCircle, faPen} from '@fortawesome/free-solid-svg-icons';
import { faSquareCaretDown, faSquareCaretUp } from "@fortawesome/free-regular-svg-icons";
import useMobile from "../hooks/UseMobile";

// Mapping des noms d'icônes (strings) vers les icônes Font Awesome
const iconMap = {
  afficher: faSquareCaretDown,
  bell: faBell,
  book: faBook,
  cog: faCog,
  fermer: faXmark,
  link: faLink,
  lock: faLock,
  logout: faRightFromBracket,
  pen: faPen,
  pluscircle: faPlusCircle,
  replier: faSquareCaretUp,
  sallefermee: faDoorClosed,
  salleouverte: faDoorOpen,
  star: faStar,
  unlock: faLockOpen,
  user: faUser,
  video:faVideo
};

/**
 * Composant Icon avec tooltip intégré.
 * @param {Object} props - Props du composant.
 * @param {string} props.title - Titre à afficher dans le tooltip.
 * @param {string} props.type - Nom de l'icône (ex: "user", "book").
 * @param {string} [props.className] - Classes CSS supplémentaires pour le bouton.
 * @param {string} [props.classNameFont] - Classes CSS supplémentaires pour l'icône.
 * @param {string} [props.tooltipClassName] - Classes CSS supplémentaires pour le tooltip.
 * @returns {JSX.Element} - Composant Icon avec tooltip.
 */

const Icon = ({ title, type, action, showTitle=false, className = "", classNameFont = "", tooltipClassName = ""}) => {

  const isMobile = useMobile()
  const TooltipOn = showTitle? isMobile : true;

  const icon = iconMap[type.toLowerCase()];

  if (!icon) {
    console.error(`Icon "${type}" not found.`);
    return;
  }

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            aria-label={title}
            className={`rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-800 ${className}`}
            onClick={action}
          >
            <FontAwesomeIcon icon={icon} className={`h-5 w-5 ${classNameFont}`} />
            {showTitle && !TooltipOn && <span>{title}</span>}
          </button>
        </Tooltip.Trigger>
        {TooltipOn&&<Tooltip.Portal>
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
            {title}
            <Tooltip.Arrow className="w-full dark:fill-gray-800" />
          </Tooltip.Content>
        </Tooltip.Portal>}
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};


export default Icon;
